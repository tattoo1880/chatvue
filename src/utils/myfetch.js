import axios from 'axios';


const myfetch = axios.create({
    timeout: 10000,
    baseURL: 'http://127.0.0.1:8000/api/',
    // baseURL: 'http://185.200.64.73:8083',
    // !header
})

export default myfetch;