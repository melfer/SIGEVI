<template>
    <form @submit.prevent="saveData">
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">NIT/CC</span>
            <input type="text" class="form-control" v-model="NIT" required/>
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckNIT">
            NIT/CC no puede estar vacía
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Razón social</span>
            <input type="text" class="form-control" v-model="razonSocial" required/>
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckNombre">
            Razón social no puede estar vacío
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Dirección</span>
            <input type="text" class="form-control" v-model="direccionEmpresa" required/>
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckDireccion">
            Dirección no puede estar vacía
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Telefono</span>
            <input type="text" class="form-control" v-model="telefono" required/>
        </div>
        <div class="alert alert-warning" role="alert" v-if="!CheckTelefono">
            Telefono no puede estar vacío
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Correo</span>
            <input type="email" class="form-control" v-model="correo" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Direccion de punto de venta</span>
            <input type="text" class="form-control" v-model="direccionVenta" />
        </div>
        <button type="submit" class="btn btn-success">Guardar</button>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { saveNewProvider } from '@/apis/origins/personas.origins'
import { checkNoEmptyNIT, checkNoEmptyNombre, checkNoEmptyAddress1, checkNoEmptyPhone, } from '@/validators/providerCreation.validator';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
const url = useRouter()
const NIT = ref('')
const razonSocial = ref('')
const direccionEmpresa = ref('')
const telefono = ref('')
const correo = ref('')
const direccionVenta = ref('')
const CheckNIT = ref(false)
const CheckNombre = ref(false)
const CheckDireccion = ref(false)
const CheckTelefono = ref(false)

watchEffect(() => {
    CheckNIT.value = checkNoEmptyNIT(NIT.value)
    CheckNombre.value = checkNoEmptyNombre(razonSocial.value)
    CheckDireccion.value = checkNoEmptyAddress1(direccionEmpresa.value)
    CheckTelefono.value = checkNoEmptyPhone(telefono.value)
})

const saveData = async () => {
    const data = {
        NIT: NIT.value,
        razonSocial: razonSocial.value,
        direccionEmpresa: direccionEmpresa.value,
        telefono: telefono.value,
        correo: correo.value,
        direccionVenta: direccionVenta.value
    }
    if (CheckNIT.value && CheckNombre.value && CheckDireccion.value && CheckTelefono.value) {
        const response = await saveNewProvider(data)
        console.log(response)
        if (response.status === 201) {
            Swal.fire({
                title: 'Proveedor Creado',
                text: 'El Proveedor se ha creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
           url.push({ name: 'proveedores-detail',params:{id:NIT.value} })

        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al crear el Proveedor',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            url.push({ name: 'proveedores' })
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifique que los campos esten llenos correctamente',
        })
    }
}
</script>