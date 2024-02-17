import { Router } from "express";
import { CreateTipoController } from "../controller/tipos_sanguineos/CreateTipoController.js";
import { GetAllTipoController } from "../controller/tipos_sanguineos/GetAllTipoController.js";
import { GetByIdTipoController } from "../controller/tipos_sanguineos/GetByIdTipoController.js";
import { UpdateTipoController } from "../controller/tipos_sanguineos/UpdateTipoController.js";
import { DeleteTipoController } from "../controller/tipos_sanguineos/DeleteTipoController.js";

const tipoRouter = Router()

// CRUD para os tipos de sangue
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createTipoController = new CreateTipoController()
tipoRouter.post('/sangues', createTipoController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllTipoController = new GetAllTipoController()
tipoRouter.get('/sangues', getAllTipoController.handle)

// Get By ID
const getByIdTipoController = new GetByIdTipoController()
tipoRouter.get('/sangues/:id', getByIdTipoController.handle)

// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateTipoController = new UpdateTipoController()
tipoRouter.put('/sangues', updateTipoController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteTipoController = new DeleteTipoController()
tipoRouter.delete('/sangues', deleteTipoController.handle)

export {tipoRouter}