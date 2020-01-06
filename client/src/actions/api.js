import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getClasses = username => api.get(`classrooms/classes/${username}`)

const apis = {
    getClasses
}

export default apis