import React, { useState } from "react";
import InputMask from "react-input-mask";
import Button from "../../components/Button/Button";
import "./Login.css";

const Login = ({ onLogin }) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault();
        const formattedPhone = phone.replace(/\D/g, "");

        if (isRegistering) {
            localStorage.setItem("userPhone", formattedPhone);
            localStorage.setItem("userPassword", password);
            alert("Регистрация успешна! Теперь войдите.");
            setIsRegistering(false);
        } else {
            const storedPhone = localStorage.getItem("userPhone");
            const storedPassword = localStorage.getItem("userPassword");

            if (formattedPhone === storedPhone && password === storedPassword) {
                localStorage.setItem("isAuthenticated", "true");
                onLogin(true);
            } else {
                alert("Неверный номер телефона или пароль");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? "Регистрация" : "Вход"}</h2>
            <form onSubmit={handleAuth}>
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
                <Button text={isRegistering ? "Зарегистрироваться" : "Войти"} type="submit" />
            </form>
            <Button
                text={isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
                onClick={() => setIsRegistering(!isRegistering)}
            />
        </div>
    );
};

export default Login;
