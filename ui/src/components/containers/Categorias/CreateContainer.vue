<template>
    <form @submit.prevent="saveData">
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Nombre de la Categoría</span>
            <input type="text" class="form-control" placeholder="Ej. Pinturas" aria-label="Username"
                aria-describedby="input1" v-model="category" />
        </div>
        <button type="submit" class="btn btn-success" :disabled="!checkVar"> Guardar <i class="bi bi-check"></i></button>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { checkName } from '@/validators/default.validator'
import Swal from 'sweetalert2';
import { saveCategory } from '@/apis/origins/gestion.origins'
const category = ref('')
const url = useRouter()
const checkVar = ref(true)
watchEffect(() => {
    checkVar.value = checkName(category.value)
})

const saveData = async () => {
    if (checkVar.value) {
        const response = await saveCategory({ nombre: category.value })
        console.log(response.status)
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Operación Exitosa',
                text: 'El registro se ha añadido correctamente'
            })
            url.push({ name: 'categorias' })
        }
        else if (response.status === 500) {
            url.push({ name: 'server-error' })
        }
        else if (response.status === 401 || response.status === 403) {
            url.push({ name: 'unauthorized' })
        }
        else {
            url.push({ name: 'not-found' })
        }
    }
}
</script>