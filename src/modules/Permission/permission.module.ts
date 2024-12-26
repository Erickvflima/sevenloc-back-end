import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionByGroupService } from '@modules/PermissionByGroup/permissionByGroup.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
  ],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionByGroupService],
  exports: [PermissionService, PermissionByGroupService],
})
export class PermissionModule {}
