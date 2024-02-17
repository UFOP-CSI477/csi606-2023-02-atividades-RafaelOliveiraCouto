import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prisma } from "../../database/client.js";

export class DeleteEstadosController{

    async handle(request,response){
        const {id} = request.body
                
        // Validações ...

        // Sanitização ...

        try{
            const estado = await prisma.estado.delete({
                where:{
                    id: parseInt(id)
                }
            })
            return response.json(estado)
        }catch(error){
            if(error.code === "P2025" && error instanceof PrismaClientKnownRequestError) {
                return response.status(400).json({
                    message: `[DeleteEstadosController] Estado id: ${id} não existe.`
                })
            }
        }
    }

}