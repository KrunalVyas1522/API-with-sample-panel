import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialPhase1727208785927 implements MigrationInterface {
    name = 'InitialPhase1727208785927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phases" ("id" SERIAL NOT NULL, "phrase" character varying NOT NULL, "status" character varying NOT NULL, "translations" jsonb NOT NULL, "created_at" date NOT NULL, "updated_at" date, CONSTRAINT "PK_e93bb53460b28d4daf72735d5d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "phases"`);
    }

}
