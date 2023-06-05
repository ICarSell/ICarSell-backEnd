import { MigrationInterface, QueryRunner } from "typeorm";

export class AnnoucementUp1685985665331 implements MigrationInterface {
    name = 'AnnoucementUp1685985665331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "mileage" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "priceFipe" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "price" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "price" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "priceFipe" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "announcement" ALTER COLUMN "mileage" TYPE numeric(5,2)`);
    }

}
