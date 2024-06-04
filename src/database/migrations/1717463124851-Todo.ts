import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Todo1717463124851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'todos',
            columns: [
                {
                    name: 'id_todo',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'id_user',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey('todos', new TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id_user'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('todos');
    }
}