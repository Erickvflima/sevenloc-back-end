import { listResponseDb } from '@interfaces/base';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { PermissionGuard } from '@auth/permissions.guard';
import { Permission } from '@decorator/permission';

@ApiBearerAuth('JWT')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getAllUsers(): Promise<listResponseDb<ListUserDTO>> {
    return await this.userService.listUser({});
  }

  @Post()
  @Permission('CADASTRO')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createUser(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<listResponseDb> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário existente pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async deleteUser(@Param('id') id: number): Promise<listResponseDb> {
    return await this.userService.deleteUser(id);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Alterar os dados do usuário.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async putUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<listResponseDb> {
    return await this.userService.updateUser(email, updateUserDto);
  }
}
