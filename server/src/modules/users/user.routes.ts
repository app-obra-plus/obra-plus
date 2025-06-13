import {Router, Request, Response} from 'express';
import { createUser, getUserById, updateUser} from './user.controller';
import authMiddleware from '../../middlewares/authMiddleware';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res);
});

router.get('/:id', authMiddleware,async (req: Request, res: Response) => {
    await getUserById(req, res);
});

router.put('/:id',authMiddleware, async (req: Request, res: Response) => {
    await updateUser(req, res);
} )
export default router; 