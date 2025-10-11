import { AdvertisementMapper } from '../../modules/advertisement/dto/mapper/AdvertisementMapper';
import { AdvertisementAddressMapper } from '../../modules/advertisement/dto/mapper/AdvertisementAddressMapper';
import { ImageMapper } from '../../modules/advertisement/dto/mapper/ImageMapper';
import { UserMapper } from '../../modules/users/dto/mapper/UserMapper';
import { CategoryMapper } from '../../modules/category/dto/mapper/CategoryMapper';
import { FullAdvertisement } from '../../types/advertisement.types';
import { AdvertisementStatus, UnitOfMeasure } from '../../generated/prisma';

jest.mock('../../modules/advertisement/dto/mapper/AdvertisementAddressMapper');
jest.mock('../../modules/users/dto/mapper/UserMapper');
jest.mock('../../modules/category/dto/mapper/CategoryMapper');

describe('AdvertisementMapper', () => {
  const mockUser = {
    id: 'user-id',
    email: 'user@test.com',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11999999999',
    password: 'hashed',
    profile_picture: null,
    isDeleted: false,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  };

  const mockCategory = {
    id: 'category-id',
    name: 'Materiais',
    description: 'Materiais de construção',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  };

  const mockAddress = {
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

  const mockImages = [
    {
      id: 'image-1',
      url: 'https://blob.example.com/images/img1.jpg',
      pathname: 'images/img1.jpg',
      advertisement_id: 'ad-id',
      created_at: new Date('2024-01-01'),
    },
    {
      id: 'image-2',
      url: 'https://blob.example.com/images/img2.jpg',
      pathname: 'images/img2.jpg',
      advertisement_id: 'ad-id',
      created_at: new Date('2024-01-01'),
    },
  ];

  const mockFullAdvertisement: FullAdvertisement = {
    id: 'ad-id',
    title: 'Cimento Portland',
    description: 'Cimento de qualidade',
    price: 25.50,
    amount: 50,
    unitOfMeasure: UnitOfMeasure.KG,
    status: AdvertisementStatus.ACTIVE,
    isDonation: false,
    user_id: 'user-id',
    category_id: 'category-id',
    advertisementAddressId: 'address-id',
    isDeleted: false,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    user: mockUser,
    category: mockCategory,
    advertisementAddress: mockAddress,
    images: mockImages,
  };

  const mockUserResponse = {
    id: 'user-id',
    email: 'user@test.com',
    first_name: 'João',
    last_name: 'Silva',
    phone_number: '11999999999',
    profile_picture: null,
  };

  const mockCategoryResponse = {
    id: 'category-id',
    name: 'Materiais',
    description: 'Materiais de construção',
  };

  const mockAddressResponse = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (UserMapper.toResponseDto as jest.Mock).mockReturnValue(mockUserResponse);
    (CategoryMapper.toResponseDto as jest.Mock).mockReturnValue(mockCategoryResponse);
    (AdvertisementAddressMapper.toResponseDto as jest.Mock).mockReturnValue(mockAddressResponse);
  });

  describe('toResponseDto', () => {
    it('deve mapear FullAdvertisement para ResponseAdvertisementDto corretamente', () => {
      const result = AdvertisementMapper.toResponseDto(mockFullAdvertisement);

      expect(result).toEqual({
        id: 'ad-id',
        title: 'Cimento Portland',
        description: 'Cimento de qualidade',
        price: 25.50,
        amount: 50,
        unitOfMeasure: UnitOfMeasure.KG,
        status: AdvertisementStatus.ACTIVE,
        isDonation: false,
        user: mockUserResponse,
        category: mockCategoryResponse,
        advertisementAddress: mockAddressResponse,
        images: mockImages,
      });
    });

    it('deve chamar os mappers de relacionamentos', () => {
      AdvertisementMapper.toResponseDto(mockFullAdvertisement);

      expect(UserMapper.toResponseDto).toHaveBeenCalledWith(mockUser);
      expect(CategoryMapper.toResponseDto).toHaveBeenCalledWith(mockCategory);
      expect(AdvertisementAddressMapper.toResponseDto).toHaveBeenCalledWith(mockAddress);
    });

    it('deve lidar com anúncio sem imagens', () => {
      const adWithoutImages = {
        ...mockFullAdvertisement,
        images: [],
      };

      const result = AdvertisementMapper.toResponseDto(adWithoutImages);

      expect(result.images).toEqual([]);
    });

    it('deve mapear corretamente anúncio de doação', () => {
      const donationAd = {
        ...mockFullAdvertisement,
        isDonation: true,
        price: 0,
      };

      const result = AdvertisementMapper.toResponseDto(donationAd);

      expect(result.isDonation).toBe(true);
      expect(result.price).toBe(0);
    });

    it('deve mapear todos os status possíveis', () => {
      const statuses = [AdvertisementStatus.ACTIVE, AdvertisementStatus.SOLD, AdvertisementStatus.PAUSED];

      statuses.forEach((status) => {
        const ad = { ...mockFullAdvertisement, status };
        const result = AdvertisementMapper.toResponseDto(ad);
        expect(result.status).toBe(status);
      });
    });

    it('deve mapear todas as unidades de medida possíveis', () => {
      const units = [UnitOfMeasure.UNIT, UnitOfMeasure.KG, UnitOfMeasure.LITER, UnitOfMeasure.METER];

      units.forEach((unit) => {
        const ad = { ...mockFullAdvertisement, unitOfMeasure: unit };
        const result = AdvertisementMapper.toResponseDto(ad);
        expect(result.unitOfMeasure).toBe(unit);
      });
    });

    it('deve preservar valores numéricos corretamente', () => {
      const result = AdvertisementMapper.toResponseDto(mockFullAdvertisement);

      expect(result.price).toBe(25.50);
      expect(result.amount).toBe(50);
      expect(typeof result.price).toBe('number');
      expect(typeof result.amount).toBe('number');
    });
  });
});


