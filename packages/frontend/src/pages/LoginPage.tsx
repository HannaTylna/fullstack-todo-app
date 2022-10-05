import { TodoItem } from "@fullstack-todo-app/shared";
import axios from "axios";
import { useState } from "react";
import { LoginInput } from "../components/LoginInput";

export default function LoginPage() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    
    const performLogin = async (username: string, password: string): Promise<void> => {
        const loginResponse = await axios.post("/", {
            username: username,
            password: password
        });
        if (loginResponse && loginResponse.status === 200) {
            localStorage.setItem("jwt", loginResponse.data);
            setLoggedIn(true);
            setError("");
            const response = await axios.get<TodoItem[]>("/todos");
            setTodos(response.data);
        }
    }
    return (
        <LoginInput onLogin={performLogin} />
    )
}