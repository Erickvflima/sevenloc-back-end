import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('globalQueue') private readonly globalQueue: Queue,
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async addToQueue(data: any): Promise<void> {
    await this.globalQueue.add(data);
  }
}
