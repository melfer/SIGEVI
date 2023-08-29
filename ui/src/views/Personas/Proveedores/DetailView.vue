<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header">
                <strong>
                    <h5>
                        Detalles de Proveedor
                    </h5>
                            </strong>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" align="center">{{ provider.NIT }} - {{ provider.razonSocial }}</h5>
                            <div class="row">
                                <div class="col">
                                    <div>Dirección: {{ provider.direccionEmpresa }}</div>
                                    <div>Telefono: {{ provider.telefono }}</div>
                                    <div>Correo: {{ provider.correo ? provider.correo : 'No hay datos que mostrar' }}</div>
                                    <div>Punto de venta: {{ provider.direccionVenta ? provider.direccionVenta: 'No hay datos que mostrar'}}</div>
                                </div>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                  <RouterLink :to="{ name: 'proveedores-edit', parms: { id: provider.NIT } }" type="button" class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
                                  <RouterLink :to="{ name: 'proveedores' }" type="button" class="btn btn-secondary">Atrás</RouterLink>
                                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { findOneProvider } from '@/apis/origins/personas.origins';
import { useRouter } from 'vue-router';
import EditContainer from '@/components/containers/Proveedores/EditContainer.vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const checkbox = ref(false)
const provider = ref([])

onMounted(() => {
    getData()
})

const getData = async () => {
    new Promise((resolve, reject) => {
        findOneProvider(url.currentRoute.value.params.id)
            .then((response) => {
                provider.value = response.data
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


</script>