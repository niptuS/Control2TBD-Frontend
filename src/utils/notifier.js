import axios from 'axios';
import { useNotificationStore } from '../utils/notificationStore';

axios.defaults.baseURL = 'http://localhost:8090';

export async function updateNotifier(notifier) {
  const token = localStorage.getItem('token'); 
  const response = await axios.put('/api/v1/notifiers/update', notifier, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  const notificationStore = useNotificationStore();
  await notificationStore.fetchNotifiedTasks();

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

        const notificationStore = useNotificationStore();
        await notificationStore.fetchNotifiedTasks();
        return response.data;
    } catch (error) {
        console.error('Error obteniendo configuración de notificaciones:', error);
        throw error;
    }
}