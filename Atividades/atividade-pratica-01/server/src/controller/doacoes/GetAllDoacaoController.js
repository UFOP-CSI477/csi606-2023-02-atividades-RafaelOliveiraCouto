import { prisma } from "../../database/client.js";

export class GetAllDoacaoController{

    async handle(request,response){
        const doar = await prisma.doacoes.findMany()
        return response.json(doar)
    }

}