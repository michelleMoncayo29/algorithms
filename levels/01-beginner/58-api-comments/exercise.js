/**
 * @file exercise.js
 * @description Ejercicio de análisis de comentarios consumiendo una API.
 */

/**
 * Obtiene todos los comentarios de un post específico.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/comments?postId={id}
 * 
 * @param {number} postId - El ID del post.
 * @returns {Promise<Array>} Promesa que resuelve al array de comentarios.
 */
async function fetchCommentsByPost(postId) {
  // Tu código aquí
  // 1. Obtener datos de la API usando el parámetro postId
  // 2. Retornar el array de comentarios
}

/**
 * Obtiene solo los emails de los usuarios que comentaron en un post.
 * 
 * @param {number} postId - El ID del post.
 * @returns {Promise<Array<string>>} Promesa que resuelve al array de emails.
 */
async function getCommentersEmails(postId) {
  // Tu código aquí
  // 1. Llamar a fetchCommentsByPost(postId)
  // 2. Mapear el resultado para obtener solo la propiedad 'email'
}

/**
 * Cuenta los comentarios por dominio de nivel superior (.com, .net, etc.).
 * 
 * @param {number} postId - El ID del post.
 * @returns {Promise<Object>} Promesa que resuelve al objeto de conteo.
 * Estructura: { "com": 5, "net": 2, "biz": 1 }
 */
async function countCommentsByDomain(postId) {
  // Tu código aquí
  // 1. Llamar a getCommentersEmails(postId)
  // 2. Extraer el dominio (parte después del último punto) de cada email
  // 3. Contar cuántos hay de cada uno (usando un objeto o reduce)
}

/**
 * Obtiene el post y sus comentarios combinados.
 * 
 * Endpoints:
 * - Post: https://jsonplaceholder.typicode.com/posts/{id}
 * - Comentarios: Usa fetchCommentsByPost
 * 
 * @param {number} postId - El ID del post.
 * @returns {Promise<Object>} Promesa que resuelve al post enriquecido.
 * Estructura: { id, title, body, comments: [], totalComments: number }
 */
async function getPostWithComments(postId) {
  // Tu código aquí
  // 1. Obtener el post y los comentarios (pueden ser paralelos)
  // 2. Crear el objeto combinado
  // 3. Retornar el resultado
}

/**
 * Busca comentarios que contengan una palabra clave.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/comments?q={query}
 * 
 * @param {string} query - El texto a buscar.
 * @returns {Promise<Array>} Promesa que resuelve al array de comentarios encontrados.
 */
async function searchComments(query) {
  // Tu código aquí
  // 1. Hacer petición fetch con el parámetro q
  // 2. Retornar los resultados
}

module.exports = {
  fetchCommentsByPost,
  getCommentersEmails,
  countCommentsByDomain,
  getPostWithComments,
  searchComments
};
