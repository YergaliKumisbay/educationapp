import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockUsers } from "../../../data/users";
import "./Header.css";

const Header = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const headerToolsRef = useRef(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            const initialUser = storedUser
                ? JSON.parse(storedUser)
                : mockUsers?.[0] || null;
            setUser(initialUser);
        } catch (error) {
            console.error("Ошибка загрузки пользователя:", error);
            setUser(null);
        }
    }, []);

    // Защита от undefined
    const userName = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "Профиль";

    // Обработчик логаута
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media"
                    alt="Ozat Online Logo"
                    className="logo-image"
                />
            </Link>

{/*
            <nav className="header-nav">
                <Link to="/my-courses" className="nav-item">
                    Менің курстарым
                </Link>
                <Link to="/all-courses" className="nav-item">
                    Барлық курстар
                </Link>
            </nav>
*/}

            <div className="profile-section" ref={headerToolsRef} onClick={() => setMenuOpen(prev => !prev)}
            >
                <img
                    src={user?.avatar || "https://daryn.online/_nuxt/user-default.Dmre8zgK.jpg"}
                    alt="Аватар"
                    className="profile-image"
                />
                <span className="user-name">{userName}</span>

                {menuOpen && (
                    <div className="profile-menu">
                        <Link to="/profile" className="menu-item">
                            Профиль
                        </Link>
                        <button className="menu-item" onClick={handleLogout}>
                            Шығу
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;