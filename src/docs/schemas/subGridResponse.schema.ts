
export const SubGridResponse = {
  type: 'object',
  properties: {
    latitudeCenter: {
      type: 'number',
      format: 'float',
      description: 'Latitude central da subgrade',
      example: -19.812345
    },
    longitudeCenter: {
      type: 'number',
      format: 'float',
      description: 'Longitude central da subgrade',
      example: -43.173456
    },
    advertisementIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid'
      },
      description: 'Lista de IDs de anúncios presentes na subgrade',
      example: [
        'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        'f7e8d9c0-1234-5678-90ab-cdef12345678'
      ]
    }
  },
  required: ['latitudeCenter', 'longitudeCenter', 'advertisementIds']
};

export const GridResponse = {
    type: 'array',
    items: {
        $ref: '#/components/schemas/SubGridResponse',
    }
}