import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const firstName = localStorage.getItem("userFirstName");
        const lastName = localStorage.getItem("userLastName");
        if (firstName && lastName) {
            setUserName(`${firstName} ${lastName}`);
        }
    }, []);

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media"
                    alt="Ozat Online Logo"
                    className="logo-image"
                />
            </Link>
            <nav className="nav">
                <span className="nav-item">Моя статистика</span>
                <Link to="/my-courses" className="nav-item">Мои курсы</Link>
                <Link to="/all-courses" className="nav-item">Общие курсы</Link>
                <span className="nav-item">{userName || "Профиль"}</span>
            </nav>
        </header>
    );
};

export default Header;
