<template>
  <aside :class="['sidebar', { 'collapsed': !isCollapsed }]">
    <nav>
      <ul>
        <li>
          <router-link to="/inicio">Inicio</router-link>
        </li>
        <li v-if="authStore.isLoggedIn">
          <router-link to="/perfil">Perfil</router-link>
        </li>
        <li v-if="authStore.isLoggedIn">
          <router-link to="/crear-tarea">Crear Tarea</router-link>
        </li>
        <li v-if="authStore.isLoggedIn">
          <router-link to="/listar-tareas">Listar Tareas</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { useAuthStore } from '../utils/authStore'; // Asegúrate de que esta ruta sea correcta

export default {
  setup() {
    const authStore = useAuthStore();
    return {authStore}; // Retorna el store completo para usarlo en el template
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: #fff;
  height: 100vh;
  padding: 1rem;
  transition: width 0.3s ease, visibility 0.3s ease;
}

.sidebar.collapsed {
  width: 0;
  visibility: hidden;
  padding: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  display: block;
  transition: padding-left 0.3s ease;
}

.sidebar a:hover {
  text-decoration: underline;
}
</style>
