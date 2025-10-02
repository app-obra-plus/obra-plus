import { ValidationError } from "../exception/ValidationError";

import { ZodIssue } from 'zod';


describe('ValidationError', () => {
  const issues: ZodIssue[] = [
    {
      code: 'custom',
      message: 'Campo obrigatório',
      path: ['email'],
    } as any,
    {
      code: 'custom',
      message: 'Formato inválido',
      path: ['phone'],
    } as any,
  ];

  it('deve instanciar corretamente com details', () => {
    const error = new ValidationError(issues);

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Erro de validação dos dados');
    expect(error.details).toEqual([
      { field: 'email', message: 'Campo obrigatório' },
      { field: 'phone', message: 'Formato inválido' },
    ]);
  });

  it('getBody deve incluir os detalhes e herdar de BaseError', () => {
    const error = new ValidationError(issues);
    const body = error.getBody();

    expect(body).toMatchObject({
      message: 'Erro de validação dos dados',
      statusCode: 400,
      errorCode: 'VALIDATION_ERROR', 
      details: [
        { field: 'email', message: 'Campo obrigatório' },
        { field: 'phone', message: 'Formato inválido' },
      ],
    });
  });
});