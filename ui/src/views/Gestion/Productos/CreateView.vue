<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Productos - <strong>Crear Nuevo</strong></div>
                <RouterLink :to="{ name: 'productos' }" class="btn btn-secondary ml-auto">Atrás <i
                        class="bi bi-arrow-left"></i></RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos solicitados</h5>
                <p class="card-text">
                    <CreateContainer />
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import CreateContainer from '@/components/containers/Productos/CreateContainer.vue';

</script>