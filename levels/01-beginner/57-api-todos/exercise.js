/**
 * @file exercise.js
 * @description Ejercicio de gestión de tareas (TODOs) consumiendo una API.
 */

/**
 * Obtiene todas las tareas de un usuario específico.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/todos?userId={id}
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas.
 */
async function fetchTodosByUser(userId) {
  // Tu código aquí
  // 1. Obtener datos de la API
  try {
    const consult = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

    // console.log(consult.json());

    if (!consult.ok) {
      throw new Error(`Failed to fetch user`);
    }

    let data = await consult.json();
    console.log(data);

    return data;
  } catch (error) {
    throw new Error('Error url');
  }
  // 2. Retornar el array completo
}

fetchTodosByUser(1);

/**
 * Obtiene solo las tareas completadas de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas completadas.
 */
async function getCompletedTodos(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  // 2. Filtrar el resultado para obtener solo las tareas con completed: true
}

/**
 * Obtiene solo las tareas pendientes de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas pendientes.
 */
async function getPendingTodos(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  // 2. Filtrar el resultado para obtener solo las tareas con completed: false
}

/**
 * Cuenta las tareas por estado y retorna un resumen.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al resumen de conteo.
 * Estructura del objeto: { total: number, completed: number, pending: number }
 */
async function countTodosByStatus(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  // 2. Calcular cuántas están completadas y cuántas pendientes
  // 3. Retornar el objeto resumen
}

/**
 * Crea una nueva tarea para un usuario.
 * 
 * Método: POST
 * Endpoint: https://jsonplaceholder.typicode.com/todos
 * Body: { userId: number, title: string, completed: false }
 * 
 * @param {number} userId - El ID del usuario.
 * @param {string} title - El título de la tarea.
 * @returns {Promise<Object>} Promesa que resuelve a la tarea creada (respuesta de la API).
 */
async function createTodo(userId, title) {
  // Tu código aquí
  // 1. Configurar la petición fetch con método POST
  // 2. Incluir headers y body JSON
  // 3. Enviar la petición y retornar la respuesta
}

module.exports = {
  fetchTodosByUser,
  getCompletedTodos,
  getPendingTodos,
  countTodosByStatus,
  createTodo
};
