import { CreateUserDto } from "./dto/CreateUserDto";
import {prisma} from '../../database/client'
import { UserResponseDto } from "./dto/UserResponseDto";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../../exception/BadRequestError";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";

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
}