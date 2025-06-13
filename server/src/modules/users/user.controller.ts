import { Request, Response} from "express";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/CreateUserDto";



const userService = new UserService;

export async function createUser(req: Request, res: Response) {

    const user: CreateUserDto = req.body;
    const userDb = await userService.createUser(user);
    return res.status(201).json(userDb);
}

export async function getUserById(req: Request, res: Response){

    const {id} = req.params;
    const userDb = await userService.getUserById(id);
    return res.status(200).json(userDb);
}

export async function updateUser(req:Request, res: Response){

    const {id} = req.params;
    const user = req.body;
    const userUpdated = await userService.updateUser(id, user);
    return res.status(200).json(userUpdated);
}