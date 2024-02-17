import Link from "next/link"
import Line from "../components/Line"
import PessoaInterface from "../types/pessoa"
import getAllPessoas from "../repository/pessoas/GetAllPessoas"

export default async function Pessoa(){
    const pessoas : PessoaInterface[] = await getAllPessoas()

    return(
        <main>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Lista de Pessoas</h1>
                <Link href="/pessoas/create" className="text-red-500 hover:underline block mb-4">Cadastrar</Link>
            </div>

            <ul>    
                {
                    pessoas.map( (pessoa) => {
                        return(
                            <div key={pessoa.id} className="border-b py-2">
                                <Line key={pessoa.id} id={pessoa.id} description={`${pessoa.nome} - ${pessoa.rg}`}/>
                                <div className="flex mt-2">
                                    <Link href={`/pessoas/update/${pessoa.id}`} className="mr-4 text-blue-500 hover:underline">Atualizar</Link>
                                    <Link href={`/pessoas/delete/${pessoa.id}`} className="text-red-500 hover:underline">Excluir</Link>
                                </div>
                            </div>
                        )
                    } )
                }

            </ul>
        </main>
    )
}