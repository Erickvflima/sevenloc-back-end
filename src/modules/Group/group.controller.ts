import { listResponseDb } from '@interfaces/base';
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDTO } from './dto/createGroup.dto';
import { ListGroupDTO } from './dto/listGroup.dto';
import { GroupService } from './group.service';

@ApiBearerAuth('JWT')
@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os grupos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de grupos retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getListGroups(): Promise<listResponseDb<ListGroupDTO>> {
    return await this.groupService.listGroup({});
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createUser(
    @Body() createGroupDto: CreateGroupDTO,
  ): Promise<listResponseDb> {
    return await this.groupService.createGroup(createGroupDto);
  }
}
