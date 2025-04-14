import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import Button from "../../components/UI/Button/Button";
import "./Profile.css";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setFormData({
                firstName: parsed.firstName,
                lastName: parsed.lastName,
                phone: parsed.phone,
                password: parsed.password
            });
        }
    }, []);

    const handleSave = () => {
        if (formData.password.length < 6) {
            alert("Пароль должен быть не менее 6 символов");
            return;
        }

        const updated = {
            ...user,
            ...formData,
            phone: formData.phone.replace(/\D/g, "")
        };

        localStorage.setItem("currentUser", JSON.stringify(updated));

        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = allUsers.map((u) =>
            u.id === updated.id ? updated : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setUser(updated);
        setEditMode(false);
        alert("Данные сохранены");
    };

    const handleCancel = () => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            password: user.password
        });
        setEditMode(false);
    };

    if (!user) return <div className="profile-container">Загрузка...</div>;

    return (
        <div className="profile-container">
            <h2 className="profile-header">Мой профиль</h2>

            <div className="profile-content">
                {editMode ? (
                    <>
                        <div className="form-group">
                            <label>Имя:</label>
                            <input
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Фамилия:</label>
                            <input
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Телефон:</label>
                            <InputMask
                                mask="+7(999)999-99-99"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Пароль:</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-actions">
                            <Button text="Сохранить" onClick={handleSave} />
                            <Button text="Отмена" onClick={handleCancel} />
                        </div>
                    </>
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
                        <Button text="Редактировать" onClick={() => setEditMode(true)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
