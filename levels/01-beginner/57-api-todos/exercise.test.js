const {
  fetchTodosByUser,
  getCompletedTodos,
  getPendingTodos,
  countTodosByStatus,
  createTodo
} = require('./exercise');

// Mock global.fetch 
global.fetch = jest.fn();

describe('Ejercicio 57: Gestión de Tareas (TODOs)', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  const mockTodos = [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
    { userId: 1, id: 3, title: 'fugiat veniam minus', completed: true },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    { userId: 1, id: 5, title: 'laboriosam mollitia et enim quasi adipisci quia provident illum', completed: false }
  ];

  // ===== 1. fetchTodosByUser =====
  describe('fetchTodosByUser', () => {
    test('debe obtener todas las tareas de un usuario', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos
      });

      const todos = await fetchTodosByUser(1);
      
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos?userId=1');
      expect(todos).toHaveLength(5);
      expect(todos).toEqual(mockTodos);
    });

    test('debe manejar errores de red', async () => {
      fetch.mockRejectedValueOnce(new Error('Network Error'));
      await expect(fetchTodosByUser(1)).rejects.toThrow('Network Error');
    });
  });

  // ===== 2. getCompletedTodos =====
  describe('getCompletedTodos', () => {
    test('debe filtrar solo las tareas completadas', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos
      });

      const completed = await getCompletedTodos(1);
      
      expect(completed).toHaveLength(2); // IDs 3 y 4
      expect(completed[0].completed).toBe(true);
      expect(completed[1].completed).toBe(true);
    });
  });

  // ===== 3. getPendingTodos =====
  describe('getPendingTodos', () => {
    test('debe filtrar solo las tareas pendientes', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos
      });

      const pending = await getPendingTodos(1);
      
      expect(pending).toHaveLength(3); // IDs 1, 2, 5
      expect(pending[0].completed).toBe(false);
      expect(pending[1].completed).toBe(false);
    });
  });

  // ===== 4. countTodosByStatus =====
  describe('countTodosByStatus', () => {
    test('debe contar correctamente tareas completadas y pendientes', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos
      });

      const summary = await countTodosByStatus(1);
      
      expect(summary).toEqual({
        total: 5,
        completed: 2,
        pending: 3
      });
    });
  });

  // ===== 5. createTodo =====
  describe('createTodo', () => {
    test('debe enviar la petición POST con los datos correctos', async () => {
      const newTodo = {
        title: 'Comprar leche',
        userId: 1,
        completed: false,
        id: 201 // Simulado por la API
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => newTodo
      });

      const result = await createTodo(1, 'Comprar leche');

      // Verificar que fetch se llamó con POST y el body correcto
      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            title: 'Comprar leche',
            body: 'bar', // No requerido, pero a veces incluido en ejemplos
            userId: 1,
            completed: false
          })
        })
      );
      
      // Ajuste: cuerpo más simple para principiantes
      expect(fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
              body: expect.stringContaining('"title":"Comprar leche"')
          })
      );

      expect(result).toEqual(newTodo);
    });
  });

});
