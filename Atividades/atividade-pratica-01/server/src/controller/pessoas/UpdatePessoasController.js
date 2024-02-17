import { prisma } from "../../database/client.js";

export class UpdatePessoasController{

    async handle(request,response){
        const { id, nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body

        // Validações ...

        // Sanitização ...

        const pessoa = await prisma.pessoas.update({
            where:{
                id: parseInt(id)
            },

            data:{
                nome,
                rua,
                numero,
                complemento,
                rg,
                updated_at: new Date(),
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