import { Request, Response, NextFunction } from 'express'
import { BaseError } from '../exception/BaseError'
import  {InternalServerError}  from '../exception/InternalServerError' 
import { ZodError } from "zod";
import { ValidationError } from "../exception/ValidationError";


const normalizeError = (err:Error) => {
  if (err instanceof BaseError) {
    return err
  }

  if (err instanceof ZodError) {
    return new ValidationError(err.issues); 
  }

  return new InternalServerError(err)
}

const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  
  if (res.headersSent) {
    return next(err)
  }

  const error = normalizeError(err)

  const statusCode = error.statusCode
  const body = error.getBody()

  res.status(statusCode).send(body)
}

export default errorHandler