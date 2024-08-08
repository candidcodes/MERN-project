import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
   
    }
})

http.interceptors.response.use(response => {
    if('message' in response.data)
        toast.success(response.data.message)
}, error => {
    if('message' in error.response.data){
        toast.error(error.response.data.message)
    }

    return Promise.reject(error)


})


export default http