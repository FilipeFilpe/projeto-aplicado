import { Router } from 'express'

// import loginRoutes from './routes/loginRoutes'
import LoginController from '../controllers/LoginController'
import userRoutes from './userRoutes'
import demandRoutes from './demandRoutes'
import areaRoutes from './areaRoutes'
import anexoRoutes from './anexosRoutes'
import statusRoutes from './statusRoutes'
import { UserToDemand } from '../models/UserToDemand'
import { getRepository } from 'typeorm'
// import LoginController from './controllers/LoginController'

const routes = Router()

routes.use('/login', LoginController.login)

// rotas autenticadas 
routes.use('*', LoginController.auth)
routes.use('/users', userRoutes)
routes.use('/demands', demandRoutes)
routes.use('/areas', areaRoutes)
routes.use('/anexos', anexoRoutes)
routes.use('/status', statusRoutes)

routes.get('/user-demand/:id', async (request, response) => {
  try {
    // await getRepository(Demand).find({relations: ["status", "userToDemand"]});
    const result = await getRepository(UserToDemand).find({
      where: {demandId: request.params.id},
      relations: ["demand", "user"]
    })

    return response.json(result)
  } catch (error) {
    return console.error('Error ', error)
  }
})

export default routes
