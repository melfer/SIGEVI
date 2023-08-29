<template>
    <div class="col col-lg-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title" align="center">
                    INICIAR SESION
                </h5>
                <h5 class="card-text" align="center">
                    Ingrese sus credenciales para iniciar sesión.
                </h5>
                <authContainer />
            </div>
        </div>
    </div>
</template>


<script setup>
import authContainer from '@/components/containers/auth/authContainer.vue'
import { onMounted } from 'vue';
import { userIsLogged } from '../../validators/login.validator';
onMounted(()=>{
    userIsLogged()
})
</script>