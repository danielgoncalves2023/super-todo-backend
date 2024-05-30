import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Friendship1716942687181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "friendship",
            columns: [
                {
                    name: "id_friendship",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "senderId",
                    type: "varchar",
                },
                {
                    name: "receiverId",
                    type: "varchar",
                },
                {
                    name: "friendId",
                    type: "varchar",
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["senderId"],
                    referencedColumnNames: ["id_user"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["receiverId"],
                    referencedColumnNames: ["id_user"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["friendId"],
                    referencedColumnNames: ["id_user"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("friendship");
    }

}
