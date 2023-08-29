import {baseApi} from '../base.api'
import {sesionStore} from '@/stores/sesion'

const sesion = sesionStore()
export const GetCredentials = (data) => {
    return baseApi.post('/jwt/create/', data)
}

export const CreateUser = async (data) => {
    return await baseApi.post('/users/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getUserData = async () => {
    baseApi.defaults.headers.common['Authorization'] = 'JWT ' + sesion.pat
    const response = await baseApi.get('/me/')
    sesion.setUserData(response.data)
}

