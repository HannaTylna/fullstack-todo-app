import express, { Application, json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routers/todos"
import { setupMongoDb } from "./models/todos-repository";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(json());
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl: string = process.env.MONGO_URL || 'mongodb://localhost:27017/todosTS';

app.use("/todos", todoRouter)

app.listen(port, async function () {
  await setupMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
}); 

