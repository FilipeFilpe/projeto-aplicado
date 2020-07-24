import { Router } from 'express'
import UserController from "../controllers/UserController";

const userRoutes = Router()

userRoutes.get('/', UserController.index)
userRoutes.post('/', UserController.create)
userRoutes.put('/:id', UserController.update)
userRoutes.get('/:id', UserController.show)
userRoutes.delete('/:id', UserController.delete)

export default userRoutes
