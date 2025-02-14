import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Лого</div>
            <nav className="nav">
                <span className="nav-item">Моя статистика</span>
                <span className="nav-item">Профиль</span>
            </nav>
        </header>
    );
};

export default Header;
