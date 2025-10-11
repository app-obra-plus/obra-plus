import { AdvertisementAddressMapper } from '../../modules/advertisement/dto/mapper/AdvertisementAddressMapper';
import { AdvertisementAddress } from '../../generated/prisma';

describe('AdvertisementAddressMapper', () => {
  describe('toResponseDto', () => {
    const mockAddress: AdvertisementAddress = {
      id: 'address-id',
      street: 'Rua Teste',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      postal_code: '01000-000',
      country: 'Brasil',
      latitude: -23.550520,
      longitude: -46.633308,
      isDeleted: false,
    };

    it('deve mapear AdvertisementAddress para ResponseAdvertisementAddressDto corretamente', () => {
      const result = AdvertisementAddressMapper.toResponseDto(mockAddress);

      expect(result).toEqual({
        id: 'address-id',
        street: 'Rua Teste',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01000-000',
        country: 'Brasil',
        latitude: -23.550520,
        longitude: -46.633308,
      });
    });

    it('deve excluir isDeleted do DTO de resposta', () => {
      const result = AdvertisementAddressMapper.toResponseDto(mockAddress);

      expect(result).not.toHaveProperty('isDeleted');
    });

    it('deve converter complement undefined para null', () => {
      const addressWithoutComplement = {
        ...mockAddress,
        complement: undefined as any,
      };

      const result = AdvertisementAddressMapper.toResponseDto(addressWithoutComplement);

      expect(result.complement).toBe(null);
    });

    it('deve manter complement null quando já é null', () => {
      const addressWithNullComplement = {
        ...mockAddress,
        complement: null,
      };

      const result = AdvertisementAddressMapper.toResponseDto(addressWithNullComplement);

      expect(result.complement).toBe(null);
    });

    it('deve manter complement quando tem valor', () => {
      const result = AdvertisementAddressMapper.toResponseDto(mockAddress);

      expect(result.complement).toBe('Apto 45');
    });

    it('deve preservar coordenadas geográficas corretamente', () => {
      const result = AdvertisementAddressMapper.toResponseDto(mockAddress);

      expect(result.latitude).toBe(-23.550520);
      expect(result.longitude).toBe(-46.633308);
      expect(typeof result.latitude).toBe('number');
      expect(typeof result.longitude).toBe('number');
    });

    it('deve lidar com coordenadas positivas', () => {
      const addressWithPositiveCoords = {
        ...mockAddress,
        latitude: 40.7128,
        longitude: 74.0060,
      };

      const result = AdvertisementAddressMapper.toResponseDto(addressWithPositiveCoords);

      expect(result.latitude).toBe(40.7128);
      expect(result.longitude).toBe(74.0060);
    });

    it('deve preservar todos os campos de texto', () => {
      const result = AdvertisementAddressMapper.toResponseDto(mockAddress);

      expect(result.street).toBe('Rua Teste');
      expect(result.number).toBe('123');
      expect(result.neighborhood).toBe('Centro');
      expect(result.city).toBe('São Paulo');
      expect(result.state).toBe('SP');
      expect(result.postal_code).toBe('01000-000');
      expect(result.country).toBe('Brasil');
    });

    it('deve lidar com endereço sem número (S/N)', () => {
      const addressWithoutNumber = {
        ...mockAddress,
        number: 'S/N',
      };

      const result = AdvertisementAddressMapper.toResponseDto(addressWithoutNumber);

      expect(result.number).toBe('S/N');
    });

    it('deve lidar com diferentes formatos de CEP', () => {
      const addressWithDifferentPostalCode = {
        ...mockAddress,
        postal_code: '12345-678',
      };

      const result = AdvertisementAddressMapper.toResponseDto(addressWithDifferentPostalCode);

      expect(result.postal_code).toBe('12345-678');
    });
  });
});


