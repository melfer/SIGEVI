<template>
    <form @submit.prevent="updateRegistry">
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Nombre</span>
            <input type="text" class="form-control" v-model="nombre" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Apellido</span>
            <input type="text" class="form-control" v-model="apellido" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Direccion</span>
            <input type="text" class="form-control" v-model="direccion" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Telefono</span>
            <input type="text" class="form-control" v-model="telefono" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Correo</span>
            <input type="email" class="form-control" v-model="correo" />
        </div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="submit" class="btn btn-warning">Actualizar</button>
                <button type="button" class="btn btn-secondary" @click="url.push({ name: 'clientes-detail', params: { id: url.currentRoute.value.params.id } })">Atrás</button>
                                                      
            </div>
    </form>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { updateClient } from '@/apis/origins/personas.origins'
import {errorValidator} from "@/validators/error.validator";
const url = useRouter()
const nombre = ref('')
const apellido = ref('')
const direccion = ref('')
const telefono = ref('')
const correo = ref('')


const updateRegistry = async () => {
    if (nombre.value === '') {
        nombre.value = props.cliente.nombre
    }
    if (apellido.value === '') {
        apellido.value = props.cliente.apellido
    } if (direccion.value === '') {
        direccion.value = props.cliente.direccion
    }
    if (telefono.value === '') {
        telefono.value = props.cliente.telefono
    }
    if (correo.value === '') {
        correo.value = props.cliente.correo
    }
    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        telefono: telefono.value,
        correo: correo.value
    }
    await updateClient(props.cliente.identificacion, data)
        .then((Response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Registro Actualizado',
            text: 'El registro ha sido actualizado con exito',
            showConfirmButton: false,
            timer: 1500
        })
        url.push({ name: 'clientes-detail', params: { id: url.currentRoute.value.params.identificacion } })

        })
        .catch((error)=>{
          const resiever = errorValidator(error.response.data)

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: resiever,
            showConfirmButton: false,
            timer: 1500
        })
    })
}

const props = defineProps({
    cliente: {
        type: Object,
        required: true
    }

})


</script>