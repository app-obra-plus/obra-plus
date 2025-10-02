export const AddressResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'ID do endereço',
      example: '2c4e68d1-874d-4849-8af0-d9b26ca53b19'
    },
    addressName: {
      type: 'string',
      description: 'Nome do endereço',
      example: 'Obra A'
    },
    street: {
      type: 'string',
      description: 'Nome da rua',
      example: 'Rua das Laranjeiras'
    },
    number: {
      type: 'string',
      description: 'Número do imóvel',
      example: '123'
    },
    complement: {
      type: 'string',
      nullable: true,
      description: 'Complemento do endereço (opcional)',
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
    },
    user_id: {
      type: 'string',
      format: 'uuid',
      description: 'ID do usuário dono do endereço',
      example: '52c0c80d-1111-44f4-bf36-77cb0326e287'
    }
  }
};
