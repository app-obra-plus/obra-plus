import { ImageMapper } from '../../modules/advertisement/dto/mapper/ImageMapper';
import { Image } from '../../generated/prisma';

describe('ImageMapper', () => {
  describe('toResponseDto', () => {
    const mockImage: Image = {
      id: 'image-id',
      url: 'https://blob.example.com/images/img1.jpg',
      pathname: 'images/img1.jpg',
      advertisement_id: 'ad-id',
      created_at: new Date('2024-01-01'),
    };

    it('deve mapear Image para ResponseImageDto corretamente', () => {
      const result = ImageMapper.toResponseDto(mockImage);

      expect(result).toEqual({
        id: 'image-id',
        url: 'https://blob.example.com/images/img1.jpg',
      });
    });

    it('deve incluir apenas id e url no DTO de resposta', () => {
      const result = ImageMapper.toResponseDto(mockImage);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('url');
      expect(result).not.toHaveProperty('pathname');
      expect(result).not.toHaveProperty('advertisement_id');
      expect(result).not.toHaveProperty('created_at');
    });

    it('deve preservar valores de id e url intactos', () => {
      const result = ImageMapper.toResponseDto(mockImage);

      expect(result.id).toBe(mockImage.id);
      expect(result.url).toBe(mockImage.url);
    });

    it('deve lidar com diferentes formatos de URL', () => {
      const imageWithDifferentUrl = {
        ...mockImage,
        url: 'https://cdn.example.com/path/to/image.png',
      };

      const result = ImageMapper.toResponseDto(imageWithDifferentUrl);

      expect(result.url).toBe('https://cdn.example.com/path/to/image.png');
    });

    it('deve lidar com diferentes formatos de ID', () => {
      const imageWithDifferentId = {
        ...mockImage,
        id: '123e4567-e89b-12d3-a456-426614174000',
      };

      const result = ImageMapper.toResponseDto(imageWithDifferentId);

      expect(result.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });
  });
});


