<template>
  <div class="edit-task-form">
    <h2>Editar Tarea</h2>
    <form @submit.prevent="editTask">
      <div>
        <label for="title">Título:</label>
        <input type="text" v-model="task.title" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea v-model="task.description" rows="4"></textarea>
      </div>
      <div>
        <label for="dueDate">Fecha de Vencimiento:</label>
        <input type="date" v-model="task.dueDate" required />
      </div>
      <div>
        <label for="isCompleted">Completado:</label>
        <input type="checkbox" v-model="task.isCompleted" />
      </div>
      <button type="submit">Actualizar Tarea</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialTask: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      task: { ...this.initialTask },
    };
  },
  methods: {
    editTask() {
      // Aqui hacer la petición al backend
      // axios.put(`/api/tasks/${this.task.id}`, this.task)
      //   .then(response => {
      //     this.$emit('taskUpdated', response.data);
      //   })
      //   .catch(error => console.error('Error actualizando tarea:', error));

      this.$emit('taskUpdated', { ...this.task });
    },
  },
};
</script>

<style scoped>
.edit-task-form {
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
