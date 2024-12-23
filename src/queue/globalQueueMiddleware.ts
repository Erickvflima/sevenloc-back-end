import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { QueueService } from './queue.service';
@Injectable()
export class GlobalQueueMiddleware implements NestMiddleware {
  constructor(private readonly queueService: QueueService) {}
  async use(req: Request, _: Response, next: NextFunction): Promise<void> {
    const { method, originalUrl, body, headers } = req;

    await this.queueService.addToQueue({
      route: originalUrl,
      method,
      body,
      headers,
    });

    next();
  }
}
