import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import {useTypedSelector} from "./useTypedSelector";
import {useActions} from "./useActions";
import NewsPage from "../pages/NewsPage/NewsPage";
import SupervisorsPage from "../pages/SupervisorsPage/SupervisorsPage";

export const useRoutes = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const { checkAuthUser } = useActions()

    useEffect(() => {
        checkAuthUser()
    }, [])

    return (
        <Routes>
            {
                isAuth &&
                <Route path="/news" element={<NewsPage />} />
            }
            <Route path="/news" element={<NewsPage />} />
            <Route path="/supervisors" element={<SupervisorsPage />} />
            <Route path="*" element={<MainLayout />} />
        </Routes>
    )
}