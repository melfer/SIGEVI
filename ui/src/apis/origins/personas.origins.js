import { baseApi } from '../base.api';

/* Fetch de Clientes */
export const getAllClients =  () => {
    return baseApi.get('/personas/clientes/');
}

export const saveNewClient = (data) => {
    return baseApi.post('/personas/clientes/', data);
}

export const filterClientByID = (id) => {
    return baseApi.get(`/personas/clientes/search/${id}/`);
}

export const findClientByID = (id) => { 
    return baseApi.get(`/personas/clientes/${id}/`);
}

export const updateClient = (id, data) => {
    return baseApi.put(`/personas/clientes/${id}/`, data);
}

export const deleteClient = (id) => {
    return baseApi.delete(`/personas/clientes/${id}/`);
}

/* Fetch de Proveedores */
export const getAllProviders =  () => {
    return baseApi.get('/personas/proveedores/');
}

export const findProviderByNIT = (nit) => {
    return baseApi.get(`/personas/proveedores/search/${nit}/`);
}

export const findOneProvider = (nit) => { 
    return baseApi.get(`/personas/proveedores/${nit}/`);
}

export const deleteProvider = (nit) => {
    return baseApi.delete(`/personas/proveedores/${nit}/`);
}

export const updateProviderData = (nit, data) => {
    return baseApi.put(`/personas/proveedores/${nit}/`, data);
}

export const saveNewProvider = (data) => {
    return baseApi.post('/personas/proveedores/', data);
}
