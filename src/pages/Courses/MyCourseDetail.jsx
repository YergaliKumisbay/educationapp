import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const MyCourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const course = coursesData.find(c => c.id === Number(courseId));
    if (!course) {
        return (
            <div className="courses-container">
                <h2>Курс не найден</h2>
                <button onClick={() => navigate("/my-courses")} className="back-btn">Назад</button>
            </div>
        );
    }

    // Переход к теме
    const handleTopicClick = (topicId) => {
        navigate(`/my-courses/${courseId}/topics/${topicId}`);
    };

    return (
        <div className="courses-container">
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            <div className="topic-list">
                <h3>Темы</h3>
                {course.content.map(topic => (
                    <div
                        key={topic.id}
                        className="topic-card"
                        onClick={() => handleTopicClick(topic.id)}
                    >
                        <h4>{topic.title}</h4>
                    </div>
                ))}
            </div>

            {/* Тесты по курсу (если нужны общие) */}
            {course.questions && course.questions.length > 0 && (
                <div className="questions-section">
                    <h3>Тесты по всему курсу</h3>
                    {course.questions.map(q => (
                        <div key={q.id} className="question">
                            <p>{q.question}</p>
                            <ul>
                                {q.options.map((opt, i) => (
                                    <li key={i}>{opt}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={() => navigate("/my-courses")} className="back-btn">Назад</button>
        </div>
    );
};

export default MyCourseDetail;
