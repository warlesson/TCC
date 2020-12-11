import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './images';

@Entity('ocorrencias')
export default class Ocorrencias{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    titulo: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    descricao: string;

    @Column()
    data: string;

    @OneToMany(() => Image, image => image.ocorrencia, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'ocorrencias_id'})
    images: Image[];
}