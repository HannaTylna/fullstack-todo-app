import React from "react";
import { useParams } from "react-router-dom";
import TodoItem from "../components/TodoItem";


export default function TodoItemPage() {
    const params = useParams();
    return (
        <TodoItem _id={params._id} />
    )
}