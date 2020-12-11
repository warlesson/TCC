import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603379134933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'images',
        columns: [
          {
            name:  'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'ocorrencias_id',
            type: 'interger',
          },
        ],
        foreignKeys:[
          {
            name: 'ImageOcorrencia',
            columnNames: ['ocorrencias_id'],
            referencedTableName: 'ocorrencias',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images');
    }

}
