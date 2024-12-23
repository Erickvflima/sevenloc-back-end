import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { UsersByGroupEntity } from '@modules/UserByGroup/entity/usersByGroup.sevenloc.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'Usuarios', database: dataBaseList.sevenloc })
export class UserEntity extends BaseDefaultEntity {
  @Column({ length: 150, nullable: false, name: 'email' })
  email: string;

  @Column({ length: 100, name: 'nome' })
  name: string;

  @Column({ length: 255, name: 'senha' })
  password: string;

  @Column({ length: 50, name: 'status' })
  status: string;

  @OneToMany(() => UsersByGroupEntity, (userByGroup) => userByGroup)
  usersByGroupEntity: UsersByGroupEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.user)
  groups: UsersByGroupEntity[];

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
