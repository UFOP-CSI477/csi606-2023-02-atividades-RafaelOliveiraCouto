"use client"
import { FormEvent, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/app/components/forms/input"
import getAllCidades from "@/app/repository/cidades/GetAllCidades"
import getAllSangues from "@/app/repository/sangues/GetAllSangues"
import CidadeInterface from "@/app/types/cidade"
import TipoSanguineos from "@/app/types/sangue"

export default function CreatePessoas(){

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
    },[])

    async function handleSubmit(event : FormEvent){
        event.preventDefault()

        const data = {
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade_id: Number(cidadeId),
            sangue_id: Number(sangueId)
        }

        const requestInit : RequestInit = {
            method: "POST",
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
                window.alert(`Pessoa inserida com sucesso! Id: ${id}`)
                // Redirect -> /pessoas
                push('/pessoas')
            }
        } catch (error){

        }

    }

    return(
        <main className="container m-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Cadastro de Pessoas: {nome}-{rua}-{numero}-{complemento}-{rg}-{cidadeId}-{sangueId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input name="nome" label="Nome: " setValue={(event) => setNome(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="rua" label="Rua: " setValue={(event) => setRua(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="numero" label="Numero: " setValue={(event) => setNumero(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="complemento" label="Complemento: " setValue={(event) => setComplemento(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="rg" label="Rg: " setValue={(event) => setRg(event.target.value)}/>
                </div>
                
                <div className="mb-4">
                    <Input name="estadoId" label="Cidade: " value={cidadeId} setValue={(event) => setCidadeId(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <Input name="sangueId" label="Sangue: " value={sangueId} setValue={(event) => setSangueId(event.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="cidadeId" className="block text-gray-700">Cidade</label>
                    <select 
                        name="cidadeId" 
                        id="cidadeId" 
                        value={cidadeId} 
                        onChange={(event) => setCidadeId(event.target.value)}>
                        <option value="" disabled >Selecione:</option>
                        {
                            cidades.map((cidade) => {
                                return(
                                    <option value={cidade.id}>{cidade.nome}</option>
                                )
                            }) 
                                
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="sangueId" className="block text-gray-700">Sangue</label>
                    <select 
                        name="sangueId" 
                        id="sangueId" 
                        value={sangueId} 
                        onChange={(event) => setSangueId(event.target.value)}>
                        <option value="" disabled >Selecione:</option>
                        {
                            sangues.map((sangue) => {
                                return(
                                    <option value={sangue.id}>{sangue.tipo} {sangue.fator}</option>
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