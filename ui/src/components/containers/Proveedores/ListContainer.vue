<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ props.provider.NIT }} - {{ props.provider.razonSocial }}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
                <RouterLink :to="{ name: 'proveedores-detail', params: { id: props.provider.NIT } }" type="button"
                    class="btn btn-info"><i class="bi bi-search"></i></RouterLink>
                <button type="button" class="btn btn-danger" @click="deleteRow"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { deleteProvider } from '@/apis/origins/personas.origins';
const emitToDelete = defineEmits(['eliminar'])


const deleteRow = () => {
    Swal.fire({
        title: '¿Está seguro?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProvider(props.provider.NIT)
            Swal.fire(
                'Eliminado!',
                'El proveedor ha sido eliminado.',
                'success'
            )
            emitToDelete('eliminar', props.provider.NIT)
        }
    })
}
const props = defineProps({
    provider: {
        type: Object,
        required: true
    }
})
</script>