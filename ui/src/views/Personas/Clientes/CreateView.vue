<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                    <div class="text-center flex-grow-1 mb-0">Clientes - Nuevo cliente</div>
                    <RouterLink :to="{ name: 'clientes' }" class="btn btn-secondary ml-auto">Atrás <i class="bi bi-arrow-left"></i></RouterLink>
                </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos solicitados</h5>
                <CreateContainer />
            </div>
        </div>
    </div>
</template>

<script setup>
import CreateContainer from '@/components/containers/Clientes/CreateContainer.vue';
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
</script>