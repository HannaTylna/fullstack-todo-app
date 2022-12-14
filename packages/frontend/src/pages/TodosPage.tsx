import React, { useEffect, useState } from "react";
import TodoItem from "@fullstack-todo-app/shared";
import axios from "axios";
import { Link } from "react-router-dom";


const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get<TodoItem[]>("/todos")
  return response.data
}

export default function TodosPage() {
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
      console.log(response.data)
    } catch (err) {
      setTodos([]);
      setError("Fetching wrong....")
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos()
        .then(setTodos)
        .catch((error) => {
          setTodos([]);
          setError("Something went wrong when fetching my todos...")
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const outputTodo = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (todos) {
      return (
        <div className="collection">
          {todos.map((item) => {
            return <Link key={item._id} to={`/todo/${item._id}`} className="collection-item">{item.text}</Link>
          })}
        </div>
      )
    }
  }

  return (
    <>
      {outputTodo()}
      <div className="input-field mt10 df">
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
        <button className="btn waves-effect waves-light ml2" type="submit" name="action" onClick={(e) => createTodo(todoText)}>Save
          <i className="material-icons right">send</i>
        </button>
      </div>
    </>
  );
}