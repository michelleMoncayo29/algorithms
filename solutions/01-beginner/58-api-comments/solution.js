/**
 * @file solution.js
 * @description Solución al ejercicio de análisis de comentarios.
 */

// 1. Obtener comentarios de un post
async function fetchCommentsByPost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

// 2. Extraer emails de los comentaristas
async function getCommentersEmails(postId) {
  const comments = await fetchCommentsByPost(postId);
  return comments.map(comment => comment.email);
}

// 3. Contar comentarios por TLD
async function countCommentsByDomain(postId) {
  const emails = await getCommentersEmails(postId);
  
  // Usamos reduce para acumular los contadores
  return emails.reduce((acc, email) => {
    const tld = email.split('.').pop(); // Obtener última parte (com, biz, net)
    
    // Inicializar a 0 si no existe y sumar 1
    acc[tld] = (acc[tld] || 0) + 1;
    
    return acc;
  }, {});
}

// Helper para obtener el post (no exportado, solo usado internamente)
async function fetchPost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

// 4. Obtener post combinado con sus comentarios
async function getPostWithComments(postId) {
  // Ejecutamos en paralelo para eficiencia
  const [post, comments] = await Promise.all([
    fetchPost(postId),
    fetchCommentsByPost(postId)
  ]);

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    comments: comments,
    totalComments: comments.length
  };
}

// 5. Buscar comentarios globalmente
async function searchComments(query) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?q=${query}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
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
