import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { GlobalQueueProcessor } from './globalQueueProcessor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'globalQueue',
    }),
  ],
  providers: [GlobalQueueProcessor, QueueService],
  exports: [BullModule, QueueService],
})
export class QueueModule {
  constructor() {
    Logger.verbose('QueueModule initialized');
  }
}
