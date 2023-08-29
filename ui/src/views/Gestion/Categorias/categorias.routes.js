import ListView from './ListView.vue'
import CreateView from './CreateView.vue'
import UpdateView from './UpdateView.vue'
import DetailView from './DetailView.vue'
import AddBrand from './AddBrand.vue'
const categoriesRoutes = [
    {
        path: '/categorias',
        name: 'categorias',
        component:ListView
    },
    {
        path: '/categorias/:id',
        name: 'categorias-edit',
        component: UpdateView
    },
    {
        path: '/categorias/create/',
        name: 'categorias-create',
        component: CreateView
    },
    {
        path: '/categorias/:id/detalles/',
        name: 'categorias-details',
        component: DetailView
    },
    {
        path: '/categorias/:id/añadir/',
        name: 'categorias-addBrand',
        component: AddBrand
    }
]

export default categoriesRoutes