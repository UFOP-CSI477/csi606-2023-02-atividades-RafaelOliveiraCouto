"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"

import getAllColetas from "@/app/repository/coleta/GetAllColetas"
import getAllPessoas from "@/app/repository/pessoas/GetAllPessoas"
import ColetaInterface from "@/app/types/coleta"
import PessoaInterface from "@/app/types/pessoa"
import getByIdDoacoes from "@/app/repository/doacoes/GetByIdDoacoes"

interface UpdateDoacoesParamsInterface {
    params: {
        id: string
    }
}

export default function UpdateDoacoes( {params} : UpdateDoacoesParamsInterface ){

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

        getByIdDoacoes(params.id)
            .then(data => {
                setDete(data.nome) 
                setPessoaId(data.pessoas_id)
                setColetaId(data.coletas_id)
            })
            .catch(error => console.error(error))

    },[params])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            id : Number(params.id),
            dete,
            pessoas_id: Number(pessoaId),
            coletas_id: Number(coletaId)
        }

        const requestInit : RequestInit = {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/coletas', requestInit)
            if(response.ok) {
                const coleta = await response.json()
                const { id } = coleta
                window.alert(`Coleta atualizada com sucesso! Id: ${id}`)
                // Redirect -> /coletas
                push('/coletas')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Atualização da Coleta!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Atualização de Coleta {dete}-{pessoaId}-{coletaId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="dete" label="Data: " value={dete} setValue={(event) => setDete(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="pessoaId" className="block text-gray-700">Pessoa</label>
                    <select 
                        name="pessoaId" 
                        id="pessoaId" 
                        value={pessoaId} 
                        onChange={(event) => setPessoaId(event.target.value)}>
                        <option value="" selected disabled >Selecione:</option>
                        {
                            pessoas.map((pessoa) => {
                                return(
                                    <option value={pessoa.id} key={pessoa.id}>{pessoa.nome}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="coletaId" className="block text-gray-700">Coleta</label>
                    <select 
                        name="coletaId" 
                        id="coletaId" 
                        value={coletaId} 
                        onChange={(event) => setColetaId(event.target.value)}>
                        <option value="" selected disabled >Selecione:</option>
                        {
                            coletas.map((coleta) => {
                                return(
                                    <option value={coleta.id} key={coleta.id}>{coleta.nome}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div> 

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Atualizar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}