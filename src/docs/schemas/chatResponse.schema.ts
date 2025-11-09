export const ChatResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Identificador único do chat',
      example: '550e8400-e29b-41d4-a716-446655440000'
    },
    name: {
      type: 'string',
      nullable: true,
      description: 'Nome do chat (nulo em chats privados)',
      example: 'Chat da Obra A'
    },
    type: {
      type: 'string',
      enum: ['PRIVATE', 'GROUP'],
      description: 'Tipo do chat: privado (entre dois usuários) ou em grupo',
      example: 'PRIVATE'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora de criação do chat',
      example: '2025-10-27T18:30:00Z'
    },
    participants: {
      type: 'array',
      description: 'Lista de participantes do chat com seus papéis e informações',
      items: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
            enum: ['MEMBER', 'ADMIN'],
            description: 'Papel do participante no chat',
            example: 'MEMBER'
          },
          joinedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data e hora em que o usuário entrou no chat',
            example: '2025-10-27T18:35:00Z'
          },
          user: {
            type: 'object',
            description: 'Informações do usuário participante',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'ID do usuário',
                example: '123e4567-e89b-12d3-a456-426614174000'
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email do usuário',
                example: 'usuario@exemplo.com'
              },
              first_name: {
                type: 'string',
                description: 'Primeiro nome do usuário',
                example: 'Pedro'
              },
              last_name: {
                type: 'string',
                description: 'Sobrenome do usuário',
                example: 'Santos'
              },
              profile_picture: {
                type: 'string',
                nullable: true,
                description: 'URL da foto de perfil (pode ser nulo)',
                example: 'https://example.com/profile.jpg'
              }
            },
            required: ['id', 'email', 'first_name', 'last_name']
          }
        },
        required: ['role', 'joinedAt', 'user']
      }
    }
  },
  required: ['id', 'type', 'createdAt', 'participants']
};


