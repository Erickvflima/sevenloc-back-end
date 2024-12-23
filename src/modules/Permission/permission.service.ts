import dataSource from '@config/data.source';
import { listResponseDb } from '@interfaces/base';
import { Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePermissionDTO } from './dto/createPermission.dto';
import { ListPermissionDTO } from './dto/listPermission.dto';
import { PermissionEntity } from './entity/Permission.sevenloc.entity';
import { PermissionFactory } from './permission.factory';

@Injectable()
export class PermissionService {
  private permissionRepository: Repository<PermissionEntity>;
  constructor() {
    this.permissionRepository = dataSource.getRepository(PermissionEntity);
  }

  async listPermission(
    options: FindManyOptions<PermissionEntity>,
  ): Promise<listResponseDb<ListPermissionDTO>> {
    try {
      const Permissions = await this.permissionRepository.find(options);
      const PermissionFilter: ListPermissionDTO[] = Permissions.map(
        PermissionFactory.mapPermissionToDTO.bind(this),
      );
      return {
        status: 'success',
        message: 'Lista de permissões',
        document: PermissionFilter,
        rowsAffected: [PermissionFilter.length],
      };
    } catch (error) {
      const message = `Erro ao buscar lista de permissões: ${error}`;
      Logger.error(message);
      return {
        status: 'error',
        message: message,
      };
    }
  }

  async createPermission(
    createPermissionDTO: CreatePermissionDTO,
  ): Promise<listResponseDb<ListPermissionDTO>> {
    try {
      const newPermission = this.permissionRepository.create({
        createdBy: 'teste',
        updatedBy: 'teste',
        ...createPermissionDTO,
      });

      const savedPermission =
        await this.permissionRepository.save(newPermission);
      const PermissionDTO =
        PermissionFactory.mapPermissionToDTO(savedPermission);
      return {
        status: 'success',
        message: 'Permissão criada com sucesso.',
        document: [PermissionDTO],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao criar permissão';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
