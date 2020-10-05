import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import Express from "express";
import * as bodyParser from "body-parser";
import config from "config";
import cors from 'cors';

import routes from "./routes/routes";
import { User } from "./models/User";

import { initialValues } from '../initialValues'
import { Status } from "./models/Status";
import { Paper } from "./models/Paper";

export const HOST = 'localhost'
export const PORT = 3333

createConnection().then(async connection => {

  // create express app
  const app = Express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(Express.static('tmp'))

  app.use(routes)

  const user = new User()
  user.name = config.get('adminUser.name')
  user.email = config.get('adminUser.email')
  user.password = config.get('adminUser.password')
  const existUser = await getRepository(User).findOne({where: { name: user.name, email: user.email }})
  if (!existUser) {

    initialValues.status.map( async (st: any) => {
      const status = new Status()
      status.name = st.name
      status.description = st.description

      await getRepository(Status).save(status)
    })
    initialValues.paper.map( async (pp: any) => {
      const paper = new Paper()
      paper.name = pp.name
      paper.description = pp.description

      await getRepository(Paper).save(paper)
    })

    await getRepository(User).save(user)
  }

  // start express server
  app.listen(PORT,HOST)

}).catch(error => console.log(error));
