import { listResponseDb } from '@interfaces/base';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateLinkPermissionByGroupDTO } from './dto/createLinkPermissionByGroup.dto';
import { ListPermissionByGroupDTO } from './dto/listPermissionByGroup.dto';
import { PermissionByGroupService } from './permissionByGroup.service';

@ApiBearerAuth('JWT')
@ApiTags('permissionByGroup')
@Controller('permissionByGroup')
export class PermissionByGroupController {
  constructor(
    private readonly permissionByGroupService: PermissionByGroupService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os permissões por grupo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissões por grupo retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getAllPermissions(): Promise<listResponseDb<ListPermissionByGroupDTO>> {
    return await this.permissionByGroupService.permissionByGroupList({});
  }

  @Post()
  @ApiOperation({ summary: 'Vinculo de usuario por grupo' })
  @ApiResponse({
    status: 201,
    description: 'Vinculo de usuario por grupo criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createPermission(
    @Body() createLinkPermissionByGroupDTO: CreateLinkPermissionByGroupDTO,
  ): Promise<listResponseDb> {
    return await this.permissionByGroupService.linkPermissionToGroup(
      createLinkPermissionByGroupDTO,
    );
  }
}
