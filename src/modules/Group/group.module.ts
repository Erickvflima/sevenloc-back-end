import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
