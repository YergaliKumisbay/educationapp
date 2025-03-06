import React, { useState } from "react";
import { ROLES } from "../../../data/users";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: ROLES.STUDENT
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }
        setError("");
        onRegister({
            ...formData,
            phone: formData.phone.replace(/\D/g, ""),
            id: Date.now()
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Регистрация</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Имя"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Фамилия"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Номер телефона"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="role-select"
                    >
                        <option value={ROLES.STUDENT}>Студент</option>
                        <option value={ROLES.TEACHER}>Преподаватель</option>
                    </select>
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default RegisterModal;