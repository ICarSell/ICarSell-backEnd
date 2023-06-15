import { MigrationInterface, QueryRunner } from "typeorm";

export class Relation1686792392630 implements MigrationInterface {
    name = 'Relation1686792392630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "year" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "year" integer NOT NULL`);
    }

}
