<template>
  <div class="task-list">
    <h2>Lista de Tareas</h2>

    <!-- Filtros de búsqueda -->
    <div class="filters">
      <select v-model="filters.status">
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="notCompleted">No Completadas</option>
      </select>
      <input
          type="text"
          placeholder="Buscar por palabra clave..."
          v-model="filters.keyword"
      />
    </div>

    <!-- Listado de tareas filtradas -->
    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <div class="task-info">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <small>Vencimiento: {{ task.dueDate }}</small>
        </div>
        <div class="task-actions">
          <button @click="editTask(task)">Editar Tarea</button>
          <button @click="toggleTaskCompletion(task)">
            {{ task.isCompleted ? 'Desmarcar Completada' : 'Marcar Completada' }}
          </button>
          <button @click="confirmDeleteTask(task)">Eliminar Tarea</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      filters: {
        status: 'all',
        keyword: '',
      },
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) => {
        const matchesStatus =
            this.filters.status === 'all' ||
            (this.filters.status === 'completed' && task.isCompleted) ||
            (this.filters.status === 'notCompleted' && !task.isCompleted);
        const matchesKeyword = task.title
            .toLowerCase()
            .includes(this.filters.keyword.toLowerCase());
        return matchesStatus && matchesKeyword;
      });
    },
  },
  methods: {
    async fetchTasks() {
      // try {
      //   const response = await axios.get('/api/tasks');
      //   this.tasks = Array.isArray(response.data) ? response.data : [];
      // } catch (error) {
      //   console.error('Error al obtener las tareas:', error);
      //   this.tasks = [];
      // }
    },
    editTask(task) {
      this.$emit('editTask', task);
    },
    toggleTaskCompletion(task) {
      task.isCompleted = !task.isCompleted;
      this.$emit('taskUpdated', task);
    },
    confirmDeleteTask(task) {
      if (window.confirm(`¿Estás seguro de eliminar la tarea: "${task.title}"?`)) {
        this.$emit('deleteTask', task);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin-top: 120px;
  margin-left: 100px;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.filters select,
.filters input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.task-info h3 {
  margin: 0;
}
.task-actions button {
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.task-actions button:nth-child(3) {
  background-color: #dc3545;
}
</style>
