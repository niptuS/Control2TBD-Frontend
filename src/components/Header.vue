<template>
  <header class="header" :class="{'collapsed': !isSidebarCollapsed}">
    <button @click="toggleSidebar" class="sidebar-toggle-button">
      {{ isSidebarCollapsed ? 'Retraer Sidebar' : 'Expandir Sidebar' }}
    </button>
    <div class="logo">
      <img :src="logoSrc" alt="Task manager icon" />
    </div>
    <h1>Task Manager</h1>

    <!-- Botón de Notificaciones -->
    <button 
      class="notification-button"
      :class="{'has-notifications': notificationCount > 0}" 
      @click="goToTaskList"
    >
      Notificaciones: {{ notificationCount }}
    </button>

    <!-- Botones de Iniciar Sesión y Registrarse -->
    <div v-if="!authStore.isLoggedIn" class="auth-buttons">
      <router-link to="/login" class="session-button">Iniciar Sesión</router-link>
      <router-link to="/register" class="session-button">Registrarse</router-link>
    </div>

    <!-- Botón de Cerrar Sesión -->
    <button v-if="authStore.isLoggedIn" @click="logoutUser" class="session-button">
      Cerrar Sesión
    </button>
  </header>
</template>

<script>
import { useNotificationStore } from '../utils/notificationStore';
import { useAuthStore } from '../utils/authStore';
import logoImage from '@/components/icons/taskmanagericon.png';
import { computed } from 'vue';

export default {
  props: {
    isSidebarCollapsed: Boolean,
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();
    const notificationCount = computed(() => notificationStore.notificationCount);

    const toggleSidebar = () => {
      emit('toggleSidebar');
    };

    const logoutUser = () => {
      authStore.logout();
    };

    return {
      authStore,
      notificationCount,
      toggleSidebar,
      logoutUser,
      logoSrc: logoImage,
    };
  },

  methods: {
    goToTaskList() {
      this.$router.push('/listar-tareas'); 
    },
  }

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

.notification-button {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.notification-button.has-notifications {
  background-color: red;
  color: white;
}

.notification-button:hover {
  background-color: #ff4d4d;
  color: white;
}
</style>