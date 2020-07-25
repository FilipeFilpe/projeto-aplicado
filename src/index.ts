import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import Express from "express";
import * as bodyParser from "body-parser";
import config from "config";
import routes from "./routes/routes";
import { User } from "./models/User";

createConnection().then(async connection => {

  // create express app
  const app = Express()
  app.use(bodyParser.json())

  app.use(routes)

  const user = new User()
  user.name = config.get('adminUser.name')
  user.email = config.get('adminUser.email')
  user.password = config.get('adminUser.password')
  const existUser = await getRepository(User).findOne({where: { name: user.name, email: user.email }})
  if (!existUser) await getRepository(User).save(user)

  // start express server
  app.listen(3334)

}).catch(error => console.log(error));
