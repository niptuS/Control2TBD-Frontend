import axios from "axios";
import { useAuthStore } from '../utils/authStore';

axios.defaults.baseURL = 'http://localhost:8090';

export function login() {
    const authStore = useAuthStore();
    authStore.login();
}

export function logout() {
    const authStore = useAuthStore();
    authStore.logout();
}


// función de prueba para manejar los logins
export async function authenticateUser(username, password) {
    try {
        const response = await axios.post('/auth/login', { username, password });

        // Captura el JWT desde los headers
        const token = response.headers['authorization']; // Headers son case-insensitive, pero Axios lo devuelve en minúsculas.

        // Captura el userId desde el body
        const userIdFound = response.data;

        if (token) {
            login(); // Marca al usuario como autenticado y cambia su Logging Status
            localStorage.setItem('id', userIdFound); // Guarda solo el id
            localStorage.setItem('token', token); // Guarda solo el JWT
            return true; // Login exitoso
        } else {
            console.log("Token no encontrado en los headers");
            return false; // Falla si no hay token
        }
    } catch (error) {
        console.error('Error al autenticar al usuario:', error.response?.data || error.message);
        return false;
    }
}


export async function register(name, username, password, email, rol) {
    try {
        const response = await axios.post('/auth/register', { name, password, username, email, rol });

        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al crear usuario:', error.response?.data || error.message);
        return false;
    }
}


export async function createTask(title, description, deadline) {
    try {
        console.log('Datos enviados:', title, description, deadline);
        const token = localStorage.getItem('token'); // Recupera el token JWT del almacenamiento local
        const userid = localStorage.getItem('id'); // Recupera el userId del almacenamiento local
        const response = await axios.post(
            '/api/v1/tasks/',
            { title, description, deadline, userid },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token JWT en el encabezado
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creando la tarea:', error.response?.data || error.message);
        throw error; // Lanza el error
    }
}
