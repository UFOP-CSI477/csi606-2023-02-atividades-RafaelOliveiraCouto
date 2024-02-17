import Link from "next/link"
import Line from "../components/Line"
import EstadoInterface from "../types/estado"
import getAllEstados from "../repository/estados/GetAllEstados"

export default async function Estado(){
    const estados : EstadoInterface[] = await getAllEstados()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista de Estados</h1>
                <Link href="/estados/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>    
                {
                    estados.map( (estado) => {
                        return(
                            <div key={estado.id} className="border-b py-2">
                                <Line key={estado.id} id={estado.id} description={`${estado.nome} - ${estado.sigla}`}/>
                                <div className="flex mt-2">
                                    <Link href={`/estados/update/${estado.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/estados/delete/${estado.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}