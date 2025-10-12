const LinkedList = require('./exercise');

describe('Lista Enlazada (Linked List)', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  // Casos básicos de append
  test('debe añadir elementos al final con append', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.getSize()).toBe(3);
  });

  test('debe añadir elementos al inicio con prepend', () => {
    list.prepend(3);
    list.prepend(2);
    list.prepend(1);

    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.getSize()).toBe(3);
  });

  test('debe manejar una lista vacía', () => {
    expect(list.toArray()).toEqual([]);
    expect(list.getSize()).toBe(0);
    expect(list.find(1)).toBe(false);
  });

  test('debe manejar un solo elemento', () => {
    list.append(42);

    expect(list.toArray()).toEqual([42]);
    expect(list.getSize()).toBe(1);
    expect(list.find(42)).toBe(true);
  });

  test('debe encontrar elementos existentes', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.find(1)).toBe(true);
    expect(list.find(2)).toBe(true);
    expect(list.find(3)).toBe(true);
  });

  test('debe retornar false para elementos no existentes', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.find(4)).toBe(false);
    expect(list.find(0)).toBe(false);
    expect(list.find(-1)).toBe(false);
  });

  // Casos de eliminación
  test('debe eliminar elementos del inicio', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.delete(1)).toBe(true);
    expect(list.toArray()).toEqual([2, 3]);
    expect(list.getSize()).toBe(2);
  });

  test('debe eliminar elementos del medio', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.delete(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.getSize()).toBe(2);
  });

  test('debe eliminar elementos del final', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.delete(3)).toBe(true);
    expect(list.toArray()).toEqual([1, 2]);
    expect(list.getSize()).toBe(2);
  });

  test('debe retornar false al intentar eliminar elemento inexistente', () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.delete(4)).toBe(false);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.getSize()).toBe(3);
  });

  test('debe manejar eliminación en lista vacía', () => {
    expect(list.delete(1)).toBe(false);
    expect(list.getSize()).toBe(0);
  });

  test('debe manejar eliminación en lista de un elemento', () => {
    list.append(1);

    expect(list.delete(1)).toBe(true);
    expect(list.toArray()).toEqual([]);
    expect(list.getSize()).toBe(0);
  });

  // Casos de inversión
  test('debe invertir una lista con múltiples elementos', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);

    list.reverse();

    expect(list.toArray()).toEqual([4, 3, 2, 1]);
    expect(list.getSize()).toBe(4);
  });

  test('debe manejar inversión de lista vacía', () => {
    list.reverse();

    expect(list.toArray()).toEqual([]);
    expect(list.getSize()).toBe(0);
  });

  test('debe manejar inversión de lista con un elemento', () => {
    list.append(42);
    list.reverse();

    expect(list.toArray()).toEqual([42]);
    expect(list.getSize()).toBe(1);
  });

  // Casos de combinación de operaciones
  test('debe manejar operaciones combinadas correctamente', () => {
    list.append(1);
    list.prepend(0);
    list.append(3);
    list.prepend(-1);

    expect(list.toArray()).toEqual([-1, 0, 1, 3]);
    expect(list.getSize()).toBe(4);

    list.delete(0);
    list.delete(3);

    expect(list.toArray()).toEqual([-1, 1]);
    expect(list.getSize()).toBe(2);
    expect(list.find(-1)).toBe(true);
    expect(list.find(1)).toBe(true);
    expect(list.find(0)).toBe(false);
  });

  test('debe manejar elementos duplicados correctamente', () => {
    list.append(1);
    list.append(2);
    list.append(1);
    list.append(3);

    expect(list.delete(1)).toBe(true);
    expect(list.toArray()).toEqual([2, 1, 3]);
    expect(list.getSize()).toBe(3);

    expect(list.find(1)).toBe(true);
  });

  // Casos límite
  test('debe manejar números negativos', () => {
    list.append(-1);
    list.append(0);
    list.append(1);

    expect(list.toArray()).toEqual([-1, 0, 1]);
    expect(list.find(-1)).toBe(true);
    expect(list.delete(-1)).toBe(true);
    expect(list.toArray()).toEqual([0, 1]);
  });

  test('debe manejar números grandes', () => {
    list.append(1000000);
    list.append(-1000000);

    expect(list.toArray()).toEqual([1000000, -1000000]);
    expect(list.find(1000000)).toBe(true);
    expect(list.find(-1000000)).toBe(true);
  });
});
