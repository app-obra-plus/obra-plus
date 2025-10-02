import { createUser, getUserById, updateUser, deleteUser } from '../../modules/users/user.controller';
import { validateSchema, validateId } from '../../utils/validateRequest';
import { UserService } from '../../modules/users/user.service';
import { Request, Response } from 'express';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';
import { ForbiddenAccessError } from '../../exception/ForbiddenAccessError';

jest.mock('../../utils/validateRequest');
jest.mock('../../modules/users/user.service');

describe('createUser', () => {
  const mockReq = {
    body: {
      email: 'joao@email.com',
      password: '123456',
      first_name: 'João',
      last_name: 'Silva',
      phone_number: '11999999999'
    }
  } as Partial<Request>;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as Partial<Response>;

  const mockValidatedUser = {
    ...mockReq.body,
    password: 'hashed_password'
  };

  const mockUserResponse = {
    id: 'abc123',
    email: mockReq.body!.email,
    phone_number: mockReq.body!.phone_number,
    first_name: mockReq.body!.first_name,
    last_name: mockReq.body!.last_name,
    profile_picture: 'https://cdn.example.com/avatar.png',
    active: true
  };

  beforeEach(() => {
     jest.clearAllMocks();
    (validateSchema as jest.Mock).mockReturnValue(mockValidatedUser);
    (UserService.prototype.createUser as jest.Mock).mockResolvedValue(mockUserResponse);
  });

  it('deve validar, criar usuário e retornar 201 com o DTO de resposta', async () => {
    await createUser(mockReq as Request, mockRes as Response);

    expect(validateSchema).toHaveBeenCalledWith(expect.anything(), mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockUserResponse);
  });
});

describe('getUserById', () => {
  const mockReq = {
    params: {
      id: 'abc123'
    }
  } as Partial<Request>;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as Partial<Response>;

  const mockUserResponse = {
    id: 'abc123',
    email: 'joao@email.com',
    phone_number: '11999999999',
    first_name: 'João',
    last_name: 'Silva',
    profile_picture: 'https://cdn.example.com/avatar.png',
    active: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (UserService.prototype.getUserById as jest.Mock).mockResolvedValue(mockUserResponse);

  });

  it('deve retornar 200 e o usuário quando encontrado', async () => {
    await getUserById(mockReq as Request, mockRes as Response);

    expect(UserService.prototype.getUserById).toHaveBeenCalledWith('abc123');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUserResponse);
  });


  it('deve lançar EntityNotFoundError quando usuário não existir', async () => {

    (UserService.prototype.getUserById as jest.Mock).mockRejectedValueOnce(
      new EntityNotFoundError('Usuário', 'abc123')
    );

    await expect(getUserById(mockReq as Request, mockRes as Response)).rejects.toBeInstanceOf(EntityNotFoundError);
    expect(UserService.prototype.getUserById).toHaveBeenCalledWith('abc123');
  });
});


describe('updateUser controller', () => {
  const mockReq = {
    params: { id: 'abc123' },
    body: {
      first_name: 'João Atualizado',
      last_name: 'Silva',
      phone_number: '11988888888'
    },
  
    auth: { userId: 'abc123' }
  } as unknown as Request;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as Partial<Response>;

  const mockValidatedData = {
    first_name: 'João Atualizado',
    last_name: 'Silva',
    phone_number: '11988888888'
  };

  const mockUserResponse = {
    id: 'abc123',
    email: 'joao@email.com',
    phone_number: '11988888888',
    first_name: 'João Atualizado',
    last_name: 'Silva',
    profile_picture: 'https://cdn.example.com/avatar.png',
    active: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (validateId as jest.Mock).mockReturnValue('abc123');
    (validateSchema as jest.Mock).mockReturnValue(mockValidatedData);
    (UserService.prototype.updateUser as jest.Mock).mockResolvedValue(mockUserResponse);
  });

  it('deve validar o id, dados, atualizar usuário e retornar 200 com o usuário atualizado', async () => {
    await updateUser(mockReq, mockRes as Response);

    expect(validateId).toHaveBeenCalledWith(mockReq);
    expect(validateSchema).toHaveBeenCalledWith(expect.anything(), mockReq.body);
    expect(UserService.prototype.updateUser).toHaveBeenCalledWith('abc123', mockValidatedData);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUserResponse);
  });

  it('deve lançar ForbiddenAccessError se id for inválido', async () => {
    (validateId as jest.Mock).mockImplementation(() => {
      throw new ForbiddenAccessError();
    });

    await expect(updateUser(mockReq, mockRes as Response)).rejects.toBeInstanceOf(ForbiddenAccessError);
    expect(UserService.prototype.updateUser).not.toHaveBeenCalled();
  });
});


describe('deleteUser controller', () => {
  const mockReq = {
    params: { id: 'abc123' },
    auth: { userId: 'abc123' }
  } as unknown as Request;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  } as Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    (validateId as jest.Mock).mockReturnValue('abc123');
    (UserService.prototype.deleteUser as jest.Mock).mockResolvedValue(undefined);
  });

  it('deve validar o id, deletar o usuário e retornar status 204', async () => {
    await deleteUser(mockReq, mockRes as Response);

    expect(validateId).toHaveBeenCalledWith(mockReq);
    expect(UserService.prototype.deleteUser).toHaveBeenCalledWith('abc123');
    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalled();
  });

  it('deve lançar ForbiddenAccessError se id for inválido', async () => {
    (validateId as jest.Mock).mockImplementation(() => {
      throw new ForbiddenAccessError();
    });

    await expect(deleteUser(mockReq, mockRes as Response)).rejects.toBeInstanceOf(ForbiddenAccessError);
    expect(UserService.prototype.deleteUser).not.toHaveBeenCalled();
  });
});