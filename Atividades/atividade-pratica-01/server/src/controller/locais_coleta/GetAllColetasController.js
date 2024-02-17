import { prisma } from "../../database/client.js";

export class GetAllColetasController{

    async handle(request,response){
        const coletas = await prisma.localColeta.findMany({
            include:{
                doacoes: true
            }
        })
        return response.json(coletas)
    }

}