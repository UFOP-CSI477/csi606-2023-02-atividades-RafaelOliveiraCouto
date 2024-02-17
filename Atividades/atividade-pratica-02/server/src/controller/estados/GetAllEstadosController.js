import { prisma } from "../../database/client.js";

export class GetAllEstadosController{

    async handle(request,response){
        const estados = await prisma.estado.findMany({
            include:{
                cidades:true
            }
        })
        
        return response.json(estados)
    }

}