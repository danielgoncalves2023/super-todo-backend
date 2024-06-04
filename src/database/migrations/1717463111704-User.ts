import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1717463111704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id_user',
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
                    name: 'gender',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}