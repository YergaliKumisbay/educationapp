import React from "react";
import { useNavigate } from "react-router-dom";
import "./TabBar.css";

const TabBar = () => {
    const navigate = useNavigate();

    return (
        <div className="tab-bar">
            <div onClick={() => navigate("/")} className="tab-item">🏠 Басты</div>
            <div onClick={() => navigate("/profile")} className="tab-item">👤 Профиль</div>
            <div onClick={() => navigate("/notifications")} className="tab-item">🔔 Хабарламалар</div>
        </div>
    );
};

export default TabBar;
