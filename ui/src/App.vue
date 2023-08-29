<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/containers/main/Navbar.vue';
import { ref, onBeforeMount, watchEffect } from 'vue'
import { sesionStore } from '@/stores/sesion'
import { useRouter } from 'vue-router'
const sesion = sesionStore()
const dateTime = ref('')
const auth = ref(false)
const url = useRouter()
onBeforeMount(() => {
  setInterval(() => {
    dateTime.value = new Date().toLocaleString()
    sesion.setSessionTimer()
  }, 1000)
})
</script>

<template>
  <div @mousemove="sesion.preventLogout">
    <Navbar :dateTime="dateTime" />
    <div class="alert alert-warning" role="alert" v-if="sesion.isAuth && !sesion.userData?.groups">
      Se ha detectado que usted no tiene permisos para realizar tareas. Por favor, contacte al administrador.
    </div>
    <div class="row justify-content-center">
      <RouterView />
    </div>
  </div>
</template>