/**
 * Lista Enlazada (Linked List)
 *
 * Descripción: Implementa una lista enlazada con operaciones básicas de inserción, eliminación y búsqueda
 * Dificultad: INTERMEDIATE
 *
 * @param {number} val - Valor del nodo
 * @returns {LinkedList} - Nueva instancia de lista enlazada
 *
 * Ejemplo:
 * const list = new LinkedList();
 * list.append(1);
 * list.append(2);
 * list.prepend(0);
 * console.log(list.toArray()); // [0, 1, 2]
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
   * @param {number} val - Valor a añadir
   */
  append(val) {
    // TODO: Implementar la inserción al final

    // Pista: Crea un nuevo nodo y encuentra el último nodo de la lista
    // Si la lista está vacía, el nuevo nodo será la cabeza
    // Si no, recorre hasta el último nodo y actualiza su referencia 'next'

    throw new Error('Método append no implementado');
  }

  /**
   * Añade un elemento al inicio de la lista
   * @param {number} val - Valor a añadir
   */
  prepend(val) {
    // TODO: Implementar la inserción al inicio

    // Pista: Crea un nuevo nodo que apunte al nodo actual de la cabeza
    // Luego actualiza la cabeza para que apunte al nuevo nodo

    throw new Error('Método prepend no implementado');
  }

  /**
   * Elimina la primera ocurrencia de un valor
   * @param {number} val - Valor a eliminar
   * @returns {boolean} - true si se eliminó, false si no se encontró
   */
  delete(val) {
    // TODO: Implementar la eliminación

    // Pista: Si la lista está vacía, retorna false
    // Si el valor está en la cabeza, actualiza la cabeza
    // Si no, recorre la lista buscando el nodo con el valor
    // Cuando lo encuentres, actualiza las referencias para "saltar" ese nodo

    throw new Error('Método delete no implementado');
  }

  /**
   * Busca si un valor existe en la lista
   * @param {number} val - Valor a buscar
   * @returns {boolean} - true si existe, false si no
   */
  find(val) {
    // TODO: Implementar la búsqueda

    // Pista: Recorre la lista desde la cabeza hasta encontrar el valor
    // o hasta llegar al final (null)

    throw new Error('Método find no implementado');
  }

  /**
   * Obtiene el tamaño de la lista
   * @returns {number} - Número de elementos
   */
  getSize() {
    // TODO: Implementar el conteo de elementos

    // Pista: Puedes usar una variable size que actualices en cada operación
    // o recorrer la lista contando nodos

    throw new Error('Método getSize no implementado');
  }

  /**
   * Convierte la lista a un array
   * @returns {number[]} - Array con los valores de la lista
   */
  toArray() {
    // TODO: Implementar la conversión a array

    // Pista: Recorre la lista desde la cabeza y añade cada valor a un array

    throw new Error('Método toArray no implementado');
  }

  /**
   * Invierte el orden de los elementos de la lista
   */
  reverse() {
    // TODO: Implementar la inversión

    // Pista: Necesitas tres punteros: prev, current, next
    // Recorre la lista invirtiendo las conexiones entre nodos

    throw new Error('Método reverse no implementado');
  }
}

module.exports = LinkedList;
