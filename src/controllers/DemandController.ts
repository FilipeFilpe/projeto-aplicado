import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Demand } from "../models/Demand";
import { Area } from "../models/Area";
import { Status } from "../models/Status";

export default {
  async index(request: Request, response: Response) {
    try {
      const demand = await getRepository(Demand).find();
      return response.json(demand)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async show(request: Request, response: Response) {
    try {
      const demand = await getRepository(Demand).findOne(request.params.id)
      return response.json(demand)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async create(request: Request, response: Response) {
    try {
      const status = await getRepository(Status).findOne(request.body.statusId)
      const demand = await getRepository(Demand).save({ ...request.body, status })
      return response.json(demand)
    } catch (error) {
      console.error('Error ', error)
      return response.json({ message: error.message })
    }
  },
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params

      const status = await getRepository(Status).findOne(request.body.statusId)
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
      const result = await getRepository(Demand).remove(demand)
      return response.json(result)
    } catch (error) {
      return console.error('Error ', error)
    }
  }
}