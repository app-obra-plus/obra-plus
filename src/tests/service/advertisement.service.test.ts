import { AdvertisementService } from '../../modules/advertisement/service/advertisement.service';
import { prisma } from '../../database/client';
import { AdvertisementMapper } from '../../modules/advertisement/dto/mapper/AdvertisementMapper';
import { CategoryService } from '../../modules/category/category.service';
import { AdvertisementAddressService } from '../../modules/advertisement/service/advertisementAddress.service';
import { CreateAdvertisementDto } from '../../modules/advertisement/dto/CreateAdvertisementDto';
import { UpdateAdvertisementDto } from '../../modules/advertisement/dto/UpdateAdvertisementDto';
import { EntityNotFoundError } from '../../exception/EntityNotFoundError';
import { ForbiddenAccessError } from '../../exception/ForbiddenAccessError';
import { BadRequestError } from '../../exception/BadRequestError';
import { AdvertisementStatus, UnitOfMeasure } from '../../generated/prisma';
import { FullAdvertisement } from '../../types/advertisement.types';

jest.mock('../../database/client', () => ({
  prisma: {
    advertisement: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn(),
    }
  }
}));
jest.mock('../../modules/advertisement/dto/mapper/AdvertisementMapper');
jest.mock('../../modules/category/category.service');
jest.mock('../../modules/advertisement/service/advertisementAddress.service');
jest.mock('geolib', () => ({
  getDistance: jest.fn((from, to) => 5000)
}));

