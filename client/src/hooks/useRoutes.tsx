import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import NewsPage from "../pages/NewsPage/NewsPage";
import SupervisorsPage from "../pages/SupervisorsPage/SupervisorsPage";
import MainPage from "../pages/MainPage/MainPage";
import AdminNewsPage from "../pages/AdminNewsPage/AdminNewsPage";

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
                        <Route path="/admin/conf" element={<AdminNewsPage />} />
                        <Route path="/admin/council" element={<AdminNewsPage />} />
                        <Route path="/admin/supervisors" element={<AdminNewsPage />} />
                        <Route path="/admin/documents" element={<AdminNewsPage />} />
                        <Route path="/admin/sections" element={<AdminNewsPage />} />
                    </>
                )
            }
            <Route path="/news" element={<NewsPage />} />
            <Route path="/supervisors" element={<SupervisorsPage />} />
            <Route path="*" element={<MainPage />} />
        </Routes>
    )
}