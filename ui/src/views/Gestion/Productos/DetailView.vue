<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Producto - {{ data.nombre }} </div>
                <div class="btn-group " role="group" aria-label="Basic example">
                    <RouterLink :to="{ name: 'productos-update', params: { id: data.id } }" type="button"
                        class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
                    <button type="button" class="btn btn-danger" @click="eliminarProducto(data.id)">Eliminar <i
                            class="bi bi-trash"></i></button>
                    <RouterLink :to="{ name: 'productos' }" type="button" class="btn btn-secondary">Atrás <i
                            class="bi bi-arrow-left"></i></RouterLink>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">Producto: <strong>{{ data.nombre }}</strong></h5>
                <p class="card-text">
                <p><strong>Referencia: </strong> {{ data.referencia[0].marca }} - {{ data.referencia[0].categoria }}</p>

                <div v-if="data.cantidad > 1">
                    <p>Cantidad: {{ data.cantidad }} {{ data.unidad }}</p>
                </div>
                <div v-else>
                    <p>Cantidad: No existen unidades de este producto</p>
                </div>
               <p>Proveedor: {{ data.proveedor ? (data.proveedor[0].nit + data.proveedor[0].nombre) : 'No hay datos que mostrar' }}</p>
                <p>Precio de Venta: ${{ data.precio_compra }} COP</p>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getProductById, deleteProductById } from '@/apis/origins/gestion.origins'
import Swal from 'sweetalert2'
const url = useRouter()
const data = ref([])
onBeforeMount(async () => {
    const response = await getProductById(url.currentRoute.value.params.id)
    data.value = response.data
    console.log(response.data)
})

const eliminarProducto = async (id) => {
    Swal.fire({
        icon: 'question',
        title: '¿Está Seguro?',
        text: 'No podrá revertir esta acción',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await deleteProductById(id)
            if (response.status === 204) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
                url.push({ name: 'productos' })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Eliminar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    })
}
</script>