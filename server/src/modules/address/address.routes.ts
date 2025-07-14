import {Router, Request, Response} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { createAddress, deleteAddress, getAddress, getAllAddress, updateAddress} from './address.controller';

const router = Router();

router.get('/',authMiddleware,async (req: Request, res: Response) => {
    await createAddress(req, res);
});

router.get('/:addressId ',authMiddleware,async (req: Request, res: Response) => {
    await getAddress(req, res);
});

router.get('/user/:userId',authMiddleware,async (req: Request, res: Response) => {
    await getAllAddress(req, res);
});

router.put('/:addressId',authMiddleware,async (req: Request, res: Response) => {
    await updateAddress(req, res);
});

router.delete('/:addressId',authMiddleware,async (req: Request, res: Response) => {
    await deleteAddress(req, res);
});
export default router; 