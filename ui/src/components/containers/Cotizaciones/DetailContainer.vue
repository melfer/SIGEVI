<template>
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
      <strong>{{ props.product.producto.nombre }}</strong> 
        <p>Por un valor de $ {{ props.product.producto.precio }}</p>
        <div>Cantidad: {{ props.product.cantidad }}</div>
        <div>SubTotal: {{ props.product.subtotal }}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>
<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>