import { prisma } from "../../database/client.js";

export class UpdateCidadesController{

    async handle(request,response){
        const { id, nome, estado_id } = request.body

        // Validações ...

        // Sanitização ...

        const cidade = await prisma.cidade.update({
            where:{
                id: parseInt(id)
            },

            data:{
                nome,
                updated_at: new Date(),
                estado:{
                    connect:{
                        id: estado_id
                    }
                }
            }
        })

        return response.json(cidade)
    }

}