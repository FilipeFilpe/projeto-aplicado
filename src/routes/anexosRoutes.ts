import { Router } from 'express'
import multer from 'multer'
import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import multerConfig from '../utils/multer'
import { Anexo } from '../models/Anexo'
import { Demand } from '../models/Demand'
import { HOST, PORT } from '../index'
import { UserToDemand } from '../models/UserToDemand'
import { IRequestWithUser } from '../controllers/UserController'

const anexoRoutes = Router()

anexoRoutes.post('/', multer(multerConfig).single('file'), async (request: IRequestWithUser, response) => {
  try {
    const { originalname, size, filename, path } = request.file
    const { demandId } = request.body
    const demand = await getRepository(Demand).findOne(parseInt(demandId))

    await getRepository(UserToDemand).save({
      userId: request.currentUser.id,
      demandId: parseInt(demandId),
      action: `adicionou o anexo "${originalname}"`,
      createdAt: new Date
    })
    
    const anexo = new Anexo()
    anexo.name = originalname
    anexo.size = size
    anexo.key = filename
    anexo.url = `${HOST}:${PORT}/uploads/${filename}`
    anexo.demand = demand
    
    const anexoResult = await getRepository(Anexo).save(anexo)
    return response.json(anexoResult)
  } catch (error) {
    console.error('Error ', error)
    return response.json({ message: error.message })
  }
})

anexoRoutes.delete('/:id', async (request, response) => {
  try {
    const anexo = await getRepository(Anexo).findOne(request.params.id)
    const pathUploads = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

    try {
      fs.unlinkSync(`${pathUploads}/${anexo.key}`)
      const result = await getRepository(Anexo).remove(anexo)
      return response.json(result)
    } catch (error) {
      return response.json(error)
    }
  } catch (error) {
    return console.error('Error ', error)
  }
})


export default anexoRoutes
