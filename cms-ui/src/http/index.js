import axios from "axios"

const http = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default http