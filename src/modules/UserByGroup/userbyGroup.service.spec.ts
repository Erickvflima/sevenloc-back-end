import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkUserByGroupDTO } from './dto/createLinkUserByGroup.dto';
import { ListUserByGroupDTO } from './dto/listUserByGroup.dto';
import { UsersByGroupEntity } from './entity/usersByGroup.sevenloc.entity';
import { usersByGroupFactory } from './usersByGroup.factory';
import { UserByGroupService } from './usersByGroup.service';

const mockGroupRepository = {
  findOne: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};
const userByGroupsList: [UsersByGroupEntity[], number] = [
  [
    {
      id: 1,
      userId: 1,
      groupId: 1,
      group: { id: 1, name: 'Admin' } as GroupEntity,
      user: { id: 1, name: 'Dashboard' } as UserEntity,
      createdAt: new Date('2024-09-04T12:00:00Z'),
      updatedAt: new Date('2024-09-04T12:00:00Z'),
      createdBy: 'Admin',
      updatedBy: 'Admin',
    },
  ],
  1,
];

const mockUserByGroupRepository = {
  findAndCount: jest.fn().mockResolvedValue(userByGroupsList),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  linkUserToGroup: jest.fn(),
};

describe('UserByGroupService', () => {
  let userByGroupService: UserByGroupService;
  let userByGroupRepository: Repository<UsersByGroupEntity>;
  let groupRepository: Repository<GroupEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserByGroupService,
        {
          provide: getRepositoryToken(UsersByGroupEntity),
          useValue: mockUserByGroupRepository,
        },
        {
          provide: getRepositoryToken(GroupEntity),
          useValue: mockGroupRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userByGroupService = module.get<UserByGroupService>(UserByGroupService);

    userByGroupRepository = module.get<Repository<UsersByGroupEntity>>(
      getRepositoryToken(UsersByGroupEntity),
    );
    groupRepository = module.get<Repository<GroupEntity>>(
      getRepositoryToken(GroupEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    userByGroupService['userByGroupRepository'] = userByGroupRepository;
    userByGroupService['groupRepository'] = groupRepository;
    userByGroupService['userRepository'] = userRepository;
    jest.clearAllMocks();
  });

  describe('userByGroupList', () => {
    it('should return a list of users by group', async () => {
      const userByGroupDtos: ListUserByGroupDTO[] = userByGroupsList[0].map(
        usersByGroupFactory.mapUserByGroupDTO,
      );

      const result = await userByGroupService.userByGroupList({});

      expect(result).toEqual({
        status: 'success',
        message: 'Relacionamento buscado com sucesso.',
        document: userByGroupDtos,
        rowsAffected: [userByGroupsList[1]],
      });
    });
  });

  describe('linkUserToGroup', () => {
    it('should successfully link User to group', async () => {
      const groupId = 1;
      const userId = 1;

      const group = { id: groupId, name: 'Admin' } as GroupEntity;
      const user = {
        id: userId,
        name: 'Dashboard',
      } as UserEntity;

      mockGroupRepository.findOne.mockResolvedValue(group);
      mockUserRepository.findOne.mockResolvedValue(user);
      mockUserByGroupRepository.create.mockReturnValue({
        userId,
        groupId,
      } as any);
      mockUserByGroupRepository.save.mockResolvedValue({
        id: 1,
        userId,
        groupId,
        user,
        group,
      } as unknown as UsersByGroupEntity);

      const createLinkDto: CreateLinkUserByGroupDTO = {
        groupId,
        userId,
      };

      const result = await userByGroupService.linkUserToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'success',
        message: 'Relacionamento de usuarios por grupo realizado com sucesso.',
        document: [
          usersByGroupFactory.mapUserByGroupDTO({
            id: 1,
            userId,
            groupId,
            user,
            group,
          } as unknown as UsersByGroupEntity),
        ],
        rowsAffected: [1],
      });
    });

    it('should throw NotFoundException if User is not found', async () => {
      const groupId = 1;
      const userId = 897987981;

      mockGroupRepository.findOne.mockResolvedValue({
        id: groupId,
        name: 'Admin',
      } as GroupEntity);
      mockUserRepository.findOne.mockResolvedValue(null);

      const createLinkDto: CreateLinkUserByGroupDTO = {
        groupId,
        userId,
      };

      const result = await userByGroupService.linkUserToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao relacionar usuario por grupo.',
      });
    });

    it('should throw NotFoundException if group is not found', async () => {
      const groupId = 189798621;
      const userId = 1;

      mockGroupRepository.findOne.mockResolvedValue(null);
      mockUserRepository.findOne.mockResolvedValue({
        id: userId,
        name: 'Dashboard',
      } as UserEntity);

      const createLinkDto: CreateLinkUserByGroupDTO = {
        groupId,
        userId,
      };

      const result = await userByGroupService.linkUserToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao relacionar usuario por grupo.',
      });
    });
  });
});
