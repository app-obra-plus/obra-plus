export const CreateUserRequest = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      description: 'E-mail do usuário',
      example: 'usuario@example.com'
    },
    password: {
      type: 'string',
      minLength: 6,
      description: 'Senha do usuário (mínimo 6 caracteres)',
      example: 'minhaSenha123'
    },
    first_name: {
      type: 'string',
      minLength: 2,
      description: 'Nome do usuário',
      example: 'João'
    },
    last_name: {
      type: 'string',
      minLength: 2,
      description: 'Sobrenome do usuário',
      example: 'Henrique'
    },
    phone_number: {
      type: 'string',
      minLength: 11,
      description: 'Número de telefone com DDD',
      example: '31991234567'
    },
    profile_picture: {
      type: 'string',
      format: 'uri',
      description: 'URL da foto de perfil (opcional)',
      nullable: true,
      example: 'https://exemplo.com/foto.jpg'
    }
  },
  required: ['email', 'password', 'first_name', 'last_name', 'phone_number']
};
