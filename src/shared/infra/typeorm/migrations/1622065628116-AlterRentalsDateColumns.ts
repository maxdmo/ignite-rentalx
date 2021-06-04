import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRentalsDateColumns1622065628116
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "AlTER TABLE rentals ALTER COLUMN end_date DROP NOT NULL"
        );
        await queryRunner.query(
            "AlTER TABLE rentals ALTER COLUMN total DROP NOT NULL"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "AlTER TABLE `rentals` ALTER COLUMN `end_date` timestamp NOT NULL"
        );
        await queryRunner.query(
            "AlTER TABLE `rentals` ALTER COLUMN `total` numeric NOT NULL"
        );
    }
}
