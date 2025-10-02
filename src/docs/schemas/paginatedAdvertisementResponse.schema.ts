export const PaginatedAdvertisementResponse = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {$ref:'#/components/schemas/AdvertisementResponse'},
      description: 'Lista de anúncios da página atual'
    },
    pagination: {  items: {$ref:'#/components/schemas/PaginationMeta'}}
  },
  required: ['data', 'pagination']
};
