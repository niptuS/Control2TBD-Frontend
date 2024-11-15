<template>
  <div class="register">
    <h2>Registrarse</h2>
    <form @submit.prevent="handleRegister">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Correo:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="rol">¿Cuál es tu rol?</label>
      <input type="text" id="rol" v-model="rol" required />

      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Crear Cuenta</button>
    </form>
  </div>
</template>

<script>
import { login } from '../utils/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      rol: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      // Algo asi pato :v
      // try {
      //   const response = await axios.post('/api/register', {
      //     username: this.username,
      //     email: this.email,
      //     rol: this.rol,
      //     password: this.password,
      //   });
      //
      //   if (response.data.success) {
      //     login();
      //     this.$router.push({ name: 'Profile' });
      //   } else {
      //     alert('Error al crear la cuenta');
      //   }
      // } catch (error) {
      //   console.error('Error al registrar:', error);
      //   alert('Hubo un problema con el registro, por favor intente nuevamente.');
      // }
    },
  },
};
</script>

<style scoped>
.register {
  padding: 2rem;
  margin-top: 100px;
}
.register form {
  display: flex;
  flex-direction: column;
}
.register label {
  margin-top: 0.5rem;
}
.register button {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
