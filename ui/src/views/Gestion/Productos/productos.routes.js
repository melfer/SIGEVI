import ListView from './ListView.vue';
import CreateView from './CreateView.vue';
import UpdateView from './UpdateView.vue';
import DetailView from './DetailView.vue';

const productosRoutes = [
    {
        path: '/productos',
        name: 'productos',
        component: ListView,
    },
    {
        path: '/productos/:id/detalles',
        name: 'productos-detail',
        component: DetailView,
    },
    {
        path: '/productos/nuevo/',
        name: 'productos-create',
        component: CreateView,
    },
    {
        path: '/productos/:id/editar',
        name: 'productos-update',
        component: UpdateView,
    }

]

export default productosRoutes;