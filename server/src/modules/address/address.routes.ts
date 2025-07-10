import {Router, Request, Response} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { createAddress } from './address.controller';

const router = Router();

router.get('/',authMiddleware,async (req: Request, res: Response) => {
    await createAddress(req, res);
});
export default router; 