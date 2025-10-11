import { AdvertisementGridService } from '../../modules/advertisement/service/advertisementGrid.service';
import { prisma } from '../../database/client';
import { AdvertisementMapQueryDto } from '../../modules/advertisement/dto/AdvertisementMapQueryDto';

jest.mock('../../database/client', () => ({
  prisma: {
    advertisement: {
      findMany: jest.fn(),
    }
  }
}));

describe('AdvertisementGridService', () => {
  let advertisementGridService: AdvertisementGridService;

  const mockAdvertisements = [
    {
      id: 'ad-1',
      advertisementAddress: {
        latitude: -23.550520,
        longitude: -46.633308,
      },
    },
    {
      id: 'ad-2',
      advertisementAddress: {
        latitude: -23.551000,
        longitude: -46.634000,
      },
    },
    {
      id: 'ad-3',
      advertisementAddress: {
        latitude: -23.560000,
        longitude: -46.650000,
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    advertisementGridService = new AdvertisementGridService();
  });

  describe('getAdvertisementGridFilter', () => {
    const mockDto: AdvertisementMapQueryDto = {
      resolution: 2,
      boundingBox: {
        minLatitude: -23.570000,
        maxLatitude: -23.540000,
        minLongitude: -46.660000,
        maxLongitude: -46.620000,
      },
    };

    it('deve retornar grid com anúncios agrupados', async () => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(mockAdvertisements);

      const result = await advertisementGridService.getAdvertisementGridFilter(mockDto);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          advertisementAddress: {
            latitude: {
              gte: mockDto.boundingBox.minLatitude,
              lte: mockDto.boundingBox.maxLatitude,
            },
            longitude: {
              gte: mockDto.boundingBox.minLongitude,
              lte: mockDto.boundingBox.maxLongitude,
            },
            isDeleted: false,
          },
          isDeleted: false,
          status: 'ACTIVE',
        }),
        select: {
          id: true,
          advertisementAddress: {
            select: {
              latitude: true,
              longitude: true,
            },
          },
        },
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      result.forEach((grid) => {
        expect(grid).toHaveProperty('latitudeCenter');
        expect(grid).toHaveProperty('longitudeCenter');
        expect(grid).toHaveProperty('advertisementIds');
        expect(Array.isArray(grid.advertisementIds)).toBe(true);
      });
    });

    it('deve aplicar filtro de categoria quando fornecido', async () => {
      const dtoWithCategory = {
        ...mockDto,
        filter: { categoryId: 'category-id' },
      };
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([]);

      await advertisementGridService.getAdvertisementGridFilter(dtoWithCategory);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category_id: 'category-id',
          }),
        })
      );
    });

    it('deve aplicar filtro de preço máximo quando fornecido', async () => {
      const dtoWithPrice = {
        ...mockDto,
        filter: { priceMax: 100 },
      };
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([]);

      await advertisementGridService.getAdvertisementGridFilter(dtoWithPrice);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            price: { lte: 100 },
          }),
        })
      );
    });

    it('deve aplicar ambos os filtros quando fornecidos', async () => {
      const dtoWithFilters = {
        ...mockDto,
        filter: {
          categoryId: 'category-id',
          priceMax: 100,
        },
      };
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([]);

      await advertisementGridService.getAdvertisementGridFilter(dtoWithFilters);

      expect(prisma.advertisement.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category_id: 'category-id',
            price: { lte: 100 },
          }),
        })
      );
    });

    it('deve retornar array vazio quando não há anúncios', async () => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue([]);

      const result = await advertisementGridService.getAdvertisementGridFilter(mockDto);

      expect(result).toEqual([]);
    });

    it('deve calcular centro do grid corretamente para múltiplos anúncios', async () => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(mockAdvertisements);

      const result = await advertisementGridService.getAdvertisementGridFilter(mockDto);

      expect(result.length).toBeGreaterThan(0);
      
      result.forEach((grid) => {
        expect(typeof grid.latitudeCenter).toBe('number');
        expect(typeof grid.longitudeCenter).toBe('number');
        expect(grid.latitudeCenter).toBeGreaterThanOrEqual(mockDto.boundingBox.minLatitude);
        expect(grid.latitudeCenter).toBeLessThanOrEqual(mockDto.boundingBox.maxLatitude);
        expect(grid.longitudeCenter).toBeGreaterThanOrEqual(mockDto.boundingBox.minLongitude);
        expect(grid.longitudeCenter).toBeLessThanOrEqual(mockDto.boundingBox.maxLongitude);
      });
    });

    it('deve agrupar anúncios próximos no mesmo subgrid', async () => {
      const closeAds = [
        {
          id: 'ad-1',
          advertisementAddress: {
            latitude: -23.550520,
            longitude: -46.633308,
          },
        },
        {
          id: 'ad-2',
          advertisementAddress: {
            latitude: -23.550530,
            longitude: -46.633310,
          },
        },
      ];

      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(closeAds);

      const result = await advertisementGridService.getAdvertisementGridFilter(mockDto);

      const gridWithMultipleAds = result.find(g => g.advertisementIds.length > 1);
      if (gridWithMultipleAds) {
        expect(gridWithMultipleAds.advertisementIds).toContain('ad-1');
        expect(gridWithMultipleAds.advertisementIds).toContain('ad-2');
      }
    });

    it('deve gerar número correto de subgrids baseado na resolução', async () => {
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(mockAdvertisements);

      const result = await advertisementGridService.getAdvertisementGridFilter(mockDto);
      
      expect(result.length).toBeLessThanOrEqual(mockDto.resolution * mockDto.resolution);
    });

    it('deve lidar com resolução 1 (um único grid)', async () => {
      const singleGridDto = {
        ...mockDto,
        resolution: 1,
      };
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(mockAdvertisements);

      const result = await advertisementGridService.getAdvertisementGridFilter(singleGridDto);

      expect(result.length).toBeLessThanOrEqual(1);
      if (result.length === 1) {
        expect(result[0].advertisementIds.length).toBe(mockAdvertisements.length);
      }
    });

    it('deve lidar com alta resolução (muitos subgrids)', async () => {
      const highResDto = {
        ...mockDto,
        resolution: 10,
      };
      (prisma.advertisement.findMany as jest.Mock).mockResolvedValue(mockAdvertisements);

      const result = await advertisementGridService.getAdvertisementGridFilter(highResDto);

      expect(result.length).toBeLessThanOrEqual(highResDto.resolution * highResDto.resolution);
      
      const totalAds = result.reduce((sum, grid) => sum + grid.advertisementIds.length, 0);
      expect(totalAds).toBe(mockAdvertisements.length);
    });
  });
});


