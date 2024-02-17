import { Router } from "express";
import { CreateCidadesController } from "../controller/cidades/CreateCidadesController.js";
import { GetAllCidadesController } from "../controller/cidades/GetAllCidadesController.js";
import { GetByIdCidadesController } from "../controller/cidades/GetByIdCidadesController.js";
import { UpdateCidadesController } from "../controller/cidades/UpdateCidadesController.js";
import { DeleteCidadesController } from "../controller/cidades/DeleteCidadesController.js";

const cidadeRouter = Router()

// CRUD para as cidades
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createCidadesController = new CreateCidadesController()
cidadeRouter.post('/cidades', createCidadesController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllCidadesController = new GetAllCidadesController()
cidadeRouter.get('/cidades', getAllCidadesController.handle)

// Get By ID
const getByIdCidadesController = new GetByIdCidadesController()
cidadeRouter.get('/cidades/:id', getByIdCidadesController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateCidadesController = new UpdateCidadesController()
cidadeRouter.put('/cidades', updateCidadesController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteCidadesController = new DeleteCidadesController()
cidadeRouter.delete('/cidades', deleteCidadesController.handle)

export {cidadeRouter}