import { Category } from "../../../../generated/prisma";
import { CategoryResponseDto } from "../CategoryResponseDto";

export class CategoryMapper{
    static toResponseDto(category: Category): CategoryResponseDto {
        const dto: CategoryResponseDto ={
            id: category.id,
            name: category.name,
            description: category.description
        }
        return(dto);
    }
}