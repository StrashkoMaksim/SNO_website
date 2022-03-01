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
import AdminLayout from "../components/AdminLayout/AdminLayout";
import MainLayout from "../components/MainLayout/MainLayout";

export const useRoutes = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const { checkAuthUser } = useActions()

    useEffect(() => {
        checkAuthUser()
    }, [])

    return (
        <Routes>
            {
                isAuth ? (
                    <>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="news" element={<AdminNewsPage />} />
                            <Route path="news/add" element={<AdminNewsAddPage />} />
                            <Route path="news/:id" element={<AdminNewsAddPage />} />
                            <Route path="conf" element={<AdminNewsPage />} />
                            <Route path="council" element={<AdminNewsPage />} />
                            <Route path="supervisors" element={<AdminNewsPage />} />
                            <Route path="documents" element={<AdminNewsPage />} />
                            <Route path="sections" element={<AdminNewsPage />} />
                            <Route path="events" element={<AdminEventsPage />} />
                        </Route>
                    </>
                ) : <Route path="/admin/*" element={<Login />} />
            }
            <Route path="/" element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="supervisors" element={<SupervisorsPage />} />
                <Route path="council" element={<CouncilPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="events" element={<EventsPage admin={false} />} />
                <Route path="*" element={<MainPage />} />
            </Route>
        </Routes>
    )
}