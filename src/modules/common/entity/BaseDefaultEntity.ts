import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseDefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'criado_em',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    length: 50,
    nullable: false,
    name: 'criado_por',
  })
  createdBy: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'alterado_em',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ length: 50, nullable: false, name: 'alterado_por' })
  updatedBy: string;

  constructor({
    createdBy,
    updatedBy,
  }: {
    createdBy: string;
    updatedBy: string;
  }) {
    this.createdBy = createdBy || 'SYSTEM';
    this.updatedBy = updatedBy || 'SYSTEM';
  }
}
