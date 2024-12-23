import dataSource from '@config/data.source';
import { listResponseDb } from '@interfaces/base';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateLinkUserByGroupDTO } from './dto/createLinkUserByGroup.dto';
import { ListUserByGroupDTO } from './dto/listUserByGroup.dto';
import { UsersByGroupEntity } from './entity/usersByGroup.sevenloc.entity';
import { usersByGroupFactory } from './usersByGroup.factory';

@Injectable()
export class UserByGroupService {
  private userByGroupRepository: Repository<UsersByGroupEntity>;
  private userRepository: Repository<UserEntity>;
  private groupRepository: Repository<GroupEntity>;

  constructor() {
    this.userRepository = dataSource.getRepository(UserEntity);
    this.userByGroupRepository = dataSource.getRepository(UsersByGroupEntity);
    this.groupRepository = dataSource.getRepository(GroupEntity);
  }

  async linkUserToGroup({
    groupId,
    userId,
  }: CreateLinkUserByGroupDTO): Promise<listResponseDb<ListUserByGroupDTO>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
      }

      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) {
        throw new NotFoundException(`Grupo com ID ${groupId} não encontrado.`);
      }

      const userByGroup = this.userByGroupRepository.create({
        userId,
        groupId,
      });
      const savedUserByGroup = {
        ...(await this.userByGroupRepository.save(userByGroup)),
        group,
        user,
      };
      const userByGroupDTO =
        usersByGroupFactory.mapUserByGroupDTO(savedUserByGroup);
      return {
        status: 'success',
        message: 'Relacionamento de usuarios por grupo realizado com sucesso.',
        document: [userByGroupDTO],
        rowsAffected: [1],
      };
    } catch (error) {
      const erroUpdated = 'Erro ao relacionar usuario por grupo.';
      Logger.error(erroUpdated, error);
      return {
        status: 'error',
        message: erroUpdated,
      };
    }
  }

  async userByGroupList(
    options: FindManyOptions<UsersByGroupEntity>,
  ): Promise<listResponseDb<ListUserByGroupDTO>> {
    try {
      const [data, total] = await this.userByGroupRepository.findAndCount({
        ...options,
        relations: ['user', 'group'],
      });

      const resultFilter: ListUserByGroupDTO[] = data.map(
        usersByGroupFactory.mapUserByGroupDTO.bind(this),
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
