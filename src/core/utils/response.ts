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
  // Check if data is already in { data, meta } format (e.g. from PaginationResult)
  // We want to avoid { success: true, data: { data: [...], meta: {...} } } pattern
  // and instead produce { success: true, data: [...], meta: {...} }

  let finalData = data;
  let finalMeta = meta;

  if (
    data &&
    typeof data === 'object' &&
    'data' in data &&
    'meta' in data &&
    Object.keys(data).length === 2
  ) {
    // It's likely a PaginationResult
    finalData = (data as any).data;
    finalMeta = { ...meta, ...(data as any).meta };
  }

  const response: SuccessResponse<typeof finalData> = {
    success: true,
    data: finalData,
    meta: finalMeta,
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

export const apiResponse = {
  success: <T>(data: T, meta?: Record<string, any>) =>
    sendSuccess(data, 200, meta),
  created: <T>(data: T, meta?: Record<string, any>) =>
    sendSuccess(data, 201, meta),
  error: (error: {
    message: string;
    statusCode?: number;
    code?: string;
    details?: any;
  }) =>
    sendError(
      error.message,
      error.statusCode || 400,
      error.code || 'ERROR',
      error.details,
    ),
};
