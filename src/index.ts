import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { MongoClient } from "./database/mongo";
import usersRouter from "./router/users";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  await MongoClient.connect();
  app.use("/users", usersRouter);

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}...`));
};

main();
