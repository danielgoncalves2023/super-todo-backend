import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Posts1716339872306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id_post',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'id_user',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'content_text',
                    type: 'text',
                },
                {
                    name: 'content_url_image',
                    type: 'varchar',
                },
                {
                    name: 'content_url_video',
                    type: 'varchar',
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
            ],
            foreignKeys: [
                {
                    columnNames: ['id_user'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id_user'],
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }
}