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
  try {
    // 1. Obtener datos de la API usando el parámetro postId
    const consult = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    
    if (!consult.ok) {
      throw new Error(`Failed to fetch user`);
    }

    let consultJson = await consult.json();

    // 2. Retornar el array de comentarios
    // console.log('primera función', consultJson);

    return consultJson;
  } catch (messenge) {
    throw new Error('Network Error');
  }
}

// fetchCommentsByPost(1);

/**
 * Obtiene solo los emails de los usuarios que comentaron en un post.
 * 
 * @param {number} postId - El ID del post.
 * @returns {Promise<Array<string>>} Promesa que resuelve al array de emails.
 */
async function getCommentersEmails(postId) {
  // Tu código aquí
  // 1. Llamar a fetchCommentsByPost(postId)
  const postComment = await fetchCommentsByPost(postId);
  // 2. Mapear el resultado para obtener solo la propiedad 'email'
  const comment = postComment.map(post => post.email);
  // console.log('✅✅✅✅✅✅', comment);
  return comment;
}
// getCommentersEmails(1);

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
  const commentDomain = await getCommentersEmails(postId);

  return commentDomain.reduce((acc, email) => {
    // 2. Extraer el dominio (parte después del último punto) de cada email
    const tld = email.split('.').pop();
    
    // Inicializar a 0 si no existe y sumar 1
    acc[tld] = (acc[tld] || 0) + 1;
    
    return acc;
  }, {});
  // 3. Contar cuántos hay de cada uno (usando un objeto o reduce)
}

// countCommentsByDomain(1);

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

  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?q=${query}`);
  
  if (!response.ok) {
    throw new Error(`Network Error`);
  }
  
  return response.json();
}

module.exports = {
  fetchCommentsByPost,
  getCommentersEmails,
  countCommentsByDomain,
  getPostWithComments,
  searchComments
};
