import TodoItem from "@fullstack-todo-app/shared";
import { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import crypto from "crypto";

const Router = require("express");
const router = Router();

const TODO_FILE = process.env.TODO_FILE || "todos.json";
let TODO_ITEMS: TodoItem[] = [];

readFile(TODO_FILE, (err, data) => {
    if (err) throw err;
    TODO_ITEMS = JSON.parse(data.toString()) as unknown as TodoItem[];
    console.log("Loaded todo items:", TODO_ITEMS)
});

function writeTodoToFile(todoItems: TodoItem[]) {
    writeFile(TODO_FILE, JSON.stringify(todoItems), (err) => {
        console.log("Error writing todo to the file...")
    })
}

router.get("/", (req: Request, res: Response<TodoItem[]>) => {
  res.send(TODO_ITEMS);
});

router.post("/", (req: Request, res: Response<TodoItem[]>) => {
    const todoItem = req.body;
    todoItem.id = crypto.randomUUID();
    console.log("Get a new item", todoItem);
    TODO_ITEMS.push(todoItem);
    writeTodoToFile(TODO_ITEMS);
    res.send(TODO_ITEMS);
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id }, body } = req;
        const updateTodo: TodoItem | undefined = TODO_ITEMS.find(item => item.id === id);
        res.send(updateTodo)
    } catch (error) {
        console.log("Something went wrong when fetching todo")
    }
})

module.exports = router;