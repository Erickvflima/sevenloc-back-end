import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { SupplierEntity } from './entity/supplier.sevenloc.entity';
import { ListSupplierDTO } from './dto/listSupplier.dto';
import { listResponseDb } from '@interfaces/base';
import { SupplierFactory } from './suppliers.factory';
import dataSource from '@config/data.source';

@Injectable()
export class SupplierService {
  private supplierRepository: Repository<SupplierEntity>;
  constructor() {
    this.supplierRepository = dataSource.getRepository(SupplierEntity);
  }

  async createUser(
    supplier: Partial<SupplierEntity>,
  ): Promise<listResponseDb<ListSupplierDTO>> {
    try {
      const newSupplier = this.supplierRepository.create(supplier);
      const savedSupplier = await this.supplierRepository.save(newSupplier);
      const supplierDTO = SupplierFactory.mapSuppliersToDTO(savedSupplier);
      return {
        status: 'success',
        message: 'Fornecedor criado com sucesso.',
        document: [supplierDTO],
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

  async listUser(
    options: FindManyOptions<SupplierEntity>,
  ): Promise<listResponseDb<ListSupplierDTO>> {
    try {
      const users = await this.supplierRepository.find(options);
      const userFilter: ListSupplierDTO[] = users.map(
        SupplierFactory.mapSuppliersToDTO.bind(this),
      );
      return {
        status: 'success',
        message: 'Lista carregada com sucesso.',
        document: userFilter,
        rowsAffected: [userFilter.length],
      };
    } catch {
      const message = 'Erro ao buscar lista de fornecedores';
      Logger.error(message);
      return {
        status: 'error',
        message: message,
      };
    }
  }

  async findOne(email: string): Promise<SupplierEntity> {
    const user = await this.supplierRepository.findOne({
      where: { email },
      select: ['email', 'companyName', 'cnpj', 'phone'],
    });

    if (!user) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return user;
  }

  async updateSupplier(
    email: string,
    updateData: Partial<SupplierEntity>,
  ): Promise<listResponseDb<ListSupplierDTO>> {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: { email },
      });
      if (!supplier) {
        return {
          status: 'error',
          message: 'Fornecedor não encontrado.',
        };
      }
      this.supplierRepository.merge(supplier, updateData);
      const updatedSupplier = await this.supplierRepository.save(supplier);
      const supplierDTO = SupplierFactory.mapSuppliersToDTO(updatedSupplier);
      return {
        status: 'success',
        message: 'Fornecedor atualizado com sucesso.',
        document: [supplierDTO],
      };
    } catch (error) {
      const erroUpdated = 'Erro ao atualizar fornecedor';
      Logger.error(erroUpdated, error);
      return {
        status: 'error',
        message: erroUpdated,
      };
    }
  }

  async deleteSupplier(id: number): Promise<listResponseDb> {
    try {
      const result = await this.supplierRepository.delete(id);
      if (result.affected === 0) {
        return {
          status: 'error',
          message: 'Fonecedor não encontrado.',
        };
      }
      return {
        status: 'success',
        message: 'Fonecedor excluído com sucesso.',
        rowsAffected: [result.affected || 0],
      };
    } catch (error) {
      const messageError = 'Erro ao excluir fonecedor';
      Logger.error(messageError, error);
      return {
        status: 'error',
        message: messageError,
      };
    }
  }
}
