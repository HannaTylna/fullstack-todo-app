import { TodoItem } from "@fullstack-todo-app/shared";
import express, { Request, Response } from "express";
import { JwtRequest } from "../services/auth";
import { loadItemById, loadTodos, saveTodo } from "../services/todos-service";

const TodoRouter = express.Router();


TodoRouter.get("/", async (req: Request, res: Response<TodoItem[]>) => {
  res.send(await loadTodos());
});

TodoRouter.get("/:todoId", async (req: Request, res: Response<TodoItem>) => {
    try {
        res.send(await loadItemById(req.params.todoId))
    } catch (err) {
        res.sendStatus(404)
    }
})

TodoRouter.post("/", async (req: JwtRequest<TodoItem>, res: Response<TodoItem[]>) => {
    try {
        const token = req.jwt
        if(!token) throw new Error("Missing JWT!")
        res.send(await saveTodo(req.body, token?.sub));
    } catch (err) {
        res.sendStatus(400)
    }
});



export default TodoRouter;