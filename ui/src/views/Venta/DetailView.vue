<template>
    <div class="col col-lg-6">
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Venta de ID -{{ url.currentRoute.value.params.id }} </div>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <RouterLink :to="{ name: 'ventas' }" class="btn btn-secondary ml-auto">Atrás <i class="bi bi-arrow-left"></i>
                    </RouterLink>
                    <RouterLink :to="{name:'venta-report',params:{id:url.currentRoute.value.params.id}}" class="btn btn-primary ml-auto">Imprimir <i class="bi bi-printer"></i> </RouterLink>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">Datos de la venta</h5>
                <p class="card-text">
                <div>Venta procesada el {{ venta.date_joined }}</div>
                <div>Por valor de ${{ venta.total }} COP</div>
                <div>Usuario que procesó {{ venta.created_by }}</div>
                </p>
                <div class="input-group mb-3">
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
                        <div v-for="(item,index) in data">
                            <ProductoDetailContainer :producto="item,index" :precio_unitario="item.producto.precio" @actualizar="reloadSite"/>
                        </div>
                    </div>
                </div>
                <!--/datos-->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { getVendingData, getVendingById } from '@/apis/origins/operaciones.origins'
import { useRouter } from 'vue-router';
import ProductoDetailContainer from '@/components/containers/Ventas/ProductoDetailContainer.vue';
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const data = ref([])
const venta = ref([])
const loading = ref(false)
onBeforeMount(() => {
    fetchData()
})
const fetchData = async () => {
    const response = await getVendingData(url.currentRoute.value.params.id)
    data.value = response.data
    const fetch = await getVendingById(url.currentRoute.value.params.id)
    venta.value = fetch.data
}

const reloadSite = () => {
    fetchData()
}
</script>