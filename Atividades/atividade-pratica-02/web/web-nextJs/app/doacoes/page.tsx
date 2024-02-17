import Link from "next/link"
import Line from "../components/Line"
import Doacoesinterface from "../types/doacoes"
import getAllDoacoes from "../repository/doacoes/GetAllDoacoes"

export default async function Doacoes(){
    const doacoes : Doacoesinterface[] = await getAllDoacoes()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista de Doações</h1>
                <Link href="/doacoes/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>    
                {
                    doacoes.map( (doar) => {
                        return(
                            <div key={doar.id} className="border-b py-2">
                                <Line key={doar.id} id={doar.id} description={`Data: ${doar.data}`}/>
                                <div className="flex mt-2">
                                    <Link href={`/doacoes/update/${doar.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/doacoes/delete/${doar.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}