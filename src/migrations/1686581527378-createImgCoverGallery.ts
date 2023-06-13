import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImgCoverGallery1686581527378 implements MigrationInterface {
    name = 'CreateImgCoverGallery1686581527378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "imgCover" TO "imgCoverId"`);
        await queryRunner.query(`CREATE TABLE "imgCover" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "path" text NOT NULL, CONSTRAINT "PK_d0d52c085620e730894b27cd5f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying NOT NULL, "path" text NOT NULL, "announcementId" uuid, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "imgCoverId"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "imgCoverId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "UQ_5f6ac17aaca9a7a29d8342cdc08" UNIQUE ("imgCoverId")`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_fe316208eabe2706d52fee26389" FOREIGN KEY ("announcementId") REFERENCES "announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD CONSTRAINT "FK_5f6ac17aaca9a7a29d8342cdc08" FOREIGN KEY ("imgCoverId") REFERENCES "imgCover"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "FK_5f6ac17aaca9a7a29d8342cdc08"`);
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_fe316208eabe2706d52fee26389"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP CONSTRAINT "UQ_5f6ac17aaca9a7a29d8342cdc08"`);
        await queryRunner.query(`ALTER TABLE "announcement" DROP COLUMN "imgCoverId"`);
        await queryRunner.query(`ALTER TABLE "announcement" ADD "imgCoverId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "imgCover"`);
        await queryRunner.query(`ALTER TABLE "announcement" RENAME COLUMN "imgCoverId" TO "imgCover"`);
    }

}
