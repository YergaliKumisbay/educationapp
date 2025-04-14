import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadUserData = () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setFormData({
                        id: parsedUser.id,
                        firstName: parsedUser.firstName,
                        lastName: parsedUser.lastName,
                        phone: parsedUser.phone,
                        password: parsedUser.password
                    });
                } catch (error) {
                    console.error("Ошибка загрузки данных:", error);
                }
            }
        };
        loadUserData();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = "Имя обязательно";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Фамилия обязательна";
        }
        if (!formData.phone.replace(/\D/g, "").match(/^77\d{9}$/)) {
            newErrors.phone = "Некорректный номер телефона";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Пароль должен быть не менее 6 символов";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const updatedUser = {
            ...user,
            ...formData,
            phone: formData.phone.replace(/\D/g, "")
        };

        // Обновляем текущего пользователя
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // Обновляем данные в списке пользователей
        const allUsers = JSON.parse(localStorage.getItem("users") || []);
        const updatedUsers = allUsers.map(u =>
            u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setUser(updatedUser);
        setEditMode(false);
        alert("Данные успешно сохранены!");
    };

    const handleCancel = () => {
        setFormData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            password: user.password
        });
        setEditMode(false);
        setErrors({});
    };

    if (!user) {
        return <div className="profile-container">Загрузка профиля...</div>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-header">Мой профиль</h2>

            <div className="profile-content">
                {editMode ? (
                    <div className="edit-form">
                        <div className="form-group">
                            <label>Имя:</label>
                            <input
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className={errors.firstName ? "error" : ""}
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Фамилия:</label>
                            <input
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className={errors.lastName ? "error" : ""}
                            />
                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Телефон:</label>
                            <InputMask
                                mask="+7(999)999-99-99"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className={errors.phone ? "error" : ""}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>Пароль:</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className={errors.password ? "error" : ""}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave}>
                                Сохранить
                            </button>
                            <button className="cancel-btn" onClick={handleCancel}>
                                Отмена
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-info">
                        <div className="profile-field">
                            <span>Имя:</span>
                            <strong>{user.firstName}</strong>
                        </div>
                        <div className="profile-field">
                            <span>Фамилия:</span>
                            <strong>{user.lastName}</strong>
                        </div>
                        <div className="profile-field">
                            <span>Телефон:</span>
                            <strong>+{user.phone}</strong>
                        </div>
                        <button
                            className="edit-btn"
                            onClick={() => setEditMode(true)}
                        >
                            Редактировать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;