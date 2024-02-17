"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getAllCidades from "@/app/repository/cidades/GetAllCidades"
import CidadeInterface from "@/app/types/cidade"
import getByIdColetas from "@/app/repository/coleta/GetByIdColetas"

interface UpdateColetasParamsInterface {
    params: {
        id: string
    }
}

export default function UpdateColetas( {params} : UpdateColetasParamsInterface ){

    const [nome, setNome] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')

    const [cidadeId, setCidadeId] = useState('')
    const [cidades, setCidades] = useState<CidadeInterface[]>([])

    const {push} = useRouter()

    useEffect(() => {
        getAllCidades()
            .then(data => setCidades(data))
            .catch(error => console.error(error))

        getByIdColetas(params.id)
            .then(data => {
                setNome(data.nome) 
                setCidadeId(data.cidade_id)
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
            cidade_id: Number(cidadeId) 
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
                // Redirect -> /cidades
                push('/coletas')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Atualização da Coleta!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Atualização de Coletas {nome}-{rua}-{numero}-{complemento}-{cidadeId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " value={nome} setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="rua" label="Rua: " value={rua} setValue={(event) => setRua(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="numero" label="Numero: " value={numero} setValue={(event) => setNumero(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="complemento" label="Complemento: " value={complemento} setValue={(event) => setComplemento(event.target.value)}/>
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

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Atualizar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}