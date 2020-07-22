import "reflect-metadata";
import { createConnection } from "typeorm";
import Express, { Request, Response } from "express";
import * as bodyParser from "body-parser";

import { Routes } from "./routes/routes";
import { User } from "./models/User";
import { Area } from "./models/Area";

createConnection().then(async connection => {

  // create express app
  const app = Express()
  app.use(Express.json)

  // register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  // setup express app here
  // ...

  // start express server
  app.listen(3000);

  const area = new Area()
  area.name = 'Desenvolvimento'
  area.description = 'Area de desenvolvimento da empresa'
  await connection.manager.save(area)
  
  const user = new User()
  user.name = 'Filipe Sousa'
  user.email = 'filpess@hotmail.com'
  user.area = area
  await connection.manager.save(user)

  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
