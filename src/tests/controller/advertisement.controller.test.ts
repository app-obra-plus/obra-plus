import { Request, Response } from 'express';
import {
  createAdvertisement,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementsPage,
  getUserAdvertisements,
  getAdvertisementsByIds,
} from '../../modules/advertisement/advertisement.controller';
import { UnitOfMeasure } from '../../generated/prisma';

jest.mock('../../modules/advertisement/service/advertisement.service');
jest.mock('../../modules/advertisement/service/advertisementImage.service');
jest.mock('../../modules/advertisement/service/advertisementGrid.service');
jest.mock('../../infra/blob/image.service');

describe('AdvertisementController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: jest.fn() });

    mockRequest = {
      body: {},
      params: {},
      query: {},
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
      send: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('createAdvertisement', () => {
    it('deve ter a função createAdvertisement definida', () => {
      expect(typeof createAdvertisement).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(createAdvertisement.length).toBe(2);
    });
  });

  describe('getAdvertisementById', () => {
    it('deve ter a função getAdvertisementById definida', () => {
      expect(typeof getAdvertisementById).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(getAdvertisementById.length).toBe(2);
    });
  });

  describe('updateAdvertisement', () => {
    it('deve ter a função updateAdvertisement definida', () => {
      expect(typeof updateAdvertisement).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(updateAdvertisement.length).toBe(2);
    });
  });

  describe('deleteAdvertisement', () => {
    it('deve ter a função deleteAdvertisement definida', () => {
      expect(typeof deleteAdvertisement).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(deleteAdvertisement.length).toBe(2);
    });
  });

  describe('getAdvertisementsPage', () => {
    it('deve ter a função getAdvertisementsPage definida', () => {
      expect(typeof getAdvertisementsPage).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(getAdvertisementsPage.length).toBe(2);
    });
  });

  describe('getUserAdvertisements', () => {
    it('deve ter a função getUserAdvertisements definida', () => {
      expect(typeof getUserAdvertisements).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(getUserAdvertisements.length).toBe(2);
    });
  });

  describe('getAdvertisementsByIds', () => {
    it('deve ter a função getAdvertisementsByIds definida', () => {
      expect(typeof getAdvertisementsByIds).toBe('function');
    });

    it('deve aceitar req e res como parâmetros', () => {
      expect(getAdvertisementsByIds.length).toBe(2);
    });
  });

  describe('Estrutura do Controller', () => {
    it('deve exportar todas as funções esperadas', () => {
      expect(createAdvertisement).toBeDefined();
      expect(getAdvertisementById).toBeDefined();
      expect(updateAdvertisement).toBeDefined();
      expect(deleteAdvertisement).toBeDefined();
      expect(getAdvertisementsPage).toBeDefined();
      expect(getUserAdvertisements).toBeDefined();
      expect(getAdvertisementsByIds).toBeDefined();
    });

    it('todas as funções devem ser do tipo function', () => {
      expect(typeof createAdvertisement).toBe('function');
      expect(typeof getAdvertisementById).toBe('function');
      expect(typeof updateAdvertisement).toBe('function');
      expect(typeof deleteAdvertisement).toBe('function');
      expect(typeof getAdvertisementsPage).toBe('function');
      expect(typeof getUserAdvertisements).toBe('function');
      expect(typeof getAdvertisementsByIds).toBe('function');
    });
  });
});

