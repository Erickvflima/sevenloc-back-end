import { ListUserDTO } from './dto/listUser.dto';
import { UserEntity } from './entity/user.sevenloc.entity';

export class UserFactory {
  static mapUserToDTO(user: UserEntity): ListUserDTO {
    return new ListUserDTO({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      updatedBy: user.updatedBy,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
