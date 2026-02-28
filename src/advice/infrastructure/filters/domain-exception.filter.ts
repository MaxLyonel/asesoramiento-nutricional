import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainError } from 'src/shared/domain/base-domain.error';

@Catch(BaseDomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseDomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({
      status: 'error',
      code: exception.code,
      message: exception.message,
    });
  }
}