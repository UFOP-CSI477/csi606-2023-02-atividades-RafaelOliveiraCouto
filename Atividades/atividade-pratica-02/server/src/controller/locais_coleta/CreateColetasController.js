import { prisma } from "../../database/client.js";

export class CreateColetasController{

    async handle(request, response){
        const { nome, rua, numero, complemento, cidade_id } = request.body

        // Validações: model, DTO, Parser, ...
        if(nome === "" && rua === "" && numero === "" && complemento === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Nome and Sigla are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const coletas = await prisma.localColeta.create({
            data:{
                nome,
                rua,
                numero,
                complemento,
                cidade:{
                    connect:{
                        id: cidade_id
                    }
                }
            }
        })

        return response.json(coletas)
    }

}