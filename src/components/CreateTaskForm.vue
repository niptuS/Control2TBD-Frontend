<template>
  <div class="create-task-form">
    <h2>Crear Tarea</h2>
    <form @submit.prevent="createTask">
      <div>
        <label for="title">Título:</label>
        <input type="text" v-model="task.title" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea v-model="task.description" rows="4" ></textarea>
      </div>
      <div>
        <label for="dueDate">Fecha de Vencimiento:</label>
        <input type="date" v-model="task.dueDate" required />
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        dueDate: '',
      },
    };
  },
  methods: {
    async createTask() {
      // Te toca pato :v (algo parecido a esto)
      // try {
      //   const response = await axios.post('/api/tasks', this.task);
      //   this.$emit('taskCreated', response.data);
      //   this.task = { title: '', description: '', dueDate: '' };
      // } catch (error) {
      //   console.error('Error creando la tarea:', error);
      // }
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
  align-self: center;
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
