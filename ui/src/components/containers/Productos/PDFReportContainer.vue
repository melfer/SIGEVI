<template>
    <div id="pdf">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Reporte de Existencias</h5>
                <p class="card-text">
                <h6>A continuación, se listarán los productos con pocas existencias</h6>
                <div v-for="(element, index) in data" :key="index">
                    <div class="container-fluid">
                        <h5>{{index+1}} - {{ element.nombre }}</h5>
                        <p>Quedan {{ element.cantidad }} {{ element.unidad }}</p>
                        <p><strong>referencia:</strong> {{ element.referencia[0].marca }} -
                            {{ element.referencia[0].categoria }}</p>
                    </div>
                </div>
                <hr style="color: white;">

                </p>
                
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getProductsByQuantity } from '@/apis/origins/gestion.origins'
import html2pdf from 'html2pdf.js'
import {useRouter} from 'vue-router'
const url = useRouter()
const data = ref('')

onMounted(async () => {
    const response = await getProductsByQuantity()
    data.value = response.data
    generarPDF()
})

const generarPDF = () => {
    const element = document.getElementById('pdf')
    const opt = {
        margin: 0.5,
        filename: 'reporte_restock.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(opt).save()
    url.push({name:'home'})
}



</script>