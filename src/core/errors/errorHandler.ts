import { NextResponse } from 'next/server';
import { AppError } from './AppError';

export const errorHandler = (err: any) => {
  let error = err;

  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    error = new AppError({
      message,
      statusCode,
      code: 'INTERNAL_SERVER_ERROR',
    });
  }

  const response = {
    success: false,
    error: {
      message: error.message,
      code: error.code,
    },
  };

  return NextResponse.json(response, { status: error.statusCode });
};
