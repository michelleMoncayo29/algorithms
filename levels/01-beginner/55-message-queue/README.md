# Sistema de Cola de Mensajes Simple

**Dificultad:** BEGINNER  
**Categoría:** Clases, Estructuras de Datos, Colas FIFO  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa una clase `MessageQueue` para gestionar una cola de mensajes con estructura FIFO (First In, First Out) y soporte básico para prioridades. Este ejercicio te enseñará a trabajar con estructuras de datos tipo cola, gestión de prioridades y operaciones básicas de cola.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a implementar una estructura de datos tipo cola (FIFO)
- [ ] Entender gestión de prioridades en colas
- [ ] Practicar operaciones básicas de cola (enqueue, dequeue, peek)
- [ ] Aplicar validación de inputs

## 📝 Enunciado

Implementa la clase `MessageQueue` que gestiona una cola de mensajes con prioridades.

### Constructor

- `constructor()`: Crea una cola vacía

### Métodos

- `enqueue(message, priority = 0)`: Añade un mensaje a la cola
  - `message`: Contenido del mensaje (string no vacío)
  - `priority`: Nivel de prioridad (0=normal, 1=alta, 2=urgente). Por defecto 0
  - Retorna el tamaño de la cola después de la inserción

- `dequeue()`: Remueve y retorna el siguiente mensaje
  - Orden: urgent (2) > high (1) > normal (0)
  - Dentro de la misma prioridad, orden FIFO
  - Retorna objeto `{message: string, priority: number}` o `null` si está vacía

- `peek()`: Retorna el siguiente mensaje sin removerlo
  - Retorna objeto mensaje o `null` si está vacía

- `size()`: Retorna el número de mensajes en la cola

- `isEmpty()`: Verifica si la cola está vacía
  - Retorna `true` o `false`

- `clear()`: Limpia todos los mensajes
  - Retorna `this` para method chaining

- `getAll()`: Obtiene todos los mensajes como array (copia inmutable)
  - Retorna array de objetos mensaje

## 💡 Ejemplos

### Ejemplo 1
```javascript
const MessageQueue = require('./exercise');

const queue = new MessageQueue();

queue.enqueue("Message 1", 0);
queue.enqueue("Message 2", 1);
queue.enqueue("Message 3", 0);

const msg1 = queue.dequeue(); // {message: "Message 2", priority: 1} (mayor prioridad)
const msg2 = queue.dequeue(); // {message: "Message 1", priority: 0} (FIFO)
```

### Ejemplo 2
```javascript
const queue = new MessageQueue();

queue.enqueue("Urgent!", 2);
queue.enqueue("Normal", 0);
queue.enqueue("High priority", 1);

console.log(queue.peek()); // {message: "Urgent!", priority: 2}
console.log(queue.size()); // 3
```

### Ejemplo 3
```javascript
const queue = new MessageQueue();

queue.enqueue("First", 0);
queue.enqueue("Second", 0);
queue.enqueue("Third", 0);

// Mismo orden porque misma prioridad (FIFO)
console.log(queue.dequeue()); // {message: "First", priority: 0}
console.log(queue.dequeue()); // {message: "Second", priority: 0}
console.log(queue.dequeue()); // {message: "Third", priority: 0}
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `queue.enqueue("msg", 2)` | `1` | Añade mensaje urgente |
| `queue.dequeue()` | `{message: "msg", priority: 2}` | Remueve mensaje con mayor prioridad |
| `queue.isEmpty()` | `true` | Cola vacía retorna true |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para encontrar el mensaje con mayor prioridad:
```javascript
let highestPriority = -1;
let highestIndex = -1;
for (let i = 0; i < this.messages.length; i++) {
    if (this.messages[i].priority > highestPriority) {
        highestPriority = this.messages[i].priority;
        highestIndex = i;
    }
}
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para remover un elemento de un array en un índice específico:
```javascript
this.messages.splice(index, 1);
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para crear una copia inmutable del array:
```javascript
getAll() {
    return [...this.messages];
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la clase `MessageQueue`
3. Ejecuta los tests: `npm test 55-message-queue`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Array.splice()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [Queue Data Structure](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
- [Priority Queue](https://en.wikipedia.org/wiki/Priority_queue)

---

**💡 Tip:** Al buscar el mensaje con mayor prioridad, si hay múltiples con la misma prioridad máxima, toma el primero (FIFO dentro de la misma prioridad).

