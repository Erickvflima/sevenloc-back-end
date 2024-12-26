import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionByGroupController } from './permissionByGroup.controller';
import { PermissionByGroupService } from './permissionByGroup.service';
import { UserByGroupService } from '@modules/UserByGroup/usersByGroup.service';
import { UserByGroupModule } from '@modules/UserByGroup/usersByGroup.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
    UserByGroupModule,
  ],
  controllers: [PermissionByGroupController],
  providers: [PermissionByGroupService, UserByGroupService],
  exports: [PermissionByGroupService],
})
export class PermissionByGroupModule {}
