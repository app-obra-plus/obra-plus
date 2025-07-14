import { AddressMapper } from '../modules/address/dto/mapper/AddressMapper';
import { AddressResponseDto } from '../modules/address/dto/AddressResponseDto'

describe('AddressMapper', () => {
  describe('toResponseDto', () => {
    it('deve mapear corretamente um Address para AddressResponseDto', () => {
      const address = {
        id: 'addr-001',
        street: 'Rua Teste',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        state: 'ST',
        postal_code: '12345-678',
        country: 'Brasil',
        latitude: -10.123,
        longitude: -20.456,
         user_id: 'user-123',
      };

      const expectedDto: AddressResponseDto = {
        id: 'addr-001',
        street: 'Rua Teste',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Bairro Teste',
        city: 'Cidade Teste',
        state: 'ST',
        postal_code: '12345-678',
        country: 'Brasil',
        latitude: -10.123,
        longitude: -20.456,
      };

      const dto = AddressMapper.toResponseDto(address);

      expect(dto).toEqual(expectedDto);
    });

    it('deve setar complement como null se undefined', () => {
      const address = {
        id: 'addr-002',
        street: 'Rua Sem Complemento',
        number: '456',
        complement: null,
        neighborhood: 'Bairro 2',
        city: 'Cidade 2',
        state: 'ST',
        postal_code: '98765-432',
        country: 'Brasil',
        latitude: -11.123,
        longitude: -21.456,
        user_id: 'user-456',
      };

      const dto = AddressMapper.toResponseDto(address);

      expect(dto.complement).toBeNull();
    });
  });
});
