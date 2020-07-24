import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../models/User";
import { PasswordCrypto } from "../utils/crypto";
import { Area } from "../models/Area";

export default {
  async index(request: Request, response: Response) {
    try {
      const user = await getRepository(User).find();
      return response.json(user)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async show(request: Request, response: Response) {
    try {
      const user = await getRepository(User).findOne(request.params.id)
      return response.json(user)
    } catch (error) {
      return console.error('Error ', error)
    }
  },

  async create(request: Request, response: Response) {
    try {
      let { password, repeatPassword } = request.body
      if (password !== repeatPassword) {
        return response.json({mensagem: 'Senhas não são iguais'})
      }
      request.body.password = new PasswordCrypto(password).criptografar()
      const area = await getRepository(Area).findOne(request.body.areaId) 
      const user = await getRepository(User).save({...request.body, area})
      return response.json(user)
    } catch (error) {
      console.error('Error ', error)
      return response.json({message: error.message})
    }
  },
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { name, email, areaId } = request.body

      const area = await getRepository(Area).findOne(areaId)       
      const user = await getRepository(User).save({ id: parseInt(id), name, email, area })
      return response.json(user)
    } catch (error) {
      console.error('Error ', error)
      return response.status(500).json({message: error.message})
    }
  },
  async delete(request: Request, response: Response) {
    try {
      const user = await getRepository(User).findOne(request.params.id)
      const result = await getRepository(User).remove(user) 
      return response.json(result)
    } catch (error) {
      return console.error('Error ', error)
    }
  }
}