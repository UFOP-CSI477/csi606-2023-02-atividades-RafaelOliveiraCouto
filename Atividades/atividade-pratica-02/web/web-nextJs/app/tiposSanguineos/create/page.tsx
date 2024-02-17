"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"

export default function CreateSangues(){

    const [tipo, setNome] = useState('')
    const [fator, setSigla] = useState('')
    const {push} = useRouter()

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            tipo,
            fator
        }

        const requestInit : RequestInit = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('http://localhost:5000/sangues', requestInit)
            if(response.ok) {
                const sangue = await response.json()
                const { id } = sangue
                window.alert(`Tipo Sanguineo inserido com sucesso! Id: ${id}`)
                // Redirect -> /estados
                push('/tiposSanguineos')
            }
        } catch (error){

        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Cadastro de Sangues {tipo} {fator}</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <Input name="nome" label="Tipo: " setValue={(event) => setNome(event.target.value)}/>
                </div>
                
                <div className="mb-4">
                    <Input name="sigla" label="Fator: " setValue={(event) => setSigla(event.target.value)}/>
                </div> 

                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">Cadastrar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}