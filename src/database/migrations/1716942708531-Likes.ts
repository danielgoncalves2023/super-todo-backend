import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Likes1716942708531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "likes",
            columns: [
                {
                    name: "id_like",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "id_user",
                    type: "varchar"
                },
                {
                    name: "id_post",
                    type: "int"
                }
            ]
        }));

        await queryRunner.createForeignKey("likes", new TableForeignKey({
            columnNames: ["id_user"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("likes", new TableForeignKey({
            columnNames: ["id_post"],
            referencedColumnNames: ["id_post"],
            referencedTableName: "posts",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("likes");
    }

}