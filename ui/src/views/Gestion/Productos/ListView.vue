<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Productos</div>
                <RouterLink :to="{ name: 'productos-create' }" class="btn btn-success ml-auto">Nuevo <i
                        class="bi bi-plus"></i>
                </RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title">Productos disponibles en inventario</h5>
                <p class="card-text">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Buscar producto" v-model="search">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                    </div>
                </div>
                <div v-if="loading" align="center">
                    <div class="spinner-border" role="status"></div>
                    Espere un momento...
                </div>
                <div v-else>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="!data.length">
                        <strong>404</strong> No hay registros que mostrar. Añada uno para empezar.
                    </div>
                    <div v-else>
                        <div v-for="element in data" :key="element.id">
                            <ListContainer :data="element" @eliminar="eliminarProducto" />
                        </div>
                    </div>
                </div>

                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { getAllProducts, findProductByName } from '@/apis/origins/gestion.origins'
import ListContainer from '@/components/containers/Productos/ListContainer.vue'
import { useRouter } from 'vue-router'
const url = useRouter()
const data = ref([])
const loading = ref(false)
const search = ref('')



const findAllProducts = async () => {
    loading.value = true
    new Promise((resolve, reject) => {
        getAllProducts()
            .then((response) => {
                data.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.status === 404) {
                    data.value = []
                }
            })
            .finally(() => {
                loading.value = false
            })
    })

}

const findProduct = async () => {
    loading.value = true
    await findProductByName(search.value)
        .then((Response) => {
            data.value = Response.data
        })
        .catch((error) => {
            data.value = []
        }).finally(() => {
            loading.value = false
        })
}

const eliminarProducto = (id) => {
    data.value = data.value.filter((element) => element.id !== id)
}

watchEffect(() => {
    search.value ? findProduct() : findAllProducts()
})

</script>