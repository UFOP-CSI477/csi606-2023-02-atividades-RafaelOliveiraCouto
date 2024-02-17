import { Router } from "express";
import { CreatePessoasController } from "../controller/pessoas/CreatePessoasController.js";
import { GetAllPessoasController } from "../controller/pessoas/GetAllPessoasController.js";
import { GetByIdPessoasController } from "../controller/pessoas/GetByIdPessoasController.js";
import { UpdatePessoasController } from "../controller/pessoas/UpdatePessoasController.js";
import { DeletePessoasController } from "../controller/pessoas/DeletePessoasController.js";

const pessoaRouter = Router()

// CRUD para as pessoas
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createPessoasController = new CreatePessoasController()
pessoaRouter.post('/pessoas', createPessoasController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllPessoasController = new GetAllPessoasController()
pessoaRouter.get('/pessoas', getAllPessoasController.handle)

// Get By ID
const getByIdPessoasController = new GetByIdPessoasController()
pessoaRouter.get('/pessoas/:id', getByIdPessoasController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updatePessoasController = new UpdatePessoasController()
pessoaRouter.put('/pessoas', updatePessoasController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deletePessoasController = new DeletePessoasController()
pessoaRouter.delete('/pessoas', deletePessoasController.handle)

export {pessoaRouter}