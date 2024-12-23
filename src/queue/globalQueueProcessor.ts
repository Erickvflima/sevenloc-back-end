import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('globalQueue')
export class GlobalQueueProcessor {
  @Process()
  async handleRequest(job: Job): Promise<void> {
    const { route, method } = job.data;
    Logger.verbose(`Processing request to ${route} with method ${method}`);
  }
}
