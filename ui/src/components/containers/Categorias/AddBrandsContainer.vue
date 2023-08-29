<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Marcas seleccionadas <div class="btn-group" role="group" aria-label="Basic example"
                    v-if="store.brands.length > 0">
                    <button type="button" class="btn btn-success" @click="store.save(url.currentRoute.value.params.id)">Procesar</button>
                    <button type="button" class="btn btn-danger" @click="store.clearAll()">Vaciar Todo</button>

                </div>
            </h5>
            <p class="card-text">
            <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="store.brands.length === 0">
                Seleccione una para ver más opciones
            </div>
            <div v-else>
                <div v-for="element in store.brands">
                    <p>{{ element.id }} - {{ element.nombre }} <button class="btn btn-danger"
                            @click="store.deleteBrand(element)"><i class="bi bi-trash"></i></button></p>
                </div>
            </div>
            </p>
        </div>
    </div>
</template>
<script setup>
import { useCategoryBrandsStore } from '@/stores/BrandsCategories.store'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue';
import Swal from 'sweetalert2'
const store = useCategoryBrandsStore()
const url = useRouter()


</script>