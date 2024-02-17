import { prisma } from "../../database/client.js";

export class CreateTipoController{

    async handle(request,response){
        const { tipo, fator } = request.body

        // Validações: model, DTO, Parser, ...
        if(tipo === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Tipo and Fator are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const ts = await prisma.tipoSanguineos.create({
            data:{
                tipo,
                fator,
            }
        })

        return response.json(ts)
    }
}