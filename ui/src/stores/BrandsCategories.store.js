import { ref } from 'vue'
import { defineStore } from 'pinia'
import {saveBrandsByCategory} from '@/apis/origins/gestion.origins'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useCategoryBrandsStore = defineStore('brandcategory', () => {
  const brands = ref([])
  const url = useRouter()
  function addToBrands(data) {
    if (!brands.value.includes(data)) {
    brands.value.push(data)
      
    }
    }
    
    function deleteBrand(data) {
      const index = brands.value.indexOf(data)
      console.log(index)
      if (index > -1) {
        brands.value.splice(index,1)
      }
  }
  
  function clearAll() {
    brands.value.splice(0,brands.value.length)
    
  }

  async function save(id) {
    for (let index = 0; index <= brands.value.length; index++) {
      const element = brands.value[index];
      const data = {
        marca: element.id
      }
      const response = await saveBrandsByCategory(id, data)
      if (index == brands.value.length -1) {
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Transaccion Exitosa',
            text: 'Se han procesado los cambios'
          })
          clearAll()
          url.push({ name: 'categorias-details', params: { id: id } })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: response.data.detail
          })
        }
      }
    }
     
  }
  return { brands, addToBrands, deleteBrand,clearAll,save }
})
