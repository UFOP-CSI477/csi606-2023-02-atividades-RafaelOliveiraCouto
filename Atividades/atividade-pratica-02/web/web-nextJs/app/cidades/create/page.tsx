"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getAllEstados from "@/app/repository/estados/GetAllEstados"
import EstadoInterface from "@/app/types/estado"

export default function CreateCidades(){

    const [nome, setNome] = useState('')
    const [estadoId, setEstadoId] = useState('')
    const [estados, setEstados] = useState<EstadoInterface[]>([])
    const {push} = useRouter()

    useEffect(() => {
        getAllEstados()
            .then(data => setEstados(data))
            .catch(error => console.error(error))
    },[])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            nome,
            estado_id: Number(estadoId) 
        }

        const requestInit : RequestInit = {
            method: "POST",
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
                window.alert(`Cidade inserido com sucesso! Id: ${id}`)
                // Redirect -> /cidades
                push('/cidades')
            }
        } catch (error){

        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Cadastro de Ciades {nome}-{estadoId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " setValue={(event) => setNome(event.target.value)}/>
                </div>
                
                <div className="mb-4">
                    <Input name="estadoId" label="Estado: " value={estadoId} setValue={(event) => setEstadoId(event.target.value)}/>
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Cadastrar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}