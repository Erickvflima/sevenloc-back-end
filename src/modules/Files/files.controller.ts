import { listResponseDb } from '@interfaces/base';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ListFilesDTO } from './dto/listFiles.dto copy';
import { CreateFilesDTO } from './dto/createFiles.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('JWT')
@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os arquivos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de arquivos retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso proibido.' })
  async getListfiless(): Promise<listResponseDb<ListFilesDTO>> {
    return await this.filesService.listFiles({});
  }

  @Post()
  @ApiOperation({ summary: 'Insere um novo arquivo.' })
  @ApiResponse({
    status: 201,
    description: 'Arquivo inserido com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async createFile(
    @Body() createFilesDto: CreateFilesDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<listResponseDb> {
    return await this.filesService.insertFiles(createFilesDto, file);
  }
}
