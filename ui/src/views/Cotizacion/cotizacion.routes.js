import ListView from './ListView.vue'
import CreateView from './CreateView.vue'
import PDFView from './PDFView.vue'
import DetailView from './DetailView.vue'
const cotizacionRoutes = [
    {
        path: '/cotizacion',
        component: ListView,
        name: 'cotizaciones',
    },
    {
        path: '/cotizacion/nuevo/',
        component: CreateView,
        name: 'nueva-cotizacion',
    },
    {
        path: '/cotizacion/current_report/:id/',
        component: PDFView,
        name: 'cotizacion-report',
    },
    {
        path: '/cotizacion/details/:id',
        component: DetailView,
        name: 'cotizacion-details',
    },
]

export default cotizacionRoutes