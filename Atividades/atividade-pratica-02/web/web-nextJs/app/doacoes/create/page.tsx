"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getAllColetas from "@/app/repository/coleta/GetAllColetas"
import getAllPessoas from "@/app/repository/pessoas/GetAllPessoas"
import ColetaInterface from "@/app/types/coleta"
import PessoaInterface from "@/app/types/pessoa"


export default function CreateDoacoes(){

    const [dete, setDete] = useState('')

    const [pessoaId, setPessoaId] = useState('')
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([])

    const [coletaId, setColetaId] = useState('')
    const [coletas, setColetas] = useState<ColetaInterface[]>([])

    const {push} = useRouter()

    useEffect(() => {
        getAllColetas()
            .then(data => setColetas(data))
            .catch(error => console.error(error))

        getAllPessoas()
            .then(data => setPessoas(data))
            .catch(error => console.error(error))
    },[])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            dete,
            coletas_id: Number(coletaId),
            pessoas_id: Number(pessoaId)
        }

        const requestInit : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/doar', requestInit)
            if(response.ok) {
                const doacao = await response.json()
                const { id } = doacao
                window.alert(`Doação inserida com sucesso! Id: ${id}`)
                // Redirect -> /doacoes
                push('/doacoes')
            }
        } catch (error){

        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Cadastro de Doacoes: {dete}-{coletaId}-{pessoaId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="dete" label="Data: " setValue={(event) => setDete(event.target.value)}/>
                </div>
                
                <div className="mb-4">
                    <Input name="coletaId" label="Coleta: " value={coletaId} setValue={(event) => setColetaId(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="pessoaId" label="Pessoa: " value={pessoaId} setValue={(event) => setPessoaId(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="coletaId" className="block text-gray-700">Coleta</label>
                    <select 
                        name="coletaId" 
                        id="coletaId" 
                        value={coletaId} 
                        onChange={(event) => setColetaId(event.target.value)}>
                        <option value="" disabled >Selecione:</option>
                        {
                            coletas.map((coleta) => {
                                return(
                                    <option value={coleta.id} key={coleta.id}>{coleta.nome}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="pessoaId" className="block text-gray-700">Pessoa</label>
                    <select 
                        name="pessoaId" 
                        id="pessoaId" 
                        value={pessoaId} 
                        onChange={(event) => setPessoaId(event.target.value)}>
                        <option value="" disabled >Selecione:</option>
                        {
                            pessoas.map((pessoa) => {
                                return(
                                    <option value={pessoa.id} key={pessoa.id}>{pessoa.nome} {pessoa.rg}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div> 

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Cadastrar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}