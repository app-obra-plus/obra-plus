
export const AdvertisementResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'ID único do anúncio',
      example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
    },
    title: {
      type: 'string',
      description: 'Título do anúncio',
      example: 'Tijolos'
    },
    description: {
      type: 'string',
      description: 'Descrição detalhada do anúncio',
      example: 'Tijolos em ótimo estado para construção'
    },
    price: {
      type: 'number',
      description: 'Preço do item (0 se for doação)',
      example: 0
    },
    status: {
      type: 'string',
      enum: ['ACTIVE','SOLD','PAUSED'],
      description: 'Status atual do anúncio',
      example: 'ACTIVE'
    },
    isDonation: {
      type: 'boolean',
      description: 'Indica se o anúncio é uma doação',
      example: true
    },
    user_id: {
      type: 'string',
      format: 'uuid',
      description: 'ID do usuário que criou o anúncio',
      example: 'f1e2d3c4-b5a6-7890-abcd-0987654321fe'
    },
    category_id: {
      type: 'string',
      format: 'uuid',
      description: 'ID da categoria do anúncio',
      example: 'c1d2e3f4-a5b6-7890-abcd-112233445566'
    },
    advertisementAddressId: {
      type: 'string',
      format: 'uuid',
      description: 'ID do endereço vinculado ao anúncio',
      example: 'd4c3b2a1-e6f5-7890-abcd-667788990011'
    },
    images: {
        type: 'array',
        items: {
            $ref: '#/components/schemas/ImageResponse'
        }
    }

  },
  required: [
    'id',
    'title',
    'description',
    'price',
    'status',
    'isDonation',
    'user_id',
    'category_id',
    'advertisementAddressId',
    'images'
  ]
};
