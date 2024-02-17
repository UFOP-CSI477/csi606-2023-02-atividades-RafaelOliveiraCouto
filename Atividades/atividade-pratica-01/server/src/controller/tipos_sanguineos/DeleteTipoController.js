import { prisma } from "../../database/client.js";

export class DeleteTipoController{

    async handle(request,response){
        const {id} = request.body

        // Validações ...

        // Sanitização ...

        try{
            const ts = await prisma.tipoSanguineos.delete({
                where:{
                    id: parseInt(id)
                }
            })
            return response.json(ts)
        }catch(error){
            console.error(error)
            return response.status(400).json(error)
        }
    }

}