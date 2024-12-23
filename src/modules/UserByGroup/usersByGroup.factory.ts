import { ListUserByGroupDTO } from './dto/listUserByGroup.dto';
import { UsersByGroupEntity } from './entity/usersByGroup.sevenloc.entity';

export class usersByGroupFactory {
  static mapUserByGroupDTO(
    userByGroup: UsersByGroupEntity,
  ): ListUserByGroupDTO {
    return new ListUserByGroupDTO({
      id: userByGroup.id,
      userId: userByGroup.user.id,
      groupId: userByGroup.groupId,
      groupName: userByGroup.group.name,
      userEmail: userByGroup.user.name,
      createdBy: userByGroup.createdBy,
      updatedBy: userByGroup.updatedBy,
      createdAt: userByGroup.createdAt,
      updatedAt: userByGroup.updatedAt,
    });
  }
}
