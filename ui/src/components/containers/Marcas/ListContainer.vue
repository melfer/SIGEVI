<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ props.brands.nombre }}</h5>
            <p class="card-text">registro creado por {{ props.brands.created_by }}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
                <RouterLink :to="{ name: 'marcas-edit', params: { id: props.brands.id } }" type="button"
                    class="btn btn-warning"><i class="bi bi-pencil"></i></RouterLink>
                <button type="button" class="btn btn-danger" @click="deleteRow"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'
import { deleteBrandById } from '@/apis/origins/gestion.origins'
const emitToDelete = defineEmits(['eliminar'])
const deleteRow = () => {
    Swal.fire({
        title: '¿Está seguro de eliminar este registro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteBrandById(props.brands.id)
                .then((response) => {
                    Swal.fire(
                        'Eliminado!',
                        'El registro ha sido eliminado.',
                        'success'
                    )
                    emitToDelete('eliminar', props.brands.id)
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        JSON.stringify(error.response.data.detail),
                        'error'
                    )
                })
        }
    })
}

const props = defineProps({
    brands: {
        type: Object,
        require: true
    }
})
</script>