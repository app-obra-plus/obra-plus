import { User } from '../../../../generated/prisma';
import { UserResponseDto } from '../UserResponseDto';

export class UserMapper{
    static toResponseDto(user: User): UserResponseDto{
       const dto: UserResponseDto = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture ?? undefined,
        }

        return(dto)
    }
}