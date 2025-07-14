import { AuthService } from '../../modules/auth/auth.service';
import { InvalidCredentialsError } from '../../exception/InvalidCredentialsError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../database/client';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../database/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe('AuthService', () => {
  const authService = new AuthService();

  const validUser = {
    id: 'abc123',
    email: 'joao@email.com',
    password: 'hashed_password',
    first_name: 'João',
    last_name: 'Silva',
    profile_picture: null,
    active: true,
  };

  const loginDto = {
    email: 'joao@email.com',
    password: '123456',
  };

  const jwtToken = 'jwt.token.aqui';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'minha_chave_teste';
  });

  it('deve autenticar o usuário e retornar o token', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(validUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(jwtToken);

    const result = await authService.login(loginDto);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginDto.email, active: true },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, validUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: validUser.id, email: validUser.email },
      'minha_chave_teste',
      { expiresIn: '10m' }
    );
    expect(result).toEqual({ token: jwtToken });
  });

  it('deve lançar InvalidCredentialsError se o usuário não for encontrado', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(authService.login(loginDto)).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('deve lançar InvalidCredentialsError se a senha for inválida', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(validUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(authService.login(loginDto)).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it('deve lançar erro se JWT_SECRET não estiver definido', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(validUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const originalJwtSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    await expect(authService.login(loginDto))
      .rejects
      .toThrow('JWT_SECRET não foi definida no .env');

    process.env.JWT_SECRET = originalJwtSecret;
  });

});
