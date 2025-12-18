const { Task, TaskManager } = require('./exercise');

describe('Gestor de Tareas', () => {
    // ===== CASOS BÁSICOS - CLASE TASK =====
    describe('Clase Task - Casos básicos', () => {
        test('crea una tarea con propiedades correctas', () => {
            // Este test verifica que el constructor de Task asigna correctamente las propiedades básicas.
            // Se espera que al crear una tarea, sus propiedades se inicialicen con los valores proporcionados.
            const task = new Task('Comprar leche', 'high', false);
            expect(task.description).toBe('Comprar leche');
            expect(task.priority).toBe('high');
            expect(task.completed).toBe(false);
        });

        test('crea una tarea con valores por defecto', () => {
            // Este test verifica que cuando no se proporcionan algunos parámetros, se usan los valores por defecto.
            // El comportamiento esperado es que priority sea 'medium' y completed sea false si no se especifican.
            const task = new Task('Hacer ejercicio');
            expect(task.description).toBe('Hacer ejercicio');
            expect(task.priority).toBe('medium');
            expect(task.completed).toBe(false);
        });

        test('toggleComplete cambia el estado de completado', () => {
            // Este test verifica que toggleComplete alterna correctamente el estado completed de la tarea.
            // Se espera que si la tarea está pendiente, la marque como completada, y viceversa.
            const task = new Task('Tarea de prueba');
            expect(task.completed).toBe(false);
            
            const newState = task.toggleComplete();
            expect(task.completed).toBe(true);
            expect(newState).toBe(true);
            
            task.toggleComplete();
            expect(task.completed).toBe(false);
        });
    });

    // ===== VALIDACIONES - CLASE TASK =====
    describe('Clase Task - Validaciones', () => {
        test('lanza error cuando la descripción está vacía', () => {
            // Este test verifica que el constructor valida que la descripción no esté vacía.
            // Se espera que lance un error descriptivo cuando se intenta crear una tarea sin descripción.
            expect(() => new Task('')).toThrow('Task description is required');
        });

        test('lanza error cuando la descripción es solo espacios', () => {
            // Este test verifica que el constructor rechaza descripciones que solo contienen espacios en blanco.
            // El comportamiento esperado es tratar espacios en blanco como descripción inválida.
            expect(() => new Task('   ')).toThrow('Task description is required');
        });

        test('lanza error cuando la prioridad es inválida', () => {
            // Este test verifica que el constructor valida que la prioridad sea uno de los valores permitidos.
            // Se espera que lance un error cuando se intenta crear una tarea con una prioridad inválida.
            expect(() => new Task('Tarea', 'invalid')).toThrow("Priority must be 'low', 'medium', or 'high'");
        });

        test('acepta todas las prioridades válidas', () => {
            // Este test verifica que todas las prioridades válidas son aceptadas correctamente.
            // El comportamiento esperado es que 'low', 'medium' y 'high' sean todos válidos.
            const task1 = new Task('Tarea 1', 'low');
            const task2 = new Task('Tarea 2', 'medium');
            const task3 = new Task('Tarea 3', 'high');
            
            expect(task1.priority).toBe('low');
            expect(task2.priority).toBe('medium');
            expect(task3.priority).toBe('high');
        });
    });

    // ===== CASOS BÁSICOS - CLASE TASKMANAGER =====
    describe('Clase TaskManager - Casos básicos', () => {
        test('inicializa con array vacío de tareas', () => {
            // Este test verifica que el constructor de TaskManager inicializa correctamente el array de tareas.
            // Se espera que al crear un gestor nuevo, el array de tareas esté vacío.
            const manager = new TaskManager();
            expect(manager.tasks).toEqual([]);
        });

        test('addTask agrega una nueva tarea y la retorna', () => {
            // Este test verifica que addTask crea y agrega una nueva tarea al gestor.
            // El comportamiento esperado es que la tarea se agregue al array y se retorne la instancia creada.
            const manager = new TaskManager();
            const task = manager.addTask('Nueva tarea', 'high');
            
            expect(task).toBeInstanceOf(Task);
            expect(task.description).toBe('Nueva tarea');
            expect(manager.tasks).toHaveLength(1);
            expect(manager.tasks[0]).toBe(task);
        });

        test('addTask puede agregar múltiples tareas', () => {
            // Este test verifica que se pueden agregar múltiples tareas al gestor.
            // Se espera que cada tarea se agregue correctamente y el array crezca en tamaño.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            manager.addTask('Tarea 3', 'low');
            
            expect(manager.tasks).toHaveLength(3);
        });
    });

    // ===== MÉTODO find() - BUSCAR TAREAS =====
    describe('Método findTask() - Usa find()', () => {
        test('encuentra una tarea existente por descripción', () => {
            // Este test verifica que findTask encuentra correctamente una tarea usando find().
            // Se espera que cuando existe una tarea con la descripción buscada, se retorne esa tarea.
            const manager = new TaskManager();
            const task1 = manager.addTask('Comprar pan', 'high');
            manager.addTask('Llamar a mamá', 'medium');
            
            const found = manager.findTask('Comprar pan');
            expect(found).toBe(task1);
            expect(found.description).toBe('Comprar pan');
        });

        test('retorna null cuando no encuentra la tarea', () => {
            // Este test verifica que findTask retorna null cuando no existe una tarea con esa descripción.
            // El comportamiento esperado es que find() no encuentre nada y se retorne null.
            const manager = new TaskManager();
            manager.addTask('Tarea existente', 'high');
            
            const found = manager.findTask('Tarea inexistente');
            expect(found).toBeNull();
        });

        test('findTask es case-sensitive', () => {
            // Este test verifica que la búsqueda distingue entre mayúsculas y minúsculas.
            // Se espera que 'Tarea' y 'tarea' se consideren descripciones diferentes.
            const manager = new TaskManager();
            manager.addTask('Tarea con Mayúscula', 'high');
            
            const found = manager.findTask('tarea con mayúscula');
            expect(found).toBeNull();
        });

        test('encuentra la primera tarea cuando hay duplicados', () => {
            // Este test verifica que find() retorna la primera coincidencia cuando hay múltiples tareas con la misma descripción.
            // El comportamiento esperado es que find() encuentre la primera tarea que coincida.
            const manager = new TaskManager();
            const firstTask = manager.addTask('Tarea duplicada', 'high');
            manager.addTask('Tarea duplicada', 'medium');
            
            const found = manager.findTask('Tarea duplicada');
            expect(found).toBe(firstTask);
        });
    });

    // ===== MÉTODO filter() - FILTRAR TAREAS =====
    describe('Métodos con filter() - Filtrar tareas', () => {
        test('getPendingTasks retorna solo tareas no completadas', () => {
            // Este test verifica que getPendingTasks filtra correctamente usando filter() para obtener solo tareas pendientes.
            // Se espera que retorne un nuevo array con todas las tareas que tienen completed === false.
            const manager = new TaskManager();
            const task1 = manager.addTask('Tarea 1', 'high');
            const task2 = manager.addTask('Tarea 2', 'medium');
            const task3 = manager.addTask('Tarea 3', 'low');
            
            task2.toggleComplete(); // Marcar una como completada
            
            const pending = manager.getPendingTasks();
            expect(pending).toHaveLength(2);
            expect(pending).toContain(task1);
            expect(pending).toContain(task3);
            expect(pending).not.toContain(task2);
        });

        test('getCompletedTasks retorna solo tareas completadas', () => {
            // Este test verifica que getCompletedTasks filtra correctamente usando filter() para obtener solo tareas completadas.
            // Se espera que retorne un nuevo array con todas las tareas que tienen completed === true.
            const manager = new TaskManager();
            const task1 = manager.addTask('Tarea 1', 'high');
            const task2 = manager.addTask('Tarea 2', 'medium');
            const task3 = manager.addTask('Tarea 3', 'low');
            
            task1.toggleComplete();
            task3.toggleComplete(); // Marcar dos como completadas
            
            const completed = manager.getCompletedTasks();
            expect(completed).toHaveLength(2);
            expect(completed).toContain(task1);
            expect(completed).toContain(task3);
            expect(completed).not.toContain(task2);
        });

        test('getTasksByPriority filtra correctamente por prioridad', () => {
            // Este test verifica que getTasksByPriority filtra correctamente usando filter() para obtener tareas de una prioridad específica.
            // Se espera que retorne un nuevo array con todas las tareas que tienen la prioridad especificada.
            const manager = new TaskManager();
            const task1 = manager.addTask('Tarea alta 1', 'high');
            const task2 = manager.addTask('Tarea media', 'medium');
            const task3 = manager.addTask('Tarea alta 2', 'high');
            
            const highTasks = manager.getTasksByPriority('high');
            expect(highTasks).toHaveLength(2);
            expect(highTasks).toContain(task1);
            expect(highTasks).toContain(task3);
            expect(highTasks).not.toContain(task2);
        });

        test('getTasksByPriority retorna array vacío cuando no hay tareas de esa prioridad', () => {
            // Este test verifica que getTasksByPriority retorna un array vacío cuando no existen tareas con la prioridad buscada.
            // El comportamiento esperado es que filter() no encuentre coincidencias y retorne un array vacío.
            const manager = new TaskManager();
            manager.addTask('Tarea', 'high');
            
            const lowTasks = manager.getTasksByPriority('low');
            expect(lowTasks).toEqual([]);
        });

        test('los métodos filter() retornan nuevos arrays (no mutan el original)', () => {
            // Este test verifica que los métodos que usan filter() retornan nuevos arrays sin modificar el array original.
            // El comportamiento esperado es que el array original this.tasks permanezca intacto.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            
            const pending = manager.getPendingTasks();
            pending.push('intento de modificación');
            
            expect(manager.getPendingTasks()).toHaveLength(2);
        });
    });

    // ===== MÉTODO map() - TRANSFORMAR TAREAS =====
    describe('Método getTaskDescriptions() - Usa map()', () => {
        test('getTaskDescriptions retorna array de descripciones', () => {
            // Este test verifica que getTaskDescriptions transforma correctamente el array usando map().
            // Se espera que retorne un nuevo array de strings con solo las descripciones de las tareas.
            const manager = new TaskManager();
            manager.addTask('Comprar pan', 'high');
            manager.addTask('Llamar a mamá', 'medium');
            manager.addTask('Estudiar JavaScript', 'low');
            
            const descriptions = manager.getTaskDescriptions();
            expect(descriptions).toEqual(['Comprar pan', 'Llamar a mamá', 'Estudiar JavaScript']);
        });

        test('getTaskDescriptions mantiene el orden de las tareas', () => {
            // Este test verifica que map() preserva el orden original del array al transformarlo.
            // Se espera que las descripciones estén en el mismo orden que las tareas fueron agregadas.
            const manager = new TaskManager();
            const tasks = ['Primera', 'Segunda', 'Tercera'];
            tasks.forEach(desc => manager.addTask(desc, 'medium'));
            
            const descriptions = manager.getTaskDescriptions();
            expect(descriptions).toEqual(tasks);
        });

        test('getTaskDescriptions retorna array vacío cuando no hay tareas', () => {
            // Este test verifica que getTaskDescriptions maneja correctamente el caso cuando no hay tareas.
            // El comportamiento esperado es que map() sobre un array vacío retorne un array vacío.
            const manager = new TaskManager();
            const descriptions = manager.getTaskDescriptions();
            expect(descriptions).toEqual([]);
        });
    });

    // ===== MÉTODO completeTask() - COMBINACIÓN DE MÉTODOS =====
    describe('Método completeTask() - Combina find() y toggleComplete()', () => {
        test('completa una tarea pendiente correctamente', () => {
            // Este test verifica que completeTask encuentra una tarea usando find() y la marca como completada.
            // Se espera que la tarea cambie su estado de pendiente a completada.
            const manager = new TaskManager();
            const task = manager.addTask('Tarea pendiente', 'high');
            
            const result = manager.completeTask('Tarea pendiente');
            expect(result).toBe(true);
            expect(task.completed).toBe(true);
        });

        test('retorna false si la tarea no existe', () => {
            // Este test verifica que completeTask retorna false cuando no encuentra la tarea.
            // El comportamiento esperado es que find() no encuentre la tarea y se retorne false.
            const manager = new TaskManager();
            manager.addTask('Otra tarea', 'high');
            
            const result = manager.completeTask('Tarea inexistente');
            expect(result).toBe(false);
        });

        test('retorna false si la tarea ya está completada', () => {
            // Este test verifica que completeTask no completa una tarea que ya está completada.
            // Se espera que retorne false cuando la tarea ya tiene completed === true.
            const manager = new TaskManager();
            const task = manager.addTask('Tarea', 'high');
            task.toggleComplete(); // Ya está completada
            
            const result = manager.completeTask('Tarea');
            expect(result).toBe(false);
            expect(task.completed).toBe(true);
        });
    });

    // ===== MÉTODO reduce() - CALCULOS Y CONTEO =====
    describe('Métodos con reduce() - Cálculos y conteos', () => {
        test('getCompletionPercentage calcula correctamente el porcentaje', () => {
            // Este test verifica que getCompletionPercentage calcula correctamente usando reduce() para contar tareas completadas.
            // Se espera que calcule (tareas completadas / total) * 100 con 2 decimales.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            manager.addTask('Tarea 3', 'low');
            manager.addTask('Tarea 4', 'high');
            
            manager.completeTask('Tarea 1');
            manager.completeTask('Tarea 3'); // 2 de 4 completadas = 50%
            
            const percentage = manager.getCompletionPercentage();
            expect(percentage).toBe(50.00);
        });

        test('getCompletionPercentage retorna 0 cuando no hay tareas', () => {
            // Este test verifica que getCompletionPercentage retorna 0 cuando no hay tareas.
            // El comportamiento esperado es manejar el caso de división por cero retornando 0.
            const manager = new TaskManager();
            const percentage = manager.getCompletionPercentage();
            expect(percentage).toBe(0);
        });

        test('getCompletionPercentage retorna 100 cuando todas están completadas', () => {
            // Este test verifica que getCompletionPercentage retorna 100 cuando todas las tareas están completadas.
            // Se espera que reduce() cuente todas como completadas y calcule 100%.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            
            manager.completeTask('Tarea 1');
            manager.completeTask('Tarea 2');
            
            const percentage = manager.getCompletionPercentage();
            expect(percentage).toBe(100.00);
        });

        test('getCompletionPercentage maneja decimales correctamente', () => {
            // Este test verifica que getCompletionPercentage maneja correctamente porcentajes con decimales.
            // Se espera que use toFixed(2) y parseFloat() para retornar un número con 2 decimales.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            manager.addTask('Tarea 3', 'low');
            
            manager.completeTask('Tarea 1'); // 1 de 3 = 33.33...
            
            const percentage = manager.getCompletionPercentage();
            expect(percentage).toBeCloseTo(33.33, 2);
        });

        test('getTaskCount cuenta correctamente usando reduce()', () => {
            // Este test verifica que getTaskCount cuenta el total de tareas usando reduce().
            // Se espera que reduce() cuente todos los elementos del array.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'medium');
            manager.addTask('Tarea 3', 'low');
            
            const count = manager.getTaskCount();
            expect(count).toBe(3);
        });

        test('getTaskCount retorna 0 cuando no hay tareas', () => {
            // Este test verifica que getTaskCount retorna 0 cuando el array está vacío.
            // El comportamiento esperado es que reduce() sobre un array vacío retorne el valor inicial (0).
            const manager = new TaskManager();
            const count = manager.getTaskCount();
            expect(count).toBe(0);
        });

        test('getPriorityCounts cuenta correctamente por prioridad usando reduce()', () => {
            // Este test verifica que getPriorityCounts acumula correctamente los conteos usando reduce().
            // Se espera que retorne un objeto con el conteo de tareas para cada prioridad.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'high');
            manager.addTask('Tarea 3', 'medium');
            manager.addTask('Tarea 4', 'low');
            
            const counts = manager.getPriorityCounts();
            expect(counts).toEqual({ low: 1, medium: 1, high: 2 });
        });

        test('getPriorityCounts retorna conteos en cero cuando no hay tareas', () => {
            // Este test verifica que getPriorityCounts retorna todos los conteos en cero cuando no hay tareas.
            // El comportamiento esperado es que el objeto inicial se mantenga si reduce() no procesa elementos.
            const manager = new TaskManager();
            const counts = manager.getPriorityCounts();
            expect(counts).toEqual({ low: 0, medium: 0, high: 0 });
        });

        test('getPriorityCounts maneja solo una prioridad correctamente', () => {
            // Este test verifica que getPriorityCounts funciona correctamente cuando todas las tareas tienen la misma prioridad.
            // Se espera que reduce() acumule correctamente solo esa prioridad.
            const manager = new TaskManager();
            manager.addTask('Tarea 1', 'high');
            manager.addTask('Tarea 2', 'high');
            manager.addTask('Tarea 3', 'high');
            
            const counts = manager.getPriorityCounts();
            expect(counts).toEqual({ low: 0, medium: 0, high: 3 });
        });
    });

    // ===== INTEGRACIÓN - MÚLTIPLES OPERACIONES =====
    describe('Integración - Múltiples operaciones combinadas', () => {
        test('permite realizar operaciones complejas combinando todos los métodos', () => {
            // Este test verifica que todos los métodos trabajan correctamente juntos en un escenario real.
            // Se espera que se puedan agregar tareas, completarlas, filtrarlas y calcular estadísticas sin problemas.
            const manager = new TaskManager();
            
            // Agregar tareas con diferentes prioridades
            manager.addTask('Comprar leche', 'high');
            manager.addTask('Hacer ejercicio', 'medium');
            manager.addTask('Leer libro', 'low');
            manager.addTask('Estudiar', 'high');
            manager.addTask('Cocinar', 'medium');
            
            // Completar algunas tareas
            manager.completeTask('Comprar leche');
            manager.completeTask('Leer libro');
            
            // Verificar filtros
            expect(manager.getPendingTasks()).toHaveLength(3);
            expect(manager.getCompletedTasks()).toHaveLength(2);
            expect(manager.getTasksByPriority('high')).toHaveLength(2);
            
            // Verificar cálculos
            expect(manager.getCompletionPercentage()).toBe(40.00);
            expect(manager.getTaskCount()).toBe(5);
            expect(manager.getPriorityCounts()).toEqual({ low: 1, medium: 2, high: 2 });
            
            // Verificar descripciones
            const descriptions = manager.getTaskDescriptions();
            expect(descriptions).toHaveLength(5);
            expect(descriptions).toContain('Comprar leche');
        });
    });
});

