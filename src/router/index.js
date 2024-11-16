import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../utils/authStore';

import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateTaskForm from "@/components/CreateTaskForm.vue";
import TaskList from "@/components/TaskList.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    {
        path: '/perfil',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/crear-tarea',
        name: 'CreateTask',
        component: CreateTaskForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/listar-tareas',
        name: 'TaskList',
        component: TaskList,
        meta: { requiresAuth: true },
    },
    { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // Acceder al store de autenticación

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        // Si la ruta requiere autenticación y el usuario no está autenticado
        next('/login'); // Redirige al login
    } else {
        next(); // Deja que la navegación continúe
    }
});

export default router;
