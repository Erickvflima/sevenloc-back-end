import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'Permissao', database: dataBaseList.sevenloc })
export class PermissionEntity extends BaseDefaultEntity {
  @Column({ length: 100, name: 'nome', nullable: false })
  name: string;

  @Column({ length: 100, name: 'descricao', nullable: false })
  description: string;

  @ManyToMany(() => GroupEntity, (group) => group.permissions)
  groups: GroupEntity[];

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
