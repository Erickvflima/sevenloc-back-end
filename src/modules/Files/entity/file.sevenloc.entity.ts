import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { SupplierEntity } from '@modules/Suppliers/entity/supplier.sevenloc.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'Arquivos', database: dataBaseList.sevenloc })
export class FilesEntity extends BaseDefaultEntity {
  @Column({ type: 'text' })
  path: string;

  @Column({ name: 'nome', length: 255 })
  name: string;

  @Column({ name: 'fornecedor_id' })
  supplierId: number;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.files)
  @JoinColumn({ name: 'fornecedor_id' })
  supplier: SupplierEntity;

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
