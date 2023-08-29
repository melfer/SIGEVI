import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import clienteRoutes from '@/views/Personas/Clientes/clientes.routes'
import exceptionRoutes from '@/views/errors/errors.routes'
import proveedorRoutes from '@/views/Personas/Proveedores/proveedores.routes'
import marcasRoutes from '@/views/Gestion/Marcas/marcas.routes'
import categoriesRoutes from '@/views/Gestion/Categorias/categorias.routes'
import productosRoutes from '@/views/Gestion/Productos/productos.routes'
import cotizacionRoutes from "@/views/Cotizacion/cotizacion.routes";
import ventaRoutes from '@/views/Venta/venta.routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        /**Auth y registro */
        {
            path: "/login",
            name: "login",
            component: () => import("../views/auth/LoginView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/auth/RegisterView.vue"),
        },
        ...clienteRoutes,
        ...exceptionRoutes,
        ...proveedorRoutes,
        ...marcasRoutes,
        ...categoriesRoutes,
        ...productosRoutes,
        ...cotizacionRoutes,
        ...ventaRoutes,
        {
            path: "/report_products/",
            name: "report_products",
            component: () =>
                import("@/components/containers/Productos/PDFReportContainer.vue"),
        },
    ],
});

export default router
