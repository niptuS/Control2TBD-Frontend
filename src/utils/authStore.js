import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Inicializa desde localStorage
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', true);
        },
        logout() {
            this.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', false);
        },
    },
});
