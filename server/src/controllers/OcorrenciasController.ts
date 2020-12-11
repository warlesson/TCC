import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Ocorrencias from '../models/Ocorrencias';
import ocorrenciaView from '../views/ocorrencias_view';
import * as Yup from 'yup';

const connection = require('../database/connection');

export default  {
    async index(request: Request, response: Response){

        const count = await getRepository(Ocorrencias).count();

        console.log(count);

        const ocorrenciasRepository = getRepository(Ocorrencias);

        const ocorrencias = await ocorrenciasRepository.find({
            relations: ['images']
        });

        response.header('X-Total-Count', count);

        return response.json(ocorrenciaView.renderMany(ocorrencias));
    },

    async show(request: Request, response: Response){
        const { id } = request.params;

        const ocorrenciasRepository = getRepository(Ocorrencias);

        const ocorrencia = await ocorrenciasRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(ocorrenciaView.render(ocorrencia));
    },

    async create(request: Request, response: Response) {
        const {
            titulo,
            latitude,
            longitude,
            descricao,                
            data,
        } = request.body;
        
        const ocorrenciasRepository = getRepository(Ocorrencias);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })
        
        const date = {
            titulo,
            latitude,
            longitude,
            descricao,
            data,
            images
        };

        const schema = Yup.object().shape({
            titulo: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            descricao: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(date), {
            abortEarly: false,
        };

        const ocorrencias = ocorrenciasRepository.create(date);
        
        await ocorrenciasRepository.save(ocorrencias);
        
        return response.status(201).json(ocorrencias);
    
    }
};