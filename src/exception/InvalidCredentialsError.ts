import { BaseError } from './BaseError';

export class InvalidCredentialsError extends BaseError {
  constructor(message = 'Credenciais inválidas. Verifique e tente novamente.') {
    super(401, 'auth.invalidCredentials', message);
  }
}