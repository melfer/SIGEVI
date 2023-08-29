<template>
    <div class="col col-lg-8">
        <div class="card">
            <div class="card-header">
                Datos de Cliente {{ data.identificacion }} - {{ data.nombre }} {{ data.apellido }}
            </div>
            <div class="card-body">
                <h5 class="card-title" align="center">Ingrese los datos a Editar</h5>
                <p class="card-text">
                <div class="row">
                    <div class="col">
                        <p>Direccion {{ data.direccion }}</p>
                        <p>Telefono {{ data.telefono }}</p>
                        <p>Correo {{ data.correo }}</p>
                        <p v-if="data.esFrecuente"> Este cliente es Comprador Frecuente <i class="bi bi-award"></i> </p>
                    </div>
                    <div class="col">
                        <EditContainer :cliente="data" />

                    </div>
                </div>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref,watchEffect } from 'vue'
import { findClientByID } from '@/apis/origins/personas.origins'
import EditContainer from '@/components/containers/Clientes/EditContainer.vue';
import { useRouter } from 'vue-router';
import { userIsNotLogged } from '@/validators/login.validator';
const data = ref([])
const url = useRouter()
watchEffect(()=>{
    userIsNotLogged()
    })

onMounted(() => {
    getData()
})

const getData = async () => {
    const response = await findClientByID(url.currentRoute.value.params.id)
    console.log(response.data)
    if (response.status === 401) {
        url.push({ name: 'unauthorized' })
    }
    else if (response.status === 500) {
        url.push({ name: 'server-error' })
    }
    else {
        data.value = response.data
    }
}

</script>