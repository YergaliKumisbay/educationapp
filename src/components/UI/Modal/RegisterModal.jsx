import React, { useState } from "react";
import InputMask from "react-input-mask";
import Button from "../Button/Button";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

// Пример в RegisterModal при регистрации:
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        const formattedPhone = phone.replace(/\D/g, "");
        const newUser = {
            firstName,
            lastName,
            phone: formattedPhone,
            password,
        };
        // Передаём нового пользователя в родительский компонент
        onRegister(newUser);
        onClose();
    };



    if (!isOpen) return null; // Если модалка закрыта, не рендерим её

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Регистрация</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="input"
                    />
                    <InputMask
                        mask="+7(999)-999-99-99"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Номер телефона"
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <Button text="Зарегистрироваться" type="submit" />
                </form>
                <button className="close-btn" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default RegisterModal;