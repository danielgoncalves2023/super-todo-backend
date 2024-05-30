import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1716304401353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id_user',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'resume',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'state',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'date_of_birth',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'friends_accepted',
                    type: 'integer', // Adicionando o campo friends_accepted
                    default: 0 // Definindo friends_accepted como 0 por padrão
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
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}