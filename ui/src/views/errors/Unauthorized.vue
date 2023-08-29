<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                <strong>Acceso Denegado</strong>
            </div>
            <div class="card-body">
                <h5 class="card-title">401 - No Autorizado</h5>
                <p class="card-text">
                  Es probable que usted vea esta vista por dos motivos:
                  1. Porque no tiene permisos para realizar esta tarea
                  2. Porque la sesión se ha cerrado por inactividad
                  Haga clic en el botón para volver al inicio, reingresar sus credenciales y volver a intentarlo.
                </p>
                <RouterLink :to="{ name: 'home' }" href="#" class="btn btn-primary">Volver al inicio</RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import {sesionStore} from "@/stores/sesion";
import {onMounted} from "vue";
onMounted(()=>{
    sesionStore().clearTokens()
})
</script>