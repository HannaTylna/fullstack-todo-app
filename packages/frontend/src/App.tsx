import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import TodosPage from "./pages/TodosPage";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route element={<TodosPage/>} path="/todos"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
