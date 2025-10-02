import { AddressService } from '../../../src/modules/address/address.service';
import { prisma } from '../../../src/database/client';
import { AddressMapper } from '../../../src/modules/address/dto/mapper/AddressMapper';
import { CreateAddressDto } from '../../../src/modules/address/dto/CreateAddressDto';
import { AddressResponseDto } from '../../../src/modules/address/dto/AddressResponseDto';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';
import { PaginationParamsBase } from '../../utils/pagination/pagination.types';

jest.mock('../../../src/database/client', () => ({
  prisma: {
    address: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
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

  const baseAddress = {
    addressName: 'Endereço A',
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

  const mockAddressInput: CreateAddressDto = { ...baseAddress };
  const addressDbResult = { id: 'addr-001', user_id: 'user-123', ...baseAddress };
  const expectedResponse: AddressResponseDto = { id: 'addr-001', ...baseAddress };

  const params: PaginationParamsBase = { page: 1, limit: 10, order: 'asc' };
  const skip = (params.page - 1) * params.limit;

  const mockAddress = {
    id: 'ffdf4edc-4ea2-482e-b7d9-b52578107bbd',
    addressName: 'Obra A',
    street: 'Rua Trinta e Seis',
    number: '115',
    complement: null,
    neighborhood: 'Vera Cruz',
    city: 'Joao monlevade',
    state: 'Minas Gerais',
    postal_code: '35931-017',
    country: 'Brasil',
    latitude: -19.83625412717607,
    longitude: -43.16769668832421
  };

  const mocksAddressPage = {
    data: [mockAddress],
    pagination: {
      total: 1,
      page: params.page,
      limit: params.limit,
      totalPages: 1
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar endereço e retornar DTO corretamente', async () => {
    (prisma.address.create as jest.Mock).mockResolvedValue(addressDbResult);
    (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(expectedResponse);

    const result = await addressService.createAddress(mockAddressInput, 'user-123');

    expect(prisma.address.create).toHaveBeenCalledWith({
      data: { ...mockAddressInput, user_id: 'user-123' }
    });
    expect(AddressMapper.toResponseDto).toHaveBeenCalledWith(addressDbResult);
    expect(result).toEqual(expectedResponse);
  });

  it('deve buscar endereço por id e retornar o DTO', async () => {
    const addressId = 'addr-001';
    (prisma.address.findUnique as jest.Mock).mockResolvedValue(addressDbResult);
    (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(expectedResponse);

    const result = await addressService.getAddressById(addressId);

    expect(prisma.address.findUnique).toHaveBeenCalledWith({ where: { id: addressId } });
    expect(result).toEqual(expectedResponse);
  });

  it('deve lançar EntityNotFoundError se endereço não existir', async () => {
    (prisma.address.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(addressService.getAddressById('nao-existe')).rejects.toThrow(EntityNotFoundError);
  });

  it('deve retornar todos os endereços de um usuário', async () => {
    const userId = 'user-123';
    const mockDbResults = [mockAddress];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockDbResults);
    (prisma.address.count as jest.Mock).mockResolvedValue(mockDbResults.length);
    (AddressMapper.toResponseDto as jest.Mock).mockImplementation(addr => ({
      ...addr,
      complement: addr.complement ?? null,
    }));

    const result = await addressService.getAllAddresses(userId, params);

    expect(prisma.address.findMany).toHaveBeenCalledWith({
      where: { user_id: userId },
      skip: skip,
      take: params.limit,
      orderBy: { createdAt: params.order },
    });

    expect(prisma.address.count).toHaveBeenCalledWith({ where: { user_id: userId } });
    expect(result).toEqual(mocksAddressPage);
  });

  it('deve atualizar um endereço e retornar o DTO', async () => {
    const addressId = 'addr1';
    const updateDto = { city: 'Nova Cidade', street: 'Nova Rua' };
    const updatedAddressDb = { id: addressId, ...updateDto };

    jest.spyOn(addressService, 'getAddressById').mockResolvedValue({} as any);
    (prisma.address.update as jest.Mock).mockResolvedValue(updatedAddressDb);
    (AddressMapper.toResponseDto as jest.Mock).mockReturnValue(updatedAddressDb);

    const result = await addressService.updateAddress(addressId, updateDto);

    expect(prisma.address.update).toHaveBeenCalledWith({ where: { id: addressId }, data: updateDto });
    expect(result).toEqual(updatedAddressDb);
  });

  it('deve deletar o endereço do usuário', async () => {
    const addressId = 'addr-del';
    jest.spyOn(addressService, 'getAddressById').mockResolvedValue({} as any);

    await addressService.deleteAddress(addressId);

    expect(prisma.address.delete).toHaveBeenCalledWith({ where: { id: addressId } });
  });

});
