import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

export async function updateNotifier(notifier) {
  const token = localStorage.getItem('token'); // Recupera el token JWT
  const response = await axios.put('/api/v1/notifiers/update', notifier, {
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token JWT en el encabezado
    },
  });
  return response.data;
}

export async function getUserNotifier(id) {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`/api/v1/notifiers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        });
        return response.data;
    } catch (error) {
        console.error('Error obteniendo configuración de notificaciones:', error);
        throw error;
    }
}