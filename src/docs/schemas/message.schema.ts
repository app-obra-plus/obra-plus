
export const CreateMessageSchema ={
    type: 'object',
    properties: {
        content: { type: 'string', description: 'Conteúdo textual da mensagem', example: 'Olá, pessoal!' },
    },
    required: ['content']
}

export const Message = {
  type: 'object',
  properties: {
    content: { type: 'string', description: 'Conteúdo textual da mensagem', example: 'Olá, pessoal!' },
    createdAt: { type: 'string', format: 'date-time', description: 'Data e hora de envio', example: '2025-10-27T19:00:00Z' },
    senderId: { type: 'string', format: 'uuid', description: 'ID do usuário que enviou a mensagem', example: '123e4567-e89b-12d3-a456-426614174000' }
  },
  required: ['content', 'createdAt', 'senderId']
};

export const Messages = {
  type: 'array',
  description: 'Lista de mensagens do chat',
  items: { $ref: '#/components/schemas/Message' },
  example: [
    {
      content: 'Olá, pessoal!',
      createdAt: '2025-10-27T19:00:00Z',
      senderId: '123e4567-e89b-12d3-a456-426614174000'
    },
    {
      content: 'Tudo certo?',
      createdAt: '2025-10-27T19:05:00Z',
      senderId: '987e6543-e21b-12d3-a456-426655440000'
    }
  ]
};

export const PaginatedMessage = {
  type: 'object',
  properties: {
    data: { $ref: '#/components/schemas/Messages', description: 'Mensagens da página atual' },
    pagination: { $ref: '#/components/schemas/PaginationMeta', description: 'Informações de paginação' }
  },
  required: ['messages', 'pagination']
};
