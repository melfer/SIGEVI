<template>
    <div class="col col-lg-8">
        <div class="card">
            <div class="card-header">
                <strong>
                    <h5>
                        Detalles de Cliente
                    </h5>
                                                </strong>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title" align="center">
                                                    Registro {{ data.identificacion }}
                                                </h5>
                                                <div class="row">
                                                    <div class="col">
                                                        <p>Nombres:{{ data.nombre }} {{ data.apellido }}</p>
                                                        <p>Dirección: {{ data.direccion }}</p>
                                                        <p>Telefono: {{ data.telefono ? data.telefono: 'No hay datos que mostrar' }}</p>
                                                        <p>Correo: {{ data.correo ? data.correo : 'No hay datos que mostrar'}}</p>
                                                        <p v-if="data.esFrecuente"><i class="bi bi-award"></i> Este cliente es comprador frecuente </p>
                                                    </div>
                                                    <div class="btn-group" role="group" aria-label="Basic example">
                                                          <RouterLink :to="{ name: 'clientes-edit', parms: { id: data.identificacion } }" type="button" class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
                                                          <RouterLink :to="{ name: 'clientes' }" type="button" class="btn btn-secondary">Atrás</RouterLink>
                                                        </div>
                            
                                            </div>
                        
                                    </div>

                                </div>
                            </div>

</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from "vue-router";
import { findClientByID } from '@/apis/origins/personas.origins'
import EditContainer from '@/components/containers/Clientes/EditContainer.vue';
import { userIsNotLogged } from '@/validators/login.validator';
const url = useRouter()
const data = ref([])
const checkbox = ref(false)
onMounted(async () => {
    new Promise((resolve, reject) => {
        findClientByID(url.currentRoute.value.params.id)
            .then((response) => {
                data.value = response.data
                console.log(data)

            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    url.push({ name: 'unauthorized' })
                }
                else {
                    url.push({ name: 'server-error' })
                }
            })
    })
})
watchEffect(() => {
    userIsNotLogged()
    checkbox.value
})
</script>