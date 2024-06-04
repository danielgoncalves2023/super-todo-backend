import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Task1717463135880 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id_task',
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
                    name: 'status',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'start_date',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'completion_date',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'id_todo',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            columnNames: ['id_todo'],
            referencedColumnNames: ['id_todo'],
            referencedTableName: 'todos',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }
}