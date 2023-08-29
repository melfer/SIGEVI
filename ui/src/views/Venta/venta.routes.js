import CreateView from './CreateView.vue'
import ListView from './ListView.vue'
import PDFView from './PDFView.vue'
import DetailView from './DetailView.vue'
const ventaRoutes = [
    {
        path: '/ventas/',
        name: 'ventas',
        component: ListView,
    },
    {
        path: '/ventas/nuevo',
        name: 'ventas-create',
        component: CreateView,
    },
    {
        path: '/ventas/current_vendor/:id',
        name: 'venta-report',
        component: PDFView,
    },
    {
        path: '/ventas/detalles/:id',
        name: 'ventas-detail',
        component: DetailView,
    }
]

export default ventaRoutes