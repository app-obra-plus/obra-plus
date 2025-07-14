import { login } from '../../modules/auth/auth.controller';
import { AuthService } from '../../modules/auth/auth.service';
import { Request, Response } from 'express';
import { InvalidCredentialsError } from '../../exception/InvalidCredentialsError';

jest.mock('../../modules/auth/auth.service');

describe('login controller', () => {
  const mockReq = {
    body: {
      email: 'joao@email.com',
      password: '123456'
    }
  } as Partial<Request>;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as Partial<Response>;

  const mockLoginResponse = {
    id: 'abc123',
    token: 'jwt.token.aqui',
    email: 'joao@email.com',
    first_name: 'João',
    last_name: 'Silva'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve autenticar usuário e retornar 200 com dados + token', async () => {
    (AuthService.prototype.login as jest.Mock).mockResolvedValue(mockLoginResponse);

    await login(mockReq as Request, mockRes as Response);

    expect(AuthService.prototype.login).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockLoginResponse);
  });

  it('deve lançar InvalidCredentialsError para email ou senha inválido', async () => {
    (AuthService.prototype.login as jest.Mock).mockRejectedValueOnce(
      new InvalidCredentialsError()
    );

    await expect(login(mockReq as Request, mockRes as Response)).rejects.toBeInstanceOf(InvalidCredentialsError);
    expect(AuthService.prototype.login).toHaveBeenCalledWith(mockReq.body);
  });

});
