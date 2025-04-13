import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../../data/users";
import "./Body.css";

const Body = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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
        ? `${user.firstName || ""}`.trim()
        : "";

    return (
        <main className="body-container">
            <h2>
                Сәлем, <strong>{userName}</strong>! 👋🏻
            </h2>
            <blockquote className="quote">
                "Ақыpын жүріп, анық бас<br />Еңбегің кетпес далаға."<br />
                <span className="author">(Абай)</span>
            </blockquote>

            <div className="bonus-banner">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media"
                    alt="Wallet"
                    className="bonus-icon"
                />
                <div>
                    <p>Балансты толтырып,</p>
                    <h3>10% бонус ретінде ал</h3>
                </div>
            </div>
            {/* Сетка карточек */}
            <div className="card-grid">
                <div className="course-card-button" onClick={() => navigate("/trial-tests")}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media" alt="Байқау тесттері" />
                    <h3>Байқау тесттері</h3>
                    <p>Тестілеуге дайындық</p>
                </div>

                <div className="course-card-button" onClick={() => navigate("/my-courses")}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media" alt="Менің курстарым" />
                    <h3>Менің курстарым</h3>
                    <p>Сіздің курстарыңыз</p>
                </div>

                <div className="course-card-button card-locked">
                    <img src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media" alt="Ата-ана үшін" />
                    <h3>Ата-ана үшін</h3>
                    <p>Ата-аналарға арналған</p>
                </div>

                <div className="course-card-button card-locked">
                    <img src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media" alt="Түсу ықтималдығы" />
                    <h3>Түсу ықтималдығы</h3>
                    <p>Сіздің мүмкіндік</p>
                </div>
            </div>
        </main>
    );
};

export default Body;
