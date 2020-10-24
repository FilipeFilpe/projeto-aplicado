import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Area } from "../models/Area";

export interface IRequestWithUser extends Request {
  currentUser: {
    id: null,
    uuid: '',
    name: '',
    email: '',
    password: ''
  }
}

export default {
  async index(request: Request, response: Response) {
    try {
      const user = await getRepository(User).find();
      return response.json(user)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async show(request: IRequestWithUser, response: Response) {
    try {
      const user = await getRepository(User).findOne(request.params.id)
      return response.json(request.currentUser)
    } catch (error) {
      return console.error('Error ', error)
    }
  },
  async create(request: Request, response: Response) {
    try {
      let { name, email,  password, repeatPassword, areaId } = request.body
      if (password !== repeatPassword) {
        return response.json({mensagem: 'Senhas não são iguais'})
      }
      
      const area = await getRepository(Area).findOne(areaId)

      const user = new User()
      user.name = name
      user.email = email
      user.password = password
      user.area = area

      const userResult = await getRepository(User).save(user)
      return response.json(userResult)
    } catch (error) {
      console.error('Error ', error)
      return response.json({message: error.message})
    }
  },
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      let { name, email, areaId } = request.body

      const area = await getRepository(Area).findOne(areaId)

      const user = new User()
      user.id = parseInt(id)
      user.name = name
      user.email = email
      user.area = area

      const userResult = await getRepository(User).save(user)
      return response.json(userResult)
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