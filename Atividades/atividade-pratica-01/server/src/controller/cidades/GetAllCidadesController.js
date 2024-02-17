import { prisma } from "../../database/client.js";

export class GetAllCidadesController{

    async handle(request,response){
        const cidades = await prisma.cidade.findMany({
            include:{
                localColeta: true,
                pessoas: true
            }
        })
        return response.json(cidades)
    }

}