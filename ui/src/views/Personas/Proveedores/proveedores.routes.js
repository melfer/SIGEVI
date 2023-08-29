import ListView from './ListView.vue';
import DetailView from './DetailView.vue';
import CreateView from './CreateView.vue';
import UpdateView from './UpdateView.vue';


const proveedorRoutes = [
    {
        path: '/proveedores',
        name: 'proveedores',
        component: ListView
    },
    {
        path: '/proveedores/:id',
        name: 'proveedores-detail',
        component: DetailView
    },
    {
        path: '/proveedores/create',
        name: 'proveedores-create',
        component: CreateView
    },
    {
        path: '/proveedores/:id/edit',
        name: 'proveedores-edit',
        component: UpdateView
    }
]

export default proveedorRoutes;
