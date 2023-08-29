<template>
  <div class="col col-lg-10">
    <div class="card">
      <div class="card-header d-flex align-items-center">
        <div class="text-center flex-grow-1 mb-0">Productos - Actualizar Producto </div>
        <RouterLink :to="{ name: 'productos-detail', params: { id: url.currentRoute.value.params.id } }"
          class="btn btn-secondary ml-auto">Atrás <i class="bi bi-arrow-left"></i>
        </RouterLink>
      </div>
      <div class="card-body">
        <h5 class="card-title">Ingrese los datos a Actualizar</h5>
        <p class="card-text">
        <div class="row">
          <!--Datos en sistema-->
          <div class="col col-lg-4">
            <div>Nombre: {{ data.nombre }}</div>
            <div>Cantidad: {{ data.cantidad }} {{ data.unidad }}</div>
            <div>Precio: $ {{ data.precio_compra }}</div>
            <div>Referencia: {{ categoria }} - {{ marca }}</div>
          </div>
          <!--Formulario-->
          <div class="col">
            <form @submit.prevent="updateData">
              <!----Nombre del producto-->
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="nombre" v-model="nombre">
                <label for="nombre">Nombre</label>
              </div>
              <!----/Nombre del producto-->
              <!----referencia-->
              <div class="row">
                <!--categoria-->
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="categoria" v-model="category">
                    <label for="categoria">Categoría</label>
                  </div>
                </div>
                <!--/categoria-->
                <!--marca-->
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="categoria" v-model="brand"
                      :disabled="!category | selected">
                    <label for="categoria">Marca</label>
                  </div>
                </div>
                <!--/marca-->
                <!--lista de categorias-->
                <div v-if="categories.length > 0">
                  <ul class="list-group">
                    <div v-for="(item, index) in categories" :key="index">
                      <li class="list-group-item" @click="chooseCategory(item)">
                        {{ item.categoria.nombre }} - {{ item.marca.nombre }}
                      </li>
                    </div>
                  </ul>
                </div>
                <!--/lista de categorias-->
                <!---Ver seleccion-->
                <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="selected">
                  <strong>{{ categorySelected.categoria.nombre }} {{ categorySelected.marca.nombre }}</strong>
                  seleccionado
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="clearSelection"></button>
                </div>
              </div>
              <!----/referencia-->
              <!---Precio y Unidades-->
              <div class="row">
                <!--precio-->
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="number" class="form-control" v-model="precio">
                    <label for="precio">Precio</label>
                  </div>
                </div>
                <!--/precio-->
                <div class="col">
                  <!---- Unidad de medida-->
                  <div class="form-floating">
                    <select class="form-select" id="floatingSelect" v-model="unidades">
                      <option selected>Seleccione</option>
                      <option value="Unidades">Unidad</option>
                      <option value="Docenas">Docena</option>
                      <option value="Resmas">Resma</option>
                      <option value="Cajas">Caja</option>
                    </select>
                    <label for="floatingSelect">Unidades de Medida</label>
                  </div>
                  <!---- /Unidad de medida-->
                </div>
                <div class="col">
                  <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="cantidad" v-model="cantidad">
                    <label for="cantidad">Cantidad</label>
                  </div>
                </div>
              </div>
              <!---/Precio y Unidades-->
              <!---Proveedor-->
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="proveedor" v-model="proveedor">
                <label for="proveedor">Proveedor</label>
              </div>
              <div v-if="providers">
                <ul class="list-group">
                  <div v-for="item in providers" :key="item.NIT">
                    <li class="list-group-item" @click="chooseProvider(item)">
                      {{ item.razonSocial }}
                    </li>
                  </div>
                </ul>
              </div>
              <!---Ver seleccion-->
              <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="selected2">
                <strong>{{ providerSelected.NIT }} {{ providerSelected.razonSocial }}</strong> seleccionado
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                  @click="clearProviderSelection"></button>
              </div>
              <!----/Proveedor-->
              <button type="submit" class="btn btn-success">Guardar</button>
            </form>
          </div>
        </div>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { showBrandsOfCategory, showBrandsOfCategoryAdvanced, getProductById, updateProduct } from '@/apis/origins/gestion.origins'
import { findProviderByNIT } from '@/apis/origins/personas.origins'
import Swal from 'sweetalert2'
const url = useRouter()
const data = ref([])
const nombre = ref('')
const marca = ref('')
const categoria = ref('')
const category = ref('')
const brand = ref('')
const categories = ref([])
const categorySelected = ref([])
const selected = ref(false)
const precio = ref(0)
const unidades = ref('')
const proveedor = ref([])
const providerSelected = ref([])
const providers = ref([])
const selected2 = ref(false)
const cantidad = ref(0)
const aux = ref(0)


watchEffect(() => {
  if (category.value != '' && brand.value != '') {
    getCategoriesAdvanced(category.value, brand.value)
  }
  else if (category.value != '') {
    getCategories(category.value)
  }
  else {
    categories.value = []
  }
  if (proveedor.value != '') {
    fetchProviderByNIT(proveedor.value)
  }
  else {
    providers.value = []
  }
})

const getCategories = async (name) => {
  const response = await showBrandsOfCategory(name)
  categories.value = response.data
}

const getCategoriesAdvanced = async (category, brand) => {
  categories.value = []
  const response = await showBrandsOfCategoryAdvanced(category, brand)
  categories.value = response.data
}

const chooseCategory = (item) => {
  console.log(item.id)
  categorySelected.value = item
  aux.value = item.id
  selected.value = true
}

const clearSelection = () => {
  categorySelected.value = []
  selected.value = false
}

const fetchProviderByNIT = async (nit) => {
  const response = await findProviderByNIT(nit)
  providers.value = response.data
}

const chooseProvider = (item) => {
  providerSelected.value = item
  selected2.value = true
}

const clearProviderSelection = () => {
  providerSelected.value = []
  selected2.value = false
}

const updateData = async () => {

  if (nombre.value == '') {
    nombre.value = data.value.nombre
  }
  if (precio.value == 0) {
    precio.value = data.value.precio_compra

  }
  if (cantidad.value == 0) {
    cantidad.value = data.value.cantidad
  }
  const producto = {
    id: data.value.id,
    nombre: nombre.value,
    precio_compra: precio.value,
    cantidad: cantidad.value,
    unidades: unidades.value,
    proveedor: providerSelected.value,
    referencia: categorySelected.value
  }
  const response = await updateProduct(url.currentRoute.value.params.id, producto)
  if (response.status == 200) {
    Swal.fire({
      title: 'Producto actualizado',
      text: 'El producto se ha actualizado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      url.push({ name: 'productos-detail', params: { id: url.currentRoute.value.params.id } })
    })
  }
  else {
    Swal.fire({
      title: 'Error',
      text: error.response.data,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

}

onMounted(async () => {
  const response = await getProductById(url.currentRoute.value.params.id)
  if (response.status === 200) {
    data.value = response.data
    marca.value = response.data.referencia[0].marca
    categoria.value = response.data.referencia[0].categoria
  }
  else if (response.status === 404) {
    url.push({ name: 'unauthorized' })
  }
  else {
    url.push({ name: 'server-error' })
  }
})
</script>