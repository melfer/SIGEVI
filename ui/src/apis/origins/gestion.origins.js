import { baseApi } from '../base.api';
/**Fecthers de Marcas */
export const getAllBrands = () => {
    return baseApi.get('/gestion/marcas/');
}

export const getBrandById = (id) => {
    return baseApi.get(`/gestion/marcas/${id}/`);
}

export const deleteBrandById = (id) => {
    return baseApi.delete(`/gestion/marcas/${id}/`);
}
export const updateBrandByID = (id, data) => {
    return baseApi.put(`/gestion/marcas/${id}/`, data);
}

export const createBrand = (data) => {
    return baseApi.post('/gestion/marcas/', data);
}

export const getBrandByName = (name) => {
    return baseApi.get(`/gestion/marcas/search/${name}/`);
}

/**Fetchers de Categorías */
export const getAllCategories = async()=> {
    return baseApi.get(`/gestion/categorias/`);
}

export const findCategoryByID = async (id) => {
    return await baseApi.get(`/gestion/categorias/${id}/`)
}

export const updateCategoryByID = (id,data) => {
    return baseApi.put(`/gestion/categorias/${id}/`,data)
} 

export const deleteCategoryByID = async(id) => {
    return await baseApi.delete(`/gestion/categorias/${id}/`)
}

export const saveCategory = (data) => {
    return baseApi.post(`/gestion/categorias/`,data)
}

export const getCategoryByName = (name) => { 
    return baseApi.get(`/gestion/categorias/search/${name}/`)
}

/**Fetchers de Marcas por categorias */
export const getBrandsByCategory = (id) => {
    return baseApi.get(`/gestion/categorias/${id}/detalles/`)
}

export const findCategoryByName = (name) => {
    return baseApi.get(`/gestion/categorias/search/${name}/`)
}
export const saveBrandsByCategory = (id,data) => {
    return baseApi.post(`/gestion/categorias/${id}/detalles/`,data)
}

export const filterBrandsByCategory = (id) => {
    return baseApi.get(`/gestion/categorias/${id}/filtro/`)
}

export const filterBrandsOfCategoryByName = (id, nombre) => {
    return baseApi.get(`/gestion/categorias/search/${id}/marca/${nombre}/`)
}

export const showBrandsOfCategory = (nombre) => {
    return baseApi.get(`/gestion/categorias/find/${nombre}/`)
}
 
export const showBrandsOfCategoryAdvanced = (nombre,marca) => {
    return baseApi.get(`/gestion/categorias/find/${nombre}/${marca}/`)
 }

export const deleteBrandByCategory = (category, id) => {
    return baseApi.delete(`/gestion/categorias/${category}/eliminar/${id}/`)
}

/**Fetchers de Productos */
export const getAllProducts = () => {
    return baseApi.get('/gestion/productos/')
}

export const getProductById = (id) => {
    return baseApi.get(`/gestion/productos/${id}/`)
}

export const deleteProductById = (id) => {
    return baseApi.delete(`/gestion/productos/${id}/`)
}

export const saveProduct = (data) => {
    return baseApi.post('/gestion/productos/', data)
}

export const findProductByName = (name) => {
    return baseApi.get(`/gestion/productos/search/${name}/`)
}

/**
 * @params = {data} => {id, nombre, cantidad, precio_compra}
 * @returns actualizacion de producto
 */

export const updateProduct = (id, data) => {
    return baseApi.put(`/gestion/productos/${id}/`, data)
}

/**
 * @params = {} => sin parametros
 * @returns lista de productos cuyas cantidades sean menores que 20
 */

export const getProductsByQuantity = () => {
    return baseApi.get('/gestion/productos/report/')
}