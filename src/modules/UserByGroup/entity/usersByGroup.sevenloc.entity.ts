import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Usuarios_por_grupos', database: dataBaseList.sevenloc })
export class UsersByGroupEntity extends BaseDefaultEntity {
  @PrimaryColumn({ name: 'usuario_id' })
  userId: number;

  @PrimaryColumn({ name: 'grupo_id' })
  groupId: number;

  @ManyToOne(() => UserEntity, (user) => user.usersByGroupEntity)
  @JoinColumn({ name: 'usuario_id' })
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.usersByGroupEntity)
  @JoinColumn({ name: 'grupo_id' })
  group: GroupEntity;

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
