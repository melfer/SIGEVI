<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Cotizaciones</div>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <RouterLink :to="{ name: 'cotizaciones' }" class="btn btn-secondary ml-auto">Atrás <i
                            class="bi bi-arrow-left"></i></RouterLink>
                    <RouterLink :to="{ name: 'cotizacion-report', params: { id: url.currentRoute.value.params.id } }" class="btn btn-success ml-auto">Imprimir <i class="bi bi-printer"></i></RouterLink>
                </div>
            </div> 
            <div class="card-body">
                <h5 class="card-title">Detalles de la cotización {{ data.id }}</h5>
                <p class="card-text">
                    <h6>A nombre de: {{cliente.identificacion}} - {{cliente.nombre}} {{ cliente.apellido }}</h6>
                    <h6>Fecha de creación: {{ data.date_joined }}</h6>
                    <h6>Por valor de $ {{ data.total }}</h6>
                    <div class="card" >

                      <div class="card-body">
                        <h5 class="card-title">Productos Cotizados</h5>
                        <p class="card-text">
                            
                        <div class="container-fluid">
                            <div v-for="element in productos">
                                <DetailContainer :product="element" />
                            </div>
                        </div>
                        </p>
                        
                      </div>
                    </div>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { findQuoteByIdOrClientId, findProductsByQuoteId } from '@/apis/origins/operaciones.origins'
import { filterClientByID } from '@/apis/origins/personas.origins'
import { useRouter } from 'vue-router';
import DetailContainer from '@/components/containers/Cotizaciones/DetailContainer.vue';
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const id = url.currentRoute.value.params.id
const data = ref([])
const cliente = ref([])
const productos = ref([])
onMounted(() => {
    getData()
})

const getData = async () => {
    new Promise((resolve, reject) => {
        findQuoteByIdOrClientId(id)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == id) {
                        data.value = response.data[i]
                        break
                    }
                }
                getCliente(response.data[0].solicitante)
                getProductos(url.currentRoute.value.params.id)
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.status === 500) {
                    url.push({ name: 'server-error' })
                }

            })
            .finally(() => {
                loading.value = false
            })
    })
}
const getCliente = (id) => {
    filterClientByID(id).then((response) => {
        cliente.value = response.data[0]
    })
}

const getProductos = async() => {
    const response = await findProductsByQuoteId(url.currentRoute.value.params.id)
    productos.value = response.data
}
</script>