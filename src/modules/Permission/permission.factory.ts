import { ListPermissionDTO } from './dto/listPermission.dto';
import { PermissionEntity } from './entity/Permission.sevenloc.entity';

export class PermissionFactory {
  static mapPermissionToDTO(permission: PermissionEntity): ListPermissionDTO {
    return new ListPermissionDTO({
      id: permission.id,
      name: permission.name,
      description: permission.description,
      createdBy: permission.createdBy,
      updatedBy: permission.updatedBy,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    });
  }
}
