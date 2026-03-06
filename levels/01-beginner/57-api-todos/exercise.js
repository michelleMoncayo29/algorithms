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
    throw new Error('Network Error');
  }
  // 2. Retornar el array completo
}

// fetchTodosByUser(1);

/**
 * Obtiene solo las tareas completadas de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas completadas.
 */
async function getCompletedTodos(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  const data = await fetchTodosByUser(userId);
  // 2. Filtrar el resultado para obtener solo las tareas con completed: false
  return data.filter(todo => todo.completed === true);
}
// getCompletedTodos(1);

/**
 * Obtiene solo las tareas pendientes de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas pendientes.
 */
async function getPendingTodos(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  const data = await fetchTodosByUser(userId);
  // 2. Filtrar el resultado para obtener solo las tareas con completed: false
  return data.filter(item => item.completed===false);
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
  const data = await fetchTodosByUser(userId);
  // 2. Calcular cuántas están completadas y cuántas pendientes
  const completed = data.filter(todo => todo.completed).length;
  const pending = data.filter(todo => !todo.completed).length;
  // 3. Retornar el objeto resumen

  const sum = completed + pending;

  return {
    total: sum,
    completed,
    pending
  }
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
  try {
    // 1. Configurar la petición fetch con método POST
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      // 2. Incluir headers para indicar que enviamos JSON
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      // 3. El cuerpo debe ser un string (JSON.stringify)
      body: JSON.stringify({
        userId: userId,
        title: title,
        completed: false
      })
    });

    // Validamos si la respuesta es exitosa (status 201 para creación)
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    // 4. Retornar la respuesta convertida a objeto JS
    return await response.json();

  } catch (error) {
    // Captura errores de red o errores lanzados arriba
    console.error('Hubo un problema:', error.message);
    throw error; 
  }
}

module.exports = {
  fetchTodosByUser,
  getCompletedTodos,
  getPendingTodos,
  countTodosByStatus,
  createTodo
};
