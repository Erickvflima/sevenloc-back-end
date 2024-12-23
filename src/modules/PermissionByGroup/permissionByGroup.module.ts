import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionByGroupController } from './permissionByGroup.controller';
import { PermissionByGroupService } from './permissionByGroup.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
  ],
  controllers: [PermissionByGroupController],
  providers: [PermissionByGroupService],
  exports: [PermissionByGroupService],
})
export class PermissionByGroupModule {}
