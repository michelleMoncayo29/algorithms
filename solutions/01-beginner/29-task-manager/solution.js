/**
 * Solución: Gestor de Tareas
 * 
 * Esta implementación muestra cómo crear clases Task y TaskManager que gestionan
 * tareas personales usando métodos de arrays como find, filter, map y reduce.
 */

class Task {
    /**
     * Constructor de la clase Task
     * Traducción: Constructor de Tarea
     *
     * Crea una nueva tarea con descripción, prioridad y estado de completado.
     * Valida que la descripción no esté vacía y que la prioridad sea válida.
     */
    constructor(description, priority = 'medium', completed = false) {
        // Valida que la descripción sea un string no vacío
        if (typeof description !== 'string' || description.trim().length === 0) {
            throw new Error('Task description is required');
        }

        // Valida que la prioridad sea uno de los valores permitidos
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority)) {
            throw new Error("Priority must be 'low', 'medium', or 'high'");
        }

        // Asigna los valores validados a las propiedades de la instancia
        this.description = description.trim();
        this.priority = priority;
        this.completed = completed;
    }

    /**
     * Alterna el estado de completado de la tarea.
     * Traducción: Alternar Completado
     *
     * Cambia el estado completed de true a false o viceversa.
     */
    toggleComplete() {
        this.completed = !this.completed;
        return this.completed;
    }
}

class TaskManager {
    /**
     * Constructor de la clase TaskManager
     * Traducción: Constructor de Gestor de Tareas
     *
     * Crea un nuevo gestor de tareas con un array vacío para almacenar las tareas.
     */
    constructor() {
        this.tasks = [];
    }

    /**
     * Agrega una nueva tarea al gestor.
     * Traducción: Agregar Tarea
     *
     * Crea una nueva instancia de Task y la agrega al array de tareas.
     */
    addTask(description, priority = 'medium') {
        const task = new Task(description, priority);
        this.tasks.push(task);
        return task;
    }

    /**
     * Busca una tarea por su descripción usando find().
     * Traducción: Buscar Tarea
     *
     * Busca una tarea cuyo description coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     */
    findTask(description) {
        const task = this.tasks.find(task => task.description === description);
        return task || null;
    }

    /**
     * Obtiene todas las tareas pendientes usando filter().
     * Traducción: Obtener Tareas Pendientes
     *
     * Retorna un nuevo array con todas las tareas que tienen completed === false.
     */
    getPendingTasks() {
        return this.tasks.filter(task => task.completed === false);
    }

    /**
     * Obtiene todas las tareas completadas usando filter().
     * Traducción: Obtener Tareas Completadas
     *
     * Retorna un nuevo array con todas las tareas que tienen completed === true.
     */
    getCompletedTasks() {
        return this.tasks.filter(task => task.completed === true);
    }

    /**
     * Obtiene todas las tareas de una prioridad específica usando filter().
     * Traducción: Obtener Tareas por Prioridad
     *
     * Retorna un nuevo array con todas las tareas que tienen la prioridad especificada.
     */
    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    /**
     * Obtiene un array con solo las descripciones de todas las tareas usando map().
     * Traducción: Obtener Descripciones de Tareas
     *
     * Transforma el array de tareas en un array de strings con solo las descripciones.
     */
    getTaskDescriptions() {
        return this.tasks.map(task => task.description);
    }

    /**
     * Marca una tarea como completada.
     * Traducción: Completar Tarea
     *
     * Busca una tarea por descripción y la marca como completada si no lo estaba.
     */
    completeTask(description) {
        const task = this.findTask(description);
        if (task && !task.completed) {
            task.toggleComplete();
            return true;
        }
        return false;
    }

    /**
     * Calcula el porcentaje de tareas completadas usando reduce().
     * Traducción: Obtener Porcentaje de Completado
     *
     * Calcula qué porcentaje del total de tareas están completadas.
     * Retorna un número entre 0 y 100 con 2 decimales.
     */
    getCompletionPercentage() {
        if (this.tasks.length === 0) {
            return 0;
        }

        // Usa reduce() para contar las tareas completadas
        const completedCount = this.tasks.reduce((count, task) => {
            return task.completed ? count + 1 : count;
        }, 0);

        // Calcula el porcentaje y lo formatea a 2 decimales
        const percentage = (completedCount / this.tasks.length) * 100;
        return parseFloat(percentage.toFixed(2));
    }

    /**
     * Cuenta el número total de tareas usando reduce().
     * Traducción: Obtener Cantidad de Tareas
     *
     * Retorna el número total de tareas en el gestor.
     * Nota: En la práctica, usaríamos this.tasks.length, pero este ejercicio
     * requiere usar reduce() para práctica.
     */
    getTaskCount() {
        return this.tasks.reduce((count) => count + 1, 0);
    }

    /**
     * Cuenta las tareas por cada prioridad usando reduce().
     * Traducción: Obtener Conteo por Prioridad
     *
     * Retorna un objeto con el conteo de tareas para cada nivel de prioridad.
     */
    getPriorityCounts() {
        // Usa reduce() para acumular conteos por prioridad
        return this.tasks.reduce((acc, task) => {
            // Inicializa el contador para esta prioridad si no existe
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, { low: 0, medium: 0, high: 0 });
    }
}

module.exports = {
    Task,
    TaskManager
};

