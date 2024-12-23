import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersByGroupEntity } from './entity/usersByGroup.sevenloc.entity';
import { UsersByGroupController } from './usersByGroup.controller';
import { UserByGroupService } from './usersByGroup.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenloc)),
    TypeOrmModule.forFeature([UserEntity, UsersByGroupEntity, GroupEntity]),
  ],
  controllers: [UsersByGroupController],
  providers: [UserByGroupService],
  exports: [UserByGroupService],
})
export class UserByGroupModule {}
