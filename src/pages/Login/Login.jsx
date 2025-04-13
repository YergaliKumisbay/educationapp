import React, { useState } from "react";
import InputMask from "react-input-mask";
import "./Login.css";

const Login = ({ onLogin, onRegister }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanPhone = phone.replace(/\D/g, "");
        if (isLogin) onLogin(cleanPhone, password);
        else onRegister({ phone: cleanPhone });
    };

    return (
        <div className="auth-container">
            <img src="https://firebasestorage.googleapis.com/v0/b/ozatonline/o/uploads%2Fimages%2Flogos%2Fozat.online.svg?alt=media" alt="Logo" className="auth-logo" />

            <div className="auth-toggle">
                <button className={!isLogin ? "" : "active"} onClick={() => setIsLogin(true)}>
                    Жүйеге кіру
                </button>
                <button className={isLogin ? "" : "active"} onClick={() => setIsLogin(false)}>
                    Тіркелу
                </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <label>Телефон</label>
                <InputMask
                    mask="+7 (999) 999-99-99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                {isLogin && (
                    <>
                        <label>Құпия сөз</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="forgot">Құпия сөзді ұмыттым?</div>
                    </>
                )}

                <button type="submit" className="auth-submit">
                    {isLogin ? "Кіру" : "Жалғастыру"}
                </button>
            </form>
        </div>
    );
};

export default Login;
