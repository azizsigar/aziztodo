import axios from "axios";

const instance  = axios.create({
    baseURL: 'http://localhost:4500',
    headers: {
        'Content-Type': 'application/json'
    }
})

if(window.sessionStorage.getItem('token')) {
    instance.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token')
}

export default instance;