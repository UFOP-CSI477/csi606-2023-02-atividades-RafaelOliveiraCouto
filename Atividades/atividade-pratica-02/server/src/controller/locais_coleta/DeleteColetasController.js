import { prisma } from "../../database/client.js";

export class DeleteColetasController{

    async handle(request,response){
        const {id} = request.body

        // Validações ...

        // Sanitização ...

        try{
            const coletas = await prisma.localColeta.delete({
                where:{
                    id: parseInt(id)
                }
            })
            return response.json(coletas)
        }catch(error){
            console.error(error)
            return response.status(400).json(error)
        }
    }
}