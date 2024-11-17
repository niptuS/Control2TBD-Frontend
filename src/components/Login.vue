<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent=handleLogin>
      <label for="username">Usuario:</label>
      <input v-model="username" type="text" id="username" required />
      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" id="password" required />
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { authenticateUser } from '../utils/auth';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const isAuthenticated = await authenticateUser(this.username, this.password);
      if (isAuthenticated) {
        this.$router.push({ name: 'Profile' });
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  },
};
</script>

<style scoped>
.login {
  padding: 2rem;
  margin-top: 100px;
}
.login form {
  display: flex;
  flex-direction: column;
}
.login label {
  margin-top: 0.5rem;
}
.login button {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
