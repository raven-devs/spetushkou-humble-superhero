import { HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ExceptionParser } from './exception.parser';

function send(res: Response, exception: HttpException): void {
  const exceptionResponse = ExceptionParser.getResponse(exception);
  const { statusCode } = exceptionResponse;
  res.status(statusCode).send(exceptionResponse);
}

export const ExceptionResponse = {
  send,
};
