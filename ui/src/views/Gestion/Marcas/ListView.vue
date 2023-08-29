<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Marcas</div>
                <RouterLink :to="{ name: 'marcas-create' }" class="btn btn-success ml-auto">Nuevo <i class="bi bi-plus"></i>
                </RouterLink>
            </div>
            <div class="card-body">
                <p class="card-text">Marcas disponibles en el sistema</p>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingrese nombre a buscar"
                        aria-label="Buscar Cliente" aria-describedby="button-addon2" v-model="search">
                </div>
                <!--Animación de carga-->
                <div v-if="loading" align="center">
                    <div class="spinner-border" role="status"></div>
                    Espere un momento...
                </div>
                <div v-else>
                    <!--Mensaje sino hay datos-->
                    <div v-if="!brands.length">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>404</strong> No hay registros. Añada uno para empezar.
                        </div>
                    </div>
                    <!--Renderizado de datos-->
                    <div v-else>
                        <div v-for="row in brands " :key="row.id">
                            <ListContainer :brands="row" @eliminar="eliminarMarca" />
                        </div>
                    </div>
                </div>
                <!--Fin animación de carga-->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { getAllBrands, getBrandByName } from '@/apis/origins/gestion.origins'
import ListContainer from '@/components/containers/Marcas/ListContainer.vue';
import { useRouter } from 'vue-router';
const url = useRouter()
const search = ref('')
const loading = ref(false)
const brands = ref([])


const getBrands = async () => {
    new Promise((resolve, reject) => {
        loading.value = true
        getAllBrands()
            .then((response) => {
                brands.value = response.data
            }).catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                else {
                    url.push({ name: 'server-error' })
                }
            })
            .finally(() => {
                loading.value = false
            })
    })
}

const searchBrand = async () => {
    new Promise((resolve, reject) => {
        getBrandByName(search.value)
            .then((response) => {
                brands.value = response.data
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.data.status === 401 || error.response.data.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.data.status === 404) {
                    url.push({ name: 'not-found' })
                }
                if (error.response.data.status === 500) {
                    url.push({ name: 'server-error' })
                }
                brands.value = []

            })
    })
}

const eliminarMarca = (id) => {
    brands.value = brands.value.filter((element) => element.id !== id)
}


watchEffect(() => {
    search.value  ? searchBrand() : getBrands()
})

</script>
