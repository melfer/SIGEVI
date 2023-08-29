<template>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <h4>Cotización: {{ props.quote.id }}</h4>
                <h6>A nombre de {{ props.quote.cliente[0].nombre}} {{ props.quote.cliente[0].apellido }}</h6>
                <p>Creada el {{ props.quote.date_joined }} por {{ props.quote.created_by }}</p>
                <RouterLink :to="{name:'cotizacion-details',params:{
                    id: props.quote.id
                }}" class="btn btn-primary">Ver <i class="bi bi-search"></i></RouterLink>
    </div>
</template>

<script setup>

const props = defineProps({
    quote: {
        type: Object,
        required: true
    }
})

</script>