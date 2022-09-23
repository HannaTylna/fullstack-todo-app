import React, { useEffect, useState } from "react";
import TodoItem from "@fullstack-todo-app/shared";
import axios from "axios";


const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get<TodoItem[]>("/todos")
  return response.data
}

export default function TodoForm() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const createTodo = async (todoText: string): Promise<void> => {
    const todoItem = {
      text: todoText,
      timeStamp: new Date()
    }
    try {
      await axios.post<TodoItem[]>("/todos", todoItem);
      const response = await axios.get<TodoItem[]>("/todos");
      setTodos(response.data)
    } catch (err) {
      setTodos([]);
      setError("Fetching wrong....")
    }
  }

  useEffect(() => {
    fetchTodos().then(setTodos)
  }, [])

  const outputTodo = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (todos) {
      return (
        <div>
          {todos.map((item) => {
            return <p key={item.id}>{item.text}</p>
          })}
        </div>
      )
    }
  }

  return (
    <>
    <div className="input-field mt2">
      <input
        type="text"
        id="title"
        placeholder="What do you need to do?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <label htmlFor="title" className="active">
        What do you need to do?
      </label>
      <button className="btn waves-effect waves-light" type="submit" name="action" onClick={(e) => createTodo(todoText)}>Save
        <i className="material-icons right">send</i>
      </button>
    </div>
    {outputTodo()}
    </>
  );
}
