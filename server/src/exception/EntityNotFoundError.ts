import { BaseError } from './BaseError'

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string = 'Entidade', id?: string | number) {
    const message = id
      ? `${entityName} com ID ${id} não encontrado.`
      : `${entityName} não encontrado.`;
    super(404, 'notFound.entity', message);
  }
}
