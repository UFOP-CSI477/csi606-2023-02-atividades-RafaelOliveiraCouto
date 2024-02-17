import Link from "next/link"
import Line from "../components/Line"
import ColetaInterface from "../types/coleta"
import getAllColetas from "../repository/coleta/GetAllColetas"

export default async function Coletas(){
    const coletas : ColetaInterface[] = await getAllColetas()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista de Coletas</h1>
                <Link href="/coletas/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>  
                {
                    coletas.map( (coleta) => {
                        return(
                            <div key={coleta.id} className="border-b py-2">
                                <Line key={coleta.id} id={coleta.id} description={`${coleta.nome}`} />
                                <div className="flex mt-2">
                                    <Link href={`/coletas/update/${coleta.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/coletas/delete/${coleta.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}