<script setup>
import { sesionStore } from '@/stores/sesion';
import {onMounted} from 'vue';
import ReportContainer from '@/components/containers/Productos/ReportContainer.vue';
import { userIsNotLogged } from '../validators/login.validator';
const sesion = sesionStore()
onMounted(()=>{
  userIsNotLogged()
})
</script>

<template>
  <div class="col col-lg-6" align="center">
    <div v-if="sesion.userData?.groups">
      <div class="alert alert-warning alert-dismissible fade show" role="alert"
        v-if="sesion.userData.groups.includes('Administrador')">
        <strong>Atención</strong> Usted ha iniciado sesión como Administrador
        <div>
          Este perfil posee permisos sobre todas las operaciones, tenga cuidado con los cambios que realice, ya que no se
          pueden deshacer.
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert"
        v-else-if="sesion.userData.groups.includes('Bodeguista')">
        <strong>Atención</strong> Usted ha iniciado sesión como Bodeguista
        <div>
          Este perfil posee permisos sobre Gestion de Marcas, Categorías, Productos y proveedores.
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert"
        v-else-if="sesion.userData.groups.includes('Cajero')">
        <strong>Atención</strong> Usted ha iniciado sesión como Cajero
        <div>
          Este perfil posee permisos sbre Gestion de Clientes, Proveedores, Cotizaciones y Ventas.
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Alerta</strong> Usted no posee permisos para realizar cambios en el sistema, contacte al administrador para mayor información
        </div>
      </div>
    </div>
      <div v-if="sesion.userData.groups?.includes('Bodeguista') || sesion.userData.groups?.includes('Administrador')">
        <ReportContainer/>
      </div>


</div></template>
