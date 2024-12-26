import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UsersByGroupEntity } from '@modules/UserByGroup/entity/usersByGroup.sevenloc.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.sevenloc.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PermissionModule } from '@modules/Permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersByGroupEntity, GroupEntity]),
    PermissionModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
