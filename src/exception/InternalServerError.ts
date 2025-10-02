import { BaseError } from "./BaseError"

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super(500, 'internal', 'Erro interno')

    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: 'fatal',
    })
  }
}

