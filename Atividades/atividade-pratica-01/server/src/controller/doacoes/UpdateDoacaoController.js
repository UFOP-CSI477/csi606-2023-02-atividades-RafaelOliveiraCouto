import { prisma } from "../../database/client.js";

export class UpdateDoacaoController{

    async handle(request,response){
        const { id, pessoa_id, local_id, data } = request.body

        // Validações ...

        // Sanitização ...

        const doar = await prisma.doacoes.update({
            where:{
                id: parseInt(id)
            },

            data:{
                data,
                pessoa:{
                    connect:{
                        id: pessoa_id
                    }
                },

                lacal:{
                    connect:{
                        id: local_id
                    }
                }
            }
        })

        return response.json(doar)
    }

}