const MessageQueue = require('./exercise');

describe('Sistema de Cola de Mensajes', () => {
    test('debe crear cola vacía', () => {
        const queue = new MessageQueue();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    test('debe añadir mensajes a la cola', () => {
        const queue = new MessageQueue();
        expect(queue.enqueue("Message 1")).toBe(1);
        expect(queue.enqueue("Message 2")).toBe(2);
        expect(queue.size()).toBe(2);
    });

    test('debe remover mensajes en orden FIFO con misma prioridad', () => {
        const queue = new MessageQueue();
        queue.enqueue("First", 0);
        queue.enqueue("Second", 0);
        queue.enqueue("Third", 0);
        
        expect(queue.dequeue().message).toBe("First");
        expect(queue.dequeue().message).toBe("Second");
        expect(queue.dequeue().message).toBe("Third");
    });

    test('debe priorizar mensajes urgentes sobre normales', () => {
        const queue = new MessageQueue();
        queue.enqueue("Normal", 0);
        queue.enqueue("Urgent", 2);
        queue.enqueue("Another Normal", 0);
        
        const msg = queue.dequeue();
        expect(msg.message).toBe("Urgent");
        expect(msg.priority).toBe(2);
    });

    test('debe manejar múltiples niveles de prioridad', () => {
        const queue = new MessageQueue();
        queue.enqueue("Normal", 0);
        queue.enqueue("High", 1);
        queue.enqueue("Urgent", 2);
        
        expect(queue.dequeue().priority).toBe(2);
        expect(queue.dequeue().priority).toBe(1);
        expect(queue.dequeue().priority).toBe(0);
    });

    test('peek debe retornar siguiente mensaje sin removerlo', () => {
        const queue = new MessageQueue();
        queue.enqueue("Message", 0);
        
        const peeked = queue.peek();
        expect(peeked.message).toBe("Message");
        expect(queue.size()).toBe(1);
    });

    test('dequeue debe retornar null si la cola está vacía', () => {
        const queue = new MessageQueue();
        expect(queue.dequeue()).toBeNull();
    });

    test('clear debe limpiar todos los mensajes', () => {
        const queue = new MessageQueue();
        queue.enqueue("Message 1");
        queue.enqueue("Message 2");
        queue.clear();
        
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    test('getAll debe retornar copia inmutable', () => {
        const queue = new MessageQueue();
        queue.enqueue("Message 1");
        const all = queue.getAll();
        all.push({message: "Fake"});
        
        expect(queue.size()).toBe(1);
    });

    test('debe lanzar error con mensaje vacío', () => {
        const queue = new MessageQueue();
        expect(() => queue.enqueue("")).toThrow();
    });

    test('debe lanzar error con prioridad inválida', () => {
        const queue = new MessageQueue();
        expect(() => queue.enqueue("Message", 3)).toThrow();
        expect(() => queue.enqueue("Message", -1)).toThrow();
    });
});

