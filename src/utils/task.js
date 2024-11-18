import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8090';

export async function createTask(title, description, deadline) {
    try {
        const token = localStorage.getItem('token'); // Recupera el token JWT del almacenamiento local
        const userid = localStorage.getItem('id'); // Recupera el userId del almacenamiento local
        const status = false;
        const response = await axios.post('/api/v1/tasks/',
            { title, description, deadline, status, userid },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token JWT en el encabezado
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creando la tarea:', error.response?.data || error.message);
        throw error; 
    }
}

export async function getNotifiedTasks(userid){
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`/api/v1/tasks/${userid}/tasks/notify`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error obteniendo tareas notificadas:', error);
        throw error;
    }
}