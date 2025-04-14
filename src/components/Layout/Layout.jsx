import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import TabBar from "../UI/TabBar/TabBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet /> {/* Здесь будет рендериться контент текущей страницы */}
            <TabBar />
            {/*<Footer />*/}
        </>
    );
};

export default Layout;
