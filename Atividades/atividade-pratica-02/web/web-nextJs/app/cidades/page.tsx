import Link from "next/link"
import Line from "../components/Line"
import CidadeInterface from "../types/cidade"
import getAllCidades from "../repository/cidades/GetAllCidades"

export default async function Cidade(){
    const cidades : CidadeInterface[] = await getAllCidades()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista de Cidades</h1>
                <Link href="/cidades/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>  
                {
                    cidades.map( (cidade) => {
                        return(
                            <div key={cidade.id} className="border-b py-2">
                                <Line key={cidade.id} id={cidade.id} description={`${cidade.nome}`} />
                                <div className="flex mt-2">
                                    <Link href={`/cidades/update/${cidade.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/cidades/delete/${cidade.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}