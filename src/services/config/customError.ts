export class CustomError extends Error {
  constructor(
    public errorCode: string,
    message: string,
  ) {
    super(errorCode + ' ' + message);
    this.name = 'CustomError';
  }
}
