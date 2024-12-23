import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './dto/createPermission.dto';
import { ListPermissionDTO } from './dto/listPermission.dto';
import { PermissionEntity } from './entity/Permission.sevenloc.entity';
import { PermissionFactory } from './permission.factory';
import { PermissionService } from './permission.service';

const mockPermissions = [
  {
    id: 1,
    name: 'Read',
    description: 'Dashboard',
    createdBy: 'Admin',
    updatedBy: 'Admin',
    createdAt: new Date('2024-09-04T12:00:00Z'),
    updatedAt: new Date('2024-09-04T12:00:00Z'),
  },
  {
    id: 2,
    name: 'Write',
    description: 'Edit',
    createdBy: 'Admin',
    updatedBy: 'Admin',
    createdAt: new Date('2024-09-04T12:00:00Z'),
    updatedAt: new Date('2024-09-04T12:00:00Z'),
  },
] as PermissionEntity[];

const mockPermissionDTOs = [
  new ListPermissionDTO({
    id: 1,
    name: 'Read',
    description: 'Dashboard',
    createdAt: new Date('2024-09-04T12:00:00Z'),
    updatedAt: new Date('2024-09-04T12:00:00Z'),
    createdBy: 'Admin',
    updatedBy: 'Admin',
  }),
  new ListPermissionDTO({
    id: 2,
    name: 'Write',
    description: 'Edit',
    createdAt: new Date('2024-09-04T12:00:00Z'),
    updatedAt: new Date('2024-09-04T12:00:00Z'),
    createdBy: 'Admin',
    updatedBy: 'Admin',
  }),
];

export const mockPermissionRepository = {
  find: jest.fn().mockResolvedValue(mockPermissions),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn().mockResolvedValue(mockPermissions),
};

export const mockPermissionFactory = {
  mapPermissionToDTO: jest.fn().mockImplementation(
    (permission: PermissionEntity) =>
      new ListPermissionDTO({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
        createdBy: permission.createdBy,
        updatedBy: permission.updatedBy,
      }),
  ),
};

describe('PermissionService', () => {
  let usePermissionService: PermissionService;
  let usePermissionRepository: Repository<PermissionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(PermissionEntity),
          useValue: mockPermissionRepository,
        },
        {
          provide: PermissionFactory,
          useValue: mockPermissionFactory,
        },
      ],
    }).compile();

    usePermissionService = module.get<PermissionService>(PermissionService);
    usePermissionRepository = module.get<Repository<PermissionEntity>>(
      getRepositoryToken(PermissionEntity),
    );

    usePermissionService['permissionRepository'] = usePermissionRepository;
    jest.clearAllMocks();
  });

  describe('listPermission', () => {
    it('deve retornar a lista de permissões com sucesso', async () => {
      mockPermissionRepository.find.mockResolvedValue(mockPermissions);
      mockPermissionFactory.mapPermissionToDTO.mockImplementation(
        (permission: PermissionEntity) =>
          mockPermissionDTOs.find(
            (dto) => dto.id === permission.id,
          ) as ListPermissionDTO,
      );

      const result = await usePermissionService.listPermission({});

      expect(result).toEqual({
        status: 'success',
        message: 'Lista de permissões',
        document: mockPermissionDTOs,
        rowsAffected: [mockPermissionDTOs.length],
      });
      expect(mockPermissionRepository.find).toHaveBeenCalledWith({});
    });

    it('deve retornar erro ao buscar permissões', async () => {
      const error = new Error('Database error');
      mockPermissionRepository.find.mockRejectedValue(error);

      const result = await usePermissionService.listPermission({});

      expect(result).toEqual({
        status: 'error',
        message: `Erro ao buscar lista de permissões: ${error}`,
      });
    });
  });

  describe('createPermission', () => {
    const mockPermission = {
      name: 'Write',
      description: 'Edit',
    } as CreatePermissionDTO;
    it('deve criar uma permissão com sucesso', async () => {
      const mockSavedPermission = {
        id: 1,
        name: 'Write',
        description: 'Edit',
        createdBy: 'Admin',
        updatedBy: 'Admin',
        createdAt: new Date('2024-09-04T12:00:00Z'),
        updatedAt: new Date('2024-09-04T12:00:00Z'),
      } as PermissionEntity;

      const mockPermissionDTO = new ListPermissionDTO({
        id: 1,
        name: 'Write',
        description: 'Edit',
        createdAt: new Date('2024-09-04T12:00:00Z'),
        updatedAt: new Date('2024-09-04T12:00:00Z'),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });

      mockPermissionRepository.create.mockReturnValue(mockSavedPermission);
      mockPermissionRepository.save.mockResolvedValue(mockSavedPermission);

      mockPermissionFactory.mapPermissionToDTO.mockReturnValue(
        mockPermissionDTO,
      );

      const result =
        await usePermissionService.createPermission(mockPermission);

      expect(result).toEqual({
        status: 'success',
        message: 'Permissão criada com sucesso.',
        document: [mockPermissionDTO],
        rowsAffected: [],
      });
    });

    it('deve retornar erro ao criar uma permissão', async () => {
      const error = new Error('Database error');
      mockPermissionRepository.save.mockRejectedValue(error);

      const result =
        await usePermissionService.createPermission(mockPermission);

      expect(result).toEqual({
        status: 'error',
        message: 'Erro ao criar permissão',
      });
    });
  });
});
