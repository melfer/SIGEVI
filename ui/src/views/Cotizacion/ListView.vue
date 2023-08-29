<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Cotizaciones</div>
                    <RouterLink :to="{ name: 'nueva-cotizacion' }" class="btn btn-success ml-auto">Nueva <i
                            class="bi bi-plus"></i></RouterLink>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Listado de cotizaciones en sistema</h5>
                    <p class="card-text">
                        <!---Buscador-->
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                        <input type="search" class="form-control"
                            placeholder="Ingrese id, nombre o identificaicon de usuario para buscar" v-model="kword">
                    </div>
                    <!---/Buscador-->
                    <!--Animación de carga-->
                    <div v-if="loading" align="center">
                        <div class="spinner-border" role="status"></div>
                        Espere un momento...
                    </div>
                    <div v-else>
                        <!--Mensaje sino hay datos-->
                        <div v-if="quotes.length === 0">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>404</strong> No hay registros que mostrar. Añada uno para empezar.
                            </div>
                        </div>
                        <!--Renderizado de datos-->
                        <div v-else>
                            <div v-for="row in quotes" :key="row.id">
                                <ListContainer :quote="row" />
                            </div>
                        </div>
                    </div>
                    <!--Fin animación de carga-->
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { findAllQuotes, findQuoteByIdOrClientId } from '@/apis/origins/operaciones.origins'
import ListContainer from '@/components/containers/Cotizaciones/ListContainer.vue';
import { useRouter } from 'vue-router'
import { userIsNotLogged } from '../../validators/login.validator';
const url = useRouter()
const quotes = ref([])
const kword = ref('')
const loading = ref(false)

const fetchData = async () => {
    loading.value = true
    new Promise((resolve, reject) => {
        findAllQuotes()
            .then((response) => {
            quotes.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.status === 404) {
                    data.value = []
                }
            })
            .finally(() => {
                loading.value = false
            })
    })
   
}

const filterData = async () => {
    loading.value = true
    new Promise((resolve, reject) => {
        findQuoteByIdOrClientId(kword.value)
            .then((response) => {
                quotes.value = response.data
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                if (error.response.status === 404) {
                    data.value = []
                }
            })
            .finally(() => {
                loading.value = false
            })
    })
        
   
    
}

watchEffect(() => {
    userIsNotLogged()
    if (kword.value != '') {
        filterData()
    }
    else {
        fetchData()
    }
})
</script>