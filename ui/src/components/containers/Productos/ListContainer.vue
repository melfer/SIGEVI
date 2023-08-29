<template>
    <hr style="display: none;">
    <div :class="{ 'alert': true, 'alert-secondary': true, 'alert-dismissible': true, 'fade': true, 'show': true, 'alert-warning': props.data.cantidad < 10 && props.data.cantidad >= 1, 'alert-danger': props.data.cantidad === 0 }"
        role="alert">
        <div class="row">
            <div class="col">
                <p>Producto: <strong>{{ props.data.nombre }}</strong></p>
                <p>Existen: {{ props.data.cantidad }} {{ props.data.unidad }} disponibles</p>
            </div>
            <div class="col">
                <div v-if="props.data.cantidad === 0" class="text-center">
                    <h1 class="display-1 my-2" style="font-size: 5rem;"><i class="bi bi-x-square"></i></h1>
                    <h6>No hay unidades disponibles</h6>
                </div>
                <div v-else>
                    <div v-if="props.data.cantidad <= 10 && props.data.cantidad >= 1" class="text-center">
                        <h6>Se está agotando el producto</h6>
                        <h1 class="display-1 my-2" style="font-size: 5rem;"><i class="bi bi-exclamation-square"></i></h1>
                    </div>
                </div>

            </div>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{
                name: 'productos-detail', params: {
                    id: props.data.id
                }
            }" type="button" class="btn btn-primary">Ver <i class="bi bi-search"></i></RouterLink>
        </div>
    </div>
</template>

<script setup>
const emitToDelete = defineEmits(['eliminar'])

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

</script>