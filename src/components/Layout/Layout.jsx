import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Здесь будет рендериться контент текущей страницы */}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
