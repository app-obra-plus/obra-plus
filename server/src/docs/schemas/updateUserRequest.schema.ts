export const UpdateUserRequest = {
  type: 'object',
  properties: {
    first_name: {
      type: 'string',
      minLength: 2,
      description: 'Nome (opcional)'
    },
    last_name: {
      type: 'string',
      minLength: 2,
      description: 'Sobrenome (opcional)'
    },
    phone_number: {
      type: 'string',
      minLength: 11,
      description: 'Número de telefone (opcional)'
    },
    profile_picture: {
      type: 'string',
      format: 'uri',
      description: 'URL da foto de perfil (opcional)'
    }
  },
  additionalProperties: false
};
