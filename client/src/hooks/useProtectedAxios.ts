import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_SERVER_URL
})

$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api