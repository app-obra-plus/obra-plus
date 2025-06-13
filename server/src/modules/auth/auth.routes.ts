import {Router, Request, Response} from 'express';
import { login } from './auth.controller';

const JWT_SECRET = process.env.JWT_SECRET;
const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    await login(req, res);
})
 
export default router; 