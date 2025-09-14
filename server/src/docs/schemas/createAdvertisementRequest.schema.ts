export const CreateAdvertisementRequest = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      description: 'Título do anúncio',
      example: 'Doação de roupas infantis'
    },
    description: {
      type: 'string',
      minLength: 10,
      description: 'Descrição detalhada do anúncio',
      example: 'Roupas em ótimo estado para crianças de 2 a 5 anos'
    },
    price: {
      type: 'number',
      minimum: 0,
      description: 'Preço do item (deve ser 0 se for doação)',
      example: 0
    },
    amount: {
      type: 'number',
      minimum: 1,
      description: 'Quantidade disponível',
      example: 10
    },
    unitOfMeasure: {
      type: 'string',
      enum: ['UNIT', 'KG', 'LITER', 'METER'],
      description: 'Unidade de medida da quantidade',
      example: 'UNIT'
    },
    isDonation: {
      type: 'boolean',
      description: 'Indica se o anúncio é uma doação',
      example: true
    },
    category_id: {
      type: 'string',
      format: 'uuid',
      description: 'ID da categoria do anúncio',
      example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
    },
    addressId: {
      type: 'string',
      format: 'uuid',
      description: 'ID do endereço associado ao anúncio',
      example: 'f1e2d3c4-b5a6-7890-abcd-0987654321fe'
    }
  },
  required: [
    'title',
    'description',
    'price',
    'amount',
    'unitOfMeasure',
    'isDonation',
    'category_id',
    'addressId'
  ]
};
