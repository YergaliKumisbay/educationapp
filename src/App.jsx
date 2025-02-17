import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyCourses from "./pages/Courses/MyCourses";
import AllCourses from "./pages/Courses/AllCourses";
import MyCourseDetail from "./pages/Courses/MyCourseDetail";
import TopicDetail from "./pages/Courses/TopicDetail";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedPhone = localStorage.getItem("userPhone");
        const storedPassword = localStorage.getItem("userPassword");
        const authStatus = localStorage.getItem("isAuthenticated");

        if (storedPhone && storedPassword && authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        localStorage.setItem("isAuthenticated", status);
    };

    return (
        <Router>
            <Routes>
                {isAuthenticated ? (
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="my-courses" element={<MyCourses />} />
                        <Route path="my-courses/:courseId" element={<MyCourseDetail />} />
                        {/* Новый маршрут для темы */}
                        <Route path="my-courses/:courseId/topics/:topicId" element={<TopicDetail />} />
                        <Route path="all-courses" element={<AllCourses />} />
                    </Route>
                ) : (
                    <Route path="*" element={<Login onLogin={handleLogin} />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
