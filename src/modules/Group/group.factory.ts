import { ListGroupDTO } from './dto/listGroup.dto';
import { GroupEntity } from './entity/Group.sevenloc.entity';

export class GroupFactory {
  static mapGroupToDTO(group: GroupEntity): ListGroupDTO {
    return new ListGroupDTO({
      id: group.id,
      name: group.name,
      createdBy: group.createdBy,
      updatedBy: group.updatedBy,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    });
  }
}
