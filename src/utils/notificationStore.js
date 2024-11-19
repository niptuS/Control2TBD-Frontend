import { defineStore } from 'pinia';
import { getNotifiedTasks } from '../utils/task';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
      notificationCount: 0, 
      notifiedTasks: [],    
    }),
    actions: {
      async fetchNotifiedTasks() {
        try {
          const userId = localStorage.getItem('id');
          const tasks = await getNotifiedTasks(userId); 
          this.notificationCount = tasks.length;       
          this.notifiedTasks = tasks;                 
        } catch (error) {
          console.error('Error al obtener las tareas notificadas:', error);
          this.notificationCount = 0;
          this.notifiedTasks = [];                    
        }
      },
    },
  });
  