import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const AllCourses = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setAllCourses(coursesData);
    }, []);

    const filteredCourses = allCourses.filter(course => {
        if (filter === "free") return course.price === 0;
        if (filter === "paid") return course.price > 0;
        return true;
    });

    return (
        <div className="courses-container">
            <h2>Барлық курстар ({filteredCourses.length})</h2>

            <div className="course-filters">
                <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>Барлығы</button>
                <button onClick={() => setFilter("free")} className={filter === "free" ? "active" : ""}>Тегін</button>
                <button onClick={() => setFilter("paid")} className={filter === "paid" ? "active" : ""}>Ақылы</button>
            </div>

            <div className="courses-grid">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => navigate(`/my-courses/${course.id}`)}
                    >
                        <img src={course.image} alt={course.title} className="course-image" />
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/")} className="back-btn">← Басты бет</button>
        </div>
    );
};

export default AllCourses;
