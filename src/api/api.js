import BotRepository from "./bot/BotRepository.js";
import axios from "axios";

axios.interceptors.request.use(
    function (config) {
        const baseURL = import.meta.env.VITE_API_BASE_URL
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiIsInR5cGUiOiJBRE1JTiIsImlkIjoxMTksImlhdCI6MTcwOTc5OTU1MCwiZXhwIjoxNzA5ODg1OTUwfQ.fZMewRkx4v8zSgdgFWeRGAad7R0VglxtrUGwyTfTH91Aix2XSCKCPUHiOzrmHo0CHJUgqDKHcf4EDl6qwso3og'
        config.baseURL = baseURL
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default {
    bot: BotRepository(axios),
    //Khai báo các repositories khác ở đây
}