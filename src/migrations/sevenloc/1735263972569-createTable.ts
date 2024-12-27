import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1735263972569 implements MigrationInterface {
    name = 'CreateTable1735263972569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "FK_e2682c8864379b9c60f524db59c"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2682c8864379b9c60f524db59"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_794151d4c78ad60ecdf80584b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2dfe3b4b41b2a5fa732365f98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce7a2625bd10e6ecb78cf99b68"`);
        await queryRunner.query(`CREATE TABLE "Arquivos" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM', "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM', "path" text NOT NULL, "nome" character varying(255) NOT NULL, "fornecedor_id" integer NOT NULL, CONSTRAINT "PK_394881ac3fd05eb9422590b3142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("usuario_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_978b812a0efc25b6b9200278425"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("permissao_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e" PRIMARY KEY ("grupo_id", "usuario_id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_978b812a0efc25b6b9200278425" PRIMARY KEY ("grupo_id", "permissao_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_e2682c8864379b9c60f524db59" ON "Usuarios_por_grupos" ("grupo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_794151d4c78ad60ecdf80584b7" ON "Usuarios_por_grupos" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2dfe3b4b41b2a5fa732365f98" ON "Permissoes_por_grupo" ("grupo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce7a2625bd10e6ecb78cf99b68" ON "Permissoes_por_grupo" ("permissao_id") `);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "FK_e2682c8864379b9c60f524db59c" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Arquivos" ADD CONSTRAINT "FK_786dc09a3b4b0077cac2c16202e" FOREIGN KEY ("fornecedor_id") REFERENCES "Fornecedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980"`);
        await queryRunner.query(`ALTER TABLE "Arquivos" DROP CONSTRAINT "FK_786dc09a3b4b0077cac2c16202e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "FK_e2682c8864379b9c60f524db59c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce7a2625bd10e6ecb78cf99b68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2dfe3b4b41b2a5fa732365f98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_794151d4c78ad60ecdf80584b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2682c8864379b9c60f524db59"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_978b812a0efc25b6b9200278425"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("permissao_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("usuario_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_978b812a0efc25b6b9200278425" PRIMARY KEY ("permissao_id", "grupo_id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e" PRIMARY KEY ("usuario_id", "grupo_id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_por" character varying(50) NOT NULL DEFAULT 'SYSTEM'`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`DROP TABLE "Arquivos"`);
        await queryRunner.query(`CREATE INDEX "IDX_ce7a2625bd10e6ecb78cf99b68" ON "Permissoes_por_grupo" ("permissao_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2dfe3b4b41b2a5fa732365f98" ON "Permissoes_por_grupo" ("grupo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_794151d4c78ad60ecdf80584b7" ON "Usuarios_por_grupos" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2682c8864379b9c60f524db59" ON "Usuarios_por_grupos" ("grupo_id") `);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "FK_e2682c8864379b9c60f524db59c" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
