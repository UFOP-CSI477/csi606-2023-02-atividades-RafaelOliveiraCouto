import { Router } from "express";
import { CreateDoacaoController } from "../controller/doacoes/CreateDoacaoController.js";
import { GetAllDoacaoController } from "../controller/doacoes/GetAllDoacaoController.js";
import { GetByIdDoacaoController } from "../controller/doacoes/GetByIdDoacaoController.js";
import { UpdateDoacaoController } from "../controller/doacoes/UpdateDoacaoController.js";
import { DeleteDoacaoController } from "../controller/doacoes/DeleteDoacaoController.js";

const doacoesRouter = Router()

// CRUD para as doações
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createDoacaoController = new CreateDoacaoController()
doacoesRouter.post('/doar', createDoacaoController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllDoacaoController = new GetAllDoacaoController()
doacoesRouter.get('/doar', getAllDoacaoController.handle)

// Get By ID
const getByIdDoacaoController = new GetByIdDoacaoController()
doacoesRouter.get('/doar/:id', getByIdDoacaoController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateDoacaoController = new UpdateDoacaoController()
doacoesRouter.put('/doar', updateDoacaoController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteDoacaoController = new DeleteDoacaoController()
doacoesRouter.delete('/doar', deleteDoacaoController.handle)

export {doacoesRouter}