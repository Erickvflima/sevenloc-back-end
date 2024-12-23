import { listResponseDb } from '@interfaces/base';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateLinkUserByGroupDTO } from './dto/createLinkUserByGroup.dto';
import { ListUserByGroupDTO } from './dto/listUserByGroup.dto';
import { UserByGroupService } from './usersByGroup.service';

@ApiBearerAuth('JWT')
@ApiTags('userByGroup')
@Controller('userByGroup')
export class UsersByGroupController {
  constructor(private readonly userByGroupService: UserByGroupService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getAllUsers(): Promise<listResponseDb<ListUserByGroupDTO>> {
    return await this.userByGroupService.userByGroupList({});
  }

  @Post()
  @ApiOperation({ summary: 'Vinculo de usuario por grupo' })
  @ApiResponse({
    status: 201,
    description: 'Vinculo de usuario por grupo criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createUser(
    @Body() createLinkUserByGroupDTO: CreateLinkUserByGroupDTO,
  ): Promise<listResponseDb> {
    return await this.userByGroupService.linkUserToGroup(
      createLinkUserByGroupDTO,
    );
  }
}
