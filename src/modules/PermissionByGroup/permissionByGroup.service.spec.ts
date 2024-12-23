import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { PermissionEntity } from '@modules/Permission/entity/Permission.sevenloc.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkPermissionByGroupDTO } from './dto/createLinkPermissionByGroup.dto';
import { ListPermissionByGroupDTO } from './dto/listPermissionByGroup.dto';
import { PermissionByGroupEntity } from './entity/PermissionByGroup.sevenloc.entity';
import { permissionsByGroupFactory } from './permissionByGroup.factory';
import { PermissionByGroupService } from './permissionByGroup.service';

const mockGroupRepository = {
  findOne: jest.fn(),
};

const mockPermissionRepository = {
  findOne: jest.fn(),
};
const permissionByGroupsList: [PermissionByGroupEntity[], number] = [
  [
    {
      id: 1,
      permissionId: 1,
      groupId: 1,
      group: { id: 1, name: 'Admin' } as GroupEntity,
      permission: { id: 1, name: 'Dashboard' } as PermissionEntity,
      createdAt: new Date('2024-09-04T12:00:00Z'),
      updatedAt: new Date('2024-09-04T12:00:00Z'),
      createdBy: 'Admin',
      updatedBy: 'Admin',
    },
  ],
  1,
];

const mockPermissionByGroupRepository = {
  findAndCount: jest.fn().mockResolvedValue(permissionByGroupsList),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  linkPermissionToGroup: jest.fn(),
};

describe('PermissionByGroupService', () => {
  let permissionByGroupService: PermissionByGroupService;
  let permissionByGroupRepository: Repository<PermissionByGroupEntity>;
  let groupRepository: Repository<GroupEntity>;
  let permissionRepository: Repository<PermissionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionByGroupService,
        {
          provide: getRepositoryToken(PermissionByGroupEntity),
          useValue: mockPermissionByGroupRepository,
        },
        {
          provide: getRepositoryToken(GroupEntity),
          useValue: mockGroupRepository,
        },
        {
          provide: getRepositoryToken(PermissionEntity),
          useValue: mockPermissionRepository,
        },
      ],
    }).compile();

    permissionByGroupService = module.get<PermissionByGroupService>(
      PermissionByGroupService,
    );

    permissionByGroupRepository = module.get<
      Repository<PermissionByGroupEntity>
    >(getRepositoryToken(PermissionByGroupEntity));
    groupRepository = module.get<Repository<GroupEntity>>(
      getRepositoryToken(GroupEntity),
    );
    permissionRepository = module.get<Repository<PermissionEntity>>(
      getRepositoryToken(PermissionEntity),
    );

    permissionByGroupService['permissionByGroupRepository'] =
      permissionByGroupRepository;
    permissionByGroupService['groupRepository'] = groupRepository;
    permissionByGroupService['permissionRepository'] = permissionRepository;
    jest.clearAllMocks();
  });

  describe('permissionByGroupList', () => {
    it('should return a list of permissions by group', async () => {
      const permissionByGroupDtos: ListPermissionByGroupDTO[] =
        permissionByGroupsList[0].map(
          permissionsByGroupFactory.mapPermissionByGroupDTO,
        );

      const result = await permissionByGroupService.permissionByGroupList({});

      expect(result).toEqual({
        status: 'success',
        message: 'Relacionamento buscado com sucesso.',
        document: permissionByGroupDtos,
        rowsAffected: [permissionByGroupsList[1]],
      });
    });
  });

  describe('linkPermissionToGroup', () => {
    it('should successfully link permission to group', async () => {
      const groupId = 1;
      const permissionId = 1;

      const group = { id: groupId, name: 'Admin' } as GroupEntity;
      const permission = {
        id: permissionId,
        name: 'Dashboard',
      } as PermissionEntity;

      mockGroupRepository.findOne.mockResolvedValue(group);
      mockPermissionRepository.findOne.mockResolvedValue(permission);
      mockPermissionByGroupRepository.create.mockReturnValue({
        permissionId,
        groupId,
      } as any);
      mockPermissionByGroupRepository.save.mockResolvedValue({
        id: 1,
        permissionId,
        groupId,
        permission,
        group,
      } as PermissionByGroupEntity);

      const createLinkDto: CreateLinkPermissionByGroupDTO = {
        groupId,
        permissionId,
      };

      const result =
        await permissionByGroupService.linkPermissionToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'success',
        message: 'Relacionamento de permissão por grupo realizado com sucesso.',
        document: [
          permissionsByGroupFactory.mapPermissionByGroupDTO({
            id: 1,
            permissionId,
            groupId,
            permission,
            group,
          } as PermissionByGroupEntity),
        ],
        rowsAffected: [1],
      });
    });

    it('should throw NotFoundException if permission is not found', async () => {
      const groupId = 1;
      const permissionId = 897987981;

      mockGroupRepository.findOne.mockResolvedValue({
        id: groupId,
        name: 'Admin',
      } as GroupEntity);
      mockPermissionRepository.findOne.mockResolvedValue(null);

      const createLinkDto: CreateLinkPermissionByGroupDTO = {
        groupId,
        permissionId,
      };

      const result =
        await permissionByGroupService.linkPermissionToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao relacionar permissão por grupo.',
      });
    });

    it('should throw NotFoundException if group is not found', async () => {
      const groupId = 189798621;
      const permissionId = 1;

      mockGroupRepository.findOne.mockResolvedValue(null);
      mockPermissionRepository.findOne.mockResolvedValue({
        id: permissionId,
        name: 'Dashboard',
      } as PermissionEntity);

      const createLinkDto: CreateLinkPermissionByGroupDTO = {
        groupId,
        permissionId,
      };

      const result =
        await permissionByGroupService.linkPermissionToGroup(createLinkDto);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao relacionar permissão por grupo.',
      });
    });
  });
});
