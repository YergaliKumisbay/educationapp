import React, { useEffect, useState } from "react";
import "./Profile.css"; // Подключаем файл стилей

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        // Получаем данные из localStorage
        setFirstName(localStorage.getItem("userFirstName") || "");
        setLastName(localStorage.getItem("userLastName") || "");
        setPhone(localStorage.getItem("userPhone") || "");
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-header">Мой профиль</h2>
            <div className="profile-field">
                <span>Имя:</span>
                <strong>{firstName}</strong>
            </div>
            <div className="profile-field">
                <span>Фамилия:</span>
                <strong>{lastName}</strong>
            </div>
            <div className="profile-field">
                <span>Телефон:</span>
                <strong>{phone}</strong>
            </div>
        </div>
    );
};

export default Profile;
