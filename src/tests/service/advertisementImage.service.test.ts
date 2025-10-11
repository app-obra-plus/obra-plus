import { AdvertisementImageService } from '../../modules/advertisement/service/advertisementImage.service';
import { prisma } from '../../database/client';
import { ImageService } from '../../infra/blob/image.service';
import { BadRequestError } from '../../exception/BadRequestError';
import { PutBlobResult } from '@vercel/blob';

jest.mock('../../database/client', () => ({
  prisma: {
    image: {
      createMany: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    }
  }
}));
jest.mock('../../infra/blob/image.service');

describe('AdvertisementImageService', () => {
  let advertisementImageService: AdvertisementImageService;
  let mockImageService: jest.Mocked<ImageService>;

  const mockUploadedImages: PutBlobResult[] = [
    {
      url: 'https://blob.example.com/images/image1.jpg',
      pathname: 'images/image1.jpg',
      downloadUrl: 'https://blob.example.com/images/image1.jpg?download=true',
      contentType: 'image/jpeg',
      contentDisposition: 'inline',
    },
    {
      url: 'https://blob.example.com/images/image2.jpg',
      pathname: 'images/image2.jpg',
      downloadUrl: 'https://blob.example.com/images/image2.jpg?download=true',
      contentType: 'image/jpeg',
      contentDisposition: 'inline',
    },
  ];

  const mockDbImages = [
    {
      id: 'image-id-1',
      url: 'https://blob.example.com/images/image1.jpg',
      pathname: 'images/image1.jpg',
      advertisement_id: 'ad-id',
      created_at: new Date(),
    },
    {
      id: 'image-id-2',
      url: 'https://blob.example.com/images/image2.jpg',
      pathname: 'images/image2.jpg',
      advertisement_id: 'ad-id',
      created_at: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    advertisementImageService = new AdvertisementImageService();
    mockImageService = advertisementImageService['imageService'] as jest.Mocked<ImageService>;
  });

  describe('saveMultipleImages', () => {
    const advertisementId = 'ad-id';

    it('deve salvar múltiplas imagens com sucesso', async () => {
      const createManyResult = { count: 2 };
      (prisma.image.createMany as jest.Mock).mockResolvedValue(createManyResult);

      const result = await advertisementImageService.saveMultipleImages(
        advertisementId,
        mockUploadedImages
      );

      expect(prisma.image.createMany).toHaveBeenCalledWith({
        data: [
          {
            url: mockUploadedImages[0].url,
            advertisement_id: advertisementId,
            pathname: mockUploadedImages[0].pathname,
          },
          {
            url: mockUploadedImages[1].url,
            advertisement_id: advertisementId,
            pathname: mockUploadedImages[1].pathname,
          },
        ],
      });
      expect(result).toEqual(createManyResult);
    });

    it('deve processar corretamente uma única imagem', async () => {
      const singleImage = [mockUploadedImages[0]];
      const createManyResult = { count: 1 };
      (prisma.image.createMany as jest.Mock).mockResolvedValue(createManyResult);

      const result = await advertisementImageService.saveMultipleImages(
        advertisementId,
        singleImage
      );

      expect(prisma.image.createMany).toHaveBeenCalledWith({
        data: [
          {
            url: singleImage[0].url,
            advertisement_id: advertisementId,
            pathname: singleImage[0].pathname,
          },
        ],
      });
      expect(result).toEqual(createManyResult);
    });

    it('deve processar lista vazia de imagens', async () => {
      const createManyResult = { count: 0 };
      (prisma.image.createMany as jest.Mock).mockResolvedValue(createManyResult);

      const result = await advertisementImageService.saveMultipleImages(
        advertisementId,
        []
      );

      expect(prisma.image.createMany).toHaveBeenCalledWith({
        data: [],
      });
      expect(result).toEqual(createManyResult);
    });
  });

  describe('deleteImageById', () => {
    const imageId = 'image-id-1';
    const mockImage = mockDbImages[0];

    it('deve deletar imagem do blob e banco de dados com sucesso', async () => {
      (prisma.image.findUnique as jest.Mock).mockResolvedValue(mockImage);
      (mockImageService.deleteBlob as jest.Mock).mockResolvedValue(undefined);
      (prisma.image.delete as jest.Mock).mockResolvedValue(mockImage);

      await advertisementImageService.deleteImageById(imageId);

      expect(prisma.image.findUnique).toHaveBeenCalledWith({
        where: { id: imageId },
      });
      expect(mockImageService.deleteBlob).toHaveBeenCalledWith(mockImage.pathname);
      expect(prisma.image.delete).toHaveBeenCalledWith({
        where: { id: imageId },
      });
    });

    it('deve lançar BadRequestError se imagem não existir', async () => {
      (prisma.image.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(advertisementImageService.deleteImageById(imageId))
        .rejects.toThrow(BadRequestError);
      await expect(advertisementImageService.deleteImageById(imageId))
        .rejects.toThrow('Imagem não encontrada');

      expect(prisma.image.findUnique).toHaveBeenCalledWith({
        where: { id: imageId },
      });
      expect(mockImageService.deleteBlob).not.toHaveBeenCalled();
      expect(prisma.image.delete).not.toHaveBeenCalled();
    });

    it('deve propagar erro se deleteBlob falhar', async () => {
      const blobError = new Error('Erro ao deletar do blob storage');
      (prisma.image.findUnique as jest.Mock).mockResolvedValue(mockImage);
      (mockImageService.deleteBlob as jest.Mock).mockRejectedValue(blobError);

      await expect(advertisementImageService.deleteImageById(imageId))
        .rejects.toThrow(blobError);

      expect(prisma.image.findUnique).toHaveBeenCalled();
      expect(mockImageService.deleteBlob).toHaveBeenCalled();
      expect(prisma.image.delete).not.toHaveBeenCalled();
    });
  });

  describe('getImages', () => {
    const advertisementId = 'ad-id';

    it('deve retornar todas as imagens de um anúncio', async () => {
      (prisma.image.findMany as jest.Mock).mockResolvedValue(mockDbImages);

      const result = await advertisementImageService.getImages(advertisementId);

      expect(prisma.image.findMany).toHaveBeenCalledWith({
        where: { advertisement_id: advertisementId },
      });
      expect(result).toHaveLength(2);
    });

    it('deve retornar array vazio se não houver imagens', async () => {
      (prisma.image.findMany as jest.Mock).mockResolvedValue([]);

      const result = await advertisementImageService.getImages(advertisementId);

      expect(prisma.image.findMany).toHaveBeenCalledWith({
        where: { advertisement_id: advertisementId },
      });
      expect(result).toEqual([]);
    });
  });
});


