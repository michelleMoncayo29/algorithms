/**
 * @file solution.js
 * @description Solución al ejercicio de gestión de tareas (TODOs).
 */

/**
 * Obtiene todas las tareas de un usuario específico.
 */
async function fetchTodosByUser(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Obtiene solo las tareas completadas de un usuario.
 */
async function getCompletedTodos(userId) {
  const todos = await fetchTodosByUser(userId);
  return todos.filter(todo => todo.completed === true);
}

/**
 * Obtiene solo las tareas pendientes de un usuario.
 */
async function getPendingTodos(userId) {
  const todos = await fetchTodosByUser(userId);
  return todos.filter(todo => todo.completed === false);
}

/**
 * Cuenta las tareas por estado y retorna un resumen.
 */
async function countTodosByStatus(userId) {
  const todos = await fetchTodosByUser(userId);
  
  const completed = todos.filter(todo => todo.completed).length;
  const pending = todos.filter(todo => !todo.completed).length;
  
  return {
    total: todos.length,
    completed,
    pending
  };
}

/**
 * Crea una nueva tarea para un usuario.
 */
async function createTodo(userId, title) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: 'bar', // Este campo es opcional para este ejercicio, pero común en JSONPlaceholder
      userId: userId,
      completed: false // Estado inicial por defecto
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Error al crear tarea: ${response.status}`);
  }

  return response.json();
}

module.exports = {
  fetchTodosByUser,
  getCompletedTodos,
  getPendingTodos,
  countTodosByStatus,
  createTodo
};
