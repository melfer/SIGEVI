import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  createNewQuote,
  deleteQuota,
  addProductToQuota
} from "@/apis/origins/operaciones.origins";
export const useSellStore = defineStore("sell", () => {
  const item = ref([]);
  const total = ref(0);
  const client = ref([]);
  const disableProcess = computed(() => {
    item.value.length === 0 && client.value.length === 0;
});
  const latestQuota = ref([]);

  const addClient = (clientData) => {
    createNewQuote(clientData);
    client.value = clientData;
  };

  const removeClient = () => {
    client.value = [];
    deleteQuota();
  };

  const addItem = (product, quantity) => {
    const existingItemIndex = item.value.findIndex(
      (item) => item.id === product.id
    );
    /**Si el producti existe, sume cantidad nueva */
    if (existingItemIndex !== -1) {
      item.value[existingItemIndex].cantidad += quantity;
      item.value[existingItemIndex].subtotal =
        item.value[existingItemIndex].cantidad * product.precio_compra;
    } else {
      /**Si el producto no existe, crearlo */
      const newItem = {
        id: product.id,
        name: product.nombre,
        cantidad: quantity,
        unidad: product.unidad,
        precio: product.precio_compra,
        subtotal: quantity * product.precio_compra,
      };
      item.value.push(newItem);
    }
    /**establecer total */
    total.value = total.value + quantity * product.precio_compra;
  };

  const incrementQuantity = (product) => {
    console.log(product);
    const existingItem = item.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.cantidad += 1;
      console.log(product.subtotal);
      existingItem.subtotal = existingItem.subtotal + product.precio;
      total.value = total.value + product.precio;
    }
  };

  const decrementQuantity = (product) => {
    const existingItem = item.value.find((item) => item.id === product.id);
    if (existingItem && existingItem.cantidad > 1) {
      existingItem.cantidad -= 1;
      existingItem.subtotal = existingItem.cantidad * product.precio;
      total.value = total.value - product.precio;
    }
  };

  const removeItem = (product) => {
    const existingItemIndex = item.value.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      item.value.splice(existingItemIndex, 1);
      total.value = total.value - product.subtotal;
    }
  };

  const clearCart = () => {
    item.value = [];
    total.value = 0;
  };

  const clearClient = () => {
    client.value = [];
  };

  const saveCart = async () => {
    for (let i = 0; i < item.value.length; i++) {
      addProductToQuota(item.value[i]);
    }
    clearCart();
  };

  return {
    item,
    total,
    client,
    disableProcess,
    latestQuota,
    addClient,
    removeClient,
    addItem,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    saveCart,
    clearClient,
  };
});