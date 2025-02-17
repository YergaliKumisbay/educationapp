import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const firstName = localStorage.getItem("userFirstName");
        const lastName = localStorage.getItem("userLastName");
        if (firstName && lastName) {
            setUserName(`${firstName} ${lastName}`);
        }
    }, []);

    const handleLogout = () => {
        // Выход из системы
        localStorage.removeItem("isAuthenticated");
        // Можно также удалить другие данные, если нужно
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

            <nav className="header-nav">
                <Link to="/my-courses" className="nav-item">Мои курсы</Link>
                <Link to="/all-courses" className="nav-item">Общие курсы</Link>
            </nav>

            {/* Блок для выпадающего меню */}
            <div
                className="header-tools"
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
