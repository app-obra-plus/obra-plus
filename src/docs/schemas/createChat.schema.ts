export const CreateChatRequest = {
  type: 'object',
  properties: {
    chatName: {
      type: 'string',
      description: 'Nome do chat (opcional)',
      example: 'Chat da Obra A',
      nullable: true
    },
    participantsId: {
      type: 'array',
      description: 'Lista de IDs dos participantes do chat',
      items: {
        type: 'string',
        format: 'uuid',
        example: '550e8400-e29b-41d4-a716-446655440000'
      },
      minItems: 2
    }
  },
  required: ['participantsId']
};
