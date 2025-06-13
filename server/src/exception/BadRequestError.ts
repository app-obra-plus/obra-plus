import { BaseError } from './BaseError'

export class BadRequestError extends BaseError {
  constructor(message = 'Erro de validação dos dados') {
    super(400, 'badRequest.validation', message);
  }
}
