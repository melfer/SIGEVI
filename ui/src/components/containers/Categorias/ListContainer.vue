<template>
    <div class="card">

        <div class="card-body">
            <div class="row">
                <div class="col col-lg-8">
                        <h6>{{ props.categories.id }} - {{ props.categories.nombre }}</h6>
                </div>
                <div class="col col-lg-3">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <RouterLink :to="{ name: 'categorias-details', params: { id: props.categories.id } }" type="button"
                            class="btn btn-primary">Explorar <i class="bi bi-search"></i></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr style="color:white">
</template>

<script setup>
const emitToDelete = defineEmits(['eliminar'])

const props = defineProps({
    categories: {
        type: Object,
        required: true
    }
})
</script>