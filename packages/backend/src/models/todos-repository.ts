import TodoItem from "@fullstack-todo-app/shared";
import { model, Schema, connect } from "mongoose";

const TodoSchema = new Schema({
    text: String,
    timeStamp: Date
})

const TodoModel = model<TodoItem>("TodoItem", TodoSchema);

export const setupMongoDb = async (url: string) => {
    await connect(url)
}