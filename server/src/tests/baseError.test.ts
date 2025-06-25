import { BaseError } from "../exception/BaseError";
jest.mock('../exception/errorCodes.json', () => ({
  badRequest: {
    validation: 'VALIDATION_ERROR'
  }
}));

describe('BaseError', () => {
  it('deve instanciar corretamente com statusCode, mensagem e errorCode', () => {
    const error = new BaseError(400, 'badRequest.validation', 'Erro de validação');

    expect(error.message).toBe('Erro de validação');
    expect(error.statusCode).toBe(400);
    expect(error.errorCode).toBe('VALIDATION_ERROR');
  });

  it('getBody deve retornar os dados do erro', () => {
    const error = new BaseError(400, 'badRequest.validation', 'Erro de validação');
    const body = error.getBody();

    expect(body).toEqual({
      message: 'Erro de validação',
      errorCode: 'VALIDATION_ERROR',
      statusCode: 400
    });
  });
});
