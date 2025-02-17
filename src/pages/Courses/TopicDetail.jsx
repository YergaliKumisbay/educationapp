import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "../../data/courses.json";
import "./Courses.css";

const TopicDetail = () => {
    const { courseId, topicId } = useParams();
    const navigate = useNavigate();

    // Ищем нужный курс
    const course = coursesData.find(c => c.id === Number(courseId));
    if (!course) {
        return (
            <div className="courses-container">
                <h2>Курс не найден</h2>
                <button onClick={() => navigate("/my-courses")} className="back-btn">Назад</button>
            </div>
        );
    }

    // Ищем нужную тему
    const topic = course.content.find(t => t.id === Number(topicId));
    if (!topic) {
        return (
            <div className="courses-container">
                <h2>Тема не найдена</h2>
                <button onClick={() => navigate(`/my-courses/${courseId}`)} className="back-btn">
                    Назад к курсу
                </button>
            </div>
        );
    }

    return (
        <div className="courses-container">
            <h2>{course.title} / {topic.title}</h2>
            {/* Уроки (видео) */}
            <div className="lesson-list">
                {topic.lessons.map(lesson => (
                    <div key={lesson.id} className="lesson-card">
                        <h4>{lesson.title}</h4>
                        <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                            Смотреть видео
                        </a>
                    </div>
                ))}
            </div>

            {/* Тесты по теме */}
            {topic.questions && topic.questions.length > 0 && (
                <div className="questions-section">
                    <h3>Тест по теме</h3>
                    {topic.questions.map(q => (
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

            <button onClick={() => navigate(`/my-courses/${courseId}`)} className="back-btn">
                Назад к курсу
            </button>
        </div>
    );
};

export default TopicDetail;
