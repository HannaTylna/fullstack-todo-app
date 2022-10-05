import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import TodosPage from "./pages/TodosPage";
import Navbar from "./components/Navbar";
import TodoItemPage from "./pages/TodoItemPage";
import LoginPage from "./pages/LoginPage";

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3001";
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route element={<LoginPage />} path="/"/>
          <Route element={<TodosPage />} path="/todos" />
          <Route element={<TodoItemPage/>} path="/todo/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
