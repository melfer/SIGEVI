<template>
    <div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <strong>Venta: {{ props.venta.id }}</strong> 
      <p>
        <div>
            A nombre de: {{ props.venta.cliente[0].id }} - {{ props.venta.cliente[0].nombre }} {{ props.venta.cliente[0].apellido }}
        </div>
        <div>
            Por valor de ${{ props.venta.total }}
        </div>
      </p>
      <hr>
      <p>
        <div>
            Hecha por {{ props.venta.created_by }}
        </div>
        <div>
            Procesada el {{ props.venta.date_joined }}
        </div> 
      </p>
      <div class="btn-group" role="group" aria-label="Basic example">
        <RouterLink :to="{name:'ventas-detail',params:{id:props.venta.id}}" type="button" class="btn btn-info">Ver <i class="bi bi-search"></i></RouterLink>
          <button type="button" class="btn btn-danger" @click="anular(props.venta.id)">Anular <i class="bi bi-trash"></i></button>
      </div>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2'
import { deleteThisVendor } from '@/apis/origins/operaciones.origins'
const emitToDelete = defineEmits(['eliminar'])

const anular = async (id) => {
  Swal.fire({
    title: `¿Está seguro de anular esta venta con id ${id}?`,
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, anular'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteThisVendor(id)
      emitToDelete('eliminar', id)
      Swal.fire(
        'Anulada!',
        'La venta ha sido anulada.',
        'success'
      )
    }
  })
}



const props = defineProps({
    venta: {
        type: Object,
        required: true
    }
})
</script>