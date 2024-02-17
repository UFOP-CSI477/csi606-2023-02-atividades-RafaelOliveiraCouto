import { prisma } from "../../database/client.js";

export class GetAllTipoController{

    async handle(request,response){
        const ts = await prisma.tipoSanguineos.findMany({
            include:{
                pessoas: true
            }
        })

        return response.json(ts)
    }
}