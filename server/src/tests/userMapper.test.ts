import { UserMapper } from "../modules/users/dto/mapper/UserMapper";
import { User } from "../generated/prisma";
import { UserResponseDto } from "../modules/users/dto/UserResponseDto";


describe('UserMapper', () => {
  it('deve converter User para UserResponseDto corretamente (com profile_picture)', () => {
    const user: User = {
        id: '123',
        email: 'teste@email.com',
        first_name: 'João',
        last_name: 'Silva',
        phone_number: '+5511999999999',
        profile_picture: 'https://cdn.img.com/avatar.png',
        active: true,
        password: 'hash', 
        created_at: new Date(),
        updated_at: new Date(),
    };

    const expected: UserResponseDto = {
      id: '123',
      email: 'teste@email.com',
      first_name: 'João',
      last_name: 'Silva',
      phone_number: '+5511999999999',
      profile_picture: 'https://cdn.img.com/avatar.png',
      active: true
    };

    const result = UserMapper.toResponseDto(user);
    expect(result).toEqual(expected);
  });

  it('deve retornar undefined em profile_picture se for null no User', () => {
    const user = {
      id: '123',
      email: 'teste@email.com',
      first_name: 'João',
      last_name: 'Silva',
      phone_number: '+5511999999999',
      profile_picture: null,
      active: true,
      password: 'hash',
    } as unknown as User;

    const result = UserMapper.toResponseDto(user);
    expect(result.profile_picture).toBeUndefined();
  });
});
