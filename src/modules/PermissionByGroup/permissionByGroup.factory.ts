import { ListPermissionByGroupDTO } from './dto/listPermissionByGroup.dto';
import { PermissionByGroupEntity } from './entity/PermissionByGroup.sevenloc.entity';

export class permissionsByGroupFactory {
  static mapPermissionByGroupDTO(
    permissionByGroup: PermissionByGroupEntity,
  ): ListPermissionByGroupDTO {
    return new ListPermissionByGroupDTO({
      id: permissionByGroup.id,
      permissionId: permissionByGroup.permission.id,
      groupId: permissionByGroup.groupId,
      groupName: permissionByGroup.group.name,
      permissionName: permissionByGroup.permission.name,
      createdBy: permissionByGroup.createdBy,
      updatedBy: permissionByGroup.updatedBy,
      createdAt: permissionByGroup.createdAt,
      updatedAt: permissionByGroup.updatedAt,
    });
  }
}
