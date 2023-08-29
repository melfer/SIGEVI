<template>
    <div class="col col-lg-9">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Categorías - Añadir Marcas</div>
                <RouterLink :to="{ name: 'categorias-details', params: { id: url.currentRoute.value.params.id } }"
                    class="btn btn-secondary">Atrás<i class="bi bi-arrow-left"></i></RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title" align="center">Seleccione las marcas a añadir en {{ category.nombre }}</h5>
                <!--search bar-->
                <div class="input-group mb-3">
                    <span class="input-group-text" id="input1">Ingrese Marca a buscar</span>
                    <input type="text" class="form-control" placeholder="Ej. Norma" aria-label="Username"
                        aria-describedby="input1" v-model="nombre" />
                </div>
                <!--End search bar-->
                <p class="card-text">
                <div class="row">
                    <div class="col">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Opcion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="element in brands">
                                    <th scope="row">{{ element.id }}</th>
                                    <td>{{ element.nombre }}</td>
                                    <td>
                                        <button class="btn btn-success" @click="store.addToBrands(element)"><i
                                                class="bi bi-arrow-right"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                        <AddBrandsContainer />
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
import { filterBrandsByCategory, filterBrandsOfCategoryByName, findCategoryByID } from '@/apis/origins/gestion.origins'
import AddBrandsContainer from '@/components/containers/Categorias/AddBrandsContainer.vue';
import { useCategoryBrandsStore } from '@/stores/BrandsCategories.store'
import { userIsNotLogged } from '../../../validators/login.validator';
const store = useCategoryBrandsStore()
const url = useRouter()
const brands = ref([])
const category = ref([])
const nombre = ref('')

const getBrandData =async() =>{
   const reponse = await findCategoryByID(url.currentRoute.value.params.id)
   category.value = reponse.data
}

onMounted(async () => {
    watchEffect(() => {
        userIsNotLogged()
        getBrandData()
        if (nombre.value != '') {
            new Promise((reject, resolve) => {
                filterBrandsOfCategoryByName(url.currentRoute.value.params.id, nombre.value)
                    .then((response) => {
                        brands.value = response.data
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
            })
        }
        else {
            new Promise((reject, resolve) => {
                filterBrandsByCategory(url.currentRoute.value.params.id)
                    .then((response) => {
                        brands.value = response.data
                    })
            })
        }
    })
})



</script>