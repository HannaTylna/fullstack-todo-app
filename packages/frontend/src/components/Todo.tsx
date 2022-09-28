import React, { useState } from "react";
import TodoItem from "@fullstack-todo-app/shared";

export default function Todo(props: { id: string | undefined }) {
    // const [todo, setTodo] = useState<TodoItem>();
    return (<h1>`Todo Item {props.id}`</h1>)
}