describe('AdvertisementService', () => {
  let advertisementService: AdvertisementService;

  const mockAdvertisementAddress = {
    id: 'address-id',
    street: 'Rua Teste',
    number: '123',
    complement: null,
    neighborhood: 'Bairro',
    city: 'São Paulo',
    state: 'SP',
    postal_code: '01000-000',
    country: 'Brasil',
    latitude: -23.550520,
    longitude: -46.633308,
    isDeleted: false,
  };

  const mockUser = {
    id: 'user-id',
    email: 'user@test.com',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11999999999',
    password: 'hashed',
    profile_picture: null,
    isDeleted: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockCategory = {
    id: 'category-id',
    name: 'Materiais de Construção',
    description: 'Categoria teste',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockFullAdvertisement: FullAdvertisement = {
    id: 'ad-id',
    title: 'Cimento Portland',
    description: 'Cimento de qualidade para construção',
    price: 25.50,
    amount: 50,
    unitOfMeasure: UnitOfMeasure.KG,
    status: AdvertisementStatus.ACTIVE,
    isDonation: false,
    user_id: 'user-id',
    category_id: 'category-id',
    advertisementAddressId: 'address-id',
    isDeleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    user: mockUser,
    category: mockCategory,
    advertisementAddress: mockAdvertisementAddress,
    images: [],
  };

  const mockResponseDto = {
    id: 'ad-id',
    title: 'Cimento Portland',
    description: 'Cimento de qualidade para construção',
    price: 25.50,
    amount: 50,
    unitOfMeasure: UnitOfMeasure.KG,
    status: AdvertisementStatus.ACTIVE,
    isDonation: false,
    user: mockUser,
    category: mockCategory,
    advertisementAddress: mockAdvertisementAddress,
    images: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    advertisementService = new AdvertisementService();
    
    (AdvertisementMapper.toResponseDto as jest.Mock).mockReturnValue(mockResponseDto);
  });

  describe('createAdvertisement', () => {
    const createDto: CreateAdvertisementDto = {
      title: 'Cimento Portland',
      description: 'Cimento de qualidade para construção',
      price: 25.50,
      amount: 50,
      unitOfMeasure: UnitOfMeasure.KG,
      isDonation: false,
      category_id: 'category-id',
      addressId: 'address-id',
    };

    const userId = 'user-id';

    beforeEach(() => {
      (advertisementService['advertisementAddressService'].saveAdvertisementAddress as jest.Mock)
        .mockResolvedValue(mockAdvertisementAddress);
      (advertisementService['categoryService'].getCategoryById as jest.Mock)
        .mockResolvedValue(mockCategory);
      (prisma.advertisement.create as jest.Mock).mockResolvedValue(mockFullAdvertisement);
    });

    it('deve criar um anúncio com sucesso', async () => {
      const result = await advertisementService.createAdvertisement(createDto, userId);

      expect(advertisementService['advertisementAddressService'].saveAdvertisementAddress)
        .toHaveBeenCalledWith(createDto.addressId);
      expect(advertisementService['categoryService'].getCategoryById)
        .toHaveBeenCalledWith(createDto.category_id);
      expect(prisma.advertisement.create).toHaveBeenCalledWith({
        data: {
          title: createDto.title,
          description: createDto.description,
          price: createDto.price,
          isDonation: createDto.isDonation,
          category_id: createDto.category_id,
          amount: createDto.amount,
          unitOfMeasure: createDto.unitOfMeasure,
          user_id: userId,
          advertisementAddressId: mockAdvertisementAddress.id,
        },
        include: expect.any(Object),
      });
      expect(AdvertisementMapper.toResponseDto).toHaveBeenCalledWith(mockFullAdvertisement);
      expect(result).toEqual(mockResponseDto);
    });
  });

  describe('getAdvertisementbyId', () => {
    const adId = 'ad-id';

    it('deve retornar um anúncio quando encontrado', async () => {
      (prisma.advertisement.findUnique as jest.Mock).mockResolvedValue(mockFullAdvertisement);

      const result = await advertisementService.getAdvertisementbyId(adId);

      expect(prisma.advertisement.findUnique).toHaveBeenCalledWith({
        where: { id: adId, status: AdvertisementStatus.ACTIVE },
        include: expect.any(Object),
      });
      expect(AdvertisementMapper.toResponseDto).toHaveBeenCalledWith(mockFullAdvertisement);
      expect(result).toEqual(mockResponseDto);
    });

    it('deve lançar EntityNotFoundError quando anúncio não encontrado', async () => {
      (prisma.advertisement.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(advertisementService.getAdvertisementbyId(adId))
        .rejects.toThrow(EntityNotFoundError);

      expect(prisma.advertisement.findUnique).toHaveBeenCalledWith({
        where: { id: adId, status: AdvertisementStatus.ACTIVE },
        include: expect.any(Object),
      });
    });
  });

  describe('updateAdvertisement', () => {
    const adId = 'ad-id';
    const updateDto: UpdateAdvertisementDto = {
      title: 'Cimento Atualizado',
      price: 30.00,
    };

    beforeEach(() => {
      jest.spyOn(advertisementService, 'getAdvertisementbyId')
        .mockResolvedValue(mockResponseDto);
      (prisma.advertisement.update as jest.Mock).mockResolvedValue(mockFullAdvertisement);
    });

    it('deve atualizar um anúncio com sucesso', async () => {
      const result = await advertisementService.updateAdvertisement(adId, updateDto);

      expect(advertisementService.getAdvertisementbyId).toHaveBeenCalledWith(adId);
      expect(prisma.advertisement.update).toHaveBeenCalledWith({
        where: { id: adId },
        include: expect.any(Object),
        data: updateDto,
      });
      expect(AdvertisementMapper.toResponseDto).toHaveBeenCalledWith(mockFullAdvertisement);
      expect(result).toEqual(mockResponseDto);
    });

    it('deve propagar erro se anúncio não existir', async () => {
      const error = new EntityNotFoundError('Anúncio', adId);
      jest.spyOn(advertisementService, 'getAdvertisementbyId')
        .mockRejectedValue(error);

      await expect(advertisementService.updateAdvertisement(adId, updateDto))
        .rejects.toThrow(error);

      expect(prisma.advertisement.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteAdvertisement', () => {
    const adId = 'ad-id';
    const userId = 'user-id';

    it('deve deletar um anúncio com sucesso (soft delete)', async () => {
      (prisma.advertisement.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

      await advertisementService.deleteAdvertisement(adId, userId);

      expect(prisma.advertisement.updateMany).toHaveBeenCalledWith({
        where: {
          id: adId,
          user_id: userId,
          isDeleted: false,
        },
        data: {
          isDeleted: true,
          updated_at: expect.any(Date),
        },
      });
    });

    it('deve lançar ForbiddenAccessError se usuário não for dono do anúncio', async () => {
      (prisma.advertisement.updateMany as jest.Mock).mockResolvedValue({ count: 0 });

      await expect(advertisementService.deleteAdvertisement(adId, userId))
        .rejects.toThrow(ForbiddenAccessError);
    });
  });

  describe('getAdvertisementsPage', () => {
    const params = {
      page: 1,
      limit: 10,
      order: { field: 'created_at' as const, direction: 'desc' as const },
      userLatitude: -23.550520,
      userLongitude: -46.633308,
      distanceMax: 10,
    };

    beforeEach(() => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([mockFullAdvertisement]);
      (prisma.advertisement.count as jest.Mock).mockResolvedValue(1);
    });

    it('deve retornar página de anúncios com paginação', async () => {
      const result = await advertisementService.getAdvertisementsPage(params);

      expect(prisma.advertisement.findMany).toHaveBeenCalled();
      expect(prisma.advertisement.count).toHaveBeenCalled();
      expect(result).toEqual({
        data: [mockResponseDto],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('deve aplicar filtro de preço máximo', async () => {
      const paramsWithPrice = { ...params, priceMax: 50 };
      
      await advertisementService.getAdvertisementsPage(paramsWithPrice);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            price: { lte: 50 },
          }),
        })
      );
    });

    it('deve aplicar filtro de categoria', async () => {
      const paramsWithCategory = { ...params, categoryId: 'category-id' };
      
      await advertisementService.getAdvertisementsPage(paramsWithCategory);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category_id: 'category-id',
          }),
        })
      );
    });

    it('deve aplicar filtro de texto (busca)', async () => {
      const paramsWithText = { ...params, text: 'cimento' };
      
      await advertisementService.getAdvertisementsPage(paramsWithText);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.any(Array),
          }),
        })
      );
    });
  });

  describe('getUserAdvertisements', () => {
    const userId = 'user-id';
    const params = {
      page: 1,
      limit: 10,
      order: { field: 'created_at' as const, direction: 'desc' as const },
    };

    beforeEach(() => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([mockFullAdvertisement]);
      (prisma.advertisement.count as jest.Mock).mockResolvedValue(1);
    });

    it('deve retornar anúncios de um usuário específico', async () => {
      const result = await advertisementService.getUserAdvertisements(userId, params);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            user_id: userId,
            isDeleted: false,
          }),
        })
      );
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('getByIds', () => {
    const ids = ['ad-id-1', 'ad-id-2'];
    const params = {
      page: 1,
      limit: 10,
      order: { field: 'created_at' as const, direction: 'desc' as const },
      userLatitude: -23.550520,
      userLongitude: -46.633308,
      distanceMax: 10,
    };

    it('deve retornar anúncios pelos IDs fornecidos', async () => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([mockFullAdvertisement]);
      (prisma.advertisement.count as jest.Mock).mockResolvedValue(1);

      const result = await advertisementService.getByIds(ids, params);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: { in: ids },
            isDeleted: false,
          }),
        })
      );
      expect(result.data).toHaveLength(1);
    });

    it('deve lançar BadRequestError se lista de IDs estiver vazia', async () => {
      await expect(advertisementService.getByIds([], params))
        .rejects.toThrow(BadRequestError);

      expect(prisma.advertisement.findMany).not.toHaveBeenCalled();
    });

    it('deve lançar BadRequestError se lista de IDs for nula/undefined', async () => {
      await expect(advertisementService.getByIds(null as any, params))
        .rejects.toThrow(BadRequestError);

      await expect(advertisementService.getByIds(undefined as any, params))
        .rejects.toThrow(BadRequestError);
    });
  });
});


