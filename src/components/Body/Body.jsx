import React from "react";
import "./Body.css";

const Body = () => {
    return (
        <main className="body-container">
            <section className="course-section">
                <h2>📚 Мои курсы</h2>
                <p>Список курсов, на которые вы записаны.</p>
            </section>
            <section className="course-section">
                <h2>🌍 Общие курсы</h2>
                <p>Другие доступные курсы.</p>
            </section>
        </main>
    );
};

export default Body;
