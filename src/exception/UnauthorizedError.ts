import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message = 'Não autorizado') {
    super(401, 'unauthorized', message);
  }
}