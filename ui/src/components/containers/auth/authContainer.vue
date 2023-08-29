<template>
  <form @submit.prevent="doLogin">
    <div class="form-floating mb-3">
      <input id="floatingInput" v-model="username" class="form-control" type="text">
      <label for="floatingInput">Usuario <i class="bi bi-person-badge"></i></label>
    </div>
    <div class="form-floating">
      <input id="floatingPassword" v-model="password" class="form-control" type="password">
      <label for="floatingPassword">Contraseña <i class="bi bi-key"></i></label>
    </div>
    <hr style="color:white">
    <button v-if="loading" class="btn btn-success" disabled type="button">
      <span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
      Espere...
    </button>
    <button v-else class="btn btn-success" type="submit">Entrar <i class="bi bi-door-open"></i></button>
  </form>
</template>

<script setup>
import {ref} from 'vue'
import Swal from 'sweetalert2';
import {GetCredentials, getUserData} from '@/apis/origins/auth.origins'
import {sesionStore} from '@/stores/sesion'
import {useRouter} from 'vue-router'

const url = useRouter()
const sesion = sesionStore()
const username = ref('')
const password = ref('')
const loading = ref(false)


const doLogin = async () => {
  const data = {
    username: username.value,
    password: password.value
  }
  const response = await new Promise((resolve, reject) => {
    loading.value = true
    GetCredentials(data).then((res) => {
      sesion.setTokens(res.data)
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Iniciaste sesión correctamente',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      })
      getUserData()
      url.push({name: 'home'})
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.detail,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    })
        .finally(() => {
          loading.value = false
        })
  })

}


</script>