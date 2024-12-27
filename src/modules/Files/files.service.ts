import { Injectable, Logger } from '@nestjs/common';
import { FilesEntity } from './entity/file.sevenloc.entity';
import { FindManyOptions, Repository } from 'typeorm';
import dataSource from '@config/data.source';
import { ListFilesDTO } from './dto/listFiles.dto copy';
import { listResponseDb } from '@interfaces/base';
import { FilesFactory } from './files.factory';
import * as fs from 'fs';
import * as zlib from 'zlib';
import { join } from 'path';
import { Readable } from 'stream';

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
    FilesDTO: Partial<FilesEntity>,
    file: Express.Multer.File,
  ): Promise<listResponseDb<ListFilesDTO>> {
    try {
      if (!file) {
        throw new Error('Arquivo não foi enviado.');
      }

      const uploadPath = join(__dirname, '../../../', 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const filePath = join(uploadPath, file.originalname);
      const compressedFilePath = `${filePath}.gz`;
      await this.compressFile(file.buffer, compressedFilePath);

      const newFile = this.filesRepository.create({
        name: file.originalname,
        path: compressedFilePath,
        supplierId: FilesDTO.supplierId,
      });

      const savedFile = await this.filesRepository.save(newFile);

      const fileDTO = FilesFactory.mapFilesToDTO(savedFile);

      return {
        status: 'success',
        message: 'Arquivo inserido com sucesso.',
        document: [fileDTO],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao inserir arquivo.';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }

  async compressFile(
    fileBuffer: Buffer,
    compressedFilePath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(compressedFilePath);
      const gzip = zlib.createGzip();

      const input = Readable.from(fileBuffer);

      input.pipe(gzip).pipe(output);

      output.on('finish', () => resolve());
      output.on('error', (error) => reject(error));
    });
  }
}
