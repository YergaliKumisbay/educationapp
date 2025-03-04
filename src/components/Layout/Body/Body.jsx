import React from "react";
import { useNavigate } from "react-router-dom";
import "./Body.css";

const Body = () => {
    const navigate = useNavigate();

    return (
        <main className="body-container">
            <section className="course-section" onClick={() => navigate("/my-courses")}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Fcourses%2F8.jpg?alt=media"
                    alt="Ozat Online Logo"
                    className="course-logo"
                />
                <h2>Мои курсы</h2>
                <p>Список курсов, на которые вы записаны.</p>
            </section>
            <section className="course-section" onClick={() => navigate("/all-courses")}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Fcourses%2F8.jpg?alt=media"
                    alt="Ozat Online Logo"
                    className="course-logo"
                />
                <h2>Общие курсы</h2>
                <p>Другие доступные курсы.</p>
            </section>
        </main>
    );
};

export default Body;
