export const StatsResponse = {
  type: 'object',
  properties: {
    minPrice: {
      type: 'number',
      description: 'Menor preço encontrado entre os anúncios',
      example: 100
    },
    maxPrice: {
      type: 'number',
      description: 'Maior preço encontrado entre os anúncios',
      example: 500
    },
    maxDistance: {
      type: 'number',
      description: 'Distância máxima (em km) de um anúncio em relação ao usuário',
      example: 25
    }
  },
  required: ['minPrice', 'maxPrice', 'maxDistance']
};
