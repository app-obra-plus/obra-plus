import { CategoryMapper } from '../../modules/category/dto/mapper/CategoryMapper';
import { Category } from '../../generated/prisma';
import { CategoryResponseDto } from '../../modules/category/dto/ResponseCategoryDto';

describe('CategoryMapper', () => {
  describe('toResponseDto', () => {
    it('deve converter Category para CategoryResponseDto corretamente', () => {
      const category: Category = {
        id: 'cat-001',
        name: 'Materiais de Construção',
        description: 'Materiais diversos para obras',
        created_at: new Date('2025-01-01'),
        updated_at: new Date('2025-01-02'),
      };

      const expectedDto: CategoryResponseDto = {
        id: 'cat-001',
        name: 'Materiais de Construção',
        description: 'Materiais diversos para obras',
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result).toEqual(expectedDto);
    });

    it('deve incluir todos os campos obrigatórios', () => {
      const category: Category = {
        id: 'cat-002',
        name: 'Ferramentas',
        description: 'Ferramentas para uso em obras',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
    });

    it('não deve incluir created_at e updated_at no DTO', () => {
      const category: Category = {
        id: 'cat-003',
        name: 'Elétrica',
        description: 'Materiais elétricos',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result).not.toHaveProperty('created_at');
      expect(result).not.toHaveProperty('updated_at');
    });

    it('deve preservar o valor exato dos campos', () => {
      const category: Category = {
        id: 'unique-id-123',
        name: 'Nome Específico',
        description: 'Descrição Específica com caracteres especiais: áéíóú',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result.id).toBe('unique-id-123');
      expect(result.name).toBe('Nome Específico');
      expect(result.description).toBe('Descrição Específica com caracteres especiais: áéíóú');
    });

    it('deve mapear categoria com nome longo', () => {
      const longName = 'A'.repeat(255);
      const category: Category = {
        id: 'cat-long',
        name: longName,
        description: 'Descrição padrão',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result.name).toBe(longName);
      expect(result.name.length).toBe(255);
    });

    it('deve mapear categoria com descrição longa', () => {
      const longDescription = 'B'.repeat(1000);
      const category: Category = {
        id: 'cat-long-desc',
        name: 'Nome',
        description: longDescription,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = CategoryMapper.toResponseDto(category);

      expect(result.description).toBe(longDescription);
      expect(result.description.length).toBe(1000);
    });

    it('deve mapear múltiplas categorias de forma independente', () => {
      const category1: Category = {
        id: 'cat-1',
        name: 'Categoria 1',
        description: 'Descrição 1',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const category2: Category = {
        id: 'cat-2',
        name: 'Categoria 2',
        description: 'Descrição 2',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result1 = CategoryMapper.toResponseDto(category1);
      const result2 = CategoryMapper.toResponseDto(category2);

      expect(result1.id).toBe('cat-1');
      expect(result2.id).toBe('cat-2');
      expect(result1.name).not.toBe(result2.name);
    });
  });
});

