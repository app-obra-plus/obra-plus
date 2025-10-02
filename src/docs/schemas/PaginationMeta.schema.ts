export const PaginationMeta = {
  type: 'object',
  properties: {
    total: {
      type: 'number',
      description: 'Total de itens encontrados',
      example: 13
    },
    page: {
      type: 'number',
      description: 'Número da página atual',
      example: 1
    },
    limit: {
      type: 'number',
      description: 'Quantidade de itens por página',
      example: 10
    },
    totalPages: {
      type: 'number',
      description: 'Total de páginas disponíveis',
      example: 2
    }
  },
  required: ['total', 'page', 'limit', 'totalPages']
};
