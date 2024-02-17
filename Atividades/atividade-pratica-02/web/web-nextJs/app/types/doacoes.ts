import ColetaInterface from "./coleta"
import PessoaInterface from "./pessoa"

interface Doacoesinterface{
    id:             number
    data:           Date
  
    pessoa: PessoaInterface
    coletas: ColetaInterface
  
    created_at: string
    updated_at: string

}

export default Doacoesinterface