import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1734986041779 implements MigrationInterface {
    name = 'CreateTable1734986041779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Permissao" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, CONSTRAINT "PK_78ec25941033109a7ce02ac938f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Usuarios" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "nome" character varying(100) NOT NULL, "senha" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_6b4c9e5c7d35b294307b3fd0fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Grupos" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "nome" character varying(100) NOT NULL, CONSTRAINT "PK_27106a912a4e36face11c5c50ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Usuarios_por_grupos" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "usuario_id" integer NOT NULL, "grupo_id" integer NOT NULL, CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("id", "usuario_id", "grupo_id"))`);
        await queryRunner.query(`CREATE TABLE "Permissoes_por_grupo" ("id" SERIAL NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "criado_por" character varying(50) NOT NULL, "alterado_em" TIMESTAMP NOT NULL DEFAULT now(), "alterado_por" character varying(50) NOT NULL, "permissao_id" integer NOT NULL, "grupo_id" integer NOT NULL, "permissionId" integer, CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("id", "permissao_id", "grupo_id"))`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e" PRIMARY KEY ("usuario_id", "grupo_id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_978b812a0efc25b6b9200278425" PRIMARY KEY ("permissao_id", "grupo_id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "criado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_em"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "alterado_por"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("usuario_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_978b812a0efc25b6b9200278425"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("permissao_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e" PRIMARY KEY ("grupo_id", "usuario_id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_978b812a0efc25b6b9200278425" PRIMARY KEY ("grupo_id", "permissao_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_e2682c8864379b9c60f524db59" ON "Usuarios_por_grupos" ("grupo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_794151d4c78ad60ecdf80584b7" ON "Usuarios_por_grupos" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2dfe3b4b41b2a5fa732365f98" ON "Permissoes_por_grupo" ("grupo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce7a2625bd10e6ecb78cf99b68" ON "Permissoes_por_grupo" ("permissao_id") `);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "FK_794151d4c78ad60ecdf80584b76" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "FK_e2682c8864379b9c60f524db59c" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "FK_68660f3cc0daee0da192fb82c0e" FOREIGN KEY ("permissionId") REFERENCES "Permissao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980" FOREIGN KEY ("grupo_id") REFERENCES "Grupos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "FK_ce7a2625bd10e6ecb78cf99b684" FOREIGN KEY ("permissao_id") REFERENCES "Permissao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "FK_ce7a2625bd10e6ecb78cf99b684"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "FK_e2dfe3b4b41b2a5fa732365f980"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "FK_68660f3cc0daee0da192fb82c0e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "FK_e2682c8864379b9c60f524db59c"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "FK_794151d4c78ad60ecdf80584b76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce7a2625bd10e6ecb78cf99b68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2dfe3b4b41b2a5fa732365f98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_794151d4c78ad60ecdf80584b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2682c8864379b9c60f524db59"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_978b812a0efc25b6b9200278425"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("permissao_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("usuario_id", "grupo_id", "id")`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP COLUMN "permissionId"`);
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
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" DROP CONSTRAINT "PK_978b812a0efc25b6b9200278425"`);
        await queryRunner.query(`ALTER TABLE "Permissoes_por_grupo" ADD CONSTRAINT "PK_9c9b24a296a43aa8537d559ac0d" PRIMARY KEY ("id", "permissao_id", "grupo_id")`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "alterado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_por" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" DROP CONSTRAINT "PK_f2afdcc1c9f26b249db220ff47e"`);
        await queryRunner.query(`ALTER TABLE "Usuarios_por_grupos" ADD CONSTRAINT "PK_b69a69f2d2f720d1d81ef7a24d3" PRIMARY KEY ("id", "usuario_id", "grupo_id")`);
        await queryRunner.query(`DROP TABLE "Permissoes_por_grupo"`);
        await queryRunner.query(`DROP TABLE "Usuarios_por_grupos"`);
        await queryRunner.query(`DROP TABLE "Grupos"`);
        await queryRunner.query(`DROP TABLE "Usuarios"`);
        await queryRunner.query(`DROP TABLE "Permissao"`);
    }

}
