import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Status } from "../models/Status";

export default {
  
  async index(request: Request, response: Response) {
    try {
      const status = await getRepository(Status).find();
      return response.json(status)
    } catch (error) {
      return console.error('Error ', error)
    }
  },

  async show(request: Request, response: Response) {
    try {
      const status = await getRepository(Status).findOne(request.params.id)
      return response.json(status)
    } catch (error) {
      return console.error('Error ', error)
    }
  },

  async create(request: Request, response: Response) {
    try {      
      const status = await getRepository(Status).save(request.body)
      return response.json(status)
    } catch (error) {
      console.error('Error ', error)
      return response.json({message: error.message})
    }
  },
  
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const status = await getRepository(Status).save({id: parseInt(id), ...request.body})
      return response.json(status)
    } catch (error) {
      console.error('Error ', error)
      return response.status(500).json({message: error.message})
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const status = await getRepository(Status).findOne(request.params.id)
      const result = await getRepository(Status).remove(status) 
      return response.json(result)
    } catch (error) {  
      return console.error('Error ', error)
    }
  },

}