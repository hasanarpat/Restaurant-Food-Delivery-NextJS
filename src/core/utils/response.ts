import { NextResponse } from 'next/server';

type SuccessResponse<T> = {
  success: true;
  data: T;
  meta?: Record<string, any>;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
    details?: any;
  };
};

export function sendSuccess<T>(
  data: T,
  statusCode = 200,
  meta?: Record<string, any>,
) {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    meta,
  };
  return NextResponse.json(response, { status: statusCode });
}

export function sendError(
  message: string,
  statusCode = 400,
  code = 'ERROR',
  details?: any,
) {
  const response: ErrorResponse = {
    success: false,
    error: {
      message,
      code,
      details,
    },
  };
  return NextResponse.json(response, { status: statusCode });
}
