import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "../../data/courses";
import "./Courses.css";

const MyCourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Преобразуем courseId в число и ищем курс по id
    const course = coursesData.find((c) => c.id === Number(courseId));

    if (!course) {
        return (
            <div className="courses-container">
                <h2>Курс не найден</h2>
                <button onClick={() => navigate("/my-courses")} className="back-btn">
                    Назад
                </button>
            </div>
        );
    }

    // Функция для перехода к теме курса
    const handleTopicClick = (topicId) => {
        navigate(`/my-courses/${courseId}/topics/${topicId}`);
    };

    return (
        <div className="courses-container">
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            <div className="topic-list">
                <h3>Темы</h3>
                {course.content && course.content.length > 0 ? (
                    course.content.map((topic) => (
                        <div
                            key={topic.id}
                            className="topic-card"
                            onClick={() => handleTopicClick(topic.id)}
                        >
                            <h4>{topic.title}</h4>
                        </div>
                    ))
                ) : (
                    <p>Темы не найдены</p>
                )}
            </div>

            {course.questions && course.questions.length > 0 && (
                <div className="questions-section">
                    <h3>Тесты по всему курсу</h3>
                    {course.questions.map((q) => (
                        <div key={q.id} className="question">
                            <p>{q.question}</p>
                            <ul>
                                {q.options.map((opt, index) => (
                                    <li key={index}>{opt}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={() => navigate("/my-courses")} className="back-btn">
                Назад
            </button>
        </div>
    );
};

export default MyCourseDetail;
