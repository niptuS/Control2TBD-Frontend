<template>
  <div class="register">
    <h2>Registrarse</h2>
    <form @submit.prevent="handleRegister">
      <label for="username">Nombre:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Correo:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Crear Cuenta</button>
    </form>
  </div>
</template>

<script>
import {authenticateUser, register} from '../utils/auth';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      rol: 'USER',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      const isRegistered = await register(this.name, this.username, this.password, this.email, this.rol); // Registra al usuario

      if (isRegistered) {
        try {
          const response = await authenticateUser(this.username, this.password); // Logea al usuario
          if (response) {
            this.$router.push({name: 'Profile'}); // Redirigir al perfil
          } else {
            alert('Error al iniciar sesión automáticamente');
          }
        } catch (error) {
          console.error('Error al iniciar sesión después del registro:', error);
          alert('Error al iniciar sesión automáticamente');
        }
      } else {
        alert('Error al crear la cuenta');
      }
    },
  }
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
