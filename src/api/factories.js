export default (axios) => (resource) => ({
    index(config = {}) {
        return axios.get(`${resource}`, config)
    },
    //Khai báo get, post, put,delete ở đây
})
