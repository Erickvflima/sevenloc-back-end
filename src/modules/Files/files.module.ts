import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
