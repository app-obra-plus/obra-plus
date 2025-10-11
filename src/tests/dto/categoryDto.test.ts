import { CreateCategorySchema, UpdateCategorySchema } from '../../modules/category/dto/CreateCategoryDto';

describe('CreateCategorySchema', () => {
  const validCategory = {
    name: 'Materiais de Construção',
    description: 'Materiais diversos para construção civil',
  };

  describe('Validações de Sucesso', () => {
    it('deve aceitar categoria válida completa', () => {
      const result = CreateCategorySchema.safeParse(validCategory);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome com 3 caracteres (mínimo)', () => {
      const category = {
        ...validCategory,
        name: 'abc',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome com 255 caracteres (máximo)', () => {
      const category = {
        ...validCategory,
        name: 'a'.repeat(255),
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar descrição com 10 caracteres (mínimo)', () => {
      const category = {
        ...validCategory,
        description: 'abcdefghij',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar descrição com 1000 caracteres (máximo)', () => {
      const category = {
        ...validCategory,
        description: 'a'.repeat(1000),
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome com acentos e caracteres especiais', () => {
      const category = {
        name: 'Elétrica & Hidráulica',
        description: 'Materiais de instalação elétrica e hidráulica',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar descrição com quebras de linha e pontuação', () => {
      const category = {
        name: 'Ferramentas',
        description: 'Ferramentas diversas:\n- Manuais\n- Elétricas\n- Pneumáticas',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome com números', () => {
      const category = {
        name: 'Categoria 123',
        description: 'Descrição da categoria 123',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de name', () => {
    it('deve rejeitar nome vazio', () => {
      const category = {
        ...validCategory,
        name: '',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar nome com menos de 3 caracteres', () => {
      const category = {
        ...validCategory,
        name: 'ab',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('mínimo 3 caracteres');
      }
    });

    it('deve rejeitar nome com mais de 255 caracteres', () => {
      const category = {
        ...validCategory,
        name: 'a'.repeat(256),
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('máximo 255 caracteres');
      }
    });

    it('deve rejeitar quando name está ausente', () => {
      const category = {
        description: 'Descrição válida',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar name como null', () => {
      const category = {
        name: null,
        description: 'Descrição válida',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar name como número', () => {
      const category = {
        name: 123,
        description: 'Descrição válida',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });
  });

  describe('Validações de description', () => {
    it('deve rejeitar descrição vazia', () => {
      const category = {
        ...validCategory,
        description: '',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar descrição com menos de 10 caracteres', () => {
      const category = {
        ...validCategory,
        description: 'abc',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('mínimo 10 caracteres');
      }
    });

    it('deve rejeitar descrição com 9 caracteres', () => {
      const category = {
        ...validCategory,
        description: 'abcdefghi',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar descrição com mais de 1000 caracteres', () => {
      const category = {
        ...validCategory,
        description: 'a'.repeat(1001),
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('máximo 1000 caracteres');
      }
    });

    it('deve rejeitar quando description está ausente', () => {
      const category = {
        name: 'Nome Válido',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar description como null', () => {
      const category = {
        name: 'Nome Válido',
        description: null,
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar description como número', () => {
      const category = {
        name: 'Nome Válido',
        description: 12345678910,
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
    });
  });

  describe('Validações Múltiplas', () => {
    it('deve rejeitar quando ambos os campos são inválidos', () => {
      const category = {
        name: 'ab',
        description: 'curta',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('deve rejeitar quando ambos os campos estão ausentes', () => {
      const category = {};
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBe(2);
      }
    });

    it('deve aceitar categoria com valores no limite', () => {
      const category = {
        name: 'abc',
        description: 'abcdefghij',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });
  });

  describe('Casos de Uso Reais', () => {
    it('deve aceitar categoria de Materiais de Construção', () => {
      const category = {
        name: 'Materiais de Construção',
        description: 'Cimento, areia, brita, tijolos, blocos, telhas e outros materiais básicos para construção civil.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar categoria de Ferramentas', () => {
      const category = {
        name: 'Ferramentas',
        description: 'Ferramentas manuais, elétricas e pneumáticas para uso em obras de construção civil.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar categoria de Elétrica', () => {
      const category = {
        name: 'Elétrica',
        description: 'Fios, cabos, disjuntores, tomadas, interruptores e demais materiais para instalações elétricas.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar categoria de Hidráulica', () => {
      const category = {
        name: 'Hidráulica',
        description: 'Tubos, conexões, registros, torneiras e outros materiais para instalações hidráulicas.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar categoria de Pintura', () => {
      const category = {
        name: 'Pintura',
        description: 'Tintas, vernizes, pincéis, rolos, massas corridas e todos os materiais necessários para pintura.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });

    it('deve aceitar categoria com descrição detalhada', () => {
      const category = {
        name: 'Acabamento',
        description: 'Materiais para acabamento de obras incluindo: pisos (cerâmica, porcelanato, laminado), revestimentos de parede, rodapés, soleiras, peitoris, metais sanitários, louças sanitárias, cubas, torneiras, entre outros itens que fazem parte da finalização de uma construção ou reforma.',
      };
      const result = CreateCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });
  });
});

describe('UpdateCategorySchema', () => {
  const validUpdate = {
    name: 'Nome Atualizado',
    description: 'Descrição atualizada com mais de 10 caracteres',
  };

  describe('Validações de Sucesso', () => {
    it('deve aceitar atualização completa', () => {
      const result = UpdateCategorySchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de name', () => {
      const update = {
        name: 'Apenas Nome Novo',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização apenas de description', () => {
      const update = {
        description: 'Apenas descrição nova com mais de 10 caracteres',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar objeto vazio (atualização parcial)', () => {
      const update = {};
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aplicar mesmas validações de tamanho que CreateSchema', () => {
      const update = {
        name: 'ab',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });

    it('deve validar tamanho mínimo de description', () => {
      const update = {
        description: 'curta',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });

    it('deve aceitar name com 3 caracteres no update', () => {
      const update = {
        name: 'abc',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar description com 10 caracteres no update', () => {
      const update = {
        description: 'abcdefghij',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de Erro', () => {
    it('deve rejeitar name muito curto', () => {
      const update = {
        name: 'ab',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar name muito longo', () => {
      const update = {
        name: 'a'.repeat(256),
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar description muito curta', () => {
      const update = {
        description: 'abc',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar description muito longa', () => {
      const update = {
        description: 'a'.repeat(1001),
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(false);
    });
  });

  describe('Casos de Uso Reais de Update', () => {
    it('deve aceitar correção de nome', () => {
      const update = {
        name: 'Materiais de Construção (Corrigido)',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar expansão de descrição', () => {
      const update = {
        description: 'Descrição expandida com muito mais detalhes sobre os materiais incluídos nesta categoria.',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('deve aceitar atualização completa de categoria', () => {
      const update = {
        name: 'Categoria Totalmente Nova',
        description: 'Nova descrição completa com todas as informações atualizadas sobre esta categoria.',
      };
      const result = UpdateCategorySchema.safeParse(update);
      expect(result.success).toBe(true);
    });
  });
});

