import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import Express, * as express from "express";
import * as bodyParser from "body-parser";
import config from "config";
import cors from 'cors';

import * as http from 'http'
import * as WebSocket from 'ws'

import routes from "./routes/routes";
import { User } from "./models/User";

import { initialValues } from '../initialValues'
import { Status } from "./models/Status";
import { Paper } from "./models/Paper";
import { Role } from "./models/Role";
import { Area } from "./models/Area";

export const HOST = 'localhost'
export const PORT = 3333

// create express app
const app = Express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('tmp'))

app.use(routes)

// WebSocket
const server = http.createServer(app)
export const wss = new WebSocket.Server({ server })
wss.on('connection', (ws: WebSocket) => {
  console.log('Conexão com o WebSocket estabelecida com sucesso!')
  ws.on('message', (message: any) => {
    ws.send(`Hello, you sent -> ${message.msg}`)
  })
})

createConnection().then(async connection => {

  const user = new User()
  user.name = config.get('adminUser.name')
  user.email = config.get('adminUser.email')
  user.password = config.get('adminUser.password')
  user.area = config.get('adminUser.area')
  user.role = config.get('adminUser.role')
  const existUser = await getRepository(User).findOne({where: { name: user.name, email: user.email }})
  if (!existUser) {

    initialValues.status.map( async (st: any) => {
      const status = new Status()
      status.name = st.name
      status.description = st.description

      await getRepository(Status).save(status)
    })
    initialValues.roles.map( async (roleInitial: any) => {
      const role = new Role()
      role.name = roleInitial.name
      role.description = roleInitial.description

      await getRepository(Role).save(role)
    })
    initialValues.areas.map( async (areaInitial: any) => {
      const area = new Area()
      area.name = areaInitial.name
      area.description = areaInitial.description

      await getRepository(Area).save(area)
    })

    await getRepository(User).save(user)
  }

}).catch(error => console.log(error));

// start express server
server.listen(PORT,HOST)
