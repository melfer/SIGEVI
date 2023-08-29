<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                Editar detalles - Categoria {{ data.nombre }}
            </div>
            <div class="card-body">
                <h5 class="card-title">Actualice los datos de la Categoria</h5>
                <p class="card-text">
                <form @submit.prevent="updateResource">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="input1">Nombre</span>
                        <input type="text" class="form-control" v-model="name" />
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-primary" :disabled="!notEmptyName">Guardar</button>
                        <RouterLink :to="{ name: 'categorias-details', params: { id: url.currentRoute.value.params.id } }"
                            type="button" class="btn btn-secondary">Atrás</RouterLink>
                    </div>
                </form>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { findCategoryByID, updateCategoryByID } from '@/apis/origins/gestion.origins';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const data = ref([])
const name = ref('')
const notEmptyName = ref(false)
onMounted(async () => {
    new Promise((resolve, reject) => {
        findCategoryByID(url.currentRoute.value.params.id)
            .then((response) => {
                data.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unathorized' })
                }
                else if (error.response.data === 404) {
                    url.push({ name: 'not-found' })
                }
                else {
                    url.push({ name: 'server-error' })
                }
            })
    })
})

watchEffect(() => {
    if (name.value.length !== 0) { notEmptyName.value = true }
    else { notEmptyName.value = false }
})

const updateResource = async () => {
    const data = {
        nombre: name.value
    }
    new Promise((resolve, reject) => {
        updateCategoryByID(url.currentRoute.value.params.id, data)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Transacción Exitosa',
                    text: 'La actualización se realizó satisfactoriamente',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
                url.push({ name: 'categorias-details', params: { id: url.currentRoute.value.params.id } })
            })
    })
}
</script>