import { listResponseDb } from '@interfaces/base';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { PermissionEntity } from '@modules/Permission/entity/Permission.sevenloc.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

import dataSource from '@config/data.source';
import { CreateLinkPermissionByGroupDTO } from './dto/createLinkPermissionByGroup.dto';
import { ListPermissionByGroupDTO } from './dto/listPermissionByGroup.dto';
import { PermissionByGroupEntity } from './entity/PermissionByGroup.sevenloc.entity';
import { permissionsByGroupFactory } from './permissionByGroup.factory';

@Injectable()
export class PermissionByGroupService {
  private permissionByGroupRepository: Repository<PermissionByGroupEntity>;
  private permissionRepository: Repository<PermissionEntity>;
  private groupRepository: Repository<GroupEntity>;

  constructor() {
    this.permissionByGroupRepository = dataSource.getRepository(
      PermissionByGroupEntity,
    );
    this.permissionRepository = dataSource.getRepository(PermissionEntity);
    this.groupRepository = dataSource.getRepository(GroupEntity);
  }

  async linkPermissionToGroup({
    groupId,
    permissionId,
  }: CreateLinkPermissionByGroupDTO): Promise<
    listResponseDb<ListPermissionByGroupDTO>
  > {
    try {
      const permission = await this.permissionRepository.findOne({
        where: { id: permissionId },
      });
      if (!permission) {
        throw new NotFoundException(
          `Permissão com ID ${permissionId} não encontrado.`,
        );
      }

      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) {
        throw new NotFoundException(`Grupo com ID ${groupId} não encontrado.`);
      }

      const PermissionByGroup = this.permissionByGroupRepository.create({
        permissionId: Number(4),
        groupId: 1,
      });

      const savedPermissionByGroup = {
        ...(await this.permissionByGroupRepository.save(PermissionByGroup)),
        permission,
        group,
      };

      const PermissionByGroupDTO =
        permissionsByGroupFactory.mapPermissionByGroupDTO(
          savedPermissionByGroup,
        );
      return {
        status: 'success',
        message: 'Relacionamento de permissão por grupo realizado com sucesso.',
        document: [PermissionByGroupDTO],
        rowsAffected: [1],
      };
    } catch (error) {
      const erroUpdated = 'Erro ao relacionar permissão por grupo.';
      Logger.error(erroUpdated, error);
      return {
        status: 'error',
        message: erroUpdated,
      };
    }
  }

  async permissionByGroupList(
    options: FindManyOptions<PermissionByGroupEntity>,
  ): Promise<listResponseDb<ListPermissionByGroupDTO>> {
    try {
      const [data, total] = await this.permissionByGroupRepository.findAndCount(
        {
          ...options,
          relations: ['permission', 'group'],
        },
      );

      const resultFilter: ListPermissionByGroupDTO[] = data.map(
        permissionsByGroupFactory.mapPermissionByGroupDTO.bind(this),
      );

      return {
        status: 'success',
        message: 'Relacionamento buscado com sucesso.',
        document: resultFilter,
        rowsAffected: [total],
      };
    } catch (error) {
      const erroUpdated =
        'Erro ao listar relacionamento de usuarios por grupo.';
      Logger.error(erroUpdated, error);
      return {
        status: 'error',
        message: erroUpdated,
      };
    }
  }
}
