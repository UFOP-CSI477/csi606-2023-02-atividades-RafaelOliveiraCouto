import { prisma } from "../../database/client.js";

export class GetByIdEstadosController{

    async handle(request,response){

        const {id} = request.params

        try{
            const estado = await prisma.estado.findUniqueOrThrow({
                where:{
                    id: parseInt(id)
                },

                include:{
                    cidades: true
                }
            })
            return response.json(estado)
        }catch (error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }

}