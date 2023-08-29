<template>
    <div class="col col-lg-10">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Ventas - Crear Venta</div>
                <div class="btn-group ml-auto" role="group" aria-label="Basic example">
                    <button class="btn btn-danger ml-auto" @click="cancelarVenta" v-if="clienteSeleccionado">Cancelar <i
                            class="bi bi-trash"></i></button>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese los datos solicitados</h5>
                <div class="row card-text">
                    <div class="container">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="input1"><i class="bi bi-search"></i></span>
                            <input type="text" class="form-control"
                                placeholder="Ingrese identificacion de cliente para continuar" v-model="search" />
                        </div>
                        <div v-if="!clienteSeleccionado">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Error</strong> Seleccione un cliente para continuar.
                            </div>
                        </div>
                        <div v-if="data.length > 0 && !clienteSeleccionado">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="element in data" :key="element.id"
                                    @click="selectClient(element)">{{ element.identificacion }} - {{ element.nombre }}
                                    {{ element.apellido }}</li>
                            </ul>
                        </div>
                        <div v-if="clienteSeleccionado">
                            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                <strong>{{ cart.client.identificacion }}</strong> {{ cart.client.nombre }} {{
                                    cart.client.apellido }} fue seleccionado
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                    @click="cart.removeClient"></button>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <VentaContainer />
                                </div>
                                <div class="col">
                                    <CartContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useVendorStore } from "@/stores/vendor.store";
import { filterClientByID } from "@/apis/origins/personas.origins";
import VentaContainer from "@/components/containers/Ventas/VentaContainer.vue";
import CartContainer from "@/components/containers/Ventas/CartContainer.vue";
import { userIsNotLogged } from "@/validators/login.validator";
import { deleteThisVendor } from "@/apis/origins/operaciones.origins";

const cart = useVendorStore()
const search = ref('')
const data = ref([])
const clienteSeleccionado = ref(false)
const searchClient = async (id) => {
    const response = await filterClientByID(id)
    data.value = response.data
}


const selectClient = (element) => {
    cart.addClient(element)
    data.value = []
    clienteSeleccionado.value = true
}
const cancelarVenta = () => {
    deleteThisVendor(cart.client.identificacion)
    cart.clearCart()
    clienteSeleccionado.value = false
}
watchEffect(() => {
    userIsNotLogged()
    if (search.value != '') {
        searchClient(search.value)
    }
    else {
        search.value = []
        clienteSeleccionado.value = false
    }
})
</script>