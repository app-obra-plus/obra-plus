import { CategoryService } from '../../modules/category/category.service';
import { prisma } from '../../database/client';
import { CategoryMapper } from '../../modules/category/dto/mapper/CategoryMapper';
import { CreateCategoryDto, UpdateCategoryDto } from '../../modules/category/dto/CreateCategoryDto';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';

jest.mock('../../database/client', () => ({
  prisma: {
    category: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('../../modules/category/dto/mapper/CategoryMapper', () => ({
  CategoryMapper: {
    toResponseDto: jest.fn(),
  },
}));

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const mockCategory = {
    id: 'cat-001',
    name: 'Materiais de Construção',
    description: 'Materiais diversos para construção civil',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockCategoryDto = {
    id: 'cat-001',
    name: 'Materiais de Construção',
    description: 'Materiais diversos para construção civil',
  };

  beforeEach(() => {
    categoryService = new CategoryService();
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('deve criar uma categoria com sucesso', async () => {
      const createDto: CreateCategoryDto = {
        name: 'Materiais de Construção',
        description: 'Materiais diversos para construção civil',
      };

      (prisma.category.create as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      const result = await categoryService.createCategory(createDto);

      expect(prisma.category.create).toHaveBeenCalledWith({ data: createDto });
      expect(CategoryMapper.toResponseDto).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategoryDto);
    });

    it('deve chamar o Prisma com os dados corretos', async () => {
      const createDto: CreateCategoryDto = {
        name: 'Ferramentas',
        description: 'Ferramentas para uso em obras',
      };

      (prisma.category.create as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      await categoryService.createCategory(createDto);

      expect(prisma.category.create).toHaveBeenCalledWith({
        data: {
          name: 'Ferramentas',
          description: 'Ferramentas para uso em obras',
        },
      });
    });
  });

  describe('getCategoryById', () => {
    it('deve retornar uma categoria por ID', async () => {
      const categoryId = 'cat-001';

      (prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      const result = await categoryService.getCategoryById(categoryId);

      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
      expect(CategoryMapper.toResponseDto).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategoryDto);
    });

    it('deve lançar EntityNotFoundError se categoria não existir', async () => {
      const categoryId = 'cat-inexistente';

      (prisma.category.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(categoryService.getCategoryById(categoryId)).rejects.toThrow(
        EntityNotFoundError
      );
      await expect(categoryService.getCategoryById(categoryId)).rejects.toThrow(
        'Categoria'
      );
    });

    it('deve buscar com o ID correto', async () => {
      const categoryId = 'cat-123';

      (prisma.category.findUnique as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      await categoryService.getCategoryById(categoryId);

      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: 'cat-123' },
      });
    });
  });

  describe('getAllCategories', () => {
    it('deve retornar todas as categorias', async () => {
      const mockCategories = [
        mockCategory,
        {
          id: 'cat-002',
          name: 'Ferramentas',
          description: 'Ferramentas diversas',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'cat-003',
          name: 'Elétrica',
          description: 'Materiais elétricos',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

      const result = await categoryService.getAllCategories();

      expect(prisma.category.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: 'cat-001',
        name: 'Materiais de Construção',
        description: 'Materiais diversos para construção civil',
      });
      expect(result[1]).toEqual({
        id: 'cat-002',
        name: 'Ferramentas',
        description: 'Ferramentas diversas',
      });
    });

    it('deve retornar array vazio quando não houver categorias', async () => {
      (prisma.category.findMany as jest.Mock).mockResolvedValue([]);

      const result = await categoryService.getAllCategories();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('deve retornar apenas id, name e description', async () => {
      const mockCategories = [mockCategory];
      (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

      const result = await categoryService.getAllCategories();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).not.toHaveProperty('created_at');
      expect(result[0]).not.toHaveProperty('updated_at');
    });
  });

  describe('updateCategory', () => {
    it('deve atualizar uma categoria com sucesso', async () => {
      const categoryId = 'cat-001';
      const updateDto: UpdateCategoryDto = {
        name: 'Materiais Atualizados',
        description: 'Nova descrição',
      };

      const updatedCategory = {
        ...mockCategory,
        name: 'Materiais Atualizados',
        description: 'Nova descrição',
      };

      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(mockCategoryDto);
      (prisma.category.update as jest.Mock).mockResolvedValue(updatedCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue({
        id: categoryId,
        name: 'Materiais Atualizados',
        description: 'Nova descrição',
      });

      const result = await categoryService.updateCategory(categoryId, updateDto);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith(categoryId);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: categoryId },
        data: updateDto,
      });
      expect(result.name).toBe('Materiais Atualizados');
    });

    it('deve permitir atualização parcial (apenas name)', async () => {
      const categoryId = 'cat-001';
      const updateDto: UpdateCategoryDto = {
        name: 'Novo Nome',
      };

      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(mockCategoryDto);
      (prisma.category.update as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      await categoryService.updateCategory(categoryId, updateDto);

      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: categoryId },
        data: { name: 'Novo Nome' },
      });
    });

    it('deve permitir atualização parcial (apenas description)', async () => {
      const categoryId = 'cat-001';
      const updateDto: UpdateCategoryDto = {
        description: 'Nova descrição atualizada',
      };

      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(mockCategoryDto);
      (prisma.category.update as jest.Mock).mockResolvedValue(mockCategory);
      (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryDto);

      await categoryService.updateCategory(categoryId, updateDto);

      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: categoryId },
        data: { description: 'Nova descrição atualizada' },
      });
    });

    it('deve verificar se categoria existe antes de atualizar', async () => {
      const categoryId = 'cat-inexistente';
      const updateDto: UpdateCategoryDto = { name: 'Nome' };

      jest.spyOn(categoryService, 'getCategoryById').mockRejectedValue(
        new EntityNotFoundError('Categoria', categoryId)
      );

      await expect(
        categoryService.updateCategory(categoryId, updateDto)
      ).rejects.toThrow(EntityNotFoundError);

      expect(prisma.category.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteCategory', () => {
    it('deve deletar uma categoria com sucesso', async () => {
      const categoryId = 'cat-001';

      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(mockCategoryDto);
      (prisma.category.delete as jest.Mock).mockResolvedValue(mockCategory);

      await categoryService.deleteCategory(categoryId);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith(categoryId);
      expect(prisma.category.delete).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });

    it('deve verificar se categoria existe antes de deletar', async () => {
      const categoryId = 'cat-inexistente';

      jest.spyOn(categoryService, 'getCategoryById').mockRejectedValue(
        new EntityNotFoundError('Categoria', categoryId)
      );

      await expect(categoryService.deleteCategory(categoryId)).rejects.toThrow(
        EntityNotFoundError
      );

      expect(prisma.category.delete).not.toHaveBeenCalled();
    });

    it('deve retornar void (undefined) ao deletar', async () => {
      const categoryId = 'cat-001';

      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(mockCategoryDto);
      (prisma.category.delete as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.deleteCategory(categoryId);

      expect(result).toBeUndefined();
    });
  });
});

