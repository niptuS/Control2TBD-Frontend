import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

export async function getUserById(id) {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`/api/v1/users/byId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el usuario:', error);
    throw error;
  }
}


