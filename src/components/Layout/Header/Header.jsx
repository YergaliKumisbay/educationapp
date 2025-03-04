import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockUsers } from "../../../data/users";
import "./Header.css";

const Header = () => {
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const headerToolsRef = useRef(null);

    useEffect(() => {
        // Пытаемся получить данные авторизованного пользователя из localStorage
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(`${user.firstName} ${user.lastName}`);
        } else if (mockUsers && mockUsers.length > 0) {
            // Если currentUser отсутствует, берем данные из мок-данных
            const defaultUser = mockUsers[0];
            setUserName(`${defaultUser.firstName} ${defaultUser.lastName}`);
        } else {
            setUserName("Профиль");
        }
    }, []);

    // Закрываем выпадающее меню при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerToolsRef.current && !headerToolsRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Выход из системы: удаляем данные текущего пользователя и флаг авторизации
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        // Перенаправляем на главную страницу
        navigate("/");
        // Перезагрузка не обязательна, если управление состоянием реализовано правильно
        // window.location.reload();
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

            <nav className="header-nav">
                <Link to="/my-courses" className="nav-item">
                    Мои курсы
                </Link>
                <Link to="/all-courses" className="nav-item">
                    Общие курсы
                </Link>
            </nav>

            {/* Блок для выпадающего меню */}
            <div
                className="header-tools"
                ref={headerToolsRef}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className="profile-dropdown">
                    <img
                        src="https://daryn.online/_nuxt/user-default.Dmre8zgK.jpg"
                        alt="Профиль"
                        className="profile-image"
                    />
                </div>
                <span className="nav-item">{userName || "Профиль"}</span>

                {/* Выпадающее меню */}
                {menuOpen && (
                    <div className="profile-menu">
                        <Link to="/profile" className="menu-item">
                            Мой профиль
                        </Link>
                        <Link to="/my-courses" className="menu-item">
                            Мои курсы
                        </Link>
                        <span className="menu-item logout" onClick={handleLogout}>
              Выход
            </span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
