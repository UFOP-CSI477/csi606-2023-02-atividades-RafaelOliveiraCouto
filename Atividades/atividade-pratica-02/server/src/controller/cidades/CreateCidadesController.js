import { prisma } from "../../database/client.js";

export class CreateCidadesController{

    async handle(request, response){
        const { nome, estado_id } = request.body

        // Validações: model, DTO, Parser, ...
        if(nome === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Nome and Sigla are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const cidades = await prisma.cidade.create({
            data:{
                nome,
                estado:{
                    connect:{
                        id: estado_id
                    }
                }
            }
        })

        return response.json(cidades)
    }

}