// src/services/apiClient.js o src/utils/apiClient.js
import axios from 'axios';

// --- CONFIGURACIÓN IMPORTANTE ---
// Reemplaza esta URL base con la URL real de tu backend.
// Por ejemplo: 'http://localhost:3000/api' o 'https://tudominio.com/api'
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Usando JSONPlaceholder para ejemplo

// Crea una instancia de Axios con configuración por defecto
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes añadir otros encabezados comunes, como tokens de autorización.
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

/**
 * Función genérica para realizar peticiones HTTP (GET, POST, PUT).
 *
 * @param {string} method - El método HTTP ('get', 'post', 'put').
 * @param {string} endpoint - La ruta específica del API (ej. '/users', '/posts/1').
 * @param {object} [data] - Los datos a enviar en el cuerpo de la petición (para POST/PUT).
 * @param {object} [config] - Configuración adicional de Axios (ej. headers personalizados).
 * @returns {Promise<any>} - Una promesa que resuelve con los datos de la respuesta.
 */
const callApi = async (method, endpoint, data = null, config = {}) => {
  try {
    let response;
    const url = `${endpoint}`; // Axios ya maneja baseURL automáticamente

    switch (method.toLowerCase()) {
      case 'get':
        response = await apiClient.get(url, config);
        break;
      case 'post':
        response = await apiClient.post(url, data, config);
        break;
      case 'put':
        response = await apiClient.put(url, data, config);
        break;
      default:
        throw new Error(`Método HTTP no soportado: ${method}`);
    }

    return response.data; // Devuelve solo la parte 'data' de la respuesta de Axios
  } catch (error) {
    // Manejo centralizado de errores
    console.error(`Error en la petición ${method.toUpperCase()} a ${endpoint}:`, error);

    // Puedes lanzar el error de nuevo para que los componentes que llamen a esta función lo manejen.
    // Por ejemplo, para mostrar mensajes específicos al usuario.
    if (error.response) {
      // El servidor respondió con un status diferente de 2xx (ej. 404, 500)
      console.error('Datos de error del servidor:', error.response.data);
      console.error('Status del error:', error.response.status);
      console.error('Headers del error:', error.response.headers);
      throw new Error(error.response.data.message || 'Error del servidor.');
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta (ej. red caída)
      console.error('No se recibió respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Algo pasó al configurar la petición que provocó un error
      console.error('Error al configurar la petición:', error.message);
      throw new Error(`Error al procesar la petición: ${error.message}`);
    }
  }
};

// Exporta la función para poder usarla en tus componentes
export default callApi;

// También puedes exportar funciones específicas si lo prefieres para mayor claridad en el uso
export const get = (endpoint, config) => callApi('get', endpoint, null, config);
export const post = (endpoint, data, config) => callApi('post', endpoint, data, config);
export const put = (endpoint, data, config) => callApi('put', endpoint, data, config);