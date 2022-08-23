import { getRepository } from "typeorm";
import { Request, Response } from "express";
import WebSocket from 'ws'

import { Demand } from "../models/Demand";
import { Status } from "../models/Status";
import { IRequestWithUser } from './UserController';
import { UserToDemand } from "../models/UserToDemand";
import { wss } from '../index'
import { Anexo } from "../models/Anexo";

export default {
  async index(request: IRequestWithUser, response: Response) {
    try {
      const demand = await getRepository(Demand).find({relations: ["status", "userToDemand"]});
      return response.json(demand)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async show(request: Request, response: Response) {
    try {
      // const demand = await getRepository(Demand).findOne(request.params.id)
      const demand = await getRepository(Demand).findOne(request.params.id, {
        relations: ["anexos", "status"]
      })
      return response.json(demand)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async create(request: IRequestWithUser, response: Response) {
    try {
      const status = await getRepository(Status).findOne(request.body.statusId)
      const demand = await getRepository(Demand).save({ ...request.body, status })

      const userToDemand = await getRepository(UserToDemand).save({
        userId: request.currentUser.id,
        demandId: demand.id,
        action: 'Criação da demanda',
        createdAt: new Date
      })

      if (demand) {
        const demands = await getRepository(Demand).find({relations: ["status", "userToDemand"]})

        let ws = new WebSocket(`ws://localhost:3333`, {
          rejectUnauthorized: false
        })
    
        ws.on('open', function open(teste) {
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({demand, demands}))
            }
          })
        })
        ws.on('close', () => ws = null)
      }

      return response.json(userToDemand)
    } catch (error) {
      console.error('Error ', error)
      return response.json({ message: error.message })
    }
  },
  async update(request: IRequestWithUser, response: Response) {
    try {
      const { id } = request.params

      const status = await getRepository(Status).findOne(request.body.status)

      const oldDemand = await getRepository(Demand).findOne(parseInt(id), { relations: ["status"] })

      if (oldDemand.status.id !== request.body.status) {
         await getRepository(UserToDemand).save({
          userId: request.currentUser.id,
          demandId: parseInt(id),
          action: `moveu demanda de "${oldDemand.status.name}" para "${status.name}"`,
          createdAt: new Date
        })
      }

      const demand = await getRepository(Demand).save({ id: parseInt(id), status, ...request.body })
      return response.json(demand)
    } catch (error) {
      console.error('Error ', error)
      return response.status(500).json({ message: error.message })
    }
  },
  async delete(request: Request, response: Response) {
    try {
      const demand = await getRepository(Demand).findOne(request.params.id)
      await getRepository(Anexo).delete({ demand })
      await getRepository(UserToDemand).delete({ demandId: parseInt(request.params.id) })
      const result = await getRepository(Demand).delete({ id: parseInt(request.params.id) })
      return response.json(result)
    } catch (error) {
      return console.error('Error ', error)
    }
  }
}