import BotRepository from './bot/BotRepository.js'
import LoginRepository from './login/LoginRepository.js'
import axios from 'axios'
import QuestionBankRepository from './question-bank/QuestionBankRepository.js'
import PersonRepository from './persion/PersonRepository.js'
import DashbroadRepository from './darhboard/DashbroadRepository.js'

axios.interceptors.request.use(
  function (config) {
    const baseURL = import.meta.env.VITE_API_BASE_URL
    const token = localStorage.getItem('token')
    config.baseURL = baseURL
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default {
  bot: BotRepository(axios),
  login: LoginRepository(axios),
  questionBank: QuestionBankRepository(axios),
  person: PersonRepository(axios),
  dashbroard: DashbroadRepository(axios),
  //Khai báo các repositories khác ở đây
}
