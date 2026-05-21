import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
  timestamp?: string;
}

/**
 * Format error response
 */
export function formatErrorResponse(error: unknown, status: number = 500): ApiError {
  let message = 'Internal server error';
  let code = 'INTERNAL_ERROR';
  let details: Record<string, any> | undefined;

  if (error instanceof Error) {
    message = error.message;
    
    // Map common error types
    if (error.name === 'ValidationError') {
      code = 'VALIDATION_ERROR';
      status = 400;
    } else if (error.name === 'NotFoundError') {
      code = 'NOT_FOUND';
      status = 404;
    } else if (error.name === 'UnauthorizedError') {
      code = 'UNAUTHORIZED';
      status = 401;
    } else if (error.name === 'ForbiddenError') {
      code = 'FORBIDDEN';
      status = 403;
    }

    // Include error details in development
    if (process.env.NODE_ENV === 'development') {
      details = {
        stack: error.stack,
        name: error.name
      };
    }
  } else if (typeof error === 'object' && error !== null) {
    const obj = error as Record<string, any>;
    message = obj.message || JSON.stringify(error);
    code = obj.code || 'UNKNOWN_ERROR';
    if (obj.status) status = obj.status;
  } else {
    message = String(error);
  }

  return {
    message,
    code,
    status,
    details,
    timestamp: new Date().toISOString()
  };
}

/**
 * Create error response
 */
export function createErrorResponse(error: unknown, status: number = 500) {
  const errorData = formatErrorResponse(error, status);
  return NextResponse.json(
    {
      error: {
        message: errorData.message,
        code: errorData.code,
        ...(errorData.details && { details: errorData.details })
      }
    },
    { status: errorData.status || status }
  );
}

/**
 * Safe wrapper for API route handlers
 * Usage: export const GET = withErrorHandler(async (req) => { ... })
 */
export function withErrorHandler(handler: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('[API Error]', error);
      return createErrorResponse(error, 500);
    }
  };
}
