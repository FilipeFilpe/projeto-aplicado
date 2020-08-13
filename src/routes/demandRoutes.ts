import { Router } from 'express'
import DemandController from "../controllers/DemandController";

const demandRoutes = Router()

demandRoutes.get('/', DemandController.index)
demandRoutes.post('/', DemandController.create)
demandRoutes.put('/:id', DemandController.update)
demandRoutes.get('/:id', DemandController.show)
demandRoutes.delete('/:id', DemandController.delete)

export default demandRoutes
