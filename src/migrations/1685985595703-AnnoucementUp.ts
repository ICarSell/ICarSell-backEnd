import { MigrationInterface, QueryRunner } from "typeorm";

export class AnnoucementUp1685985595703 implements MigrationInterface {
    name = 'AnnoucementUp1685985595703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "mileage" TYPE numeric(5,3)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "priceFipe" TYPE numeric(5,3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "priceFipe" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "mileage" TYPE numeric(5,2)`);
    }

}
