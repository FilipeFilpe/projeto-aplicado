import { Router } from 'express'
import StatusController from "../controllers/StatusController";

const statusRoutes = Router()

statusRoutes.get('/', StatusController.index)
statusRoutes.post('/', StatusController.create)
statusRoutes.get('/:id', StatusController.show)
statusRoutes.put('/:id', StatusController.update)
statusRoutes.delete('/:id', StatusController.delete)

export default statusRoutes
