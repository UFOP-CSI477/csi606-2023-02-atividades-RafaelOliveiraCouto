import { prisma } from "../../database/client.js";

export class GetByIdCidadesController{

    async handle(request,response){
        
        const {id} = request.params

        try{
            const cidade = await prisma.cidade.findUnique({
                where:{
                    id: parseInt(id)
                },

                include:{
                    localColeta: true,
                    pessoas: true
                }
            })
            return response.json(cidade)
        }catch (error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }

}