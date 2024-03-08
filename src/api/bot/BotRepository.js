import factory from '../factories.js'
const resource ='/chatbot/bot/get-all'

export default (axios) => factory(axios)(resource)