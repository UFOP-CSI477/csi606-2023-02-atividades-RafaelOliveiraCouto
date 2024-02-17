import { prisma } from "../../database/client.js";

export class CreateEstadosController{

    async handle(request,response){
        const { nome, sigla } = request.body

        // Validações: model, DTO, Parser, ...
        if(nome === ""){
            return response.status(400).json({
                massage: 'Invalid  data. Nome and Sigla are required.'
            })
        }

        // Sanitização ...


        // Persistencia
        const estado = await prisma.estado.create({
            data:{
                nome,
                sigla
            }
        })

        return response.json(estado)

    }

}