import axiosInstance from "./axiosInstance";

class CommentService {
    async listarComentarios(id: number){
        const response= await axiosInstance.get(`publicacao/${id}/comentarios/`);
        return response;
    }

    async postarComentario(data: any){
        const response= await axiosInstance.post("comentario/", data);
        return response.data;
    }
}

export default new CommentService();