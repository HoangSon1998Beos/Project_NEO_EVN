export default (axios) => (resource) => ({
    index(config = {}) {
        return axios.get(`${resource}`, config)
    },
    indexWidthPath(path, config = {}) {
        return axios.get(`${resource}/${path}`, config)
    },
    create(body, config = {}) {
        return axios.post(`${resource}`, body, config)
    },
    delete(id, config = {}) {
        return axios.delete(`${resource}/${id}`, config)
    },
    update(body, id, config = {}) {
        return axios.put(`${resource}/${id}`, body, config)
    },
        return axios.get(`${resource}/${path}`,config)
    }
})