import { prisma } from "../../database/client.js";

export class UpdateEstadosController{

    async handle(request,response){
        const { id, nome, sigla } = request.body

        // Validações ...

        // Sanitização ...

        const estado = await prisma.estado.update({
            where:{
                id: parseInt(id)
            },
            
            data:{
                nome,
                sigla,
                updated_at: new Date()
            }
        })

        return response.json(estado)
    }

}