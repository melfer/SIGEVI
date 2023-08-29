<template>
    <div class="col col-lg-10">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <h4 class="text-center flex-grow-1 mb-0">Crear Nueva Cotización</h4>
                <button class="btn btn-danger" type="button" v-if="clienteSeleccionado" @click="cancelar">Cancelar <i class="bi bi-trash"></i></button>
            </div>
            <div class="card-body">
                <div class="row">
                        <div class="input-group mb-3">
                          <span class="input-group-text" id="input1"><i class="bi bi-search"></i></span>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Ingrese identificacion de cliente"
                            v-model="search"
                            required
                          />
                        </div>
                        <div v-if="clientes.length && !clienteSeleccionado">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="item in clientes" :key="item.identificacion" @click="storeClient(item)">{{ item.identificacion }} - {{ item.nombre }} {{ item.apellido }} </li>
                            </ul> 
                        </div>
                        <div v-if="!clienteSeleccionado">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Error!</strong> Seleccione un cliente para empezar a crear la cotización.
                            </div>
                        </div>
                        <div v-if="clienteSeleccionado">
                            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                  <strong>{{ cart.client.identificacion }}</strong> {{ cart.client.nombre }} {{ cart.client.apellido }}
                                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="cart.removeClient"></button>
                                </div>
                        </div>
                    </div>
                    <div class="row" v-if="clienteSeleccionado">
                        <div class="col">
                            <CreateCotizacion />
                        </div>
                        <div class="col">
                            <SellContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import CreateCotizacion from '@/components/containers/Cotizaciones/CreateCotizacion.vue';
import SellContainer from '@/components/containers/Cotizaciones/SellContainer.vue';
import { filterClientByID } from '@/apis/origins/personas.origins'
import { useSellStore } from '@/stores/sell.store';
import { userIsNotLogged } from '../../validators/login.validator';
const cart = useSellStore()
const clientes = ref([])
const search = ref('')
const clienteSeleccionado = ref(false)

const cancelar = () => {
    cart.removeClient()
    cart.clearCart()
}

watchEffect(() => {
    userIsNotLogged()
    if (search.value != '') {
        filterClientByID(search.value).then((res) => {
            clientes.value = res.data
        })
    }
    else {
        clientes.value = []
    }
    if (cart.client != '') {
        clienteSeleccionado.value = true
        search.value = ''
        clientes.value = []
    }
    else {
        clienteSeleccionado.value = false
    }
})

const storeClient = (element) => {
    cart.addClient(element)
}

</script>