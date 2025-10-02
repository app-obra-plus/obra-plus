export const UpdateAddressRequest = {
  type: 'object',
  properties: {
    street: {
      type: 'string',
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
      description: 'Número do imóvel',
      example: '123'
    },
    complement: {
      type: 'string',
      description: 'Complemento do endereço',
      nullable: true,
      example: 'Apto 202'
    },
    neighborhood: {
      type: 'string',
      description: 'Bairro',
      example: 'Centro'
    },
    city: {
      type: 'string',
      description: 'Cidade',
      example: 'São Paulo'
    },
    state: {
      type: 'string',
      description: 'Estado',
      example: 'SP'
    },
    postal_code: {
      type: 'string',
      description: 'CEP',
      example: '01000-000'
    },
    country: {
      type: 'string',
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
  additionalProperties: false
};
