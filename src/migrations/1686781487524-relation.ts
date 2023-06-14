import { MigrationInterface, QueryRunner } from "typeorm";

export class Relation1686781487524 implements MigrationInterface {
    name = 'Relation1686781487524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ADD "fuel" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "mileage" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "priceFipe"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "priceFipe" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "price" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "price" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "priceFipe"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "priceFipe" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "mileage" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "fuel"`);
    }

}
