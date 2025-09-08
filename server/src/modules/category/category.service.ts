import { prisma } from "../../database/client";
import { EntityNotFoundError } from "../../exception/EntityNotFoundError";
import { CategoryResponseDto } from "./dto/ResponseCategoryDto";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/CreateCategoryDto";
import { CategoryMapper } from "./dto/mapper/CategoryMapper";

export class CategoryService {
  async createCategory(data: CreateCategoryDto) {
    const categoryDb = await prisma.category.create({ data });
    const categoryResponse = CategoryMapper.toResponseDto(categoryDb);
    return categoryResponse;
  }

  async getCategoryById(categoryId: string) {
    const categoryDb = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryDb) {
      throw new EntityNotFoundError("Categoria", categoryId);
    }

    const categoryResponse: CategoryResponseDto =
      CategoryMapper.toResponseDto(categoryDb);
    return categoryResponse;
  }

  async getAllCategories() {
    const categories = await prisma.category.findMany();
    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        description: category.description,
      };
    });
  }

  async updateCategory(categoryId: string, categoryUpdate: UpdateCategoryDto) {
    await this.getCategoryById(categoryId);
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: categoryUpdate,
    });

    const response = CategoryMapper.toResponseDto(updatedCategory);
    return response;
  }

  async deleteCategory(categoryId: string) {
    await this.getCategoryById(categoryId);
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
