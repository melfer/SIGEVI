<template>
    <div class="col col-lg-8">
        <div class="card">
            <div class="card-header">
                Editar Proveedor {{ provider.NIT }} - {{ provider.razonSocial }}
            </div>
            <div class="card-body">
                <h5 class="card-title" align="center">Ingrese los datos a modificar</h5>
                <p class="card-text">
                <div class="row">
                <div class="col">
                    <p>Dirección {{ provider.direccionEmpresa }}</p>
                    <p>Teléfono {{ provider.telefono }}</p>
                    <p>Correo {{ provider.correo }}</p>
                    <p>Punto de venta {{ provider.direccionVenta }}</p>
                </div>
                <div class="col">
                    <EditContainer :provider="provider" />
                </div>
                </div>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { findOneProvider } from '@/apis/origins/personas.origins'
import EditContainer from "@/components/containers/Proveedores/EditContainer.vue";
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const provider = ref([])
onMounted(() => {
    getData()
})

const getData = async () => {
    const response = await findOneProvider(url.currentRoute.value.params.id)
    if (response.status === 401) {
        url.push({ name: 'unauthorized' })
    }
    if (response.status === 500) {
        url.push({ name: 'server-error' })
    }
    if (response.status === 200) {
        provider.value = response.data
    }
}

</script>