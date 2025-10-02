import { Request, Response} from "express";
import { UserService } from './user.service';
import { CreateUserSchema} from "./dto/CreateUserDto";
import { validateSchema, validateId } from "../../utils/validateRequest";
import { UpdateUserSchema } from "./dto/UpdateUserDto";

const userService = new UserService;

export async function createUser(req: Request, res: Response) {

    const userData = validateSchema(CreateUserSchema, req.body);
    const userDb = await userService.createUser(userData);
    return res.status(201).json(userDb);
}

export async function getUserById(req: Request, res: Response){

    const {id} = req.params;
    const userDb = await userService.getUserById(id);
    return res.status(200).json(userDb);
}

export async function updateUser(req:Request, res: Response){
    
    const id =  validateId(req);
    const userData = validateSchema(UpdateUserSchema, req.body);
    const userUpdated = await userService.updateUser(id, userData);
    return res.status(200).json(userUpdated);
}

export async function deleteUser(req: Request, res:Response){
    const id = validateId(req);
    await userService.deleteUser(id);
    return res.status(204).send();
}