<template>
  <div class="home">
    <h2>Bienvenido a la Página de Inicio</h2>
    <p>Sistema de gestión de tareas</p>
    <img src="../images/holamati.png" alt="Imagen de broma xd">
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

body{
  min-height: 100vh;
  min-width: 100vw;
}
.home {
  padding: 2rem;
  margin-top: 100px;
}
.home img{
  height: 500px;
  margin-right: 1rem;
}
</style>
