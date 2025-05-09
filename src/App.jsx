import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MyCourses from "./pages/Courses/MyCourses";
import AllCourses from "./pages/Courses/AllCourses";
import MyCourseDetail from "./pages/Courses/MyCourseDetail";
import TopicDetail from "./pages/Courses/TopicDetail";
import Profile from "./pages/Profile/Profile";
import { mockUsers } from "./data/users";

const AppContent = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        const storedCurrentUser = localStorage.getItem("currentUser");

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            const initialUsers = JSON.stringify(mockUsers);
            localStorage.setItem("users", initialUsers);
            setUsers(mockUsers);
        }

        if (storedCurrentUser) {
            setCurrentUser(JSON.parse(storedCurrentUser));
        }
    }, []);

    const handleLogin = (phone, password) => {
        const foundUser = users.find(u =>
            u.phone === phone &&
            u.password === password
        );

        if (foundUser) {
            setCurrentUser(foundUser);
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            navigate("/", { replace: true });
        } else {
            alert("Неверный телефон или пароль!");
            navigate("/login", { replace: true });
        }
    };

    const handleRegister = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setCurrentUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        navigate("/", { replace: true });
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    currentUser ? (
                        <Navigate to="/" replace />
                    ) : (
                        <Login
                            onLogin={handleLogin}
                            onRegister={handleRegister}
                        />
                    )
                }
            />

            <Route
                path="/*"
                element={
                    currentUser ? (
                        <Layout currentUser={currentUser} />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            >
                <Route index element={<Home />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="my-courses/:courseId" element={<MyCourseDetail />} />
                <Route path="my-courses/:courseId/topics/:topicId" element={<TopicDetail />} />
                <Route path="all-courses" element={<AllCourses />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
