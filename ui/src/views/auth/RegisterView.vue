<script setup>
import {ref} from 'vue'
import Swal from "sweetalert2";
import {CreateUser} from '@/apis/origins/auth.origins'
import {useRouter} from "vue-router";
import {errorValidator} from '@/validators/error.validator'

const username = ref('')
const password = ref('')
const password2 = ref('')
const email = ref('')
const nombres = ref('')
const apellidos = ref('')
const loading = ref(false)
const url = useRouter()

const saveData = async () => {
  const data = {
    username: username.value,
    password: password.value,
    password2: password2.value,
    email: email.value
  }
  loading.value = true
  await CreateUser(data)
      .then((Response) => {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido creado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        url.push({name: 'login'})
      })
      .catch((err) => {
        const reciever = errorValidator(err.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: reciever,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        })
      })
      .finally(() => {
        loading.value = false
      })
}
</script>

<template>
  <div class="col col-lg-5">
    <div class="card">
      <div class="card-body">
        <h5 align="center" class="card-title">
          Registrar usuario nuevo
        </h5>
        <h5 align="center" class="card-text">
          Ingrese sus datos para comenzar
        </h5>
        <form v-if="!loading" @submit.prevent="saveData">
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="username" class="form-control" requierd type="text">
            <label for="floatingInput">Usuario <i class="bi bi-person-badge"></i></label>
          </div>
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="password" class="form-control" required type="password">
            <label for="floatingInput">Contraseña <i class="bi bi-key"></i></label>
          </div>
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="password2" class="form-control" required type="password">
            <label for="floatingInput">Repita su contraseña <i class="bi bi-key-fill"></i></label>
          </div>
          <div v-if="password !== password2" class="alert alert-primary alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Las contraseñas no coinciden.
          </div>
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="email" class="form-control" type="text">
            <label for="floatingInput">Correo <i class="bi bi-envelope-at"></i></label>
          </div>
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="nombres" class="form-control" type="text">
            <label for="floatingInput">Nombres <i class="bi bi-person"></i></label>
          </div>
          <div class="form-floating mb-3">
            <input id="floatingInput" v-model="apellidos" class="form-control" type="text">
            <label for="floatingInput">Apellidos <i class="bi bi-person"></i></label>
          </div>
          <button class="btn btn-success" type="submit">Guardar</button>

        </form>
        <div v-else>
          Espere ...
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
