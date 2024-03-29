import { User } from '../models/User'
import { Request, Response, NextFunction } from 'express'
import config from 'config'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

export default {
  async login(request: Request, response: Response) {
    const [, hash] = request.headers.authorization?.split(' ') || [' ', ' ']
    const [email, password] = Buffer.from(hash, 'base64')
      .toString()
      .split(':')
    
    try {      
      const user = await getRepository(User).findOne({ where: { email } })
      
      const correctPassword = !user ? false : await user.comparePassword(password).then(result => result)
      
      if (!correctPassword) return response.status(401).send('Password or E-mail incorrect!')

      const token: any = jwt.sign({ user: user.id }, config.get('myprivatekey'))

      return response.send({ user, token })
    } catch (error) {
      console.log(error)
    }
  },

  async auth(request: Request, response: Response, next: NextFunction) {
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' ']

    if (!token)
      return response.status(401).send('Access denied. No token provided.')

    try {

      const payload: any = jwt.verify(token, config.get('myprivatekey'))
      const user: User = await getRepository(User).findOne(parseInt(payload.user), { relations: ["area", "role"] })

      if (!user) {
        return response.send(401).json({message: 'Invalid token'})
      }

      request.headers['user'] = user.id.toString()

      request['currentUser'] = user

      return next()
    } catch (error) {
      console.log(error)
      return response.status(401).json({message: 'Invalid token'})
    }
  }
}