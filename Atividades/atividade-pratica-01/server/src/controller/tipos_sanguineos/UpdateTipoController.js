import { prisma } from "../../database/client.js";

export class UpdateTipoController{

    async handle(request,response){
        const { id, tipo, fator } = request.body

        // Validações ...

        // Sanitização ...

        const ts = await prisma.tipoSanguineos.update({
            where:{
                id: parseInt(id)
            },

            data:{
                tipo,
                fator,
                updated_at: new Date()
            }
        })

        return response.json(ts)
    }

}