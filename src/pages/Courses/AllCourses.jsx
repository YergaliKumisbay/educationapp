import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const AllCourses = () => {
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setAllCourses(coursesData);
    }, []);

    return (
        <div className="courses-container">
            <h2>Все курсы</h2>
            <div className="courses-grid">
                {allCourses.map(course => (
                    <div className="course-card">
                        <img src={course.image} alt={course.title} className="course-image" />
                        <div className="course-body">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </div>
                        <div className="course-footer">
                            <span>{course.price > 0 ? `${course.price} тг` : "Бесплатно"}</span>
                            <button className="enroll-btn">Подробнее</button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate("/")} className="back-btn">Назад</button>
        </div>
    );
};

export default AllCourses;
