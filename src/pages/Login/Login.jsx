import React, { useState } from "react";
import InputMask from "react-input-mask";
import Button from "../../components/UI/Button/Button";
import RegisterModal from "../../components/UI/Modal/RegisterModal";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const formattedPhone = phone.replace(/\D/g, "");
        // Передаём форматированный номер и пароль в onLogin
        onLogin(formattedPhone, password);
    };


    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
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
                <Button text="Войти" type="submit" />
            </form>
            <Button
                text="Нет аккаунта? Регистрация"
                onClick={() => setIsRegisterModalOpen(true)}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />
        </div>
    );
};

export default Login;
