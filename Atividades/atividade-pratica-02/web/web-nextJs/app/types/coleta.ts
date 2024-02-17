import CidadeInterface from "./cidade"

interface ColetaInterface{
    id:             number
    nome:           string
    rua:            string
    numero:         string
    complemento:    string

    cidade: CidadeInterface

    created_at: string
    updated_at: string
}

export default ColetaInterface