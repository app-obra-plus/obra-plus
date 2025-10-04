import { getPaginationParams, parseAdvertisementPaginationParams, parseUserAdvertisementParams } from '../utils/pagination/pagination';
import { OrderDirection, OrderField } from '../utils/pagination/pagination.types';

describe('getPaginationParams', () => {
  it('deve retornar valores padrão quando page e limit não forem fornecidos', () => {
    const query = {
      orderField: 'createdAt',
      orderDirection: 'desc'
    };

    const result = getPaginationParams(query);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      order: {
        field: 'createdAt',
        direction: 'desc'
      }
    });
  });

  it('deve converter page e limit para número e retornar corretamente', () => {
    const query = {
      page: '3',
      limit: '25',
      orderField: 'price',
      orderDirection: 'asc'
    };

    const result = getPaginationParams(query);

    expect(result).toEqual({
      page: 3,
      limit: 25,
      order: {
        field: 'price',
        direction: 'asc'
      }
    });
  });
});

describe('parseAdvertisementPaginationParams', () => {
  it('deve converter todos os campos corretamente', () => {
    const query = {
        page: '2',
        limit: '15',
        orderField: 'price' as OrderField, 
        orderDirection: 'asc' as OrderDirection,
        priceMax: '1000',
        categoryId: 'cat123',
        text: 'celular',
        distanceMax: '50',
        userLatitude: '-19.9',
        userLongitude: '-43.8'
    };

    const result = parseAdvertisementPaginationParams(query);

    expect(result).toEqual({
      page: 2,
      limit: 15,
      order: {
        field: 'price',
        direction: 'asc'
      },
      priceMax: 1000,
      categoryId: 'cat123',
      text: 'celular',
      distanceMax: 50,
      userLatitude: -19.9,
      userLongitude: -43.8
    });
  });

  it('deve retornar priceMax como undefined se não fornecido', () => {
    const query = {
      page: '1',
      limit: '10',
      orderField: 'created_at' as OrderField,
      orderDirection: 'desc' as OrderDirection,
      categoryId: 'cat456',
      text: 'bicicleta',
      distanceMax: '20',
      userLatitude: '-20.0',
      userLongitude: '-44.0'
    };

    const result = parseAdvertisementPaginationParams(query);

    expect(result.priceMax).toBeUndefined();
  });
});

describe('parseUserAdvertisementParams', () => {
  it('deve converter os campos corretamente', () => {
    const query = {
      page: '1',
      limit: '5',
      orderField: 'created_at' as OrderField,
      orderDirection: 'desc' as OrderDirection,
      priceMax: '500',
      categoryId: 'cat789',
      text: 'notebook'
    };

    const result = parseUserAdvertisementParams(query);

    expect(result).toEqual({
      page: 1,
      limit: 5,
      order: {
        field: 'created_at',
        direction: 'desc'
      },
      priceMax: 500,
      categoryId: 'cat789',
      text: 'notebook'
    });
  });

  it('deve retornar priceMax como undefined se não fornecido', () => {
    const query = {
      page: '1',
      limit: '10',
      orderField: 'created_at' as const,
      orderDirection: 'asc' as const,
      categoryId: 'cat000',
      text: 'livro'
    };

    const result = parseUserAdvertisementParams(query);

    expect(result.priceMax).toBeUndefined();
  });
});