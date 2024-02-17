"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getAllEstados from "@/app/repository/estados/GetAllEstados"
import EstadoInterface from "@/app/types/estado"
import getByIdCidade from "@/app/repository/cidades/GetByIdCidades"

interface UpdateCidadesParamsInterface {
    params: {
        id: string
    }
}

export default function UpdateCidades( {params} : UpdateCidadesParamsInterface ){

    const [nome, setNome] = useState('')
    const [estadoId, setEstadoId] = useState('')
    const [estados, setEstados] = useState<EstadoInterface[]>([])
    const {push} = useRouter()

    useEffect(() => {
        getAllEstados()
            .then(data => setEstados(data))
            .catch(error => console.error(error))

        getByIdCidade(params.id)
            .then(data => {
                setNome(data.nome) 
                setEstadoId(data.estado_id)
            })
            .catch(error => console.error(error))

    },[params])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            id : Number(params.id),
            nome,
            estado_id: Number(estadoId) 
        }

        const requestInit : RequestInit = {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/cidades', requestInit)
            if(response.ok) {
                const cidade = await response.json()
                const { id } = cidade
                window.alert(`Cidade atualizada com sucesso! Id: ${id}`)
                // Redirect -> /cidades
                push('/cidades')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Atualização da Cidade!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Atualização de Ciades {nome}-{estadoId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " value={nome} setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="estadoId" className="block text-gray-700">Estado</label>
                    <select 
                        name="estadoId" 
                        id="estadoId" 
                        value={estadoId} 
                        onChange={(event) => setEstadoId(event.target.value)}>
                        <option value="" selected disabled >Selecione:</option>
                        {
                            estados.map((estado) => {
                                return(
                                    <option value={estado.id} key={estado.id}>{estado.nome}</option>
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