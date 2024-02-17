import Link from "next/link"
import Line from "../components/Line"
import TipoSanguineos from "../types/sangue"
import getAllSangues from "../repository/sangues/GetAllSangues"

export default async function Estado(){
    const sangues : TipoSanguineos[] = await getAllSangues()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista dos Sangues</h1>
                <Link href="/tiposSanguineos/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>    
                {
                    sangues.map( (sangue) => {
                        return(
                            <div key={sangue.id} className="border-b py-2">
                                <Line key={sangue.id} id={sangue.id} description={`Sangue: ${sangue.tipo} --- Fator: ${sangue.fator}`}/>
                                <div className="flex mt-2">
                                    <Link href={`/tiposSanguineos/update/${sangue.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/tiposSanguineos/delete/${sangue.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}