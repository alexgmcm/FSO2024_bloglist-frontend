import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
    console.log(token)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log("FETCHING ALL BLOGS")
    return request.then((response) => response.data)
}

const update = async (updatedObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(
        `${baseUrl}/${updatedObject.id}`,
        updatedObject,
        config
    )
    return response.data
}

const del = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const addComment = async (args) => {
    const {id, comment} = args
    const config = {
        headers: { Authorization: token },
    }
    console.log(comment)
    const response = await axios.post(`${baseUrl}/${id}/comments`,{content: comment},config)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default { getAll, create, setToken, update, del, addComment }
