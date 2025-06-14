import {prisma} from '../../database/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { InvalidCredentialsError } from "../../exception/InvalidCredentialsError";
import { LoginResponseDto } from './dto/LoginResponseDto';
import { LoginDto } from './dto/LoginDto';

const EXPIRE_TOKEN = '10m'; 

export class AuthService {

    async login(userInfo:LoginDto) {
        const user = await prisma.user.findUnique({ where: { email: userInfo.email, active:true} });

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsError();
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET não foi definida no .env');
        }

        const token:LoginResponseDto = {
            token:jwt.sign({sub: user.id, email:user.email}, JWT_SECRET, {expiresIn:EXPIRE_TOKEN})
        } 

        return token;
    }
}