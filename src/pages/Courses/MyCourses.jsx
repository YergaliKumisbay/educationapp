import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = coursesData.filter(course => course.isMyCourse);
        setMyCourses(filtered);
    }, []);

    return (
        <div className="courses-container">
            <h2>Менің курстарым</h2>
            {myCourses.length > 0 ? (
                <div className="courses-grid">
                    {myCourses.map(course => (
                        <div
                            className="course-card"
                            key={course.id}
                            onClick={() => navigate(`/my-courses/${course.id}`)}
                        >
                            <img src={course.image} alt={course.title} className="course-image" />
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Сізде курстар жоқ.</p>
            )}
            <button onClick={() => navigate("/")} className="back-btn">← Басты бет</button>
        </div>
    );
};

export default MyCourses;
