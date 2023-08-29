import NotFound from './NotFound.vue';
import ServerError from './ServerError.vue';
import Unauthorized from './Unauthorized.vue';


const exceptionRoutes = [
    {
        path: '/500',
        name: 'server-error',
        component: ServerError
    },
    {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound
    },
    {
        path: '/401',
        name: 'unauthorized',
        component: Unauthorized 
    }
]

export default exceptionRoutes;
