export const ErrorResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'Mensagem descritiva do erro',
      example: 'Mensagem descritiva do erro'
    },
    errorCode: {
      type: 'string',
      example: 'ERROR_CODE',
      description: 'Código interno padronizado da aplicação'
    },
    statusCode: {
      type: 'integer',
      description: 'Código HTTP do erro',
      example: 400
    }
  },
  required: ['message', 'errorCode', 'statusCode']
};