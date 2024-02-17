import CidadeInterface from "./cidade"
import TipoSanguineos from "./sangue"

interface PessoaInterface{
    id:             number
    nome:           string
    rua:            string
    numero:         string
    complemento:    string
    rg:             string

    cidade: CidadeInterface
    tipo: TipoSanguineos 

    created_at: string
    updated_at: string
}

export default PessoaInterface