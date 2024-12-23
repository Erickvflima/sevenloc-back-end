import { dataBaseList } from '@enums/dataBase';
import { BaseDefaultEntity } from '@modules/common/entity/BaseDefaultEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'logs', database: dataBaseList.sevenlocLog })
export class LogEntity extends BaseDefaultEntity {
  @Column({ length: 100, name: 'email_usuario', nullable: false })
  userEmail: string;

  @Column({ length: 150, name: 'rota', nullable: false })
  route: string;

  @Column({ length: 100, name: 'method', nullable: false })
  method: string;

  @Column({ length: 100, name: 'nome_da_classe', nullable: false })
  className: string;

  @Column({ length: 250, name: 'parametros', nullable: false })
  params: string;

  @Column({ length: 100, name: 'mensagem_erro', nullable: false })
  errorMessage: string;

  constructor(params: { createdBy: string; updatedBy: string }) {
    super({
      createdBy: params?.createdBy,
      updatedBy: params?.updatedBy,
    });
  }
}
