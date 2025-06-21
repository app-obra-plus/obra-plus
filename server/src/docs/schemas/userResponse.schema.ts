
export const UserResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phone_number: {
      type: 'string'
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    profile_picture: {
      type: 'string',
      nullable: true,
      description: 'URL da foto de perfil (opcional)'
    },
    active: {
      type: 'boolean'
    }
  },
  required: ['id', 'email', 'phone_number', 'first_name', 'last_name', 'active']
};
