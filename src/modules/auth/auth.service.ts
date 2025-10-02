import {prisma} from '../../database/client'
import bcrypt from 'bcrypt';
import { InvalidCredentialsError } from "../../exception/InvalidCredentialsError";
import { LoginResponseDto } from './dto/LoginResponseDto';
import { LoginDto } from './dto/LoginDto';
import { UserService } from '../users/user.service';
import { generateLoginResponse } from './utils/authUtils';

export class AuthService {

    userService = new UserService();

    async login(userInfo:LoginDto):Promise<LoginResponseDto> {
        const user = await prisma.user.findUnique({ where: { email: userInfo.email, isDeleted:false} });

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsError();
        }

        return generateLoginResponse(user);
    }
}