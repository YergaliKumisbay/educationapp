// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { mockUsers } from "./data/users";

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Проверяем, есть ли уже данные в localStorage
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            // Если нет, записываем туда наши мок-данные
            localStorage.setItem("users", JSON.stringify(mockUsers));
            setUsers(mockUsers);
        }
    }, []);

    const handleLogin = (phone, password) => {
        const foundUser = users.find(
            (u) => u.phone.replace(/\D/g, "") === phone && u.password === password
        );
        if (foundUser) {
            setCurrentUser(foundUser);
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
        } else {
            alert("Неверный телефон или пароль!");
        }
    };


    const handleRegister = (newUser) => {
        // Допустим, newUser — объект вида { firstName, lastName, phone, password, ... }
        const newUserWithId = { ...newUser, id: Date.now() };
        const updatedUsers = [...users, newUserWithId];
        setUsers(updatedUsers);
        // Обязательно синхронизируем с localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <Router>
            <Routes>
                {currentUser ? (
                    <Route path="/" element={<Layout currentUser={currentUser} />}>
                        <Route index element={<Home />} />
                        {/* Другие маршруты */}
                    </Route>
                ) : (
                    <Route
                        path="*"
                        element={<Login onLogin={handleLogin} onRegister={handleRegister} />}
                    />
                )}
            </Routes>
        </Router>
    );
};

export default App;
