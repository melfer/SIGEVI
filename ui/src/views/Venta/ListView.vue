<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Ventas</div>
                <RouterLink :to="{ name: 'ventas-create' }" class="btn btn-success ml-auto">Nuevo <i
                        class="bi bi-plus"></i>
                </RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title">Listado de Ventas</h5>
                <p class="card-text">Últimas ventas procesadas</p>
                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="input1"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" placeholder="Ingese id de venta o cliente para filtrar" v-model="search"/>
                    </div>
                </div>
                <!--Animacion-->
                <div v-if="loading" align="center">
                    <div class="spinner-border" role="status"></div>
                    Espere un momento...
                </div>
                <!--datos-->
                <div v-else>
                    <!--Alerta sino hay datos-->
                    <div v-if="data.length == 0">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>404</strong> No hay datos para mostrar.
                        </div>
                    </div>
                    <!--/Alerta sino hay datos-->
                    <!--Si hay datos-->
                    <div v-else>
                        <div v-for="element in data" :key="element.id">
                            <ListContainer :venta="element" @eliminar="eliminarVenta"/>
                        </div>
                    </div>
                </div>
                <!--/datos-->
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { getAllVendings, getVendingsByIdOrClientID } from '@/apis/origins/operaciones.origins'
import ListContainer from '@/components/containers/Ventas/ListContainer.vue'
import { useRouter } from 'vue-router';
import { userIsNotLogged } from '../../validators/login.validator';
const loading = ref(false)
const search = ref('')
const data = ref([])
const url = useRouter()
onMounted(() => {
    watchEffect(() => {
        userIsNotLogged()
        if (search.value.length > 0 && search.value != ' ') {
            findVending(search.value)
        } else {
            findAllVendings()
        }
    })
})

const findVending = async (id) => {
    loading.value = true
    new Promise((resolve, reject) => {
        getVendingsByIdOrClientID(id)
            .then((response) => {
                data.value = response.data
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

const findAllVendings = async () => {
    loading.value = true
    new Promise((resolve, reject) => {
        getAllVendings()
            .then((response) => {
            data.value = response.data
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

const eliminarVenta = (id) => {
    data.value = data.value.filter((element) => element.id !== id)
}
</script>