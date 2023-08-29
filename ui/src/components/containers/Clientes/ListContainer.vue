<template>
    <div class="card">

        <div class="card-body">
            <h5 class="card-title">{{ props.cliente.identificacion }} - {{ props.cliente.nombre }}
                {{ props.cliente.apellido }}
            </h5>
            <p class="card-text" v-if="props.cliente.esFrecuente">Cliente Frecuente <i class="bi bi-award"></i></p>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <RouterLink :to="{ name: 'clientes-detail', params: { id: props.cliente.identificacion } }" type="button"
                        class="btn btn-info"><i class="bi bi-search"></i></RouterLink>
                <button type="button" class="btn btn-danger" @click="deleteRow"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { deleteClient } from '@/apis/origins/personas.origins';
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
            deleteClient(props.cliente.identificacion)
            Swal.fire(
                'Eliminado!',
                'El cliente ha sido eliminado.',
                'success'
            )
            emitToDelete('eliminar', props.cliente.identificacion)
        }
    })
}
const props = defineProps({
    cliente: {
        type: Object,
        required: true
    }

})

</script>