import  errorCodes  from './errorCodes.json'

const { path } = require('ramda')

export class BaseError extends Error {
  public statusCode: number
  public errorCode: string | undefined

  constructor(
    statusCode: number,
    errorPath: string, 
    message: string
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = path(errorPath.split('.'), errorCodes)
  }

  getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode
    }
  }
}
