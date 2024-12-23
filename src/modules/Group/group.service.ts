import dataSource from '@config/data.source';
import { listResponseDb } from '@interfaces/base';
import { Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { ListGroupDTO } from './dto/listGroup.dto';
import { GroupEntity } from './entity/Group.sevenloc.entity';
import { GroupFactory } from './group.factory';

@Injectable()
export class GroupService {
  private groupRepository: Repository<GroupEntity>;

  constructor() {
    this.groupRepository = dataSource.getRepository(GroupEntity);
  }

  async listGroup(
    options: FindManyOptions<GroupEntity>,
  ): Promise<listResponseDb<ListGroupDTO>> {
    try {
      const groups = await this.groupRepository.find(options);
      const groupFilter: ListGroupDTO[] = groups.map(
        GroupFactory.mapGroupToDTO.bind(this),
      );
      return {
        status: 'success',
        message: 'Lista de grupos',
        document: groupFilter,
        rowsAffected: [groupFilter.length],
      };
    } catch (error) {
      const message = `Erro ao buscar lista de grupos: ${error}`;
      Logger.error(message);
      return {
        status: 'error',
        message: message,
      };
    }
  }

  async createGroup(
    group: Partial<GroupEntity>,
  ): Promise<listResponseDb<ListGroupDTO>> {
    try {
      const newGroup = this.groupRepository.create(group);
      const savedGroup = await this.groupRepository.save(newGroup);
      const groupDTO = GroupFactory.mapGroupToDTO(savedGroup);
      return {
        status: 'success',
        message: 'Usuário criado com sucesso.',
        document: [groupDTO],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao criar grupo';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
