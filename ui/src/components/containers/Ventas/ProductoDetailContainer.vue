<template>
    <div class="alert alert-secondary alert-dismissible fade show" role="alert">
        <div align="right">
            <div class="btn-group mb-0" role="group" aria-label="Basic example">
                <button type="button" :class="{ 'btn btn-warning': !checked, 'btn btn-secondary': checked }" @click="checked = !checked">Editar <i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">Remover <i class="bi bi-x"></i></button>
            </div>
        </div>
        <strong>{{props.producto.producto.nombre }}</strong>
        <div>Cantidad: {{ props.producto.cantidad }}</div>
        <div>Subtotal $ {{ props.producto.subtotal }} COP</div>
        <div>Precio unitario: $ {{ props.precio_unitario}} COP</div>
        <form @submit.prevent="update" v-if="checked">
            <div class="input-group mb-3">
              <span class="input-group-text" id="input1">Ingrese nueva cantidad</span>
              <input
                type="numbre"
                class="form-control"
                placeholder="Ingrese nueva cantidad"
                aria-label="Username"
                aria-describedby="input1"
                v-model="cantidad"
              />
            </div>
            <button type="submit" class="btn btn-success" :disabled="cantidad.value > 0">Actualizar cantidad</button>
        </form>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue'
import { updateProductInVendor, deleteProductInVendor } from '@/apis/origins/operaciones.origins'
import { useRouter } from 'vue-router'
const emits = defineEmits(['actualizar'])
const url = useRouter()
const cantidad = ref(1)
const checked = ref(false)
const props = defineProps({
    producto: {
        type: Object,
        require: true
    },
    precio_unitario: {
        type: Number,
        require: true
    }
})

const update = async() => {
    if (cantidad.value == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La cantidad debe ser mayor a 0, si desea eliminar el producto, presione el botón remover',
            confirmButtonText: 'Entendido'
        })
    }
    else {
        const data = {
            producto: props.producto.id,
            cantidad: cantidad.value,
            subtotal: (cantidad.value * props.precio_unitario),
            venta: props.producto.venta
        }
        const response = await updateProductInVendor(url.currentRoute.value.params.id, data)
        if (response.status == 201) {
            Swal.fire({
                icon: 'success',
                title: 'Producto actualizado',
                text: 'El producto ha sido actualizado correctamente',
                confirmButtonText: 'Entendido'
            })
            checked.value = false
            emits('actualizar')

        }
    }
}
const deleteProduct = async () => {
    Swal.fire({
        title: `¿Está seguro de eliminar este producto de la venta?`,
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProductInVendor(props.producto.id)
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado de la venta.',
                'success'
            )
            emits('actualizar')
        }
    })
}
</script>