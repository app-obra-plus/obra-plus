import { CreateUserDto } from "./dto/CreateUserDto";
import {prisma} from '../../database/client'
import { UserResponseDto } from "./dto/UserResponseDto";
import bcrypt from 'bcrypt';

import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { UpdateUserDto } from "./dto/UpdateUserDto";

export class UserService {

    async createUser(data: CreateUserDto){

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);
        data.password = hashPassword;

        const user = await prisma.user.create({data,});
        const userResponse: UserResponseDto = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_picture: user.profile_picture ?? undefined,
            active: user.active,
        };

        return userResponse;
       
    }

    async getUserById(id: string){

        const userDb = await prisma.user.findUnique({
            where: {
                id:id
            }
        })
        
        if(!userDb){
            throw new EntityNotFoundError("Usuário", id);
        }
        return userDb;
    } 

    async updateUser(id: string, userUpdate: UpdateUserDto){

        await this.getUserById(id);

        const updatedUser = await prisma.user.update({
            where: { id },
            data: userUpdate,
        });

        const userResponse: UserResponseDto = {
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            profile_picture: updatedUser.profile_picture ?? undefined,
            active: updatedUser.active,
        };

        return userResponse;
    }
}