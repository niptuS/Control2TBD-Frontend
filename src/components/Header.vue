<template>
  <header class="header" :class="{'collapsed': !isSidebarCollapsed}">
    <button @click="toggleSidebar" class="sidebar-toggle-button">
      {{ isSidebarCollapsed ? 'Expandir Sidebar' : 'Retraer Sidebar' }}
    </button>
    <div class="logo">
      <img :src="logoSrc" alt="Task manager icon" />
    </div>
    <h1>Task Manager</h1>

    <!-- Botones de Iniciar Sesión y Registrarse -->
    <div v-if="!isLoggedIn" class="auth-buttons">
      <router-link to="/login" class="session-button">Iniciar Sesión</router-link>
      <router-link to="/register" class="session-button">Registrarse</router-link>
    </div>

    <!-- Botón de Cerrar Sesión -->
    <button v-if="isLoggedIn" @click="logoutUser" class="session-button">
      Cerrar Sesión
    </button>
  </header>
</template>
<script>
import logoImage from '@/components/icons/taskmanagericon.png';
import { isAuthenticated, logout } from '../utils/auth';

export default {
  props: {
    isSidebarCollapsed: Boolean,
  },
  data() {
    return {
      isLoggedIn: isAuthenticated(),
      logoSrc: logoImage,
    };
  },
  methods: {
    logoutUser() {
      logout();
      this.isLoggedIn = isAuthenticated();
      this.$router.push('/');
    },
    toggleSidebar() {
      this.$emit('toggleSidebar');
    },
  },
  watch: {
    '$route'() {
      this.isLoggedIn = isAuthenticated();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  width: 100%;
  position: fixed;
  transition: padding-right 0.3s ease;
  height: 100px;
}

.header.collapsed {
  padding-left: 0;
}

.header:not(.collapsed) {
  padding-right: 230px;
}

.logo img {
  height: 80px;
  margin-right: 1rem;
}

.session-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.sidebar-toggle-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>