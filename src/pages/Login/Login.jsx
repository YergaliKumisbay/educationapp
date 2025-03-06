import React, { useState } from "react";
import InputMask from "react-input-mask";
import Button from "../../components/UI/Button/Button";
import RegisterModal from "../../components/UI/Modal/RegisterModal";
import "./Login.css";

const Login = ({ onLogin, onRegister }) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        const formattedPhone = phone.replace(/\D/g, "");
        console.log("Login attempt:", formattedPhone, password);
        onLogin(formattedPhone, password);
    };

    return (
        <div className="login-container">
            {isLoginMode ? (
                <>
                    <h2>Вход</h2>
                    <form onSubmit={handleLogin}>
                        <InputMask
                            mask="+7(999)999-99-99"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+77001234567"
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
                        <Button
                            text="Войти"
                            type="submit" // Только type="submit"
                        />
                    </form>
                    <Button
                        text="Нет аккаунта? Регистрация"
                        onClick={() => setIsLoginMode(false)}
                    />
                </>
            ) : (
                <RegisterModal
                    isOpen={true}
                    onClose={() => setIsLoginMode(true)}
                    onRegister={onRegister}
                />
            )}
        </div>
    );
};

export default Login;