import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { GroupEntity } from '@modules/Group/entity/Group.sevenloc.entity';
import { PermissionEntity } from '@modules/Permission/entity/Permission.sevenloc.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Permissoes_por_grupo', database: dataBaseList.sevenloc })
export class PermissionByGroupEntity extends BaseDefaultEntity {
  @PrimaryColumn({ name: 'permissao_id', type: 'int' })
  permissionId: number;

  @PrimaryColumn({ name: 'grupo_id', type: 'int' })
  groupId: number;

  @ManyToOne(() => PermissionEntity, (permission) => permission.groups)
  permission: PermissionEntity;

  @ManyToOne(() => GroupEntity, (group) => group.permissions)
  @JoinColumn({ name: 'grupo_id' })
  group: GroupEntity;

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
