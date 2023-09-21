import axios from 'axios'

export const baseApi = axios.create({
    /*baseURL: 'http://127.0.0.1:8000/api/v1'*/
    baseURL:'https://sigevi-despliegue.vercel.app/api/v1'
})