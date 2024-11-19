<template>
  <div class="profile">
    <h2>Perfil del Usuario</h2>
    <div v-if="user">
      <p><strong>Nombre:</strong> {{ user.name }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <h1>Notificaciones</h1>
      <form @submit.prevent="updateNotifications">
        <div>
          <label for="enabled">¿Activado?:</label>
          <input type="checkbox" id="enabled" v-model="notifier.enabled" />
        </div>
        <div>
          <label for="timeunit">Unidad de tiempo:</label>
          <select id="timeunit" v-model="notifier.timeunit">
            <option value="hour">Hora</option>
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </div>
        <div>
          <label for="amount">¿Cuántos?:</label>
          <input type="number" id="amount" v-model="notifier.amount" min="1" />
        </div>
        <button type="submit">Actualizar Configuración</button>
      </form>
    </div>
    <div v-else>
      <p>Cargando información del perfil...</p>
    </div>
  </div>
</template>


<script>
import { getUserById } from '../utils/user';
import { getUserNotifier, updateNotifier } from '../utils/notifier';

export default {
  name: 'Profile',
  data () {
    return {
      user: null,
      notifier: null,
    }
  },
  async mounted(){
    try {
      const userId = localStorage.getItem('id');
      this.user = await getUserById(userId);
      this.notifier = await getUserNotifier(userId);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al cargar el perfil.');
    }
  },
  methods: {
    async updateNotifications() {
      try {
        await updateNotifier(this.notifier);
        alert('Notificaciones actualizadas con éxito.');
      } catch (error) {
        console.error('Error al actualizar notificaciones:', error);
        alert('Hubo un error al actualizar las notificaciones.');
      }
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 2rem;
  margin-top: 100px;
}
</style>
