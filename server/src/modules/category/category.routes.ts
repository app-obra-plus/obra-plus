import {Router, Request, Response} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { createCategory, getCategoryById, getAllCategories, deleteCategory, updateCategory } from './category.controller';

const router = Router();

router.post('/',authMiddleware,async (req: Request, res: Response) => {
    await createCategory(req, res);
});

router.get('/:categoryId',authMiddleware,async (req: Request, res: Response) => {
    await getCategoryById(req, res);
});

router.get('/',authMiddleware,async (req: Request, res: Response) => {
    await getAllCategories(req, res);
});

router.put('/:categoryId',authMiddleware,async (req: Request, res: Response) => {
    await updateCategory(req, res);
});

router.delete('/:categoryId', authMiddleware, async (req: Request, res: Response) => {
  await deleteCategory(req, res);
});

export default router; 