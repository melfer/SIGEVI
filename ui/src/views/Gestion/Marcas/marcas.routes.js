import ListView from './ListView.vue';
import CreateView from './CreateView.vue';
import UpdateView from './UpdateView.vue';


const marcasRoutes = [
    {
        path: '/marcas',
        name: 'marcas',
        component: ListView
    },
    {
        path: '/marcas/create',
        name: 'marcas-create',
        component: CreateView
    },
    {
        path: '/marcas/:id/edit',
        name: 'marcas-edit',
        component: UpdateView
    }
]

export default marcasRoutes;
