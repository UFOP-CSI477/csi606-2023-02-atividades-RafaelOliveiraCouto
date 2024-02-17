import { Router } from "express";
import { CreateEstadosController } from "../controller/estados/CreateEstadosController.js";
import { GetAllEstadosController } from "../controller/estados/GetAllEstadosController.js";
import { GetByIdEstadosController } from "../controller/estados/GetByIdEstadosController.js";
import { UpdateEstadosController } from "../controller/estados/UpdateEstadosController.js";
import { DeleteEstadosController } from "../controller/estados/DeleteEstadosController.js";

const estadoRouter = Router()

// CRUD para os estados
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createEstadosController = new CreateEstadosController()
estadoRouter.post('/estados', createEstadosController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllEstadosController = new GetAllEstadosController()
estadoRouter.get('/estados', getAllEstadosController.handle)

// Get By ID
const getByIdEstadosController = new GetByIdEstadosController()
estadoRouter.get('/estados/:id', getByIdEstadosController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateEstadosController = new UpdateEstadosController()
estadoRouter.put('/estados', updateEstadosController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteEstadosController = new DeleteEstadosController()
estadoRouter.delete('/estados', deleteEstadosController.handle)

export {estadoRouter}