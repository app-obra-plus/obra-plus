
export const ChatSummary = {
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
      description: 'Nome do chat (nulo em conversas privadas)',
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
    role: {
      type: 'string',
      enum: ['MEMBER', 'ADMIN'],
      description: 'Papel do usuário atual neste chat',
      example: 'MEMBER'
    },
    joinedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora em que o usuário atual entrou no chat',
      example: '2025-10-27T18:35:00Z'
    },
    participants: {
      type: 'array',
      description: 'Lista de participantes do chat com seus papéis e informações básicas',
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
            description: 'Data e hora em que o participante entrou no chat',
            example: '2025-10-27T18:40:00Z'
          },
          user: {
            type: 'object',
            description: 'Informações básicas do usuário participante',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'ID do usuário',
                example: '123e4567-e89b-12d3-a456-426614174000'
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
                description: 'URL da foto de perfil (pode ser nula)',
                example: 'https://example.com/profile.jpg'
              }
            },
            required: ['id', 'first_name', 'last_name']
          }
        },
        required: ['role', 'joinedAt', 'user']
      },
      example: [
        {
          role: 'MEMBER',
          joinedAt: '2025-10-27T18:35:00Z',
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            first_name: 'Lucas',
            last_name: 'Silva',
            profile_picture: 'https://example.com/profile.jpg'
          }
        },
        {
          role: 'MEMBER',
          joinedAt: '2025-10-27T18:40:00Z',
          user: {
            id: '987e6543-e21b-12d3-a456-426655440000',
            first_name: 'Pedro',
            last_name: 'Santos',
            profile_picture: null
          }
        }
      ]
    },

    lastMessage: {
      type: 'object',
      nullable: true,
      description: 'Última mensagem enviada no chat (ou nulo se não houver mensagens)',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          description: 'ID da última mensagem',
          example: '7a13a410-4a6e-4b8f-b3aa-32a46b0bcb9c'
        },
        content: {
          type: 'string',
          description: 'Conteúdo textual da última mensagem',
          example: 'Boa tarde!'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de envio da mensagem',
          example: '2025-10-27T19:00:00Z'
        },
        sender: {
          type: 'object',
          description: 'Informações do remetente da última mensagem',
          properties: {
            first_name: {
              type: 'string',
              description: 'Primeiro nome do remetente',
              example: 'Lucas'
            },
            last_name: {
              type: 'string',
              description: 'Sobrenome do remetente',
              example: 'Silva'
            }
          },
          required: ['first_name', 'last_name']
        }
      },
      required: ['id', 'content', 'createdAt', 'sender']
    }
  },
  required: [
    'id',
    'type',
    'createdAt',
    'role',
    'joinedAt',
    'participants'
  ]
};


export const PaginatedChatSummary = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {$ref:'#/components/schemas/ChatSummary'},
      description: 'Lista de chats da página atual'
    },
    pagination: {  items: {$ref:'#/components/schemas/PaginationMeta'}}
  },
  required: ['data', 'pagination']
};
