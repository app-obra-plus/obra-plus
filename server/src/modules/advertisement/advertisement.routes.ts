import {Router, Request, Response} from 'express';
import { createAdvertisement, getAdvertisementById, updateAdvertisement, getAdvertisementGridFilter} from './advertisement.controller';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware,  async (req: Request, res: Response) => {
    await createAdvertisement(req, res);
})

router.get('/grid', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementGridFilter(req, res);
})

router.get('/:id', authMiddleware,  async (req: Request, res: Response) => {
    await getAdvertisementById(req, res);
})

router.put('/:id', authMiddleware,  async (req: Request, res: Response) => {
    await updateAdvertisement(req, res);
})

export default router; 