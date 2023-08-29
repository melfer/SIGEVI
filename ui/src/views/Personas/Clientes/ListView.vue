<template>
    <div class="col col-lg-7">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Listado de Clientes</div>
                <RouterLink :to="{ name: 'clientes-create' }" class="btn btn-success ml-auto">Nuevo <i class="bi bi-plus"></i></RouterLink>
            </div>
            <div class="card-body">
                <h5 class="card-title">Clientes</h5>
                <p class="card-text">Últimos Clientes añadidos</p>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingrese identificacion a buscar"
                        aria-label="Buscar Cliente" aria-describedby="button-addon2" v-model="searchValue">
                </div>
                <!--Animación de carga-->
                <div v-if="loading" align="center">
                    <div class="spinner-border" role="status"></div>
                    Espere un momento...
                </div>
                <div v-else>
                <!--Mensaje sino hay datos-->
                    <div v-if="data.length == 0">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                          <strong>404</strong> No hay registros que mostrar. Añada uno para empezar.
                        </div>
                    </div>
                    <!--Renderizado de datos-->
                    <div v-else>
                        <div v-for="element in data">
                            <ListContainer :cliente="element" @eliminar="eliminarCliente" />
                        </div>
                    </div>
                </div>
                <!--Fin animación de carga-->
            </div>
        </div>
    </div>
</template>

<script setup>
import ListContainer from '@/components/containers/Clientes/ListContainer.vue';
import { ref, watchEffect } from 'vue'
import { getAllClients, filterClientByID } from '@/apis/origins/personas.origins'
import { useRouter } from 'vue-router'
import { userIsNotLogged } from '../../../validators/login.validator';
const url = useRouter()
const data = ref([])
const searchValue = ref('')
const loading = ref(false)


const getAllData = async() =>{
    loading.value = true
    await getAllClients()
        .then((response) => {
            data.value = response.data
        })
        .catch((error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                url.push({ name: 'unauthorized' })
            }
            else {
                url.push({ name: 'server-error' })
            }
        }).finally(() => {
            loading.value = false
        })
}

const searchData = async() =>{
  loading.value = true
  await filterClientByID(searchValue.value)
      .then((Response)=>{
        data.value = Response.data
      })
      .catch((error)=>{
        data.value = []
      }).finally(()=> {
        loading.value = false
      })
}

watchEffect( () => {
    userIsNotLogged()
    if (searchValue.value) {
        searchData()
    } else {
        getAllData()
    }
})

const eliminarCliente = (id) => {
    data.value = data.value.filter((element) => element.identificacion !== id)
}

</script>