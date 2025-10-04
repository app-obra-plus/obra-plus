import { CreateUserDto } from "./dto/CreateUserDto";
import {prisma} from '../../database/client'
import { UserResponseDto } from "./dto/UserResponseDto";
import bcrypt from 'bcrypt';
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { UserMapper } from "./dto/mapper/UserMapper";
import { generateLoginResponse } from "../auth/utils/authUtils";
import { BadRequestError } from "../../exception/BadRequestError";
import { ImageService } from "../../infra/blob/image.service";
import { PutBlobResult } from "@vercel/blob";

export class UserService {
    
    private readonly imageService = new ImageService();

    async createUser(data: CreateUserDto){ 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);      
        data.password = hashPassword;
        const user = await prisma.user.create({data,});
        const response = generateLoginResponse(user)
        return response;
    }

    async getUserById(id: string){

        const userDb = await prisma.user.findUnique({
            where: {
                id:id,
                isDeleted:false
            }
        })

        if(!userDb){
            throw new EntityNotFoundError("Usuário", id);
        }

        const userResponse: UserResponseDto =  UserMapper.toResponseDto(userDb);
        return userResponse;
    } 

    async updateUser(id: string, userUpdate: UpdateUserDto){

        await this.getUserById(id);

        const updatedUser = await prisma.user.update({
            where: { id:id },
            data: userUpdate,
        });

        const userResponse: UserResponseDto = UserMapper.toResponseDto(updatedUser);

        return userResponse;
    }

    async deleteUser(id: string){
        await this.getUserById(id);
        await prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

    async uploadUserImage(userId: string, file: Express.Multer.File): Promise<PutBlobResult>{

        const uploadedImage: PutBlobResult = await this.imageService.upload(`profile`, file);
        const url = uploadedImage.url;
        
        await this.updateUser(userId, {profile_picture: url});

        return uploadedImage

    }

    async deleteUserImage(userId: string){
 
        const userDb = await this.getUserById(userId);
        const url = userDb.profile_picture;

        if(!url){
            throw new BadRequestError("Imagem não encontrada");
        }

        const pathName = this.imageService.extractPath(url)

        await this.imageService.deleteBlob(pathName);

    }
}