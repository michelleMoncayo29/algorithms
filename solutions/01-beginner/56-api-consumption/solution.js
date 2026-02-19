/**
 * @file exercise.js
 * @description Solución al ejercicio de consumo de API.
 */

/**
 * Obtiene los detalles de un usuario desde la API.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/users/{id}
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al objeto usuario.
 * @throws {Error} Si la petición falla o el usuario no existe (404).
 */
async function fetchUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Obtiene los posts de un usuario desde la API.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/posts?userId={id}
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de posts.
 */
async function fetchUserPosts(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Obtiene un resumen formateado del perfil del usuario.
 * 
 * Debe combinar la información del usuario y sus posts.
 * 
 * Estructura de retorno:
 * {
 *   id: number,
 *   fullName: string,       // Usuario.name
 *   email: string,          // Usuario.email
 *   addressSummary: string, // "Calle, Ciudad" (ej. "Kulas Light, Gwenborough")
 *   totalPosts: number      // Cantidad de posts del usuario
 * }
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al perfil formateado.
 * @throws {Error} Si el usuario no existe.
 */
async function getFormattedUserProfile(id) {
  // Ejecutamos las peticiones en paralelo para mejor rendimiento
  // aunque secuencial (await fetchUser; await fetchPosts) también es válido para principiantes
  // Usaremos Promise.all para demostrar una buena práctica
  const [user, posts] = await Promise.all([
    fetchUser(id),
    fetchUserPosts(id)
  ]);

  return {
    id: user.id,
    fullName: user.name,
    email: user.email,
    addressSummary: `${user.address.street}, ${user.address.city}`,
    totalPosts: posts.length
  };
}

module.exports = {
  fetchUser,
  fetchUserPosts,
  getFormattedUserProfile
};
