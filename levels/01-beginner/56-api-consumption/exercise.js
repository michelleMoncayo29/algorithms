/**
 * @file exercise.js
 * @description Ejercicio de consumo de API usando fetch y async/await.
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
  // Tu código aquí
  // 1. Definir URL base: https://jsonplaceholder.typicode.com
  try {
    // 2. Hacer petición fetch a URL + /users/{id}
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // 3. Verificar si la respuesta es exitosa (response.ok)
    if (!request.ok) {
      throw new Error(`Failed to fetch user`);
    }

    let user = await request.json();
    console.log('El nombre de el usuario es:', user.name);
    // 5. Retornar el JSON de la respuesta
    return user;
  } catch (error) {
    // 4. Si no es exitosa, lanzar un error
    throw new Error('Network Error');
  }
}

// fetchUser(1);

/**
 * Obtiene los posts de un usuario desde la API.
 *
 * Endpoint: https://jsonplaceholder.typicode.com/posts?userId={id}
 *
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de posts.
 */
async function fetchUserPosts(id) {
  // Tu código aquí
  try {
    // 1. Hacer petición fetch a URL + /posts?userId={id}
    const statusRequest = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );

    // 2. Verificar si la respuesta es exitosa
    if (!statusRequest.ok) {
      throw new Error('Error HTTP, 404');
    }

    // 3. Retornar el JSON (array de posts)
    let status = await statusRequest.json();
    return status;
  } catch (error) {
    throw new Error('Error http, 404');
  }
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
  // Tu código aquí
  try {
    // 1. Llamar a fetchUser(id)
    const user = await fetchUser(id);
    // 2. Llamar a fetchUserPosts(id)
    const status = await fetchUserPosts(id);

    if (!user && !status) {
      throw new Error('Error user');
    }

    console.log({
      id: user.id,
      fullName: user.name,
      email: user.email,
      addressSummary: `${user.address.street}, ${user.address.city}`,
      totalPosts: status.length,
    });

    return {
      id: user.id,
      fullName: user.name,
      email: user.email,
      addressSummary: `${user.address.street}, ${user.address.city}`,
      totalPosts: status.length,
    };

  } catch (error) {
    throw new Error('Error en la petición');
  }
  // 3. Extraer los datos necesarios
  // 4. Retornar el objeto con la estructura requerida
}

// getFormattedUserProfile(1);

module.exports = {
  fetchUser,
  fetchUserPosts,
  getFormattedUserProfile,
};
