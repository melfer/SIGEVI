import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {baseApi} from '@/apis/base.api'

export const sesionStore = defineStore('sesion', () => {
    const pat = ref('')
    const rat = ref('')
    const userData = ref([])
    const username = ref('')
    const isAuth = computed(() => pat.value !== rat.value && pat.value.length > 200 && rat.value.length > 200);
    const timer = ref(0)

    const setTokens = (data) => {
        pat.value = data.access
        rat.value = data.refresh
    }

    const setUsername = (data) => {
        username.value = data
    }

    const setUserData = (data) => {
        userData.value = data
    }

    const preventLogout = async () => {
        if (isAuth.value && timer.value > 1000) {
            await baseApi.post('/jwt/refresh/', {refresh: rat.value})
                .then(response => {
                    pat.value = response.data.access
                    timer.value = 0
                })
                .catch((error) => {

                    Swal.fire({
                        title: 'Error',
                        text: error.response.data.detail,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
        }
    }

    const clearTokens = () => {
        pat.value = ''
        rat.value = ''
        userData.value = []
        timer.value = 0
    }

    const setSessionTimer = () => {
        if (isAuth.value && timer.value < 1800) {
            timer.value++
        } else {
            clearTokens()
        }
    }

    return {
        pat,
        rat,
        userData,
        isAuth,
        timer,
        username,
        preventLogout,
        setUsername,
        setTokens,
        setUserData,
        clearTokens,
        setSessionTimer
    }

})
