<template>
    <form @submit.prevent="updateProvider">
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Razón Social</span>
            <input type="text" class="form-control" v-model="razonSocial" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Dirección</span>
            <input type="text" class="form-control" v-model="direccionEmpresa" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Teléfono</span>
            <input type="text" class="form-control" v-model="telefono" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Correo</span>
            <input type="email" class="form-control" v-model="correo" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">Punto de venta</span>
            <input type="text" class="form-control" v-model="direccionVenta" />
        </div>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="submit" class="btn btn-success">Guardar</button>
                  <RouterLink :to="{ name: 'proveedores-detail', params: { id: url.currentRoute.value.params.id } }" type="button" class="btn btn-secondary">Atrás</RouterLink>
          
                </div>
            </form>
</template>

<script setup>
import { ref } from 'vue'
import { updateProviderData } from '@/apis/origins/personas.origins';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const url = useRouter();
const razonSocial = ref('')
const direccionEmpresa = ref('')
const telefono = ref('')
const correo = ref('')
const direccionVenta = ref('')


const updateProvider = async () => {

    if (razonSocial.value === '') {
        razonSocial.value = props.provider.razonSocial
    }
    if (direccionEmpresa.value === '') {
        direccionEmpresa.value = props.provider.direccionEmpresa
    }
    if (telefono.value === '') {
        telefono.value = props.provider.telefono
    }
    if (correo.value === '') {
        correo.value = props.provider.correo
    }
    if (direccionVenta.value === '') {
        direccionVenta.value = props.provider.direccionVenta
    }

    const data = {
        razonSocial: razonSocial.value,
        direccionEmpresa: direccionEmpresa.value,
        telefono: telefono.value,
        correo: correo.value,
        direccionVenta: direccionVenta.value
    }
    new Promise((resolve, reject) => {
        updateProviderData(props.provider.NIT, data)
            .then((response) => {
                Swal.fire({
                    title: '¡Proveedor actualizado!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })

                url.push({ name: 'proveedores-detail', params: { id: props.provider.NIT } })
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                else {
                    url.push({ name: 'server-error' })
                }
            })
    })
}


const props = defineProps({
    provider: {
        type: Object,
        required: true
    }
})
</script>