import { prisma } from "../../database/client.js";

export class GetByIdDoacaoController{

    async handle(request,response){
        
        const {id} = request.params

        try{
            const doar = await prisma.doacoes.findUnique({
                where:{
                    id: parseInt(id)
                }
            })
            return response.json(doar)
        }catch(error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }
}