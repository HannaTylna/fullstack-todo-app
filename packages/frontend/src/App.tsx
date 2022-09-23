import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3001";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <TodoForm />
      </div>
    </>
  );
}

export default App;
