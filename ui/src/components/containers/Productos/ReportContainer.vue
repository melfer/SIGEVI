<template>
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <div class="text-center flex-grow-1 mb-0">Reporte de Productos</div>
                <div class="text-center flex-grow-1 mb-0">
                    <RouterLink :to="{name:'report_products'}" class="btn btn-primary">Imprimir <i class="bi bi-printer"></i></RouterLink>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title" v-if="data.length > 0">Considere hacer reestock de los siguientes {{ data.length }} productos</h5>
                <!--Alerta sino hay datos-->
                <div v-if="data.length == 0">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>404</strong> No hay datos para mostrar.
                    </div>
                </div>
                <!--/Alerta sino hay datos-->
                <!--Si hay datos-->
                <div v-else>
                    <div v-for="(element,index) in data" :key="index">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">{{ element.nombre }}</h5>
                            <p class="card-text">Quedan {{ element.cantidad }} {{ element.unidad }}</p>
                                <p class="card-text"><strong>referencia:</strong> {{ element.referencia[0].marca }} - {{ element.referencia[0].categoria }}</p>
                          </div>
                        </div>
                        <hr style="color: white;">
                    </div>
                </div>
            </div>
            <!--/datos-->
        </div>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getProductsByQuantity } from '@/apis/origins/gestion.origins'
const data = ref('')
onMounted(async () => {
    const response = await getProductsByQuantity()
    data.value = response.data
})
</script>