import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Comments1716942720861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
            columns: [
                {
                    name: "id_comment",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "content",
                    type: "varchar"
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "id_user",
                    type: "varchar"
                },
                {
                    name: "id_post",
                    type: "varchar"
                }
            ]
        }));

        await queryRunner.createForeignKey("comments", new TableForeignKey({
            columnNames: ["id_user"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("comments", new TableForeignKey({
            columnNames: ["id_post"],
            referencedColumnNames: ["id_post"],
            referencedTableName: "posts",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments");
    }

}