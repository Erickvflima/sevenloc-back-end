import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './suppliers.service';
import { SupplierEntity } from './entity/supplier.sevenloc.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { SupplierFactory } from './suppliers.factory';

describe('SupplierService', () => {
  let service: SupplierService;
  const supplierEntity = {
    id: 1,
    companyName: 'Supplier 1',
    cnpj: '12345678000195',
    phone: '1234567890',
    email: 'supplier1@example.com',
    createdBy: 'Admin',
    updatedBy: 'Admin',
    createdAt: new Date('2024-09-04T12:00:00Z'),
    updatedAt: new Date('2024-09-04T12:00:00Z'),
  };

  const supplierDTO = SupplierFactory.mapSuppliersToDTO(supplierEntity);

  const mockSupplierRepository = {
    create: jest.fn().mockReturnValue(supplierEntity),
    save: jest.fn().mockResolvedValue(supplierEntity),
    find: jest.fn().mockResolvedValue([supplierEntity]),
    findOne: jest.fn().mockResolvedValue(supplierEntity),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    merge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: getRepositoryToken(SupplierEntity),
          useValue: mockSupplierRepository,
        },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and return a new supplier', async () => {
      const result = await service.createUser(supplierEntity);
      expect(result).toEqual({
        status: 'success',
        message: 'Fornecedor criado com sucesso.',
        document: [supplierDTO],
        rowsAffected: [],
      });
      expect(mockSupplierRepository.create).toHaveBeenCalledWith(
        supplierEntity,
      );
      expect(mockSupplierRepository.save).toHaveBeenCalledWith(supplierEntity);
    });

    it('should return an error message on failure', async () => {
      jest
        .spyOn(mockSupplierRepository, 'save')
        .mockRejectedValueOnce(new Error());
      const result = await service.createUser(supplierEntity);
      expect(result.status).toBe('error');
      expect(result.message).toBe('Erro ao criar usuário');
    });
  });

  describe('listUser', () => {
    it('should return a list of suppliers', async () => {
      const result = await service.listUser({});
      expect(result).toEqual({
        status: 'success',
        message: 'Lista carregada com sucesso.',
        document: [supplierDTO],
        rowsAffected: [1],
      });
      expect(mockSupplierRepository.find).toHaveBeenCalled();
    });

    it('should return an error message on failure', async () => {
      jest
        .spyOn(mockSupplierRepository, 'find')
        .mockRejectedValueOnce(new Error());
      const result = await service.listUser({});
      expect(result.status).toBe('error');
      expect(result.message).toBe('Erro ao buscar lista de fornecedores');
    });
  });

  describe('findOne', () => {
    it('should return a supplier by email', async () => {
      const result = await service.findOne(supplierEntity.email);
      expect(result).toEqual(supplierEntity);
      expect(mockSupplierRepository.findOne).toHaveBeenCalledWith({
        where: { email: supplierEntity.email },
        select: ['email', 'companyName', 'cnpj', 'phone'],
      });
    });

    it('should throw NotFoundException if supplier is not found', async () => {
      jest.spyOn(mockSupplierRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(supplierEntity.email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateSupplier', () => {
    it('should update and return the updated supplier', async () => {
      const updatedData = { companyName: 'Updated Supplier' };
      const result = await service.updateSupplier(
        supplierEntity.email,
        updatedData,
      );
      expect(result).toEqual({
        status: 'success',
        message: 'Fornecedor atualizado com sucesso.',
        document: [supplierDTO],
      });
      expect(mockSupplierRepository.findOne).toHaveBeenCalledWith({
        where: { email: supplierEntity.email },
      });
      expect(mockSupplierRepository.save).toHaveBeenCalledWith(supplierEntity);
    });

    it('should return an error if supplier is not found', async () => {
      jest.spyOn(mockSupplierRepository, 'findOne').mockResolvedValueOnce(null);
      const result = await service.updateSupplier(supplierEntity.email, {});
      expect(result.status).toBe('error');
      expect(result.message).toBe('Fornecedor não encontrado.');
    });
  });

  describe('deleteSupplier', () => {
    it('should delete a supplier', async () => {
      const result = await service.deleteSupplier(supplierEntity.id);
      expect(result).toEqual({
        status: 'success',
        message: 'Fonecedor excluído com sucesso.',
        rowsAffected: [1],
      });
      expect(mockSupplierRepository.delete).toHaveBeenCalledWith(
        supplierEntity.id,
      );
    });

    it('should return an error if no supplier is found to delete', async () => {
      jest
        .spyOn(mockSupplierRepository, 'delete')
        .mockResolvedValueOnce({ affected: 0 });
      const result = await service.deleteSupplier(supplierEntity.id);
      expect(result.status).toBe('error');
      expect(result.message).toBe('Fonecedor não encontrado.');
    });
  });
});
