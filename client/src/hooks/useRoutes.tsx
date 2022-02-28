import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import NewsPage from "../pages/NewsPage/NewsPage";
import SupervisorsPage from "../pages/SupervisorsPage/SupervisorsPage";
import MainPage from "../pages/MainPage/MainPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import AdminNewsPage from "../pages/AdminNewsPage/AdminNewsPage";
import AdminNewsAddPage from "../pages/AdminNewsPage/AdminNewsAddPage/AdminNewsAddPage";
import Login from "../pages/Login/Login";
import CouncilPage from "../pages/CouncilPage/CouncilPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import EventsPage from "../pages/EventsPage/EventsPage";
import AdminEventsPage from "../pages/AdminEventsPage/AdminEventsPage";

export const useRoutes = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const { checkAuthUser } = useActions()

    useEffect(() => {
        checkAuthUser()
    }, [])

    return (
        <Routes>
            {
                isAuth && (
                    <>
                        <Route path="/admin/news" element={<AdminNewsPage />} />
                        <Route path="/admin/news/add" element={<AdminNewsAddPage />} />
                        <Route path="/admin/news/:id" element={<AdminNewsAddPage />} />
                        <Route path="/admin/conf" element={<AdminNewsPage />} />
                        <Route path="/admin/documents" element={<AdminNewsPage />} />
                        <Route path="/admin/grants" element={<AdminNewsPage />} />
                        <Route path="/admin/council" element={<AdminNewsPage />} />
                        <Route path="/admin/supervisors" element={<AdminNewsPage />} />
                        <Route path="/admin/sections" element={<AdminNewsPage />} />
                        <Route path="/admin/events" element={<AdminEventsPage />} />

                    </>
                )
            }
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/supervisors" element={<SupervisorsPage />} />
            <Route path="/council" element={<CouncilPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/events" element={<EventsPage admin={false} />} />
            <Route path="/admin/*" element={<Login />} />
            <Route path="*" element={<MainPage />} />
        </Routes>
    )
}