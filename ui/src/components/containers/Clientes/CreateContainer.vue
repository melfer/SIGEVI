<template>
    <form @submit.prevent="saveData">
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Identificación</span>
            <input type="text" class="form-control" v-model="identificacion" />
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckID">
            Identificación no puede estar vacía
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Nombre</span>
            <input type="text" class="form-control" v-model="nombre" />
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckNombre">
            Nombre no puede estar vacío
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Apellido</span>
            <input type="text" class="form-control" v-model="apellido" />
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckApellido">
            Apellido no puede estar vacía
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Dirección</span>
            <input type="text" class="form-control" v-model="direccion" />
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckDireccion">
            Dirección no puede estar vacía
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
            <button type="submit" class="btn btn-success">Guardar</button>
        </div>
    </form>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { saveNewClient } from '@/apis/origins/personas.origins'
import Swal from 'sweetalert2';
import { checkNoEmptyApellido, checkNoEmptyDirección, checkNoEmptyID, checkNoEmptyNombre } from '@/validators/userCreatation.validator';
import { useRouter } from 'vue-router';

const url = useRouter()
const nombre = ref('')
const apellido = ref('')
const identificacion = ref('')
const telefono = ref('')
const direccion = ref('')
const correo = ref('')
const CheckID = ref(false)
const CheckNombre = ref(false)
const CheckApellido = ref(false)
const CheckDireccion = ref(false)

watchEffect(() => {
    CheckNombre.value = checkNoEmptyNombre(nombre.value)
    CheckApellido.value = checkNoEmptyApellido(apellido.value)
    CheckID.value = checkNoEmptyID(identificacion.value)
    CheckDireccion.value = checkNoEmptyDirección(direccion.value)
})

const saveData = async () => {
    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value,
        telefono: telefono.value,
        direccion: direccion.value,
        correo: correo.value
    }
    if (CheckNombre.value && CheckApellido.value && CheckID.value && CheckDireccion.value) {
        const response = await saveNewClient(data)
        if (response.status === 201) {
            Swal.fire({
                title: 'Cliente Creado',
                text: 'El cliente se ha creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
            url.push({ name: 'clientes-detail', params: { id: identificacion.value } })

        } else {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al crear el cliente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }
    else {
        Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al crear el cliente, Verifique los datos ingresados para continuar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}
</script>