import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1734986482915 implements MigrationInterface {
  name = 'CreateTable1734986482915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logs" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "email_usuario" character varying(100) NOT NULL, "rota" character varying(150) NOT NULL, "method" character varying(100) NOT NULL, "nome_da_classe" character varying(100) NOT NULL, "parametros" character varying(250) NOT NULL, "mensagem_erro" character varying(100) NOT NULL, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "logs"`);
  }
}
