import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const todoRouter = require("./routers/todos");
app.use(cors());
app.use(json());

app.use("/todos", todoRouter)

const port: number = parseInt(process.env.SERVER_PORT || "3001");

app.listen(port, function() {
  console.log(`App is listening on port ${port} !`);
});

