import { Request, Response } from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../../modules/category/category.controller';
import * as categoryModule from '../../modules/category/category.service';
import { validateSchema } from '../../utils/validateRequest';

jest.mock('../../modules/category/category.service');
jest.mock('../../utils/validateRequest');

const mockRes = () => {
  const res = {} as Partial<Response>;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  res.send = jest.fn();
  return res as Response;
};

describe('CategoryController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('deve validar dados, criar categoria e retornar 200', async () => {
      const req = {
        body: {
          name: 'Materiais de Construção',
          description: 'Materiais diversos para obras',
        },
      } as Request;

      const res = mockRes();

      const validatedDto = { ...req.body };
      const mockResponse = {
        id: 'cat-001',
        name: 'Materiais de Construção',
        description: 'Materiais diversos para obras',
      };

      (validateSchema as jest.Mock).mockReturnValue(validatedDto);

      const createCategoryMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'createCategory')
        .mockResolvedValue(mockResponse);

      await createCategory(req, res);

      expect(validateSchema).toHaveBeenCalledWith(expect.anything(), req.body);
      expect(createCategoryMock).toHaveBeenCalledWith(validatedDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);

      createCategoryMock.mockRestore();
    });

    it('deve validar com CreateCategorySchema', async () => {
      const req = {
        body: {
          name: 'Ferramentas',
          description: 'Ferramentas para construção',
        },
      } as Request;

      const res = mockRes();

      (validateSchema as jest.Mock).mockReturnValue(req.body);

      jest
        .spyOn(categoryModule.CategoryService.prototype, 'createCategory')
        .mockResolvedValue({ id: 'cat-001', ...req.body });

      await createCategory(req, res);

      expect(validateSchema).toHaveBeenCalled();
      const schemaArg = (validateSchema as jest.Mock).mock.calls[0][0];
      expect(schemaArg).toBeDefined();
    });
  });

  describe('getAllCategories', () => {
    it('deve retornar todas as categorias com status 200', async () => {
      const req = {} as Request;
      const res = mockRes();

      const mockCategories = [
        {
          id: 'cat-001',
          name: 'Materiais',
          description: 'Materiais de construção',
        },
        {
          id: 'cat-002',
          name: 'Ferramentas',
          description: 'Ferramentas diversas',
        },
      ];

      const getAllCategoriesMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'getAllCategories')
        .mockResolvedValue(mockCategories);

      await getAllCategories(req, res);

      expect(getAllCategoriesMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);

      getAllCategoriesMock.mockRestore();
    });

    it('deve retornar array vazio se não houver categorias', async () => {
      const req = {} as Request;
      const res = mockRes();

      const getAllCategoriesMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'getAllCategories')
        .mockResolvedValue([]);

      await getAllCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);

      getAllCategoriesMock.mockRestore();
    });
  });

  describe('getCategoryById', () => {
    it('deve retornar categoria por ID com status 200', async () => {
      const req = {
        params: { categoryId: 'cat-001' },
      } as unknown as Request;

      const res = mockRes();

      const mockCategory = {
        id: 'cat-001',
        name: 'Materiais',
        description: 'Materiais de construção',
      };

      const getCategoryByIdMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'getCategoryById')
        .mockResolvedValue(mockCategory);

      await getCategoryById(req, res);

      expect(getCategoryByIdMock).toHaveBeenCalledWith('cat-001');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategory);

      getCategoryByIdMock.mockRestore();
    });

    it('deve usar o categoryId dos params', async () => {
      const req = {
        params: { categoryId: 'cat-specific-id' },
      } as unknown as Request;

      const res = mockRes();

      const getCategoryByIdMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'getCategoryById')
        .mockResolvedValue({
          id: 'cat-specific-id',
          name: 'Test',
          description: 'Test Description',
        });

      await getCategoryById(req, res);

      expect(getCategoryByIdMock).toHaveBeenCalledWith('cat-specific-id');

      getCategoryByIdMock.mockRestore();
    });
  });

  describe('updateCategory', () => {
    it('deve atualizar categoria e retornar 200', async () => {
      const req = {
        params: { categoryId: 'cat-001' },
        body: {
          name: 'Nome Atualizado',
          description: 'Descrição Atualizada',
        },
      } as unknown as Request;

      const res = mockRes();

      const mockUpdatedCategory = {
        id: 'cat-001',
        name: 'Nome Atualizado',
        description: 'Descrição Atualizada',
      };

      const updateCategoryMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'updateCategory')
        .mockResolvedValue(mockUpdatedCategory);

      await updateCategory(req, res);

      expect(updateCategoryMock).toHaveBeenCalledWith('cat-001', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedCategory);

      updateCategoryMock.mockRestore();
    });

    it('deve permitir atualização parcial', async () => {
      const req = {
        params: { categoryId: 'cat-001' },
        body: { name: 'Apenas Nome Novo' },
      } as unknown as Request;

      const res = mockRes();

      const updateCategoryMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'updateCategory')
        .mockResolvedValue({
          id: 'cat-001',
          name: 'Apenas Nome Novo',
          description: 'Descrição antiga',
        });

      await updateCategory(req, res);

      expect(updateCategoryMock).toHaveBeenCalledWith('cat-001', {
        name: 'Apenas Nome Novo',
      });

      updateCategoryMock.mockRestore();
    });
  });

  describe('deleteCategory', () => {
    it('deve deletar categoria e retornar 204', async () => {
      const req = {
        params: { categoryId: 'cat-001' },
      } as unknown as Request;

      const res = mockRes();

      const deleteCategoryMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'deleteCategory')
        .mockResolvedValue(undefined);

      await deleteCategory(req, res);

      expect(deleteCategoryMock).toHaveBeenCalledWith('cat-001');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();

      deleteCategoryMock.mockRestore();
    });

    it('deve usar o categoryId correto', async () => {
      const req = {
        params: { categoryId: 'cat-to-delete' },
      } as unknown as Request;

      const res = mockRes();

      const deleteCategoryMock = jest
        .spyOn(categoryModule.CategoryService.prototype, 'deleteCategory')
        .mockResolvedValue(undefined);

      await deleteCategory(req, res);

      expect(deleteCategoryMock).toHaveBeenCalledWith('cat-to-delete');

      deleteCategoryMock.mockRestore();
    });
  });
});

