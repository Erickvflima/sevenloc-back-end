import { listResponseDb } from '@interfaces/base';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePermissionDTO } from './dto/createPermission.dto';
import { ListPermissionDTO } from './dto/listPermission.dto';
import { PermissionService } from './permission.service';

@ApiBearerAuth('JWT')
@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  @ApiOperation({ summary: 'Retorna todos as permissões' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissões retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getListPermissions(): Promise<listResponseDb<ListPermissionDTO>> {
    return await this.permissionService.listPermission({});
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova Permissão' })
  @ApiResponse({
    status: 201,
    description: 'Permissão criada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createUser(
    @Body() createPermissionDto: CreatePermissionDTO,
  ): Promise<listResponseDb> {
    return await this.permissionService.createPermission(createPermissionDto);
  }
}
