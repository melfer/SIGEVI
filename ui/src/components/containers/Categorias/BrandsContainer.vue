<template>
    <div v-if="brands.length > 0">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Opcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in brands" :key="brands.id">
                    <th scope="row">{{ row.id }}</th>
                    <td>{{ row.marca }}</td>
                    <td><button type="button" class="btn btn-danger" @click="deleteRow(row.id)"><i
                                class="bi bi-trash"></i></button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>404</strong> No hay registros conexos a esta consulta.
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deleteBrandByCategory } from '@/apis/origins/gestion.origins'
import Swal from 'sweetalert2'
const url = useRouter()
const emitToDelete = defineEmits(['eliminar'])

const deleteRow = (id) => {
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
            deleteBrandByCategory(url.currentRoute.value.params.id, id)
                .then((response) => {
                    Swal.fire(
                        'Eliminado!',
                        'El registro ha sido eliminado.',
                        'success'
                    )
                    emitToDelete('eliminar', id)
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