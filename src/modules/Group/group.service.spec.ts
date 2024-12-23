import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListGroupDTO } from './dto/listGroup.dto';
import { GroupEntity } from './entity/Group.sevenloc.entity';
import { GroupFactory } from './group.factory';
import { GroupService } from './group.service';

export const mockGroupRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

export const mockLogger = {
  error: jest.fn(),
};

describe('GroupService', () => {
  let service: GroupService;
  let repository: Repository<GroupEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(GroupEntity),
          useValue: mockGroupRepository,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    repository = module.get<Repository<GroupEntity>>(
      getRepositoryToken(GroupEntity),
    );

    service['groupRepository'] = repository;

    jest.clearAllMocks();
  });

  describe('listGroup', () => {
    it('should return a list of groups', async () => {
      const groups: GroupEntity[] = [
        { id: 1, name: 'Admin' } as GroupEntity,
        { id: 2, name: 'User' } as GroupEntity,
      ];
      const groupDTOs: ListGroupDTO[] = groups.map(GroupFactory.mapGroupToDTO);

      mockGroupRepository.find.mockResolvedValue(groups);

      const result = await service.listGroup({});

      expect(result).toEqual({
        status: 'success',
        message: 'Lista de grupos',
        document: groupDTOs,
        rowsAffected: [groupDTOs.length],
      });
      expect(mockGroupRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when fetching groups', async () => {
      const errorMessage = 'Database error';
      mockGroupRepository.find.mockRejectedValue(new Error(errorMessage));
      mockLogger.error.mockImplementation(() => {});

      const result = await service.listGroup({});

      expect(result).toEqual({
        status: 'error',
        message: `Erro ao buscar lista de grupos: Error: ${errorMessage}`,
      });
      expect(mockGroupRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createGroup', () => {
    it('should create and return a new group', async () => {
      const group: Partial<GroupEntity> = { name: 'Admin' };
      const newGroup = { id: 1, ...group } as GroupEntity;
      const groupDTO = GroupFactory.mapGroupToDTO(newGroup);

      mockGroupRepository.create.mockReturnValue(newGroup);
      mockGroupRepository.save.mockResolvedValue(newGroup);

      const result = await service.createGroup(group);

      expect(result).toEqual({
        status: 'success',
        message: 'Usuário criado com sucesso.',
        document: [groupDTO],
        rowsAffected: [],
      });
      expect(mockGroupRepository.create).toHaveBeenCalledWith(group);
      expect(mockGroupRepository.save).toHaveBeenCalledWith(newGroup);
    });

    it('should handle errors when creating a group', async () => {
      const group: Partial<GroupEntity> = { name: 'Admin' };
      const errorMessage = 'Database error';

      mockGroupRepository.save.mockRejectedValue(new Error(errorMessage));
      mockLogger.error.mockImplementation(() => {});

      const result = await service.createGroup(group);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao criar grupo',
      });
      expect(mockGroupRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
