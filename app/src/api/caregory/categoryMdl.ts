import { ModeloBase } from "../ModeloBase";
import { CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "./categorySch";

class CategoryMdl extends ModeloBase<CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto> {
  constructor() {
    super("/categories");
  }
}

export default new CategoryMdl();