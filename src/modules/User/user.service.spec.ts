import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dto/listUser.dto';
import { UserEntity } from './entity/user.sevenloc.entity';
import { UserFactory } from './user.factory';
import { UserService } from './user.service';

export const mockUserService = {
  findOne: jest.fn().mockResolvedValue({
    id: 1,
    email: 'user@gmail.com',
    password: 'password',
  }),
  listUser: jest.fn().mockResolvedValue({
    document: [
      { id: 1, email: 'usergmail.com', password: 'password' },
      { id: 123, email: 'user2@gmail.com', password: 'password' },
    ],
  }),
};

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    service['userRepository'] = repository;
  });

  describe('listUser', () => {
    it('should return a list of users', async () => {
      const users: UserEntity[] = [
        { id: 1, email: 'test1@example.com', password: '123456' } as UserEntity,
      ];
      const userDTOs: ListUserDTO[] = users.map(UserFactory.mapUserToDTO);

      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.listUser({});

      expect(result).toEqual({
        status: 'success',
        message: 'Lista carregada com sucesso.',
        document: userDTOs,
        rowsAffected: [users.length],
      });
    });

    it('should handle errors when fetching users', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error());

      const result = await service.listUser({});

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao buscar lista de usuario',
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const user: UserEntity = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
      } as UserEntity;
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne('test@example.com');

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('test@example.com')).rejects.toThrow(
        new NotFoundException('Usuário não encontrado'),
      );
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const user: Partial<UserEntity> = {
        email: 'test@example.com',
        password: '123456',
      };
      const hashedPassword = 'hashed_password';
      const newUser = {
        ...user,
        id: 1,
        password: hashedPassword,
      } as UserEntity;
      const userDTO = UserFactory.mapUserToDTO(newUser);

      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await service.createUser(user);

      expect(result).toEqual({
        status: 'success',
        message: 'Usuário criado com sucesso.',
        document: [userDTO],
        rowsAffected: [],
      });
    });

    it('should handle errors when creating a user', async () => {
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      const result = await service.createUser({
        email: 'test@example.com',
        password: '123456',
      });

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao criar usuário',
      });
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const user: UserEntity = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
      } as UserEntity;
      const updatedUser = { ...user, password: 'newpassword' };
      const userDTO = UserFactory.mapUserToDTO(updatedUser);

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);
      jest.spyOn(repository, 'merge').mockReturnValue({
        ...user,
      });

      const result = await service.updateUser(user.email, {
        password: 'newpassword',
      });

      expect(result).toEqual({
        status: 'success',
        message: 'Usuário atualizado com sucesso.',
        document: [userDTO],
      });
    });

    it('should return error message if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.updateUser('test@example.com', {
        password: 'newpassword',
      });

      expect(result).toEqual({
        status: 'error',
        message: 'Usuário não encontrado.',
      });
    });

    it('should handle errors when updating user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({
        email: 'test@example.com',
        password: '123456',
      } as UserEntity);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      const result = await service.updateUser('test@example.com', {
        password: 'newpassword',
      });

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao atualizar usuário',
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return success message', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.deleteUser(1);

      expect(result).toEqual({
        status: 'success',
        message: 'Usuário excluído com sucesso.',
        rowsAffected: [1],
      });
    });

    it('should return error message if no user is deleted', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      const result = await service.deleteUser(1);

      expect(result).toEqual({
        status: 'error',
        message: 'Usuário não encontrado.',
      });
    });

    it('should handle errors when deleting a user', async () => {
      jest.spyOn(repository, 'delete').mockRejectedValue(new Error());

      const result = await service.deleteUser(1);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao excluir usuário',
      });
    });
  });
});
