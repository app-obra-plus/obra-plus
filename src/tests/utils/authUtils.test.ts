import { generateLoginResponse } from '../../modules/auth/utils/authUtils';
import { UserMapper } from '../../modules/users/dto/mapper/UserMapper';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('../../modules/users/dto/mapper/UserMapper');

describe('authUtils - generateLoginResponse', () => {
  const mockUser = {
    id: 'user-123',
    email: 'joao@example.com',
    password: 'hashed_password',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11987654321',
    profile_picture: 'https://example.com/avatar.png',
    isDeleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockUserDto = {
    id: 'user-123',
    email: 'joao@example.com',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11987654321',
    profile_picture: 'https://example.com/avatar.png',
  };

  const mockToken = 'jwt.token.aqui';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret-key';
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (UserMapper.toResponseDto as jest.Mock).mockReturnValue(mockUserDto);
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  describe('Geração de Token', () => {
    it('deve gerar token JWT com userId e email', () => {
      generateLoginResponse(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id, email: mockUser.email },
        'test-secret-key',
        { expiresIn: '1d' }
      );
    });

    it('deve usar JWT_SECRET do environment', () => {
      process.env.JWT_SECRET = 'minha-chave-secreta';
      
      generateLoginResponse(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        expect.any(Object),
        'minha-chave-secreta',
        expect.any(Object)
      );
    });

    it('deve configurar expiração de 1 dia', () => {
      generateLoginResponse(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(String),
        { expiresIn: '1d' }
      );
    });

    it('deve incluir userId no payload do token', () => {
      generateLoginResponse(mockUser);

      const payload = (jwt.sign as jest.Mock).mock.calls[0][0];
      expect(payload).toHaveProperty('userId', mockUser.id);
    });

    it('deve incluir email no payload do token', () => {
      generateLoginResponse(mockUser);

      const payload = (jwt.sign as jest.Mock).mock.calls[0][0];
      expect(payload).toHaveProperty('email', mockUser.email);
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve lançar erro se JWT_SECRET não estiver definido', () => {
      delete process.env.JWT_SECRET;

      expect(() => generateLoginResponse(mockUser)).toThrow(
        'JWT_SECRET não foi definida no .env'
      );
    });

    it('deve lançar erro se JWT_SECRET for string vazia', () => {
      process.env.JWT_SECRET = '';

      expect(() => generateLoginResponse(mockUser)).toThrow(
        'JWT_SECRET não foi definida no .env'
      );
    });

    it('não deve chamar jwt.sign se JWT_SECRET não existir', () => {
      delete process.env.JWT_SECRET;

      try {
        generateLoginResponse(mockUser);
      } catch (error) {
        // Esperado
      }

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('Mapeamento de Usuário', () => {
    it('deve usar UserMapper.toResponseDto', () => {
      generateLoginResponse(mockUser);

      expect(UserMapper.toResponseDto).toHaveBeenCalledWith(mockUser);
    });

    it('deve retornar usuário mapeado no response', () => {
      const result = generateLoginResponse(mockUser);

      expect(result.user).toEqual(mockUserDto);
    });

    it('não deve incluir senha no response', () => {
      const result = generateLoginResponse(mockUser);

      expect(result.user).not.toHaveProperty('password');
    });

    it('não deve incluir campos internos no response', () => {
      const result = generateLoginResponse(mockUser);

      expect(result.user).not.toHaveProperty('isDeleted');
      expect(result.user).not.toHaveProperty('created_at');
      expect(result.user).not.toHaveProperty('updated_at');
    });
  });

  describe('Estrutura da Resposta', () => {
    it('deve retornar objeto com token e user', () => {
      const result = generateLoginResponse(mockUser);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
    });

    it('deve retornar token como string', () => {
      const result = generateLoginResponse(mockUser);

      expect(typeof result.token).toBe('string');
      expect(result.token).toBe(mockToken);
    });

    it('deve retornar user como objeto', () => {
      const result = generateLoginResponse(mockUser);

      expect(typeof result.user).toBe('object');
      expect(result.user).not.toBeNull();
    });

    it('resposta deve ter apenas 2 propriedades (token e user)', () => {
      const result = generateLoginResponse(mockUser);

      const keys = Object.keys(result);
      expect(keys).toEqual(['token', 'user']);
      expect(keys.length).toBe(2);
    });
  });

  describe('Casos de Uso Reais', () => {
    it('deve gerar resposta completa para login bem-sucedido', () => {
      const result = generateLoginResponse(mockUser);

      expect(result).toEqual({
        token: mockToken,
        user: mockUserDto,
      });
    });

    it('deve funcionar com diferentes usuários', () => {
      const user1 = { ...mockUser, id: 'user-1', email: 'user1@example.com' };
      const user2 = { ...mockUser, id: 'user-2', email: 'user2@example.com' };

      const dto1 = { ...mockUserDto, id: 'user-1', email: 'user1@example.com' };
      const dto2 = { ...mockUserDto, id: 'user-2', email: 'user2@example.com' };

      (UserMapper.toResponseDto as jest.Mock)
        .mockReturnValueOnce(dto1)
        .mockReturnValueOnce(dto2);

      const result1 = generateLoginResponse(user1);
      const result2 = generateLoginResponse(user2);

      expect(result1.user.id).toBe('user-1');
      expect(result2.user.id).toBe('user-2');
    });

    it('deve funcionar com usuário sem foto de perfil', () => {
      const userWithoutPicture = {
        ...mockUser,
        profile_picture: null,
      };

      const dtoWithoutPicture = {
        ...mockUserDto,
        profile_picture: null,
      };

      (UserMapper.toResponseDto as jest.Mock).mockReturnValue(dtoWithoutPicture);

      const result = generateLoginResponse(userWithoutPicture);

      expect(result.user.profile_picture).toBeNull();
    });

    it('deve retornar LoginResponseDto tipado corretamente', () => {
      const result = generateLoginResponse(mockUser);

      // Verificar estrutura de LoginResponseDto
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('id');
      expect(result.user).toHaveProperty('email');
      expect(result.user).toHaveProperty('first_name');
      expect(result.user).toHaveProperty('last_name');
      expect(result.user).toHaveProperty('phone_number');
    });
  });

  describe('Integração com JWT', () => {
    it('deve passar payload correto para jwt.sign', () => {
      const user = {
        ...mockUser,
        id: 'specific-id',
        email: 'specific@email.com',
      };

      generateLoginResponse(user);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 'specific-id', email: 'specific@email.com' },
        expect.any(String),
        expect.any(Object)
      );
    });

    it('deve chamar jwt.sign apenas uma vez', () => {
      generateLoginResponse(mockUser);

      expect(jwt.sign).toHaveBeenCalledTimes(1);
    });

    it('deve usar o token retornado por jwt.sign', () => {
      const customToken = 'custom.jwt.token';
      (jwt.sign as jest.Mock).mockReturnValue(customToken);

      const result = generateLoginResponse(mockUser);

      expect(result.token).toBe(customToken);
    });
  });

  describe('Segurança', () => {
    it('não deve expor JWT_SECRET na resposta', () => {
      const result = generateLoginResponse(mockUser);

      const resultString = JSON.stringify(result);
      expect(resultString).not.toContain('test-secret-key');
    });

    it('não deve expor senha na resposta', () => {
      const result = generateLoginResponse(mockUser);

      expect(result.user).not.toHaveProperty('password');
      
      const resultString = JSON.stringify(result);
      expect(resultString).not.toContain('hashed_password');
    });

    it('deve incluir apenas dados públicos do usuário', () => {
      const result = generateLoginResponse(mockUser);

      // Campos públicos esperados
      expect(result.user).toHaveProperty('id');
      expect(result.user).toHaveProperty('email');
      expect(result.user).toHaveProperty('first_name');
      expect(result.user).toHaveProperty('last_name');
      expect(result.user).toHaveProperty('phone_number');

      // Campos privados não devem estar presentes
      expect(result.user).not.toHaveProperty('password');
      expect(result.user).not.toHaveProperty('isDeleted');
    });
  });
});

