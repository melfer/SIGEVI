<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Proveedores</div>
                <RouterLink :to="{ name: 'proveedores-create' }" class="btn btn-success ml-auto">Nuevo <i class="bi bi-plus"></i></RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title">Listado de Proveedores</h5>
                <p class="card-text">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingrese NIT a buscar" aria-label="Buscar Cliente"
                        aria-describedby="button-addon2" v-model="search">
                </div>
                    <!--Animación de carga-->
                        <div v-if="loading" align="center">
                            <div class="spinner-border" role="status"></div>
                            Espere un momento...
                        </div>
                        <div v-else>
                        <!--Mensaje sino hay datos-->
                            <div v-if="providers.length === 0">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                  <strong>404</strong> No hay registros que mostrar. Añada uno para empezar.                                 
                                </div>
                            </div>
                            <!--Renderizado de datos-->
                            <div v-else>
                                <div v-for="row in providers " :key="row.NIT">
                                    <ListContainer :provider="row" @eliminar="eliminarProveedor" />
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
import { ref, onMounted, watchEffect } from 'vue'
import { getAllProviders, findProviderByNIT } from '@/apis/origins/personas.origins'
import { useRouter } from 'vue-router';
import ListContainer from '@/components/containers/Proveedores/ListContainer.vue';
import { userIsNotLogged } from '../../../validators/login.validator';
const router = useRouter();
const providers = ref([])
const search = ref('')
const loading = ref(false)
onMounted(() => {
    watchEffect(async () => {
        userIsNotLogged()
        if (search.value.length > 0) {
            searchProveedor()
        } else {
            getProveedores()
        }
    })
})

const searchProveedor = async () => {
    new Promise((resolve, reject) => {
        loading.value = true
        findProviderByNIT(search.value).then((response) => {
            providers.value = response.data
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                router.push({ name: 'unauthorized' })
            }
            else {
                router.push({ name: 'server-error' })
            }
        })
            .finally(() => {
                loading.value = false

            })
    })
}

const getProveedores = async () => {
    new Promise((resolve, reject) => {
        loading.value = true
        getAllProviders().then((response) => {
            providers.value = response.data
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                router.push({ name: 'unauthorized' })
            }
            else {
                router.push({ name: 'server-error' })
            }
        })
            .finally(() => {
                loading.value = false
            })
    })
}

const eliminarProveedor = (NIT) => {
    providers.value = providers.value.filter((element) => element.NIT !== NIT)
}
</script>