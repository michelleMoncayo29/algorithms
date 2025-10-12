/**
 * SOLUCIÓN - Lista Enlazada (Linked List)
 *
 * Esta es la implementación completa de una lista enlazada con todas las operaciones requeridas.
 * Cada método incluye comentarios explicativos del algoritmo utilizado.
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Añade un elemento al final de la lista
   * Complejidad temporal: O(n) - necesitamos recorrer toda la lista
   * Complejidad espacial: O(1) - solo creamos un nuevo nodo
   */
  append(val) {
    const newNode = new ListNode(val);
    this.size++;

    // Si la lista está vacía, el nuevo nodo se convierte en la cabeza
    if (!this.head) {
      this.head = newNode;
      return;
    }

    // Recorremos hasta el último nodo
    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    // Añadimos el nuevo nodo al final
    current.next = newNode;
  }

  /**
   * Añade un elemento al inicio de la lista
   * Complejidad temporal: O(1) - acceso directo
   * Complejidad espacial: O(1) - solo creamos un nuevo nodo
   */
  prepend(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }

  /**
   * Elimina la primera ocurrencia de un valor
   * Complejidad temporal: O(n) - en el peor caso recorremos toda la lista
   * Complejidad espacial: O(1) - no usamos espacio adicional
   */
  delete(val) {
    // Si la lista está vacía, no hay nada que eliminar
    if (!this.head) {
      return false;
    }

    // Caso especial: el elemento a eliminar está en la cabeza
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    // Buscamos el nodo con el valor a eliminar
    let current = this.head;
    while (current.next && current.next.val !== val) {
      current = current.next;
    }

    // Si encontramos el nodo, lo eliminamos
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }

    // No se encontró el valor
    return false;
  }

  /**
   * Busca si un valor existe en la lista
   * Complejidad temporal: O(n) - en el peor caso recorremos toda la lista
   * Complejidad espacial: O(1) - no usamos espacio adicional
   */
  find(val) {
    let current = this.head;

    // Recorremos la lista hasta encontrar el valor o llegar al final
    while (current) {
      if (current.val === val) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /**
   * Obtiene el tamaño de la lista
   * Complejidad temporal: O(1) - mantenemos un contador
   * Complejidad espacial: O(1) - no usamos espacio adicional
   */
  getSize() {
    return this.size;
  }

  /**
   * Convierte la lista a un array
   * Complejidad temporal: O(n) - recorremos toda la lista
   * Complejidad espacial: O(n) - creamos un array del tamaño de la lista
   */
  toArray() {
    const result = [];
    let current = this.head;

    // Recorremos la lista y añadimos cada valor al array
    while (current) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  /**
   * Invierte el orden de los elementos de la lista
   * Complejidad temporal: O(n) - recorremos toda la lista una vez
   * Complejidad espacial: O(1) - solo usamos variables temporales
   */
  reverse() {
    let prev = null;
    let current = this.head;

    // Recorremos la lista invirtiendo las conexiones
    while (current) {
      // Guardamos la referencia al siguiente nodo
      const next = current.next;

      // Invertimos la conexión del nodo actual
      current.next = prev;

      // Movemos los punteros
      prev = current;
      current = next;
    }

    // La nueva cabeza es el último nodo que procesamos
    this.head = prev;
  }
}

module.exports = LinkedList;
