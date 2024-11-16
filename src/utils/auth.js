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
        const response = await axios.post('/auth/login', { username, password });

        // Captura el JWT desde los headers
        const token = response.headers['authorization']; // Headers son case-insensitive, pero Axios lo devuelve en minúsculas.

        if (token) {
            login(); // Marca al usuario como autenticado y cambia su Logging Status
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
