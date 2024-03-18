import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialUser1710611303306 implements MigrationInterface {
    name = 'InitialUser1710611303306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "timeslot" ("id" SERIAL NOT NULL, "time" TIME NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "slot_id" integer, CONSTRAINT "PK_cd8bca557ee1eb5b090b9e63009" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dateslot" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "appointment_id" integer, CONSTRAINT "PK_446a6024e0dc77328194c06d99b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "doctor_id" integer, "patient_id" integer, "organization_id" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('DOCTOR', 'PATIENT', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100) NOT NULL, "specialist" character varying(255), "role" "public"."user_role_enum" NOT NULL DEFAULT 'PATIENT', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_organization" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer, "organization_id" integer, CONSTRAINT "PK_3e103cdf85b7d6cb620b4db0f0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "timeslot" ADD CONSTRAINT "FK_ba5086a67e97aa8286cca6e09e8" FOREIGN KEY ("slot_id") REFERENCES "dateslot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dateslot" ADD CONSTRAINT "FK_81e84df4bcc2eeda46c1e3cb9ff" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_efc8d4c70f5329354c631c17678" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organization" ADD CONSTRAINT "FK_3380ac618acf226e1c2d6e9a228" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organization" ADD CONSTRAINT "FK_f2d20e8f038adda18639b2db1b8" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_organization" DROP CONSTRAINT "FK_f2d20e8f038adda18639b2db1b8"`);
        await queryRunner.query(`ALTER TABLE "user_organization" DROP CONSTRAINT "FK_3380ac618acf226e1c2d6e9a228"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_efc8d4c70f5329354c631c17678"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`);
        await queryRunner.query(`ALTER TABLE "dateslot" DROP CONSTRAINT "FK_81e84df4bcc2eeda46c1e3cb9ff"`);
        await queryRunner.query(`ALTER TABLE "timeslot" DROP CONSTRAINT "FK_ba5086a67e97aa8286cca6e09e8"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "user_organization"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "dateslot"`);
        await queryRunner.query(`DROP TABLE "timeslot"`);
    }

}
