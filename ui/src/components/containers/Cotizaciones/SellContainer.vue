<template>
    <h3>Detalles de cotización</h3>
    <p><h2>Total : $ {{ cart.total }}</h2> <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" :disabled="cart.disableProcess" @click="procesar">Procesar <i class="bi bi-check-square"></i></button>
      <button type="button" class="btn btn-danger" @click="vaciarCarrito">Cancelar <i class="bi bi-cart-x"></i></button>
    </div></p>
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
                        <button type="button" class="btn btn-warning" @click="cart.decrementQuantity(item)" :disabled="item.cantidad ==1"><i
                                class="bi bi-bag-dash"></i></button>
                        <button type="button" class="btn btn-danger" @click="cart.removeItem(item)"><i
                                class="bi bi-bag-x"></i></button>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
</template>

<script setup>
import {ref, watchEffect } from 'vue'
import { useSellStore } from '@/stores/sell.store';
import { useRouter } from 'vue-router'
import {getLastQuota} from '@/apis/origins/operaciones.origins'
import Swal from 'sweetalert2'
const url = useRouter()
const disableProcess = ref(false)
const cart = useSellStore()
watchEffect(() => {
    disableProcess.value = cart.disableProcess
})

const vaciarCarrito = () =>{
    cart.clearCart()
}

const procesar = async () => {
    cart.saveCart()
    Swal.fire({
        title: 'Cotización procesada',
        text: 'La cotización se ha procesado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
    const response = await getLastQuota();
    const id = response.data.id;
    url.push({ name: 'cotizacion-details', params: { id: id } })
    
    
}
</script>