import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOcorrencias1603299511910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //REALIZAR ALTERAÇÕES
        //CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO
        await queryRunner.createTable(new Table({
          name: 'ocorrencias',
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
              name: 'titulo',
              type: 'varchar',
            },
            {
              name: 'latitude',
              type: 'decimal',
              scale: 10,
              precision: 2,

            },
            {
              name: 'longitude',
              type: 'decimal',
              scale: 10,
              precision: 2,

            },
            {
              name: 'descricao',
              type: 'text',
            },
            {
              name: 'data',
              type: 'date',
            },
          ],
          
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //SE DER ALGUN PROBLEMA EM ALGUMA ALTEÇÃO FEITA PELO UP ELE VAI TER QUE 
        //DESFAZER O QUE FOI FEITO UP

        await queryRunner.dropTable('ocorrencias');
    }

}
