export const UpdateAdvertisementRequest = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      description: 'Título do anúncio',
      example: 'Cesta básica completa'
    },
    description: {
      type: 'string',
      minLength: 10,
      description: 'Descrição detalhada do anúncio',
      example: 'Cesta básica com arroz, feijão, óleo, açúcar e farinha.'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'SOLD'],
      description: 'Status atual do anúncio',
      example: 'ACTIVE'
    },
    price: {
      type: 'number',
      minimum: 0,
      description: 'Preço do item. Deve ser 0 se for doação.',
      example: 50.0
    },
    amount: {
      type: 'number',
      minimum: 1,
      description: 'Quantidade disponível',
      example: 10
    },
    unitOfMeasure: {
      type: 'string',
      enum: ['UNIT', 'KILOGRAM', 'LITER', 'METER'],
      description: 'Unidade de medida',
      example: 'UNIT'
    },
    isDonation: {
      type: 'boolean',
      description: 'Indica se o item é uma doação',
      example: false
    },
    category_id: {
      type: 'string',
      format: 'uuid',
      description: 'ID da categoria do anúncio',
      example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
    }
  },
  required: [],
  additionalProperties: false
};
