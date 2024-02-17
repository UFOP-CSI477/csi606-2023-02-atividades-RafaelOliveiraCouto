import express, { request, response } from 'express'
import { estadoRouter } from './src/routes/estados.js'
import { cidadeRouter } from './src/routes/cidades.js'
import { tipoRouter } from './src/routes/tipos_sanguineos.js'
import { pessoaRouter } from './src/routes/pessoas.js'
import { coletaRouter } from './src/routes/locais_coleta.js'
import { doacoesRouter } from './src/routes/doacoes.js'

//import cors from 'cors'

const server = express()
const PORT = 5000

// Routes
server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})

//OBS: A ordem aqui importa
// 1º Faz o tratamento dos dados
server.use(express.json())
// 2º Permite a rquisição de diferentes origens, por exemplo porta 5000 com a porta 3000
//server.use(cors())
// 3º Faz o filtro das rotas de Estado
server.use(estadoRouter)
// 3º Faz o filtro das rotas de Cidades
server.use(cidadeRouter)
// 3º Faz o filtro das rotas de Tipos Sanguineos
server.use(tipoRouter)
// 3º Faz o filtro das rotas de Pessoas
server.use(pessoaRouter)
// 3º Faz o filtro das rotas de Locais de Coletas
server.use(coletaRouter)
// 3º Faz o filtro das rotas de Doações
server.use(doacoesRouter)

server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})