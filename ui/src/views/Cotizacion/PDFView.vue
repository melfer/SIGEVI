<template>
    <div id="pdf">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Librería y Variedades Dangedav</h5>
            <p class="card-subtitle mb-2 text-muted">NIT 00000000000</p>
            <p class="card-subtitle mb-2 text-muted">Dirección: Calle 1 No. 2-3</p>
            <p class="card-subtitle mb-2 text-muted">Tel 605-000-0000</p>
            <p class="card-subtitle mb-2 text-muted">contacto@g.com</p>
            <h6 class="card-subtitle mb-2">Cotización No. {{ cotizacion_id }}</h6>
            <h6 class="card-subtitle mb-2">Fecha: {{ fecha }}</h6>
            <h6 class="card-subtitle mb-2">A nombre de: {{ cliente_id }} - {{ cliente_nombre }} {{ cliente_apellido }} </h6>
            <p class="card-text">
                <div class="row" align="center">
                <div class="col col-lg-12" align="center">
                    <div class="card" style="size: 12cm;">
                        <div class="card-body">
                            <p class="card-text">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <th>Producto</th>
                                    <th>Precio Unitario</th>
                                    <th>Cantidad</th>
                                    <th>subtotal</th>
                                </thead>
                            <tbody>
                                    <tr v-for="(element,index) in productos">
                                        <td>{{ element.producto.nombre }}</td>
                                        <td>$ {{ element.subtotal / element.cantidad }}</td>
                                        <td>{{ element.cantidad }}</td>
                                        <td>$ {{ element.subtotal }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3">Total</td>
                                        <td>$ {{ total }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            </p>
                        </div>
                    </div> 
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
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js'
import { watchEffect } from 'vue';
import { userIsNotLogged } from '@/validators/login.validator';
watchEffect(()=>{
  userIsNotLogged()
})
const url = useRouter()
const productos = ref([])
const data = ref([])
const fecha = ref('')
const cliente_id = ref('')
const cliente_nombre = ref('')
const cliente_apellido = ref('')
const cotizacion_id = ref('')
const total = ref('')
onMounted(() => {
    getData()
    fecha.value = new Date().toLocaleString('es-CO')
    setTimeout(generarPDF, 500)
})

const getData = async () => {
    new Promise((resolve, reject) => {
        findQuoteByIdOrClientId(url.currentRoute.value.params.id)
        .then((response)=>{
            cotizacion_id.value = response.data[0].id
            cliente_id.value = response.data[0].cliente[0].id
            cliente_nombre.value = response.data[0].cliente[0].nombre
            cliente_apellido.value = response.data[0].cliente[0].apellido
            data.value = response.data
            total.value = response.data[0].total
            getProductos()
        })
       
    })

}


const getProductos = async () => {
    const response = await findProductsByQuoteId(url.currentRoute.value.params.id)
    productos.value = response.data
}

const generarPDF = () => {
    const element = document.getElementById('pdf')
    const opt = {
        margin: 0.5,
        filename: 'cotizacion'+cotizacion_id.value+'.pdf',
        html2canvas: { scale: 2},
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }

      html2pdf().from(element).set(opt).save()
}

</script>

<style>
h1{
    font-size: small;
}
</style>