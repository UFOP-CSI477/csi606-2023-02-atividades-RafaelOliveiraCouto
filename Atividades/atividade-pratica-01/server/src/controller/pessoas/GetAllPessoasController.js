import { prisma } from "../../database/client.js";

export class GetAllPessoasController{

    async handle(request,response){
        const pessoa = await prisma.pessoas.findMany({
            include:{
                doacoes: true
            }
        })
        return response.json(pessoa)
    }
}