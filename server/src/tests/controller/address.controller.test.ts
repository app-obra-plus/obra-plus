// tests/controllers/address.controller.test.ts
import {
  createAddress,
  getAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
} from '../../../src/modules/address/address.controller';
import * as addressModule from '../../modules/address/address.service'

import { validateSchema } from '../../../src/utils/validateRequest';
import { Request, Response } from 'express';
import { AddressResponseDto } from '../../modules/address/dto/AddressResponseDto';

jest.mock('../../../src/modules/address/address.service');
jest.mock('../../../src/utils/validateRequest');

const mockRes = () => {
  const res = {} as Partial<Response>;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  res.send = jest.fn();
  return res as Response;
};
interface AuthRequest extends Request {
  auth: { userId: string };
}

describe('createAddress', () => {
  it('deve validar, criar endereço e retornar 201 com dados', async () => {
    const req = {
      body: {
        street: 'Rua A',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01000-000',
        neighborhood: 'Centro',
        country: 'Brasil',
        latitude: -23.5,
        longitude: -46.6,
      },
      auth: { userId: 'user-123' },
      get: jest.fn(),
      header: jest.fn(),
    } as unknown as AuthRequest;

    const res = mockRes();

    const validatedDto = { ...req.body };
    const mockResponse = { id: 'addr-001', ...validatedDto };

    (validateSchema as jest.Mock).mockReturnValue(validatedDto);

    const createAddressMock = jest.spyOn(addressModule.AddressService.prototype, 'createAddress')
      .mockResolvedValue(mockResponse);

    await createAddress(req, res);

    expect(validateSchema).toHaveBeenCalledWith(expect.anything(), req.body);
    expect(createAddressMock).toHaveBeenCalledWith(validatedDto, req.auth.userId);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResponse);

    createAddressMock.mockRestore();
  });
});

describe('getAddress', () => {
  it('deve retornar o endereço buscado', async () => {
    const req = {
      params: { addressId: 'addr-001' },
    } as unknown as AuthRequest;

    const res = mockRes();

    const mockResponse: AddressResponseDto = {
        id: 'addr-001',
        street: 'Rua B',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01000-000',
        country: 'Brasil',
        latitude: -23.5,
        longitude: -46.6,
        complement: null, 
    };

    const getAddressByIdMock = jest.spyOn(addressModule.AddressService.prototype, 'getAddressById')
      .mockResolvedValue(mockResponse);

    await getAddress(req, res);

    expect(getAddressByIdMock).toHaveBeenCalledWith('addr-001');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);

    getAddressByIdMock.mockRestore();
  });
});

describe('getAllAddress', () => {
  it('deve retornar todos os endereços do usuário', async () => {
    const req = {
      params: { userId: 'user-123' },
    } as unknown as AuthRequest;

    const res = mockRes();


    const mockResponse: AddressResponseDto[] = [
    {
        id: 'addr-001',
        street: 'Rua B',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01000-000',
        country: 'Brasil',
        latitude: -23.5,
        longitude: -46.6,
        complement: null,
    },
  
];
   
    const getAllAddressesMock = jest.spyOn(addressModule.AddressService.prototype, 'getAllAddresses')
      .mockResolvedValue(mockResponse);

    await getAllAddress(req, res);

    expect(getAllAddressesMock).toHaveBeenCalledWith('user-123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);

    getAllAddressesMock.mockRestore();
  });
});

describe('updateAddress', () => {
  it('deve atualizar e retornar o endereço', async () => {
    const req = {
      params: { addressId: 'addr-123' },
      body: { city: 'Nova Cidade' },
    } as unknown as AuthRequest;

    const res = mockRes();

        const mockResponse: AddressResponseDto = {
        id: 'addr-001',
        street: 'Rua B',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postal_code: '01000-000',
        country: 'Brasil',
        latitude: -23.5,
        longitude: -46.6,
        complement: null, 
    };


    const updateAddressMock = jest.spyOn(addressModule.AddressService.prototype, 'updateAddress')
      .mockResolvedValue(mockResponse);

    await updateAddress(req, res);

    expect(updateAddressMock).toHaveBeenCalledWith('addr-123', req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);

    updateAddressMock.mockRestore();
  });
});

describe('deleteAddress', () => {
  it('deve deletar o endereço e retornar 204', async () => {
    const req = {
      params: { addressId: 'addr-001' },
    } as unknown as AuthRequest;

    const res = mockRes();

    const deleteAddressMock = jest.spyOn(addressModule.AddressService.prototype, 'deleteAddress')
      .mockResolvedValue(undefined);

    await deleteAddress(req, res);

    expect(deleteAddressMock).toHaveBeenCalledWith('addr-001');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();

    deleteAddressMock.mockRestore();
  });
});