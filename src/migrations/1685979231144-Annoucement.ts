import { MigrationInterface, QueryRunner } from "typeorm";

export class Annoucement1685979231144 implements MigrationInterface {
    name = 'Annoucement1685979231144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announcement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mark" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" integer NOT NULL, "mileage" double precision NOT NULL, "color" character varying NOT NULL, "priceFipe" double precision NOT NULL, "price" double precision NOT NULL, "description" text NOT NULL, "imgCover" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "announcement"`);
    }

}
