import { validateSchema } from "../../utils/validateRequest";
import { CategoryService } from "./category.service";
import { Request, Response} from "express";
import { CreateCategorySchema } from "./dto/CreateCategoryDto";

const categoryService = new CategoryService;

export async function createCategory(req: Request, res:Response){

    const categoryData = validateSchema(CreateCategorySchema, req.body);
    const category = await categoryService.createCategory(categoryData);
    return res.status(200).json(category);
}

export async function getAllCategories(res:Response){

    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
}

export async function updateCategory(req: Request, res:Response){
    const {categoryId} = req.params;
    const category = req.body;
    const categoryUpdated = await categoryService.updateCategory(categoryId,category);
    return res.status(200).json(categoryUpdated);
}

export async function deleteCategory(req: Request, res:Response){
    const {categoryId} = req.params;
    categoryService.deleteCategory(categoryId);
    return res.status(204).send();
}

export async function getCategoryById(req: Request, res:Response){
    const {categoryId} = req.params;
    const category = categoryService.getCategoryById(categoryId);
    return res.status(200).json(category);
}

