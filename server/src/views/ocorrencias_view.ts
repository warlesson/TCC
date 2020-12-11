import Ocorrencias from '../models/Ocorrencias'
import imagesView from './images_view';

export default{
    render( ocorrencias: Ocorrencias){
         return{
            id: ocorrencias.id,
            titulo: ocorrencias.titulo,
            latitude: ocorrencias.latitude,
            longitude: ocorrencias.longitude,
            descricao: ocorrencias.descricao,
            data: ocorrencias.data,
            images: imagesView.renderMany(ocorrencias.images)
         };
    },
    
    renderMany(ocorrencias: Ocorrencias[]){
        return ocorrencias.map(ocorrencia => this.render(ocorrencia))
    }
}