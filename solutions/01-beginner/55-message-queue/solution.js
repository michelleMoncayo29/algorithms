/**
 * SOLUCIÓN: Sistema de Cola de Mensajes Simple
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

class MessageQueue {
    constructor() {
        this.messages = [];
    }

    enqueue(message, priority = 0) {
        // Validar que message sea un string no vacío
        if (typeof message !== 'string' || message.trim().length === 0) {
            throw new Error('Message must be a non-empty string');
        }

        // Validar que priority sea 0, 1, o 2
        if (!Number.isInteger(priority) || priority < 0 || priority > 2) {
            throw new Error('Priority must be 0 (normal), 1 (high), or 2 (urgent)');
        }

        // Añadir mensaje a la cola
        this.messages.push({
            message: message.trim(),
            priority: priority
        });

        return this.messages.length;
    }

    dequeue() {
        // Si la cola está vacía, retornar null
        if (this.messages.length === 0) {
            return null;
        }

        // Encontrar el mensaje con mayor prioridad
        // Si hay múltiples con la misma prioridad, tomar el primero (FIFO)
        let highestPriority = -1;
        let highestIndex = -1;

        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].priority > highestPriority) {
                highestPriority = this.messages[i].priority;
                highestIndex = i;
            }
        }

        // Remover y retornar el mensaje
        const message = this.messages.splice(highestIndex, 1)[0];
        return message;
    }

    peek() {
        // Si la cola está vacía, retornar null
        if (this.messages.length === 0) {
            return null;
        }

        // Encontrar el mensaje con mayor prioridad (sin removerlo)
        let highestPriority = -1;
        let highestIndex = -1;

        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].priority > highestPriority) {
                highestPriority = this.messages[i].priority;
                highestIndex = i;
            }
        }

        return { ...this.messages[highestIndex] }; // Retornar copia
    }

    size() {
        return this.messages.length;
    }

    isEmpty() {
        return this.messages.length === 0;
    }

    clear() {
        this.messages = [];
        return this; // Method chaining
    }

    getAll() {
        // Retornar copia inmutable
        return [...this.messages];
    }
}

module.exports = MessageQueue;

