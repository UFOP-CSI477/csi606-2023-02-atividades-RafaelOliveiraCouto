"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getByIdSangues from "@/app/repository/sangues/GetByIdSangues"

interface DeleteSanguesParamsInterface {
    params: {
        id: string
    }
}

export default function DeleteCidades( {params} : DeleteSanguesParamsInterface ){

    const [tipo, setNome] = useState('')
    const [fator, setSigla] = useState('')
    const {push} = useRouter()

    useEffect(() => {
        getByIdSangues(params.id)
            .then(data => {
                setNome(data.tipo) 
                setSigla(data.fator)
            })
            .catch(error => console.error(error))

    },[params])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            id : Number(params.id)
        }

        const requestInit : RequestInit = {
            method: "DELETE",
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
                window.alert(`Sangue excluido com sucesso! Id: ${id}`)
                // Redirect -> /estados
                push('/tiposSanguineos')
            }
        } catch (error){
            console.error(error)
            window.alert("Erro na Exclusão do Sangue!")
        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Exclusão do Sangue: {tipo} {fator}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " value={tipo} setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600">Deletar</button>
                    <button type="reset" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Limpar</button>
                </div>
            </form>
        </main>
    )
}