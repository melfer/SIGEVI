<template>
    <div class="col col-lg-6">
        <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <div class="text-center flex-grow-1 mb-0">Categorías</div>
                        <RouterLink :to="{ name: 'categorias-create' }" class="btn btn-success">Añadir <i class="bi bi-plus"></i></RouterLink>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Listado de categorías</h5>
                    <p class="card-text">
                        <div class="input-group mb-3">
                              <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Ingrese nombre de la categoria a buscar"
                                aria-label="Username"
                                v-model="search"
                              />
                            </div>
                        <!--Animación de carga-->
                    <div v-if="loading" align="center">
                        <div class="spinner-border" role="status"></div>
                        Espere un momento...
                    </div>
                    <div v-else>
                        <!--Mensaje sino hay datos-->
                        <div v-if="!categories.length">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>404 </strong>No hay registros. Añada uno para empezar.
                            </div>
                        </div>
                        <!--Renderizado de datos-->
                        <div v-else>
                            <div v-for="row in categories " :key="row.id">
                                <ListContainer :categories="row" @eliminar="eliminarCategoria" />
                            </div>
                    </div>
                </div>
                <!--Fin animación de carga-->
                </p>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { getAllCategories,findCategoryByName } from '@/apis/origins/gestion.origins'
import ListContainer from '@/components/containers/Categorias/ListContainer.vue';
import { userIsNotLogged } from '../../../validators/login.validator';
const url = useRouter()
const loading = ref(false)
const categories = ref([])
const search = ref('')



const getData = async () => {
    new Promise((resolve, reject) => {
        loading.value = true
        getAllCategories()
            .then((response) => {
                categories.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.status === 404) {
                    url.push({ name: 'not-found' })
                }
                if (error.response.status === 500) {
                    url.push({ name: 'server-error' })
                }
            })
            .finally(() => {
                loading.value = false
            })
    })
}

const searchData = async () => {
    loading.value = true
    
       await findCategoryByName(search.value)

    .then((response) => {
            categories.value = response.data
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.response.status)
            categories.value = []
            if (error.response.status === 401 || error.response.status === 403) {
                url.push({ name: 'unauthorized' })
            }
            else if (error.response.status === 404) {
                url.push({ name: 'not-found' })
            }
            else if (error.response.status === 500) {
                url.push({ name: 'server-error' })
            }
        })
        .finally(() => {
            loading.value = false
        })
}

const eliminarCategoria = (id) => {
    categories.value = categories.value.filter((element) => element.id !== id)
}

watchEffect(() => {
    userIsNotLogged()
    search.value ? searchData() : getData()
})

</script>
