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
import { UserByGroupService } from '@modules/UserByGroup/usersByGroup.service';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { UsersByGroupEntity } from '@modules/UserByGroup/entity/usersByGroup.sevenloc.entity';

@Injectable()
export class PermissionByGroupService {
  private permissionByGroupRepository: Repository<PermissionByGroupEntity>;
  private permissionRepository: Repository<PermissionEntity>;
  private groupRepository: Repository<GroupEntity>;
  private userRepository: Repository<UserEntity>;
  private userByGroupService = new UserByGroupService();

  constructor() {
    this.permissionByGroupRepository = dataSource.getRepository(
      PermissionByGroupEntity,
    );
    this.permissionRepository = dataSource.getRepository(PermissionEntity);
    this.groupRepository = dataSource.getRepository(GroupEntity);
    this.userRepository = dataSource.getRepository(UserEntity);
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

  // async hasPermission(email: string, permissionName: string): Promise<boolean> {
  //   const user = await this.userRepository.find({
  //     where: { email },
  //     select: ['id'],
  //   });
  //   const permission = await this.permissionRepository.find({
  //     where: { name: permissionName },
  //     select: ['id'],
  //   });
  //   if (!user) {
  //     throw new Error('Usuário não encontrado');
  //   }
  //   if (!permission) {
  //     throw new Error('Permissão não encontrado');
  //   }
  //   const userId = user[0].id;
  //   const groupByPermission = await this.permissionByGroupRepository.find({
  //     where: { permissionId: permission[0].id },
  //     relations: ['group', 'permission'],
  //   });
  //   const groupByUser = await this.userByGroupService.userByGroupList({
  //     where: { userId },
  //     relations: ['group'],
  //   });
  //   if (groupByUser.document && groupByUser.document.length > 0) {
  //     for (const userGroup of groupByUser.document) {
  //       for (const permissionGroup of groupByPermission) {
  //         if (userGroup.groupId === permissionGroup.group.id) {
  //           return true;
  //         }
  //       }
  //     }
  //   }

  //   return false;
  // }
  async hasPermission(email: string, permissionName: string): Promise<boolean> {
    const query = this.permissionByGroupRepository
      .createQueryBuilder('permissionByGroup')
      .innerJoin('permissionByGroup.permission', 'permission')
      .innerJoin('permissionByGroup.group', 'group')
      .where('permission.nome = :permissionName', { permissionName })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('usersByGroup.grupo_id')
          .from(UsersByGroupEntity, 'usersByGroup')
          .innerJoin(UserEntity, 'user', 'user.id = usersByGroup.userId')
          .where('user.email = :email')
          .getQuery();
        return 'group.id IN ' + subQuery;
      })
      .setParameter('email', email)
      .getMany();

    const groupByPermission = await query;

    if (groupByPermission.length > 0) {
      return true;
    }
    return false;
  }
}
