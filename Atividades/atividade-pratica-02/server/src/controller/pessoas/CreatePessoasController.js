import { prisma } from "../../database/client.js";

export class CreatePessoasController{

    async handle(request,response){
        const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body

        // Validações: model, DTO, Parser, ...
        if(nome === "" && rua === "" && numero === "" && complemento === "" && rg === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Nome and Sigla are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const pessoa = await prisma.pessoas.create({
            data:{
                nome,
                rua,
                numero,
                complemento,
                rg,
                cidade:{
                    connect:{
                        id: cidade_id
                    }
                },
                tipo:{
                    connect:{
                        id: tipo_id
                    }
                }
            }
        })

        return response.json(pessoa)
    }

}