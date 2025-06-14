import { ZodSchema } from 'zod';
import { ValidationError } from '../exception/ValidationError';

export function validateOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.errors);
  }
  return result.data;
}
