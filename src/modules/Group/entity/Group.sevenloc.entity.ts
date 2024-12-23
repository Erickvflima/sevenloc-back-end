import { dataBaseList, sevenlocTables } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { PermissionEntity } from '@modules/Permission/entity/Permission.sevenloc.entity';
import { UserEntity } from '@modules/User/entity/user.sevenloc.entity';
import { UsersByGroupEntity } from '@modules/UserByGroup/entity/usersByGroup.sevenloc.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'Grupos', database: dataBaseList.sevenloc })
export class GroupEntity extends BaseDefaultEntity {
  @Column({ length: 100, name: 'nome', nullable: false })
  name: string;

  @OneToMany(() => UsersByGroupEntity, (userByGroup) => userByGroup)
  usersByGroupEntity: UsersByGroupEntity[];

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable({
    name: sevenlocTables.usersByGroups,
    joinColumn: { name: 'grupo_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
  })
  user: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.groups)
  @JoinTable({
    name: sevenlocTables.permissionsByGroups,
    joinColumn: { name: 'grupo_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissao_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
