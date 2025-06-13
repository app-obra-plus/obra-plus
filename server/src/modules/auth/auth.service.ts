import {prisma} from '../../database/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { InvalidCredentialsError } from "../../exception/InvalidCredentialsError";

const EXPIRE_TOKEN = '1m'; // 1 min

export class AuthService {

    async login(userInfo:any) {
        const user = await prisma.user.findUnique({ where: { email: userInfo.email } });

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

        const token = jwt.sign({id: user.id, email:user.email}, JWT_SECRET, {expiresIn:EXPIRE_TOKEN})

        return token;
    }
}