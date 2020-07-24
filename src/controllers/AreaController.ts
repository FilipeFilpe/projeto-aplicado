import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Area } from "../models/Area";

export default {
  
  async index(request: Request, response: Response) {
    try {
      const area = await getRepository(Area).find();
      return response.json(area)
    } catch (error) {
      return console.error('Error ', error)
    }
  },

  async show(request: Request, response: Response) {
    try {
      const area = await getRepository(Area).findOne(request.params.id)
      return response.json(area)
    } catch (error) {
      return console.error('Error ', error)
    }
  },

  async create(request: Request, response: Response) {
    try {      
      const area = await getRepository(Area).save(request.body)
      return response.json(area)
    } catch (error) {
      console.error('Error ', error)
      return response.json({message: error.message})
    }
  },
  
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const area = await getRepository(Area).save({id: parseInt(id), ...request.body})
      return response.json(area)
    } catch (error) {
      console.error('Error ', error)
      return response.status(500).json({message: error.message})
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const area = await getRepository(Area).findOne(request.params.id)
      const result = await getRepository(Area).remove(area) 
      return response.json(result)
    } catch (error) {  
      return console.error('Error ', error)
    }
  },

}