export default (axios) => (resource) => ({
    index(config = {}) {
        return axios.get(`${resource}`, config)
    },
    indexWidthPath(path, config = {}) {
        return axios.get(`${resource}/${path}`,config)
    }
    //Khai báo get, post, put,delete ở đây
})
