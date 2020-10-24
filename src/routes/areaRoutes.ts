import { Router } from 'express'
import AreaController from "../controllers/AreaController";

const areaRoutes = Router()

areaRoutes.get('/', AreaController.index)
areaRoutes.post('/', AreaController.create)
areaRoutes.get('/:id', AreaController.show)
areaRoutes.put('/:id', AreaController.update)
areaRoutes.delete('/:id', AreaController.delete)

export default areaRoutes
