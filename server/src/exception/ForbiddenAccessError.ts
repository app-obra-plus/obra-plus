import { BaseError } from './BaseError'

export class ForbiddenAccessError extends BaseError {
  constructor(message = 'Você não tem permissão para acessar esse recurso') {
    super(403, 'auth.forbidden', message);
  }
}
