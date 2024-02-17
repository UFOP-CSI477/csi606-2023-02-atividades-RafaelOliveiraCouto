"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"

import getAllCidades from "@/app/repository/cidades/GetAllCidades"
import getAllSangues from "@/app/repository/sangues/GetAllSangues"
import CidadeInterface from "@/app/types/cidade"
import TipoSanguineos from "@/app/types/sangue"
import getByIdPessoas from "@/app/repository/pessoas/GetByIdPessoas"

interface UpdatePessoasParamsInterface {
    params: {
        id: string
    }
}

export default function UpdatePessoas( {params} : UpdatePessoasParamsInterface ){

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
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade_id: Number(cidadeId),
            sangue_id: Number(sangueId)
        }

        const requestInit : RequestInit = {
            method: "PUT",
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
                window.alert(`Pessoa atualizada com sucesso! Id: ${id}`)
                // Redirect -> /pessoas
                push('/pessoas')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Atualização da Pessoa!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Atualização de Ciades {nome}-{cidadeId}-{sangueId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " value={nome} setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="cidadeId" className="block text-gray-700">Cidade</label>
                    <select 
                        name="cidadeId" 
                        id="cidadeId" 
                        value={cidadeId} 
                        onChange={(event) => setCidadeId(event.target.value)}>
                        <option value="" selected disabled >Selecione:</option>
                        {
                            cidades.map((cidade) => {
                                return(
                                    <option value={cidade.id} key={cidade.id}>{cidade.nome}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="sangueId" className="block text-gray-700">Tipo de Sangue</label>
                    <select 
                        name="sangueId" 
                        id="sangueId" 
                        value={sangueId} 
                        onChange={(event) => setSangueId(event.target.value)}>
                        <option value="" selected disabled >Selecione:</option>
                        {
                            sangues.map((sangue) => {
                                return(
                                    <option value={sangue.id} key={sangue.id}>{sangue.tipo} {sangue.fator}</option>
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