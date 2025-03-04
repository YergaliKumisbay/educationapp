import './CardButton.css';
import CardButton from '../../components/CardButton';

function CardButton({ children, className }) {
    const cl = 'card-button' + (className ? ' ' + className : '');

    return (
        <button className={cl}>
            {children}
        </button>
    );
}

export default CardButton;

// Обновление кнопок в файлах

import CardButton from '../../components/CardButton';

const Login = ({ onLogin }) => {
    return (
        <CardButton className="login-btn">{isRegistering ? "Зарегистрироваться" : "Войти"}</CardButton>
    );
};

const AllCourses = () => {
    return (
        <CardButton className="enroll-btn">Подробнее</CardButton>
    );
};

const MyCourses = () => {
    return (
        <CardButton onClick={() => navigate("/")} className="back-btn">Назад</CardButton>
    );
};

const MyCourseDetail = () => {
    return (
        <CardButton onClick={() => navigate("/my-courses")} className="back-btn">Назад</CardButton>
    );
};

const TopicDetail = () => {
    return (
        <CardButton onClick={() => navigate(`/my-courses/${courseId}`)} className="back-btn">
            Назад к курсу
        </CardButton>
    );
};
