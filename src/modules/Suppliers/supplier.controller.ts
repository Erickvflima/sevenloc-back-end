import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SupplierService } from './suppliers.service';
import { SupplierEntity } from './entity/supplier.sevenloc.entity';
import { ListSupplierDTO } from './dto/listSupplier.dto';
import { listResponseDb } from '@interfaces/base';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Cria novo fornecedor.' })
  @ApiResponse({
    status: 201,
    description: 'Fornecedor criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida.',
  })
  async createSupplier(
    @Body() supplierData: Partial<SupplierEntity>,
  ): Promise<listResponseDb<ListSupplierDTO>> {
    return await this.supplierService.createUser(supplierData);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna a lista de fornecedores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de fornecedores retornada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async listSuppliers(): Promise<listResponseDb<ListSupplierDTO>> {
    return await this.supplierService.listUser({});
  }

  @Get(':email')
  @ApiOperation({ summary: 'Lista de fornecedor pelo email' })
  @ApiResponse({
    status: 200,
    description: 'Lista de fornecedores retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Fornecedor não encontrado',
  })
  async getSupplierByEmail(
    @Param('email') email: string,
  ): Promise<SupplierEntity> {
    return await this.supplierService.findOne(email);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Alterar os dados do fornecedor' })
  @ApiResponse({
    status: 200,
    description: 'Fornecedor atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado.' })
  async updateSupplier(
    @Param('email') email: string,
    @Body() updateData: Partial<SupplierEntity>,
  ): Promise<listResponseDb<ListSupplierDTO>> {
    return await this.supplierService.updateSupplier(email, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um fornecedor existente pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Fornecedor removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Fornecedor não encontrado.',
  })
  async deleteSupplier(@Param('id') id: number): Promise<listResponseDb> {
    return await this.supplierService.deleteSupplier(id);
  }
}
