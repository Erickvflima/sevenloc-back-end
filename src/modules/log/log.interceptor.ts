import { RequestEmail } from '@interfaces/base';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, tap } from 'rxjs';
import { CreateLogDTO } from './dto/createLog.dto';
import { LogService } from './log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    private readonly logService: LogService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: RequestEmail = context.switchToHttp().getRequest();
    const userEmail = request.email || 'INTERCEPTOR';
    const params = `Body: ${JSON.stringify(request.body)} - Parmas: ${JSON.stringify(request.body)} 
    - Query: ${JSON.stringify(request.query)}`;
    const route = request.url;
    const method = request.method;
    const className = context.getClass().name;

    return next.handle().pipe(
      tap(async () => {
        const logData: CreateLogDTO = {
          userEmail: userEmail,
          route,
          method,
          className,
          params,
          errorMessage: 'Log de sucesso',
          updatedBy: 'SYSTEM',
          createdBy: 'SYSTEM',
        };
        try {
          await this.logService.createLog(logData);
        } catch (error) {
          Logger.error('Erro ao salvar log de sucesso', error);
        }
      }),
      catchError((error) => {
        const logData: CreateLogDTO = {
          userEmail: userEmail,
          route,
          method,
          className,
          params,
          errorMessage: error.message || 'Unknown error',
          updatedBy: userEmail,
          createdBy: userEmail,
        };
        this.logService.createLog(logData);

        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
