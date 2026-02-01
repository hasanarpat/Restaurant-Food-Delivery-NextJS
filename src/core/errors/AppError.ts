export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor({
    message,
    statusCode = 500,
    code = 'INTERNAL_ERROR',
    isOperational = true,
  }: {
    message: string;
    statusCode?: number;
    code?: string;
    isOperational?: boolean;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
