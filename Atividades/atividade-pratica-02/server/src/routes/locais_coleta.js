import { Router } from "express";
import { CreateColetasController } from "../controller/locais_coleta/CreateColetasController.js";
import { GetAllColetasController } from "../controller/locais_coleta/GetAllColetasController.js";
import { GetByIdColetasController } from "../controller/locais_coleta/GetByIdColetasController.js";
import { UpdateColetasController } from "../controller/locais_coleta/UpdateColetasController.js";
import { DeleteColetasController } from "../controller/locais_coleta/DeleteColetasController.js";

const coletaRouter = Router()

// CRUD para os locais de coletas
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createColetasController = new CreateColetasController()
coletaRouter.post('/coletas', createColetasController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllColetasController = new GetAllColetasController()
coletaRouter.get('/coletas', getAllColetasController.handle)

// Get By ID
const getByIdColetasController = new GetByIdColetasController()
coletaRouter.get('/coletas/:id', getByIdColetasController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateColetasController = new UpdateColetasController()
coletaRouter.put('/coletas', updateColetasController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteColetasController = new DeleteColetasController()
coletaRouter.delete('/coletas', deleteColetasController.handle)

export {coletaRouter}