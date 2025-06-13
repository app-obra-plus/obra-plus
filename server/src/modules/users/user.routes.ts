import {Router, Request, Response} from 'express';
import { createUser, getUserById} from './user.controller';
import authMiddleware from '../../middlewares/authMiddleware';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res);
});

router.get('/:id', authMiddleware,async (req: Request, res: Response) => {
    await getUserById(req, res);
});
export default router; 