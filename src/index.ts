import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";

createConnection().then(async connection => {

  // create express app
  const app = Express()
  app.use(bodyParser.json())

  app.use(routes)

  // start express server
  app.listen(3334)

}).catch(error => console.log(error));
