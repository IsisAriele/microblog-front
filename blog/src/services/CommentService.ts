import axiosInstance from "./axiosInstance";

class CommentService {
    async listarComentarios(id : number){
        const response= await axiosInstance.get(`publicacao/${id}/comentarios/`);
        return response;
    }


}

export default new CommentService();