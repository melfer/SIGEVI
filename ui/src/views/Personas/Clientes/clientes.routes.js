import ListView from './ListView.vue';
import DetailView from './DetailView.vue';
import CreateView from './CreateView.vue';
import UpdateView from "@/views/Personas/Clientes/UpdateView.vue";

const clienteRoutes = [
    {
        path: '/clientes',
        name: 'clientes',
        component: ListView
    },
    {
        path: '/clientes/:id',
        name: 'clientes-detail',
        component: DetailView
    },
    {
        path: '/clientes/create',
        name: 'clientes-create',
        component: CreateView
    },
    {
        path: '/clientes/:id/edit',
        name: 'clientes-edit',
        component: UpdateView
    }
]

export default clienteRoutes;
