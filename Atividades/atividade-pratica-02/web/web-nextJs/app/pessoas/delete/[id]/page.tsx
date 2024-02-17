"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"

import getAllCidades from "@/app/repository/cidades/GetAllCidades"
import getAllSangues from "@/app/repository/sangues/GetAllSangues"
import CidadeInterface from "@/app/types/cidade"
import TipoSanguineos from "@/app/types/sangue"
import getByIdPessoas from "@/app/repository/pessoas/GetByIdPessoas"

interface DeletePessoasParamsInterface {
    params: {
        id: string
    }
}

export default function DeletePessoas( {params} : DeletePessoasParamsInterface ){

    const [nome, setNome] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [rg, setRg] = useState('')

    const [cidadeId, setCidadeId] = useState('')
    const [cidades, setCidades] = useState<CidadeInterface[]>([])

    const [sangueId, setSangueId] = useState('')
    const [sangues, setSangues] = useState<TipoSanguineos[]>([])

    const {push} = useRouter()

    useEffect(() => {
        getAllCidades()
            .then(data => setCidades(data))
            .catch(error => console.error(error))

        getAllSangues()
            .then(data => setSangues(data))
            .catch(error => console.error(error))

        getByIdPessoas(params.id)
            .then(data => {
                setNome(data.nome) 
                setCidadeId(data.cidade_id)
                setSangueId(data.sangue_id)
            })
            .catch(error => console.error(error))

    },[params])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            id : Number(params.id),
        }

        const requestInit : RequestInit = {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/pessoas', requestInit)
            if(response.ok) {
                const pessoa = await response.json()
                const { id } = pessoa
                window.alert(`Pessoa excluida com sucesso! Id: ${id}`)
                // Redirect -> /pessoas
                push('/pessoas')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Exclusão da Pessoa!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Exclusão da Pessoa: {nome}-{cidadeId}-{sangueId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome" value={nome} setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600">Deletar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}