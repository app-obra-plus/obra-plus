import { CreateAdvertisementSchema } from '../../modules/advertisement/dto/CreateAdvertisementDto';
import { UpdateAdvertisementSchema } from '../../modules/advertisement/dto/UpdateAdvertisementDto';
import { UnitOfMeasure } from '../../generated/prisma';

describe('Advertisement DTOs Validation', () => {
  describe('CreateAdvertisementSchema', () => {
    const validCreateData = {
      title: 'Cimento Portland',
      description: 'Cimento de qualidade para construção civil',
      price: 25.50,
      amount: 50,
      unitOfMeasure: UnitOfMeasure.KG,
      isDonation: false,
      category_id: '123e4567-e89b-12d3-a456-426614174000',
      addressId: '123e4567-e89b-12d3-a456-426614174001',
    };

    describe('validações de sucesso', () => {
      it('deve validar anúncio válido com preço', () => {
        const result = CreateAdvertisementSchema.safeParse(validCreateData);
        expect(result.success).toBe(true);
      });

      it('deve validar doação com preço zero', () => {
        const donationData = {
          ...validCreateData,
          isDonation: true,
          price: 0,
        };

        const result = CreateAdvertisementSchema.safeParse(donationData);
        expect(result.success).toBe(true);
      });

      it('deve validar todas as unidades de medida', () => {
        const units = [UnitOfMeasure.UNIT, UnitOfMeasure.KG, UnitOfMeasure.LITER, UnitOfMeasure.METER];

        units.forEach((unit) => {
          const data = { ...validCreateData, unitOfMeasure: unit };
          const result = CreateAdvertisementSchema.safeParse(data);
          expect(result.success).toBe(true);
        });
      });
    });

    describe('validações de título', () => {
      it('deve rejeitar título com menos de 3 caracteres', () => {
        const data = { ...validCreateData, title: 'ab' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('pelo menos 3 caracteres');
        }
      });

      it('deve aceitar título com exatamente 3 caracteres', () => {
        const data = { ...validCreateData, title: 'abc' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve aceitar título longo', () => {
        const data = { ...validCreateData, title: 'T'.repeat(200) };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de descrição', () => {
      it('deve rejeitar descrição com menos de 10 caracteres', () => {
        const data = { ...validCreateData, description: 'curta' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('pelo menos 10 caracteres');
        }
      });

      it('deve aceitar descrição com exatamente 10 caracteres', () => {
        const data = { ...validCreateData, description: '0123456789' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve aceitar descrição longa', () => {
        const data = { ...validCreateData, description: 'D'.repeat(1000) };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de preço', () => {
      it('deve rejeitar preço negativo', () => {
        const data = { ...validCreateData, price: -10 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('não pode ser negativo');
        }
      });

      it('deve aceitar preço zero para doação', () => {
        const data = { ...validCreateData, price: 0, isDonation: true };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve rejeitar preço zero para não-doação', () => {
        const data = { ...validCreateData, price: 0, isDonation: false };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          const priceError = result.error.issues.find(issue => issue.path.includes('price'));
          expect(priceError?.message).toContain('deve ser maior que 0');
        }
      });

      it('deve rejeitar doação com preço maior que zero', () => {
        const data = { ...validCreateData, price: 10, isDonation: true };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          const priceError = result.error.issues.find(issue => issue.path.includes('price'));
          expect(priceError?.message).toContain('deve ser 0');
        }
      });

      it('deve aceitar preço decimal', () => {
        const data = { ...validCreateData, price: 25.99 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve aceitar preço alto', () => {
        const data = { ...validCreateData, price: 999999.99 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de quantidade', () => {
      it('deve rejeitar quantidade zero', () => {
        const data = { ...validCreateData, amount: 0 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('deve ser maior que zero');
        }
      });

      it('deve rejeitar quantidade negativa', () => {
        const data = { ...validCreateData, amount: -5 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('deve ser maior que zero');
        }
      });

      it('deve aceitar quantidade decimal', () => {
        const data = { ...validCreateData, amount: 2.5 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve aceitar quantidade grande', () => {
        const data = { ...validCreateData, amount: 10000 };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de IDs', () => {
      it('deve rejeitar category_id inválido', () => {
        const data = { ...validCreateData, category_id: 'invalid-uuid' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          const categoryError = result.error.issues.find(issue => issue.path.includes('category_id'));
          expect(categoryError?.message).toContain('ID de categoria inválido');
        }
      });

      it('deve rejeitar addressId inválido', () => {
        const data = { ...validCreateData, addressId: 'invalid-uuid' };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          const addressError = result.error.issues.find(issue => issue.path.includes('addressId'));
          expect(addressError?.message).toContain('ID de endereço inválido');
        }
      });

      it('deve aceitar UUIDs válidos', () => {
        const data = {
          ...validCreateData,
          category_id: '123e4567-e89b-12d3-a456-426614174000',
          addressId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        };
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de campos obrigatórios', () => {
      it('deve rejeitar dados sem título', () => {
        const data = { ...validCreateData };
        delete (data as any).title;
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve rejeitar dados sem descrição', () => {
        const data = { ...validCreateData };
        delete (data as any).description;
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve rejeitar dados sem preço', () => {
        const data = { ...validCreateData };
        delete (data as any).price;
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve rejeitar dados sem isDonation', () => {
        const data = { ...validCreateData };
        delete (data as any).isDonation;
        const result = CreateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });
    });
  });

  describe('UpdateAdvertisementSchema', () => {
    describe('validações de atualização parcial', () => {
      it('deve permitir atualizar apenas título', () => {
        const data = { title: 'Novo Título' };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve permitir atualizar apenas descrição', () => {
        const data = { description: 'Nova descrição com mais de dez caracteres' };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve permitir atualizar apenas preço', () => {
        const data = { price: 30.00 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve permitir atualizar múltiplos campos', () => {
        const data = {
          title: 'Título Atualizado',
          price: 35.00,
          amount: 100,
        };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });

      it('deve permitir atualização vazia (sem campos)', () => {
        const data = {};
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de título na atualização', () => {
      it('deve rejeitar título muito curto', () => {
        const data = { title: 'ab' };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('pelo menos 3 caracteres');
        }
      });
    });

    describe('validações de descrição na atualização', () => {
      it('deve rejeitar descrição muito curta', () => {
        const data = { description: 'curta' };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain('pelo menos 10 caracteres');
        }
      });
    });

    describe('validações de preço na atualização', () => {
      it('deve rejeitar preço negativo', () => {
        const data = { price: -10 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve aceitar preço zero', () => {
        const data = { price: 0 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });

    describe('validações de quantidade na atualização', () => {
      it('deve rejeitar quantidade zero', () => {
        const data = { amount: 0 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve rejeitar quantidade negativa', () => {
        const data = { amount: -5 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(false);
      });

      it('deve aceitar quantidade válida', () => {
        const data = { amount: 75 };
        const result = UpdateAdvertisementSchema.safeParse(data);
        
        expect(result.success).toBe(true);
      });
    });
  });
});


