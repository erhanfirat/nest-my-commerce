export class CustomRpcException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly errorCode?: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = "CustomRpcException";
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errorCode: this.errorCode,
      details: this.details,
      timestamp: new Date().toISOString(),
    };
  }
}
