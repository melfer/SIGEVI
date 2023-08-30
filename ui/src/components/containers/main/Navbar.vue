<template>
  <nav class="py-2 bg-light border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item">
          <RouterLink v-if="auth" :to="{ name: 'home' }" aria-current="page"
                      class="nav-link link-dark px-2 active">Home
          </RouterLink>
        </li>
        <li v-if="auth &&sesion.userData?.groups &&(sesion.userData.groups.includes('Cajero' )|| sesion.userData.groups.includes('Administrador') || sesion.userData.groups.includes('Bodeguista'))"
            class="nav-item dropdown">
          <a aria-expanded="false" class="nav-link link-dark px-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"
             role="button">
            Personas
          </a>
          <ul class="dropdown-menu">
            <li>
              <RouterLink :to="{ name: 'clientes' }" class="dropdown-item" v-if=" sesion.userData.groups.includes('Administrador')|| sesion.userData.groups.includes('Cajero')">Clientes</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'proveedores' }" class="dropdown-item" v-if="sesion.userData.groups.includes('Bodeguista')">Proveedores</RouterLink>
            </li>

          </ul>
        </li>
        <li v-if="auth && sesion.userData?.groups && (sesion.userData.groups.includes('Bodeguista') || sesion.userData.groups.includes('Administrador'))"
            class="nav-item dropdown">
          <a aria-expanded="false" class="nav-link link-dark px-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"
             role="button">
            Inventario
          </a>
          <ul class="dropdown-menu">
            <li>
              <RouterLink :to="{ name: 'marcas' }" class="dropdown-item">Marcas</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'categorias' }" class="dropdown-item">Categorías</RouterLink>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <RouterLink :to="{ name: 'productos' }" class="dropdown-item" href="#">Productos</RouterLink>
            </li>
          </ul>
        </li>
        <li v-if="auth &&  sesion.userData?.groups && (sesion.userData.groups.includes('Cajero') || sesion.userData.groups.includes('Administrador'))"
            class="nav-item dropdown">
          <a aria-expanded="false" class="nav-link link-dark px-2 dropdown-toggle" data-bs-toggle="dropdown" href="#"
             role="button">
            Operaciones
          </a>
          <ul class="dropdown-menu">
            <li>
              <RouterLink :to="{ name: 'cotizaciones' }" class="dropdown-item">Cotizaciones</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'ventas' }" class="dropdown-item">Ventas</RouterLink>
            </li>
          </ul>
        </li>

        <li class="nav-item"><a v-if="auth" class="nav-link link-dark px-2" href="#">About</a></li>
      </ul>
      <ul v-if="auth" class="nav">
        <li class="nav-item">
          <p class="nav-link link-dark px-2">Sesion iniciada como: {{ sesion.userData.username }} </p>
        </li>
        <li class="nav-item">
          <button class="nav-link link-dark px-2 btn btn-danger"
                  @click="cerrarSesion">Salir
          </button>
        </li>
      </ul>
      <ul v-else class="nav">
        <li class="nav-item">
          <RouterLink :to="{ name: 'login' }" class="nav-link link-dark px-2">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{name:'register'}" class="nav-link link-dark px-2">Sign up</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <header class="py-3 mb-4 border-bottom">
    <div class="container d-flex flex-wrap justify-content-center">
      <RouterLink :to="{ name: 'home' }"
                  class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">

                <span v-if="auth  " class="fs-4">SIGEVI <i
                    class="bi bi-asterisk"></i> -
                    {{
                    sesion.userData.groups.includes('Cajero', 'Administrador', 'Bodeguista') || sesion.userData.is_superuser || sesion.userData.groups[0] ? (sesion.userData.is_superuser ? 'Super Usuario' : sesion.userData.groups[0]) : 'Invitado'
                  }}
                </span>

        <span v-else class="fs-4">SIGEVI <i class="bi bi-asterisk"></i>
                </span>
      </RouterLink>
      <div class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
        <div class="form-floating mb-3">
          <input id="floatclockingInput" :value="props.dateTime" class="form-control" disabled type="text">
          <label for="floatingclockInput">Fecha y hora <i class="bi bi-watch"></i> </label>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {sesionStore} from '@/stores/sesion';
import Swal from 'sweetalert2'
import {ref, watchEffect} from 'vue'

const sesion = sesionStore()
const auth = ref(false)

watchEffect(() => {
  auth.value = sesion.isAuth
})

const cerrarSesion = () => {
  sesion.clearTokens()
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'La sesión se ha cerrado correctamente',
  })
}

const props = defineProps({
  dateTime: {
    type: String,
    required: true
  }
})

</script>