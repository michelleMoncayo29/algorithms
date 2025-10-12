# Lista Enlazada (Linked List)

**Dificultad:** INTERMEDIATE  
**Categoría:** Estructuras de Datos  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Una lista enlazada es una estructura de datos lineal donde los elementos (nodos) no se almacenan en ubicaciones de memoria contiguas. Cada nodo contiene datos y una referencia (puntero) al siguiente nodo en la secuencia. Este ejercicio te permitirá implementar una lista enlazada desde cero con operaciones fundamentales.

## 🎯 Objetivos de Aprendizaje

- [ ] Comprender la estructura interna de una lista enlazada
- [ ] Implementar operaciones básicas: inserción, eliminación y búsqueda
- [ ] Manejar punteros y referencias entre nodos
- [ ] Entender las ventajas y desventajas de las listas enlazadas vs arrays
- [ ] Implementar operaciones avanzadas como inversión

## 📝 Enunciado

Implementa una clase `LinkedList` que incluya las siguientes operaciones:

### Métodos requeridos:

1. **`append(val)`** - Añade un elemento al final de la lista
2. **`prepend(val)`** - Añade un elemento al inicio de la lista
3. **`delete(val)`** - Elimina la primera ocurrencia de un valor
4. **`find(val)`** - Busca si un valor existe en la lista
5. **`getSize()`** - Retorna el número de elementos
6. **`toArray()`** - Convierte la lista a un array
7. **`reverse()`** - Invierte el orden de los elementos

### Estructura del nodo:

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

## 💡 Ejemplos

### Ejemplo 1 - Operaciones básicas

```javascript
const list = new LinkedList();

// Añadir elementos
list.append(1);
list.append(2);
list.append(3);

// Resultado: [1, 2, 3]
console.log(list.toArray());
console.log(list.getSize()); // 3
```

### Ejemplo 2 - Inserción al inicio

```javascript
const list = new LinkedList();

list.append(2);
list.prepend(1);
list.prepend(0);

// Resultado: [0, 1, 2]
console.log(list.toArray());
```

### Ejemplo 3 - Eliminación y búsqueda

```javascript
const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

console.log(list.find(2)); // true
console.log(list.delete(2)); // true
console.log(list.toArray()); // [1, 3]
console.log(list.find(2)); // false
```

### Ejemplo 4 - Inversión

```javascript
const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

list.reverse();
console.log(list.toArray()); // [3, 2, 1]
```

## 🔍 Casos de Prueba

| Operación | Input                          | Output Esperado | Explicación                 |
| --------- | ------------------------------ | --------------- | --------------------------- |
| append    | list.append(1), list.append(2) | [1, 2]          | Añadir al final             |
| prepend   | list.prepend(0)                | [0, 1, 2]       | Añadir al inicio            |
| find      | list.find(1)                   | true            | Buscar elemento existente   |
| find      | list.find(5)                   | false           | Buscar elemento inexistente |
| delete    | list.delete(1)                 | true, [0, 2]    | Eliminar elemento del medio |
| reverse   | list.reverse()                 | [2, 0]          | Invertir orden              |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 - Append</summary>

Para `append`, necesitas:

1. Crear un nuevo nodo con el valor dado
2. Si la lista está vacía, el nuevo nodo se convierte en la cabeza
3. Si no, recorre hasta el último nodo y actualiza su `next`

```javascript
// Estructura básica
const newNode = new ListNode(val);
if (!this.head) {
  this.head = newNode;
} else {
  // Encuentra el último nodo y actualiza su next
}
```

</details>

<details>
<summary>💡 Pista 2 - Delete</summary>

Para `delete`, considera tres casos:

1. Lista vacía → retorna false
2. El elemento está en la cabeza → actualiza la cabeza
3. El elemento está en el medio/final → actualiza las referencias

```javascript
// Caso especial: eliminar la cabeza
if (this.head && this.head.val === val) {
  this.head = this.head.next;
  return true;
}
```

</details>

<details>
<summary>💡 Pista 3 - Reverse</summary>

Para `reverse`, usa tres punteros:

- `prev`: nodo anterior (inicia en null)
- `current`: nodo actual (inicia en head)
- `next`: nodo siguiente (temporal)

```javascript
let prev = null;
let current = this.head;
while (current) {
  let next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}
this.head = prev;
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa los métodos de la clase `LinkedList`
3. Ejecuta los tests: `npm test 02-linked-list`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Lista Enlazada - Wikipedia](https://es.wikipedia.org/wiki/Lista_enlazada)
- [Visualización de Listas Enlazadas](https://visualgo.net/es/list)
- [Algoritmos y Estructuras de Datos - Listas Enlazadas](https://www.geeksforgeeks.org/data-structures/linked-list/)

## 🔄 Comparación: Array vs Lista Enlazada

| Operación           | Array    | Lista Enlazada |
| ------------------- | -------- | -------------- |
| Acceso por índice   | O(1)     | O(n)           |
| Inserción al inicio | O(n)     | O(1)           |
| Inserción al final  | O(1)     | O(n)           |
| Eliminación         | O(n)     | O(n)           |
| Búsqueda            | O(n)     | O(n)           |
| Memoria             | Contigua | Dispersa       |

---

**💡 Tip:** Las listas enlazadas son excelentes cuando necesitas insertar/eliminar elementos frecuentemente al inicio, pero no cuando necesitas acceso aleatorio a elementos.
