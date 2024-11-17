<template>
  <div class="create-task-form">
    <h2>Crear Tarea</h2>
    <form @submit.prevent="submitTask">
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="task.title" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="task.description" rows="4"></textarea>
      </div>
      <div>
        <label for="deadline">Fecha de Vencimiento:</label>
        <input type="date" id="deadline" v-model="task.deadline" required />
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  </div>
</template>

<script>
import { createTask } from '../utils/auth';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        deadline: '',
      },
    };
  },
  methods: {
    async submitTask() {
      try {
        // Crear un objeto Date con la fecha seleccionada
        const deadlineDate = new Date(this.task.deadline);

        // Llamar a la función createTask con los datos del formulario
        const createdTask = await createTask(
            this.task.title,
            this.task.description,
            deadlineDate // Convertir la fecha con la hora ajustada
        );

        // Reiniciar el formulario
        this.task = { title: '', description: '', deadline: '' };
        alert('Tarea creada con éxito');
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al crear la tarea.');
      }
    },
  },
};
</script>

<style scoped>
.create-task-form {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  background-color: #5c5c5c;
  border-radius: 5px;
}
form div {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
textarea {
  resize: none;
}
</style>
