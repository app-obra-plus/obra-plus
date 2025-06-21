import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const authService = new AuthService;


export async function login(req: Request, res: Response) {
    const userInfo = req.body ;
    const user = await authService.login(userInfo); 
    return res.status(200).json(user); 
}
