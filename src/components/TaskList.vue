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
          <small>Vencimiento: {{ task.deadline.split('T')[0] }}</small>
        </div>
        <div class="task-actions">
          <button @click="editTask(task)">Editar Tarea</button>
          <button @click="toggleTaskCompletion(task)">
            {{ task.status ? 'Desmarcar Completada' : 'Marcar Completada' }}
          </button>
          <button @click="confirmDeleteTask(task)">Eliminar Tarea</button>
        </div>
      </li>
    </ul>

    <!-- Modal para editar tarea -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h3>Editar Tarea</h3>
        <form @submit.prevent="updateTask">
          <div>
            <label for="title">Título:</label>
            <input v-model="editableTask.title" id="title" type="text" required />
          </div>
          <div>
            <label for="description">Descripción:</label>
            <textarea v-model="editableTask.description" id="description" required></textarea>
          </div>
          <div>
            <label for="deadline">Fecha de Vencimiento:</label>
            <input v-model="editableTask.deadline" id="deadline" type="date" required />
          </div>
          <div class="modal-actions">
            <button type="submit">Guardar Cambios</button>
            <button type="button" @click="cancelEdit">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
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
      isEditing: false,
      editableTask: null,
    };
  },

  computed: {
    filteredTasks() {
      return this.tasks.filter((task) => {
        const matchesStatus =
            this.filters.status === 'all' ||
            (this.filters.status === 'completed' && task.status) ||
            (this.filters.status === 'notCompleted' && !task.status);
        const matchesKeyword = task.title
            .toLowerCase()
            .includes(this.filters.keyword.toLowerCase());
        return matchesStatus && matchesKeyword;
      });
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token'); // Recupera el token JWT del almacenamiento local
        const userid = localStorage.getItem('id'); // Recupera el userId del almacenamiento local
        const response = await axios.get(
            `/api/v1/tasks/${userid}/tasks`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Incluye el token JWT en el encabezado
              }
            });
        this.tasks = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
         console.error('Error al obtener las tareas:', error);
         this.tasks = [];
      }
    },
    editTask(task) {
      this.editableTask = { ...task };
      this.isEditing = true;
    },
    async updateTask() {
      try {
        const token = localStorage.getItem('token'); // Token JWT
        const formattedTask = {
          ...this.editableTask,
          deadline: this.editableTask.deadline + 'T00:00:00', // Formatear fecha si es necesario
        };
        const response = await axios.put(`/api/v1/tasks/${this.editableTask.taskid}`, formattedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Actualiza la lista de tareas local con la respuesta del servidor
        const updatedTask = response.data;
        const index = this.tasks.findIndex((task) => task.taskid === updatedTask.taskid);
        if (index !== -1) {
          this.tasks.splice(index, 1, updatedTask); // Reemplaza la tarea editada
        }
        this.isEditing = false;
        this.editableTask = null;
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editableTask = null;
    },
    async toggleTaskCompletion(task) {
      try {
        const token = localStorage.getItem('token'); // Token JWT
        // Modificar el estado de la tarea
        const updatedTask = { ...task, status: !task.status }; // Cambia el status a su contrario
        const response = await axios.put(`/api/v1/tasks/${task.taskid}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Actualiza la lista local con los datos del servidor
        const index = this.tasks.findIndex((t) => t.taskid === task.taskid);
        if (index !== -1) {
          this.tasks[index] = response.data; // Actualiza la tarea en la lista local
        }
      } catch (error) {
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    },
    async confirmDeleteTask(task) {
      if (window.confirm(`¿Estás seguro de eliminar la tarea: "${task.title}"?`)) {
        try {
          const token = localStorage.getItem('token'); // Token JWT
          await axios.delete(`/api/v1/tasks/delete`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data: task, // Aquí se envía el objeto Task completo en el cuerpo de la petición
          });
          // Elimina la tarea de la lista local
          this.tasks = this.tasks.filter((t) => t.taskid !== task.taskid);
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
        }
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
  max-width: 800px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
