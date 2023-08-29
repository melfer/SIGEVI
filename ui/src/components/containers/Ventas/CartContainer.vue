<template>
    <h3>Detalles de venta</h3>
    <p><h2><strong>Total : $ {{ cart.total }}</strong></h2>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" :disabled="cart.disableProcess" @click="procesar">Procesar <i
                class="bi bi-check-square"></i></button>
        <button type="button" class="btn btn-danger" @click="vaciarCarrito">Cancelar <i class="bi bi-cart-x"></i></button>
    </div>
    </p>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">item</th>
                <th scope="col">Precio unitario</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in cart.item" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.name }}</td>
                <td>${{ item.precio }}</td>
                <td>{{ item.cantidad }}</td>
                <td>${{ item.subtotal }}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" @click="cart.incrementQuantity(item)"><i
                                class="bi bi-bag-plus"></i></button>
                        <button type="button" class="btn btn-warning" @click="cart.decrementQuantity(item)"
                            :disabled="item.cantidad == 1"><i class="bi bi-bag-dash"></i></button>
                        <button type="button" class="btn btn-danger" @click="cart.removeItem(item)"><i
                                class="bi bi-bag-x"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useVendorStore } from "@/stores/vendor.store";
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import {getLastVendor} from '@/apis/origins/operaciones.origins'
const url = useRouter()
const disableProcess = ref(false)
const cart = useVendorStore()
watchEffect(() => {
    disableProcess.value = cart.disableProcess
})

const vaciarCarrito = () =>{
    cart.clearCart()
}


const procesar = async () => {
    if(cart.item.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito',
        })
    }
    else {
        cart.saveCart()
        Swal.fire({
            title: 'Venta procesada',
            text: 'La Venta se ha procesado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        const response = await getLastVendor()
        cart.clearCart()
        url.push({name:'ventas-detail',params:{id:response.data.id}})
    }
}


</script>