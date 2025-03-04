// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MyCourses from "./pages/Courses/MyCourses";
import AllCourses from "./pages/Courses/AllCourses";
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

        // Пытаемся получить "currentUser" из localStorage,
        // если хотите сохранять авторизацию между перезагрузками
        const storedCurrentUser = localStorage.getItem("currentUser");
        if (storedCurrentUser) {
            setCurrentUser(JSON.parse(storedCurrentUser));
        }
    }, []);

    const handleLogin = (phone, password) => {
        const foundUser = users.find(
            (u) => u.phone.replace(/\D/g, "") === phone && u.password === password
        );
        if (foundUser) {
            setCurrentUser(foundUser);
            // Сохраняем текущего пользователя, чтобы он оставался авторизованным
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
        } else {
            alert("Неверный телефон или пароль!");
        }
    };

    const handleRegister = (newUser) => {
        const newUserWithId = { ...newUser, id: Date.now() };
        const updatedUsers = [...users, newUserWithId];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <Router>
            <Routes>
                {currentUser ? (
                    // Если пользователь авторизован, отображаем Layout и вложенные маршруты
                    <Route path="/" element={<Layout currentUser={currentUser} />}>
                        <Route index element={<Home />} />
                        <Route path="my-courses" element={<MyCourses />} />
                        <Route path="all-courses" element={<AllCourses />} />
                        {/* Добавляйте другие маршруты при необходимости */}
                    </Route>
                ) : (
                    // Если пользователь не авторизован, переходим на Login
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

