<template>
    <div class="col col-lg-8">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Categoría - <strong>{{ queryset.nombre }}</strong></div>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <RouterLink :to="{ name: 'categorias-edit', params: { id: url.currentRoute.value.params.id } }"
                        class="btn btn-warning ml-auto"><i class="bi bi-pencil"></i></RouterLink>
                    <button class="btn btn-danger" @click="deleteResource"><i class="bi bi-trash"></i></button>
                    <RouterLink :to="{ name: 'categorias' }" class="btn btn-secondary"><i class="bi bi-arrow-left"></i>
                    </RouterLink>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">Marcas pertenecientes a la categoria <RouterLink
                        :to="{ name: 'categorias-addBrand', params: { id: url.currentRoute.value.params.id } }"
                        class="btn btn-success">Añadir</RouterLink>
                </h5>
                <p class="card-text">
                <div v-if="loading" align="center">
                    <div class="spinner-border" role="status"></div>
                    Espere un momento...
                </div>
                <div v-else>
                    <BrandsContainer :brands="brands" @eliminar="eliminarRegistro" />
                </div>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { findCategoryByID, getBrandsByCategory, deleteCategoryByID } from '@/apis/origins/gestion.origins'
import Swal from 'sweetalert2'
import BrandsContainer from '@/components/containers/Categorias/BrandsContainer.vue'
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const queryset = ref([])
const brands = ref([])
const loading = ref(false)
onMounted(() => {

    getCategoryData()
    getBrandsForThisCategory()

})
const getCategoryData = async () => {
    new Promise((resolve, reject) => {
        findCategoryByID(url.currentRoute.value.params.id)
            .then((response) => {
                queryset.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unathorized' })
                }
                else if (error.status == 404) {
                    url.push({ name: 'not-found' })
                }
                else {
                    url.push({ name: 'server-error' })
                }
            })
    })
}

const getBrandsForThisCategory = () => {
    new Promise((resolve, reject) => {
        getBrandsByCategory(url.currentRoute.value.params.id)
            .then((response) => {
                brands.value = response.data
            })
    })
}

const deleteResource = async () => {
    new Promise((resolve, reject) => {
        deleteCategoryByID(url.currentRoute.value.params.id)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'Registro eliminado correctamente'
                })
                url.push({ name: 'categorias' })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    text: 'Error',
                    text: JSON.stringify(error.response.data.detail)
                })
                url.push({ name: 'categorias' })
            })
    })
}

const eliminarRegistro = (id) => {
    brands.value = brands.value.filter((element) => element.id !== id)
}
</script>