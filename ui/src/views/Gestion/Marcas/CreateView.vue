<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                    <div class="text-center flex-grow-1 mb-0">Marcas - Crear marca</div>
                    <RouterLink :to="{ name: 'marcas' }" class="btn btn-secondary ml-auto">Atrás <i class="bi bi-arrow-left"></i></RouterLink>
                </div>
            <div class="card-body">
                <h5 class="card-title">Formulario de creación de marcas</h5>
                <p class="card-text">
                <form @submit.prevent="saveData">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="input1">Nombre de la Marca</span>
                        <input type="text" class="form-control" v-model="nombre" aria-describedby="input1" />
                    </div>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="!validateName">
                        El campo Nombre no debe estar vacío
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-success" :disabled="!validateName">Guardar</button>
                    </div>
                </form>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { createBrand } from '@/apis/origins/gestion.origins'
import { useRouter } from 'vue-router'
import { checkName } from '@/validators/default.validator'
import Swal from 'sweetalert2'
const nombre = ref('')
const url = useRouter()
const validateName = ref(false)
watchEffect(() => {
    validateName.value = checkName(nombre.value)
})

const saveData = async () => {
    new Promise((reject, resolve) => {
        createBrand({ nombre: nombre.value })
            .then((response) => {
                Swal.fire({
                    title: 'Marca creada',
                    text: 'La marca se ha creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                url.push({ name: 'marcas' })
            })
            .catch((error) => {
                if (error.response.data.status === 401) {
                    url.push({ name: 'unauthorized' })
                }
                else if (error.response.data.status === 404) {
                    url.push({ name: 'not-found' })
                }
                else if (error.response.data.status === 500) {
                    url.push({ name: 'server-error' })
                }
                else {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: JSON.stringify(error.response.data)
                    })
                }

            })
    })
}

</script>