import {NewsAction, NewsActionTypes} from "../../types/news";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchNewsPreviews = (page = 1, count: Number) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch({ type: NewsActionTypes.FETCH_NEWS_PREVIEWS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/news`, {
                params: {page, count}
            })
            dispatch({ type: NewsActionTypes.FETCH_NEWS_PREVIEWS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_PREVIEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новостей'
            })
        }
    }
}