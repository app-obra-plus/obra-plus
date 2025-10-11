import { CreateAddressSchema } from '../../modules/address/dto/CreateAddressDto';

describe('CreateAddressSchema', () => {
  const validAddress = {
    addressName: 'Casa',
    street: 'Rua Teste',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    postal_code: '01000-000',
    country: 'Brasil',
    latitude: -23.550520,
    longitude: -46.633308,
  };

  describe('Validações de Sucesso', () => {
    it('deve aceitar endereço completo válido', () => {
      const result = CreateAddressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
    });

    it('deve aceitar endereço com complement opcional', () => {
      const addressWithComplement = {
        ...validAddress,
        complement: 'Apto 101',
      };
      const result = CreateAddressSchema.safeParse(addressWithComplement);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.complement).toBe('Apto 101');
      }
    });

    it('deve aceitar endereço sem complement', () => {
      const result = CreateAddressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.complement).toBeUndefined();
      }
    });

    it('deve aceitar coordenadas negativas', () => {
      const addressWithNegativeCoords = {
        ...validAddress,
        latitude: -45.123456,
        longitude: -90.654321,
      };
      const result = CreateAddressSchema.safeParse(addressWithNegativeCoords);
      expect(result.success).toBe(true);
    });

    it('deve aceitar coordenadas positivas', () => {
      const addressWithPositiveCoords = {
        ...validAddress,
        latitude: 45.123456,
        longitude: 90.654321,
      };
      const result = CreateAddressSchema.safeParse(addressWithPositiveCoords);
      expect(result.success).toBe(true);
    });

    it('deve fazer trim em strings', () => {
      const addressWithSpaces = {
        ...validAddress,
        addressName: '  Casa  ',
        street: '  Rua Teste  ',
        city: '  São Paulo  ',
      };
      const result = CreateAddressSchema.safeParse(addressWithSpaces);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.addressName).toBe('Casa');
        expect(result.data.street).toBe('Rua Teste');
        expect(result.data.city).toBe('São Paulo');
      }
    });
  });

  describe('Validações de addressName', () => {
    it('deve rejeitar addressName vazio', () => {
      const address = { ...validAddress, addressName: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar addressName apenas com espaços', () => {
      const address = { ...validAddress, addressName: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar quando addressName está ausente', () => {
      const { addressName, ...address } = validAddress;
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });
  });

  describe('Validações de street', () => {
    it('deve rejeitar street vazia', () => {
      const address = { ...validAddress, street: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar street apenas com espaços', () => {
      const address = { ...validAddress, street: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar quando street está ausente', () => {
      const { street, ...address } = validAddress;
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar street com números e caracteres especiais', () => {
      const address = { ...validAddress, street: 'Rua 123 - A' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de number', () => {
    it('deve rejeitar number vazio', () => {
      const address = { ...validAddress, number: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar number apenas com espaços', () => {
      const address = { ...validAddress, number: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar "S/N" como número', () => {
      const address = { ...validAddress, number: 'S/N' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar número com letra (ex: 123-A)', () => {
      const address = { ...validAddress, number: '123-A' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de complement', () => {
    it('deve aceitar complement vazio (campo opcional)', () => {
      const address = { ...validAddress, complement: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar complement com espaços apenas', () => {
      const address = { ...validAddress, complement: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.complement).toBe('');
      }
    });

    it('deve aceitar complement com várias palavras', () => {
      const address = { ...validAddress, complement: 'Bloco A Apto 101' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de neighborhood', () => {
    it('deve rejeitar neighborhood vazio', () => {
      const address = { ...validAddress, neighborhood: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar neighborhood apenas com espaços', () => {
      const address = { ...validAddress, neighborhood: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar neighborhood com acentos', () => {
      const address = { ...validAddress, neighborhood: 'São José' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de city', () => {
    it('deve rejeitar city vazia', () => {
      const address = { ...validAddress, city: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar city apenas com espaços', () => {
      const address = { ...validAddress, city: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar city com acentos e caracteres especiais', () => {
      const address = { ...validAddress, city: 'São José dos Campos' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de state', () => {
    it('deve rejeitar state vazio', () => {
      const address = { ...validAddress, state: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar state apenas com espaços', () => {
      const address = { ...validAddress, state: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar sigla de estado (2 caracteres)', () => {
      const address = { ...validAddress, state: 'RJ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar nome completo de estado', () => {
      const address = { ...validAddress, state: 'São Paulo' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de postal_code', () => {
    it('deve rejeitar postal_code vazio', () => {
      const address = { ...validAddress, postal_code: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar postal_code apenas com espaços', () => {
      const address = { ...validAddress, postal_code: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar CEP com formatação (12345-678)', () => {
      const address = { ...validAddress, postal_code: '12345-678' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar CEP sem formatação (12345678)', () => {
      const address = { ...validAddress, postal_code: '12345678' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de country', () => {
    it('deve rejeitar country vazio', () => {
      const address = { ...validAddress, country: '' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar country apenas com espaços', () => {
      const address = { ...validAddress, country: '   ' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar diferentes países', () => {
      const countries = ['Brasil', 'Argentina', 'Estados Unidos', 'Portugal'];
      countries.forEach((country) => {
        const address = { ...validAddress, country };
        const result = CreateAddressSchema.safeParse(address);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Validações de latitude', () => {
    it('deve rejeitar latitude ausente', () => {
      const { latitude, ...address } = validAddress;
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar latitude como string', () => {
      const address = { ...validAddress, latitude: '123.456' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar latitude zero', () => {
      const address = { ...validAddress, latitude: 0 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar latitude no limite superior', () => {
      const address = { ...validAddress, latitude: 90 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar latitude no limite inferior', () => {
      const address = { ...validAddress, latitude: -90 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar latitude com decimais', () => {
      const address = { ...validAddress, latitude: -23.5505199 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de longitude', () => {
    it('deve rejeitar longitude ausente', () => {
      const { longitude, ...address } = validAddress;
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar longitude como string', () => {
      const address = { ...validAddress, longitude: '123.456' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar longitude zero', () => {
      const address = { ...validAddress, longitude: 0 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar longitude no limite superior', () => {
      const address = { ...validAddress, longitude: 180 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar longitude no limite inferior', () => {
      const address = { ...validAddress, longitude: -180 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });

    it('deve aceitar longitude com decimais', () => {
      const address = { ...validAddress, longitude: -46.6333824 };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(true);
    });
  });

  describe('Validações de Múltiplos Campos', () => {
    it('deve rejeitar quando múltiplos campos obrigatórios estão vazios', () => {
      const address = {
        ...validAddress,
        street: '',
        city: '',
        state: '',
      };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
      }
    });

    it('deve rejeitar quando todos os campos obrigatórios estão ausentes', () => {
      const address = { complement: 'Apenas complement' };
      const result = CreateAddressSchema.safeParse(address);
      expect(result.success).toBe(false);
    });

    it('deve aceitar endereço mínimo válido (sem complement)', () => {
      const minimalAddress = {
        addressName: 'Obra',
        street: 'Rua A',
        number: '1',
        neighborhood: 'Centro',
        city: 'SP',
        state: 'SP',
        postal_code: '00000-000',
        country: 'BR',
        latitude: 0,
        longitude: 0,
      };
      const result = CreateAddressSchema.safeParse(minimalAddress);
      expect(result.success).toBe(true);
    });
  });

  describe('Casos de Uso Reais', () => {
    it('deve aceitar endereço residencial completo', () => {
      const residentialAddress = {
        addressName: 'Minha Casa',
        street: 'Avenida Paulista',
        number: '1578',
        complement: 'Apto 142 - Torre A',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'São Paulo',
        postal_code: '01310-200',
        country: 'Brasil',
        latitude: -23.561414,
        longitude: -46.655881,
      };
      const result = CreateAddressSchema.safeParse(residentialAddress);
      expect(result.success).toBe(true);
    });

    it('deve aceitar endereço comercial', () => {
      const commercialAddress = {
        addressName: 'Escritório Central',
        street: 'Rua Augusta',
        number: '2690',
        complement: '10º andar - Sala 1001',
        neighborhood: 'Cerqueira César',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01413-000',
        country: 'Brasil',
        latitude: -23.556164,
        longitude: -46.662364,
      };
      const result = CreateAddressSchema.safeParse(commercialAddress);
      expect(result.success).toBe(true);
    });

    it('deve aceitar endereço de obra/construção', () => {
      const constructionAddress = {
        addressName: 'Obra Shopping Center',
        street: 'Rodovia Presidente Dutra',
        number: 'Km 225',
        neighborhood: 'Jardim Industrial',
        city: 'São José dos Campos',
        state: 'São Paulo',
        postal_code: '12345-000',
        country: 'Brasil',
        latitude: -23.229179,
        longitude: -45.900179,
      };
      const result = CreateAddressSchema.safeParse(constructionAddress);
      expect(result.success).toBe(true);
    });

    it('deve aceitar endereço rural (sem número)', () => {
      const ruralAddress = {
        addressName: 'Fazenda',
        street: 'Estrada Municipal',
        number: 'S/N',
        neighborhood: 'Zona Rural',
        city: 'Campinas',
        state: 'SP',
        postal_code: '13000-000',
        country: 'Brasil',
        latitude: -22.907104,
        longitude: -47.063240,
      };
      const result = CreateAddressSchema.safeParse(ruralAddress);
      expect(result.success).toBe(true);
    });
  });
});

