export const AdvertisementsBatchRequest = {
  type: 'object',
  properties: {
    ids: {
      type: 'array',
      description: 'Lista de IDs de anúncios no formato UUID',
      items: {
        type: 'string',
        format: 'uuid',
      },example: [
        'd290f1ee-6c54-4b01-90e6-d701748f0851',
        'a1b2c3d4-5678-90ab-cdef-1234567890ab',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    ],
      minItems: 1
    }
  },
  required: ['ids']
};
