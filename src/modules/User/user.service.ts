import dataSource from '@config/data.source';
import { listResponseDb } from '@interfaces/base';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { FindManyOptions, Repository } from 'typeorm';
import { ListUserDTO } from './dto/listUser.dto';
import { UserEntity } from './entity/user.sevenloc.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserService {
  private userRepository: Repository<UserEntity>;
  private readonly saltRounds = 10;
  constructor() {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async listUser(
    options: FindManyOptions<UserEntity>,
  ): Promise<listResponseDb<ListUserDTO>> {
    try {
      const users = await this.userRepository.find(options);
      const userFilter: ListUserDTO[] = users.map(
        UserFactory.mapUserToDTO.bind(this),
      );
      return {
        status: 'success',
        message: 'Lista carregada com sucesso.',
        document: userFilter,
        rowsAffected: [userFilter.length],
      };
    } catch {
      const message = 'Erro ao buscar lista de usuario';
      Logger.error(message);
      return {
        status: 'error',
        message: message,
      };
    }
  }
  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
  async createUser(
    user: Partial<UserEntity>,
  ): Promise<listResponseDb<ListUserDTO>> {
    try {
      if (user.password) {
        user.password = await hash(user.password, this.saltRounds);
      }
      const newUser = this.userRepository.create(user);
      const savedUser = await this.userRepository.save(newUser);
      const userDTO = UserFactory.mapUserToDTO(savedUser);
      return {
        status: 'success',
        message: 'Usuário criado com sucesso.',
        document: [userDTO],
        rowsAffected: [],
      };
    } catch (error) {
      const messageError = 'Erro ao criar usuário';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }

  async updateUser(
    email: string,
    updateData: Partial<UserEntity>,
  ): Promise<listResponseDb<ListUserDTO>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        return {
          status: 'error',
          message: 'Usuário não encontrado.',
        };
      }
      this.userRepository.merge(user, updateData);
      const updatedUser = await this.userRepository.save(user);
      const userDTO = UserFactory.mapUserToDTO(updatedUser);
      return {
        status: 'success',
        message: 'Usuário atualizado com sucesso.',
        document: [userDTO],
      };
    } catch (error) {
      const erroUpdated = 'Erro ao atualizar usuário';
      Logger.error(erroUpdated, error);
      return {
        status: 'error',
        message: erroUpdated,
      };
    }
  }

  async deleteUser(id: number): Promise<listResponseDb> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        return {
          status: 'error',
          message: 'Usuário não encontrado.',
        };
      }
      return {
        status: 'success',
        message: 'Usuário excluído com sucesso.',
        rowsAffected: [result.affected || 0],
      };
    } catch (error) {
      const messageError = 'Erro ao excluir usuário';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
