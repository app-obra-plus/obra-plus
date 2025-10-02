export const CreateAddressRequest = {
  type: 'object',
  properties: {
    street: {
      type: 'string',
      minLength: 1,
      description: 'Nome da rua',
      example: 'Rua das Laranjeiras'
    },
    addressName: {
      type: 'string',
      description: 'Nome do endereço',
      example: 'Obra A'
    },
    number: {
      type: 'string',
      minLength: 1,
      description: 'Número do imóvel',
      example: '123'
    },
    complement: {
      type: 'string',
      description: 'Complemento do endereço (opcional)',
      example: 'Apto 202',
      nullable: true
    },
    neighborhood: {
      type: 'string',
      minLength: 1,
      description: 'Bairro',
      example: 'Centro'
    },
    city: {
      type: 'string',
      minLength: 1,
      description: 'Cidade',
      example: 'São Paulo'
    },
    state: {
      type: 'string',
      minLength: 1,
      description: 'Estado',
      example: 'SP'
    },
    postal_code: {
      type: 'string',
      minLength: 1,
      description: 'CEP',
      example: '01000-000'
    },
    country: {
      type: 'string',
      minLength: 1,
      description: 'País',
      example: 'Brasil'
    },
    latitude: {
      type: 'number',
      description: 'Latitude do endereço',
      example: -23.55052
    },
    longitude: {
      type: 'number',
      description: 'Longitude do endereço',
      example: -46.63331
    }
  },
  required: [
    'street',
    'number',
    'neighborhood',
    'city',
    'state',
    'postal_code',
    'country',
    'latitude',
    'longitude'
  ]
};
