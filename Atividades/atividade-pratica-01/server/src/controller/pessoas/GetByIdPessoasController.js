import { prisma } from "../../database/client.js";

export class GetByIdPessoasController{

    async handle(request,response){
        
        const {id} = request.params

        try{
            const pessoa = await prisma.pessoas.findUnique({
                where:{
                    id: parseInt(id)
                },

                include:{
                    doacoes: true
                }
            })
            return response.json(pessoa)
        }catch(error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }
}