<template>
    <div class="container-fluid">
            <div class="input-group mb-3">
                <span class="input-group-text" id="input1"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" placeholder="ingrese nombre de producto a buscar" v-model="search" />
            </div>
            <div v-for="element in data" v-if="data.length">
          <form @submit.prevent="add2cart(element)">

            <div :class="{ 'alert': true, 'alert-secondary': true, 'alert-dismissible': true, 'fade': true, 'show': true, 'alert-warning': element.cantidad < 10 && element.cantidad >= 1, 'alert-danger': element.cantidad === 0 }"
              role="alert">
              <div class="row">
                <div class="col">
                  <p>Producto: <strong>{{ element.nombre }}</strong></p>
                  <p>Existen: {{ element.cantidad }} {{ element.unidad }} disponibles</p>
                  <p>Ref. {{ element.referencia[0].categoria }} - {{ element.referencia[0].marca }}</p>
                </div>
                <div class="col">
                  <div v-if="element.cantidad === 0" class="text-center">
                    <h1 class="display-1 my-2" style="font-size: 5rem;"><i class="bi bi-x-square"></i></h1>
                    <h6>No hay unidades disponibles</h6>
                  </div>
                  <div v-else>
                    <div v-if="element.cantidad <= 10 && element.cantidad >= 1" class="text-center">
                      <h6>Se está agotando el producto</h6>
                      <h1 class="display-1 my-2" style="font-size: 5rem;"><i class="bi bi-exclamation-square"></i></h1>
                    </div>
                    <div v-else class="text-center">
                      <h6>Suficientes existencias en stock</h6>
                      <h1 class="display-1 my-2" style="font-size: 5rem;"><i class="bi bi-check-square"></i></h1>
                    </div>
                  </div>

                </div>
              </div>
              <div class="input-group mb-3" v-if="element.cantidad != 0">
                <span class="input-group-text" id="input1"><i class="bi bi-123"></i></span>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Cantidad a solicitar, ej: 10"
                  v-model="cantidad"
                />
              </div>
              <button class="btn btn-success" :disabled="element.cantidad == 0 || element.cantidad < cantidad || cantidad == ''">Añadir</button>
            </div>
          </form>
        </div>

        </div>
</template>
<script setup>
import CartContainer from './CartContainer.vue';
import { ref, watchEffect } from 'vue'
import { useVendorStore } from '@/stores/vendor.store'
import { findProductByName } from '@/apis/origins/gestion.origins'
import { useRoute } from 'vue-router'
const url = useRoute()
const cart = useVendorStore()
const search = ref('')
const data = ref([])
const cantidad = ref('')
const filterProducts = async (search) => {
  const response = await findProductByName(search)
  data.value = response.data
}

const add2cart = (product) => {
  cart.addItem(product, cantidad.value)
}

watchEffect(() => {
    if (search.value != '' || search.value != ' ') {
        filterProducts(search.value)
    }
    else {
        data.value = []
    }
})


</script>