import { validateSchema, validateId } from "../utils/validateRequest";
import {z} from 'zod';
import { ValidationError } from "../exception/ValidationError";
import { ForbiddenAccessError } from '../exception/ForbiddenAccessError';


describe('validateSchema', () => {
  const schema = z.object({
    name: z.string().min(1),
  });

  it('deve retornar dados válidos', () => {
    const data = { name: 'Mayke' };
    const result = validateSchema(schema, data);
    expect(result).toEqual(data);
  });

  it('deve lançar ValidationError se dados forem inválidos', () => {
    const data = { name: '' }; 
    expect(() => validateSchema(schema, data)).toThrow(ValidationError);
  });
});

describe('validateId', () => {
  it('deve retornar o id se o user estiver autorizado', () => {
    const req = {
      params: { id: '123' },
      auth: { userId: '123' },
    } as any;

    const result = validateId(req);
    expect(result).toBe('123');
  });

  it('deve lançar ForbiddenAccessError se o user não for o dono do recurso', () => {
    const req = {
      params: { id: '123' },
      auth: { userId: '999' },
    } as any;

    expect(() => validateId(req)).toThrow(ForbiddenAccessError);
  });
});
