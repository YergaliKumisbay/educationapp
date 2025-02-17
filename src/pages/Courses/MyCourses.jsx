import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Фильтруем только те, где isMyCourse = true
        const filteredCourses = coursesData.filter(course => course.isMyCourse);
        setMyCourses(filteredCourses);
    }, []);

    // При клике на курс переходим на маршрут /my-courses/:courseId
    const handleCourseClick = (id) => {
        navigate(`/my-courses/${id}`);
    };

    return (
        <div className="courses-container">
            <h2>Мои курсы</h2>
            {myCourses.length > 0 ? (
                <div className="courses-grid">
                    {myCourses.map(course => (
                        <div
                            className="course-card"
                            key={course.id}
                            onClick={() => handleCourseClick(course.id)}
                        >
                            <img src={course.image} alt={course.title} className="course-image" />
                            <div className="course-body">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Вы еще не записаны на курсы.</p>
            )}
            <button onClick={() => navigate("/")} className="back-btn">Назад</button>
        </div>
    );
};

export default MyCourses;
