import { ImageService } from '../../infra/blob/image.service';
import { put, del} from '@vercel/blob';
import { BadRequestError } from '../../exception/BadRequestError';


jest.mock('@vercel/blob', () => ({
  put: jest.fn(),
  del: jest.fn()
}));


describe('ImageService.upload', () => {
  const imageService = new ImageService();

  const mockFile = {
    buffer: Buffer.from('fake-image'),
    originalname: 'avatar.png'
  } as Express.Multer.File;

  const mockBlob = {
    url: 'https://blob.example.com/profile/avatar.png',
    downloadUrl: 'https://blob.example.com/profile/avatar.png?download=true',
    pathname: '/profile/avatar.png',
    contentType: 'image/png',
    contentDisposition: 'inline'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (put as jest.Mock).mockResolvedValue(mockBlob);
  });

  it('deve lançar BadRequestError se nenhum arquivo for enviado', async () => {
    await expect(imageService.upload('profile', undefined as any)).rejects.toThrow(BadRequestError);
    expect(put).not.toHaveBeenCalled();
  });

  it('deve fazer upload com nome gerado por UUID', async () => {
    const result = await imageService.upload('profile', mockFile);

    expect(put).toHaveBeenCalledWith(expect.stringMatching(/^profile\/.*\.png$/), expect.anything(), expect.objectContaining({
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    }));

    expect(result).toEqual(mockBlob);
  });

  it('deve fazer upload com nome customizado', async () => {
    const result = await imageService.upload('profile', mockFile, 'custom-name');

    expect(put).toHaveBeenCalledWith('profile/custom-name.png', expect.anything(), expect.objectContaining({
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    }));

    expect(result).toEqual(mockBlob);
  });
});


describe('ImageService.deleteBlob', () => {
  const imageService = new ImageService();

  beforeEach(() => {
    jest.clearAllMocks();
    (del as jest.Mock).mockResolvedValue(undefined);
  });

  it('deve chamar del com pathname e token', async () => {
    await imageService.deleteBlob('profile/avatar.png');

    expect(del).toHaveBeenCalledWith('profile/avatar.png', {
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
  });
});

describe('ImageService.extractPath', () => {
  const imageService = new ImageService();

  it('deve extrair pathname da URL completa', () => {
    const url = 'https://blob.example.com/profile/avatar.png';
    const result = imageService.extractPath(url);

    expect(result).toBe('profile/avatar.png');
  });
});