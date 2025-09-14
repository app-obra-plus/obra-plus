export const ImageResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'ID único da imagem',
      example: 'd3a0ed08-a378-491f-96e0-acc4a3f8932a'
    },
    url: {
      type: 'string',
      format: 'uri',
      description: 'URL pública da imagem armazenada',
      example: 'https://bpsz90el9wlfhkxf.public.blob.vercel-storage.com/images/4195124e-791e-44b0-b3bc-55b13e416a0b.jpg'
    }
  },
  required: ['id', 'url']
};
