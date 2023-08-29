import {sesionStore} from '@/stores/sesion'
import {useRouter} from 'vue-router'

export const userIsNotLogged = () => {
    const url = useRouter()
    if(!sesionStore().isAuth){
        url.push({name: 'login'})
    }
}

export const userIsLogged = () => {
    const url = useRouter()
    if(sesionStore().isAuth) {
        url.push({name: 'home'})
    }
}