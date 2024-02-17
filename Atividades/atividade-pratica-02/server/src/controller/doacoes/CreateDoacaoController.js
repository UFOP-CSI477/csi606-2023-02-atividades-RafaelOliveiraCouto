import { prisma } from "../../database/client.js";

export class CreateDoacaoController{

    async handle(request,response){
        const { pessoa_id, local_id, data } = request.body

        // Validações: model, DTO, Parser, ...
        if(data === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Nome and Sigla are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const doar = await prisma.doacoes.create({
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