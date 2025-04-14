import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TabBar.css";

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="tab-bar">
            <div
                className={`tab-item ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                <img
                    src="/icon/home.svg"
                    alt="Home"
                    className="tab-icon"
                />
            </div>

            <div
                className={`tab-item ${isActive("/my-courses") ? "active" : ""}`}
                onClick={() => navigate("/my-courses")}
            >
                <img
                    src="/icon/education.svg"
                    alt="Courses"
                    className="tab-icon"
                />
            </div>

            <div
                className={`tab-item ${isActive("/notifications") ? "active" : ""}`}
                onClick={() => navigate("/notifications")}
            >
                <img
                    src="/icon/notification.svg"
                    alt="Notifications"
                    className="tab-icon"
                />
            </div>

            <div
                className={`tab-item ${isActive("/profile") ? "active" : ""}`}
                onClick={() => navigate("/profile")}
            >
                <img
                    src="/icon/avatar.svg"
                    alt="Profile"
                    className="tab-icon avatar-icon"
                />
            </div>
        </div>
    );
};

export default TabBar;
