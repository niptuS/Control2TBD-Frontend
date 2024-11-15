import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../utils/auth';

import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateTaskForm from "@/components/CreateTaskForm.vue";
import TaskList from "@/components/TaskList.vue";


const routes = [
    { path: '/', name: 'Home', component: Home  },
    {
        path: '/perfil',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/crear-tarea',
        name: 'CreateTask',
        component: CreateTaskForm,
        // meta: { requiresAuth: true }
    },
    {
        path: '/listar-tareas',
        name: 'TaskList',
        component: TaskList,
        // meta: { requiresAuth: true }
    },
    { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/');
    } else {
        next();
    }
});

export default router;
