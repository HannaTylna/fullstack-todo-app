import React from "react";
import { useParams } from "react-router-dom";
import TodoItem from "../components/Todo";


export default function TodoItemPage() {
    const params = useParams();
    return (
        <TodoItem id={params.id} />
    )
}