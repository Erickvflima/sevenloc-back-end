import dataSource from '@config/data.source-log';
import { listResponseDb } from '@interfaces/base';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from './entity/Log.log.entity';

@Injectable()
export class LogService {
  private logRepository: Repository<LogEntity>;

  constructor() {
    this.logRepository = dataSource.getRepository(LogEntity);
  }

  async createLog(
    logData: Partial<LogEntity>,
  ): Promise<listResponseDb<LogEntity>> {
    try {
      const log = this.logRepository.create(logData);
      const saveLog = await this.logRepository.save(log);

      return {
        status: 'success',
        message: 'Log salvo com sucesso.',
        document: [saveLog],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao salvar log.';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
