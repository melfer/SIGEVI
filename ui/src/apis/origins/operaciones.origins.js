import {baseApi} from '../base.api';
import { sesionStore } from "@/stores/sesion";
/**APIS para cotizacion */
/**
 * 
 * @retorna todas las cotizaciones
 */
export const findAllQuotes = () => {
  return baseApi.get("/operaciones/cotizacion/");
};

/**
 * 
 * @param {*} id 
 * @retorna filtrado de cotizaciones por id o id de cliente
 */
export const findQuoteByIdOrClientId = (id) => {
  return baseApi.get(`/operaciones/cotizacion/detail/${id}/`);
};

/**
 * 
 * @param {*} id 
 * @retorna los productos de una cotizacion
 */
export const findProductsByQuoteId = (id) => {
  return baseApi.get(`/operaciones/cotizacion/producto/${id}/`);
};

/**
 * 
 * @param {*} data  = datos de cliente
 * @retorna la cotizacion creada 
 */
export const createNewQuote = (data) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.pat}`
  return baseApi.post("/operaciones/cotizacion/", data);
};

/**
 * 
 * @param {*} data = datos de producto
 * @retorna estado de guardado de producto en una cotizacion
 */
export const addProductToQuota = (data) => {
   const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  return baseApi.post('/operaciones/cotizaciones/latest/',data);
  
  }

/**
 * 
 * @returns estado de eliminacion de cotizacion
 */
export const deleteQuota = () => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  return baseApi.delete("/operaciones/cotizaciones/latest/");
  
}

/**
 * 
 * @returns ultima cotizacion creada
 */
export const getLastQuota = () => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  return baseApi.get("/operaciones/cotizaciones/latest/");
}

/**APIS para venta */
/**
 * @retorna todas las ventas
 */

export const getAllVendings = () => {
  const response = baseApi.get("/operaciones/ventas/");
  return response
}

/**
 * @param {*} id = id venta o id cliente
 * @retorna ventas filtradas por id o id de cliente
 */
export const getVendingsByIdOrClientID = (id) => {
  const response = baseApi.get(`/operaciones/ventas/detail/${id}/`);
  return response
}

/**
 * @param {*} data = datos de cliente
 * @retorna venta creada
 */
export const createNewVendor = (data) => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  const response = baseApi.post("/operaciones/ventas/", data);
  return response
}

/** 
 * @retorna eliminacion de ultima venta procesada
 */

export const deleteVendor = () => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  const response = baseApi.delete("/operaciones/ventas/latest/");
  return response
}

/**
 * @param {*} data = datos de producto
 * @retorna estado de guardado de producto en una venta
 */
export const addProductToVendor = (data) => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  const response = baseApi.post("/operaciones/ventas/latest/", data);
  return response
}

/**
 * @returns ultima venta creada
 */

export const getLastVendor = () => {
  const sesion = sesionStore();
  baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.pat}`;
  const response = baseApi.get("/operaciones/ventas/latest/");
  return response
}

/** 
* @params {id} = id de venta
* @retorna eliminacion de una venta
*/

export const deleteThisVendor = (id) => {
  return baseApi.delete(`/operaciones/ventas/detail/${id}/`);
}

/**
 * @param {id} = id de la venta
 * @retorna datos de la venta
 */
export const getVendingData = (id) => {
  const response = baseApi.get(`/operaciones/ventas/consulta/${id}/`);
  return response
}

/**
 * @parms {id} = id venta
 * @retorna datos de venta consultada
 */

export const getVendingById = (id) => {
  return baseApi.get(`/operaciones/ventas/${id}/`)
}

/**
 * @params {id,producto} = id de la venta,id del producto
 * @retorna actualizacion de producto en venta
 */
export const updateProductInVendor = (id, producto) => {
  return baseApi.put(`/operaciones/ventas/detail/${id}/`, producto);
}

/**
 * @params {id} = id del producto en la venta
 * @retorna eliminacion de producto en venta
 */
export const deleteProductInVendor = (id) => {
  return baseApi.delete(`/operaciones/ventas/deleteProduct/${id}/`);
}