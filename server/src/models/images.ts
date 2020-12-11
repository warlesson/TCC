import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Ocorrencia from './Ocorrencias';

@Entity('images')

export default class Image{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Ocorrencia, ocorrencia => ocorrencia.images)
    @JoinColumn({ name: 'ocorrencias_id' })
    ocorrencia: Ocorrencia;
}