<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                Marca {{ data.nombre }}
            </div>
            <div class="card-body">
                <h5 class="card-title">Ingrese datos a actualizar</h5>
                <p class="card-text">
                <form @submit.prevent="updateRegistry">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="input1">Nombre</span>
                        <input type="text" class="form-control" v-model="nombre" aria-describedby="input1" />
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-success">Actualizar</button>
                        <RouterLink :to="{ name: 'marcas' }" type="button" class="btn btn-secondary">Atrás</RouterLink>
                    </div>
                </form>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { getBrandById, updateBrandByID } from '@/apis/origins/gestion.origins'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
const url = useRouter()
const nombre = ref('')
const data = ref([])
onBeforeMount(() => {
    getBrand()
})

const getBrand = async () => {
    new Promise((resolve, reject) => {
        getBrandById(url.currentRoute.value.params.id)
            .then((response) => {
                data.value = response.data
            })
            .catch((error) => {
                if (error.response.data.status === 401) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.data.status === 404) {
                    url.push({ name: 'not-found' })
                }
                if (error.response.data.status === 500) {
                    url.push({ name: 'server-error' })
                }
            })
    })
}

const updateRegistry = async () => {
    new Promise((resolve, reject) => {
        updateBrandByID(url.currentRoute.value.params.id, { nombre: nombre.value })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Marca actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                url.push({ name: 'marcas' })
            })

    })
}

</script>