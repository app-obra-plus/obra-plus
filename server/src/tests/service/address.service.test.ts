
import { AddressService } from '../../../src/modules/address/address.service';
import { prisma } from '../../../src/database/client';
import { AddressMapper } from '../../../src/modules/address/dto/mapper/AddressMapper';
import { CreateAddressDto } from '../../../src/modules/address/dto/CreateAddressDto';
import { AddressResponseDto } from '../../../src/modules/address/dto/AddressResponseDto';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';

jest.mock('../../../src/database/client', () => ({
  prisma: {
    address: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
        user: {
        delete: jest.fn(), 
    }
  }
}));

jest.mock('../../../src/modules/address/dto/mapper/AddressMapper', () => ({
  AddressMapper: {
    toResponseDto: jest.fn(),
  }
}));

describe('AddressService', () => {
  const addressService = new AddressService();

  const mockAddressInput: CreateAddressDto = {
    street: 'Rua A',
    number: '123',
    complement: 'Apto 1',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    postal_code: '01000-000',
    country: 'Brasil',
    latitude: -23.5,
    longitude: -46.6
  };

  const addressDbResult = {
    id: 'addr-001',
    ...mockAddressInput,
    user_id: 'user-123'
  };

  const expectedResponse: AddressResponseDto = {
    id: 'addr-001',
    street: 'Rua A',
    number: '123',
    complement: 'Apto 1',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    postal_code: '01000-000',
    country: 'Brasil',
    latitude: -23.5,
    longitude: -46.6
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar endereço e retornar DTO corretamente', async () => {
    (prisma.address.create as jest.Mock).mockResolvedValue(addressDbResult);
    (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(expectedResponse);

    const result = await addressService.createAddress(mockAddressInput, 'user-123');

    expect(prisma.address.create).toHaveBeenCalledWith({
      data: {
        ...mockAddressInput,
        user_id: 'user-123'
      }
    });

    expect(AddressMapper.toResponseDto).toHaveBeenCalledWith(addressDbResult);
    expect(result).toEqual(expectedResponse);
  });

    it('deve buscar endereço por id e retornar o DTO', async () => {
    const addressId = 'addr-001';
    (prisma.address.findUnique as jest.Mock).mockResolvedValue(addressDbResult);
    (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(expectedResponse);

    const result = await addressService.getAddressById(addressId);

    expect(prisma.address.findUnique).toHaveBeenCalledWith({
        where: { id: addressId }
    });

    expect(result).toEqual(expectedResponse);
    });


    it('deve lançar EntityNotFoundError se endereço não existir', async () => {
    (prisma.address.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(addressService.getAddressById('nao-existe')).rejects.toThrow(EntityNotFoundError);
    });

    it('deve retornar todos os endereços de um usuário', async () => {
    const userId = 'user-123';

    const mockDbResults = [
        { id: 'addr1', street: 'Rua A', },
        { id: 'addr2', street: 'Rua B', },
    ];

    const mockDtos = [
        { id: 'addr1', street: 'Rua A', },
        { id: 'addr2', street: 'Rua B', },
    ];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockDbResults);
    (AddressMapper.toResponseDto as jest.Mock).mockImplementation((a) => mockDtos.find(d => d.id === a.id));

    const result = await addressService.getAllAddresses(userId);

    expect(prisma.address.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
    });
    expect(result).toEqual(mockDtos);
    });

    it('deve atualizar um endereço e retornar o DTO', async () => {
        const addressId = 'addr1';
        const updateDto = { city: 'Nova Cidade', street: 'Nova Rua' };

        const updatedAddressDb = { id: addressId, ...updateDto };

        jest.spyOn(addressService, 'getAddressById').mockResolvedValue({} as any);

        (prisma.address.update as jest.Mock).mockResolvedValue(updatedAddressDb);
        (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(updatedAddressDb);

        const result = await addressService.updateAddress(addressId, updateDto);

        expect(prisma.address.update).toHaveBeenCalledWith({
            where: { id: addressId },
            data: updateDto,
        });
        expect(result).toEqual(updatedAddressDb);
    });

    it('deve deletar o endereço do usuário', async () => {
        const addressId = 'addr-del';

        jest.spyOn(addressService, 'getAddressById').mockResolvedValue({} as any);

        await addressService.deleteAddress(addressId);

        expect(prisma.address.delete).toHaveBeenCalledWith({
            where: { id: addressId }
        });
    });

});
