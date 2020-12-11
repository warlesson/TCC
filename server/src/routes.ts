import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OcorrenciasController from './controllers/OcorrenciasController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/ocorrencias', OcorrenciasController.index);
routes.get('/ocorrencias/:id', OcorrenciasController.show);
routes.post('/ocorrencias', upload.array('images'), OcorrenciasController.create);

export default routes;

