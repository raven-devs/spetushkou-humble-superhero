import { HttpException, HttpStatus } from '@nestjs/common';

interface ErrorMessage {
  message: string;
}

interface ExceptionResponse {
  timestamp: string;
  message: string;
  statusCode: number;
}

function getMessage(exception: unknown): ErrorMessage {
  if (exception instanceof HttpException) {
    const response = exception.getResponse();

    // if the response is an object, extract its properties
    if (typeof response === 'object' && response !== null) {
      return response as ErrorMessage;
    }

    // generic message
    return { message: response };
  }

  // default message for unknown exceptions
  return { message: 'Internal Server Error' };
}

function getStatusCode(exception: unknown): number {
  return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
}

function getResponse(exception: unknown): ExceptionResponse {
  const statusCode = getStatusCode(exception);
  const message = getMessage(exception);

  return {
    statusCode,
    ...message,
    timestamp: new Date().toISOString(),
  };
}

export const ExceptionParser = {
  getResponse,
};
