import { prisma } from "../../database/client.js";

export class DeletePessoasController{

    async handle(request,response){
        const {id} = request.body

        // Validações ...

        // Sanitização ...

        try{
            const pessoa = await prisma.pessoas.delete({
                where:{
                    id: parseInt(id)
                }
            })
            return response.json(pessoa)
        }catch(error){
            console.error(error)
            return response.status(400).json(error)
        }
    }
}