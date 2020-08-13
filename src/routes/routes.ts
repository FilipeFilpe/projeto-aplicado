import { Router } from 'express'
// import loginRoutes from './routes/loginRoutes'
import LoginController from '../controllers/LoginController'
import userRoutes from './userRoutes'
import demandRoutes from './demandRoutes'
import areaRoutes from './areaRoutes'
// import LoginController from './controllers/LoginController'

const routes = Router()

routes.use('/login', LoginController.login)

// rotas autenticadas
routes.use('*', LoginController.auth)
routes.use('/users', userRoutes)
routes.use('/demands', demandRoutes)
routes.use('/areas', areaRoutes)

export default routes
