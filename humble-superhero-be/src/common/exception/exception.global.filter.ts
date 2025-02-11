import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionParser } from './exception.parser';

// catch all errors (not only HttpException)
@Catch()
export class ExceptionGlobalFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // in certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const exceptionResponse = ExceptionParser.getResponse(exception);
    const { statusCode } = exceptionResponse;

    const response = {
      ...exceptionResponse,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), response, statusCode);
  }
}
