import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8090';

export function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

export function login() {
    localStorage.setItem('isLoggedIn', 'true');
}

export function logout() {
    localStorage.setItem('isLoggedIn', 'false');
}

// función de prueba para manejar los logins
export async function authenticateUser(username, password) {
    try {
         const response = await axios.post('/api/authenticate', { username, password });

         if (response.data.isAuthenticated) {
             login();
             return true;
         } else {
             return false;
         }
     } catch (error) {
         console.error('Error al autenticar al usuario:', error);
         return false;
     }
}

export async function register(name, username, password, email, rol) {
    try {
        const response = await axios.post('/auth/register', { name, username, password, email, rol });

        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al crear usuario:', error.response?.data || error.message);
        return false;
    }
}
