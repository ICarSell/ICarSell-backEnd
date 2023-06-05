import { MigrationInterface, QueryRunner } from "typeorm";

export class AnnoucementUp1685985182205 implements MigrationInterface {
    name = 'AnnoucementUp1685985182205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "mileage" numeric(8,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "priceFipe"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "priceFipe" numeric(8,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "price" numeric(8,3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "priceFipe"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "priceFipe" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "mileage" double precision NOT NULL`);
    }

}
