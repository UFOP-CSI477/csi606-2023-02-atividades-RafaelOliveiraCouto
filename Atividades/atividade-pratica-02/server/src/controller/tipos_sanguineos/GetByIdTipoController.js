import { prisma } from "../../database/client.js";

export class GetByIdTipoController{

    async handle(request,response){

        const {id} = request.params

        try{
            const ts = await prisma.tipoSanguineos.findUnique({
                where:{
                    id: parseInt(id)
                },

                include:{
                    pessoas: true
                }
            })
            return response.json(ts)
        }catch(error){
            response.status(400).json({
                message: 'Invalid Request.',
                error
            })
        }
    }

}