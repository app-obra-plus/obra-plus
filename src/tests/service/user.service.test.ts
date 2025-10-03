import { UserService } from '../../modules/users/user.service';
import bcrypt from 'bcrypt';
import { prisma } from '../../database/client';
import { UserMapper } from '../../modules/users/dto/mapper/UserMapper';
import { CreateUserDto } from '../../modules/users/dto/CreateUserDto';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';
import { UserResponseDto } from '../../modules/users/dto/UserResponseDto';
import { UpdateUserDto } from '../../modules/users/dto/UpdateUserDto';
import * as AuthUtils from '../../modules/auth/utils/authUtils';

jest.mock('bcrypt');
jest.mock('../../modules/users/dto/mapper/UserMapper');
jest.mock('../../database/client', () => ({
  prisma: {
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
  }
}));
jest.mock('../../modules/auth/utils/authUtils');


describe('UserService.createUser', () => {
  const userService = new UserService();

  const mockUserData: CreateUserDto = {
    email: 'teste@email.com',
    password: 'senha123',
    first_name: 'Teste',
    last_name: 'Usuario',
    phone_number: '11999999999'
  };

  const hashedPassword = 'hashed_password';

  const prismaUserMock = {
    id: 'user-id',
    email: mockUserData.email,
    password: hashedPassword,
    first_name: mockUserData.first_name,
    last_name: mockUserData.last_name,
    phone_number: mockUserData.phone_number,
    profile_picture: null,
    active: true
  };
const jwtToken = 'jwt.token.aqui';
const userResponseMock = {
  id: 'user-id',
  email: mockUserData.email,
  first_name: mockUserData.first_name,
  last_name: mockUserData.last_name,
  phone_number: mockUserData.phone_number,
  profile_picture: null,
  active: true
};

  beforeEach(() => {
    jest.clearAllMocks();
    (AuthUtils.generateLoginResponse as jest.Mock).mockReturnValue({
      token: 'jwt.token.aqui',
      user: userResponseMock,
    });
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue(prismaUserMock);
    (UserMapper.toResponseDto as jest.Mock).mockReturnValue(userResponseMock);
   
  });


it('deve criar usuário com senha hashed e retornar token e DTO', async () => {
  const result = await userService.createUser({ ...mockUserData });

  expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
  expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 'salt');
  expect(prisma.user.create).toHaveBeenCalledWith({
    data: {
      ...mockUserData,
      password: hashedPassword,
    }
  });
  expect(AuthUtils.generateLoginResponse).toHaveBeenCalledWith(prismaUserMock);

  expect(result).toEqual({
    token: jwtToken,
    user: userResponseMock
  });
});
});


describe('UserService.getUserById', () => {
  const userService = new UserService();

  const mockUserDb = {
    id: 'user-id',
    email: 'teste@email.com',
    password: 'hashedpassword',
    first_name: 'Teste',
    last_name: 'Usuário',
    phone_number: '11999999999',
    profile_picture: null,
    active: true,
  };

  const mockUserResponse: UserResponseDto = {
    id: 'user-id',
    email: 'teste@email.com',
    first_name: 'Teste',
    last_name: 'Usuário',
    phone_number: '11999999999',
    profile_picture: null,
   
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o usuário quando encontrado', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserDb);
    (UserMapper.toResponseDto as jest.Mock).mockReturnValue(mockUserResponse);

    const result = await userService.getUserById('user-id');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id', isDeleted : false},
    });
    expect(UserMapper.toResponseDto).toHaveBeenCalledWith(mockUserDb);
    expect(result).toEqual(mockUserResponse);
  });

  it('deve lançar EntityNotFoundError quando usuário não encontrado', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUserById('user-id')).rejects.toThrow(EntityNotFoundError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id', isDeleted : false},
    });
  });
});



describe('UserService.updateUser', () => {
  const userService = new UserService();

  const userId = 'user-id';
  const userUpdate: UpdateUserDto = {
    first_name: 'NovoNome',
    last_name: 'NovoSobrenome',
    phone_number: '11988888888',
  };

  const updatedUserDb = {
    id: userId,
    email: 'teste@email.com',
    first_name: 'NovoNome',
    last_name: 'NovoSobrenome',
    phone_number: '11988888888',
    profile_picture: null,
    active: true,
  };

  const userResponseMock: UserResponseDto = {
    id: userId,
    email: 'teste@email.com',
    first_name: 'NovoNome',
    last_name: 'NovoSobrenome',
    phone_number: '11988888888',
    profile_picture: null,

  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(userService, 'getUserById').mockResolvedValue(userResponseMock);
  });

  it('deve atualizar o usuário e retornar o DTO atualizado', async () => {
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUserDb);
    (UserMapper.toResponseDto as jest.Mock).mockReturnValue(userResponseMock);

    const result = await userService.updateUser(userId, userUpdate);

    expect(userService.getUserById).toHaveBeenCalledWith(userId);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: userUpdate,
    });
    expect(UserMapper.toResponseDto).toHaveBeenCalledWith(updatedUserDb);
    expect(result).toEqual(userResponseMock);
  });
});


describe('UserService.deleteUser', () => {
  const userService = new UserService();
  const userId = 'user-id';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(userService, 'getUserById').mockResolvedValue({
        id: 'user-id',
        email: 'user@email.com',
        first_name: 'João',
        last_name: 'Silva',
        phone_number: '11999999999',
        profile_picture: null,
        active: true
        } as UserResponseDto);
  });

  it('deve chamar getUserById e prisma.user.delete', async () => {
    (prisma.user.delete as jest.Mock).mockResolvedValue(undefined);

    await userService.deleteUser(userId);

    expect(userService.getUserById).toHaveBeenCalledWith(userId);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('deve propagar erro de getUserById se usuário não existir', async () => {
    const error = new EntityNotFoundError
    jest.spyOn(userService, 'getUserById').mockRejectedValue(error);

    await expect(userService.deleteUser(userId)).rejects.toThrow(error);

    expect(userService.getUserById).toHaveBeenCalledWith(userId);
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });
});