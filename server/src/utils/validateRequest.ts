import { ZodSchema } from 'zod';
import { ValidationError } from '../exception/ValidationError';
import { Request } from "express";
import { ForbiddenAccessError } from '../exception/ForbiddenAccessError';

export function validateSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.errors);
  }
  return result.data;
}

export function validateId(req:Request){

  const {id} = req.params;
  const userId = (req as any).auth.userId;
  
  if(userId != id){
    throw new ForbiddenAccessError();
  }

  return id;
}
