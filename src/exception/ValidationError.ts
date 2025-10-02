import { BaseError } from './BaseError'
import { ZodIssue } from 'zod'

export class ValidationError extends BaseError {
  public details: Array<{ field: string; message: string }>

  constructor(errors: ZodIssue[]) {
    super(400, 'badRequest.validation', 'Erro de validação dos dados')
    this.details = errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
    }))
  }

  override getBody() {
    return {
      ...super.getBody(),
      details: this.details,
    }
  }
}
