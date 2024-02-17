"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"

export default function CreateEstado(){

    const [nome, setNome] = useState('')
    const [sigla, setSigla] = useState('')
    const {push} = useRouter()

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            nome,
            sigla
        }

        const requestInit : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/estados', requestInit)
            if(response.ok) {
                const estado = await response.json()
                const { id } = estado
                window.alert(`Estado inserido com sucesso! Id: ${id}`)
                // Redirect -> /estados
                push('/estados')
            }
        } catch (error){

        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Cadastro de Estados {nome}-{sigla}</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <Input name="nome" label="Nome: " setValue={(event) => setNome(event.target.value)}/>
                </div>
                
                <div className="mb-4">
                <Input name="sigla" label="Sigla: " setValue={(event) => setSigla(event.target.value)}/>
                </div> 

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Cadastrar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}