import { Injectable, Logger } from '@nestjs/common';
import { FilesEntity } from './entity/file.sevenloc.entity';
import { FindManyOptions, Repository } from 'typeorm';
import dataSource from '@config/data.source';
import { ListFilesDTO } from './dto/listFiles.dto copy';
import { listResponseDb } from '@interfaces/base';
import { FilesFactory } from './files.factory';

@Injectable()
export class FilesService {
  private filesRepository: Repository<FilesEntity>;

  constructor() {
    this.filesRepository = dataSource.getRepository(FilesEntity);
  }

  async listFiles(
    options: FindManyOptions<FilesEntity>,
  ): Promise<listResponseDb<ListFilesDTO>> {
    try {
      const Filess = await this.filesRepository.find(options);
      const FilesFilter: ListFilesDTO[] = Filess.map(
        FilesFactory.mapFilesToDTO.bind(this),
      );
      return {
        status: 'success',
        message: 'Lista de arquivos',
        document: FilesFilter,
        rowsAffected: [FilesFilter.length],
      };
    } catch (error) {
      const message = `Erro ao buscar lista de arquivos: ${error}`;
      Logger.error(message);
      return {
        status: 'error',
        message: message,
      };
    }
  }

  async insertFiles(
    Files: Partial<FilesEntity>,
  ): Promise<listResponseDb<ListFilesDTO>> {
    try {
      const newFiles = this.filesRepository.create(Files);
      const savedFiles = await this.filesRepository.save(newFiles);
      const FilesDTO = FilesFactory.mapFilesToDTO(savedFiles);
      return {
        status: 'success',
        message: 'Arquivo inserido com sucesso.',
        document: [FilesDTO],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao inserir arquivos.';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
