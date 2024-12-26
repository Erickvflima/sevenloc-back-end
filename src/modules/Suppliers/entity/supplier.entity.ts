import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { Column, Entity } from 'typeorm';

@Entity('suppliers')
export class SupplierEntity extends BaseDefaultEntity {
  @Column({ length: 255, name: 'nome_empresa' })
  companyName: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 15, name: 'telefone' })
  phone: string;

  @Column({ length: 255 })
  email: string;
}
