import { prisma } from "../../database/client.js";

export class GetByIdColetasController{

    async handle(request,response){
        
        const {id} = request.params

        try{
            const coletas = await prisma.localColeta.findUnique({
                where:{
                    id: parseInt(id)
                },

                include:{
                    doacoes: true
                }
            })
            return response.json(coletas)
        }catch(error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }
}