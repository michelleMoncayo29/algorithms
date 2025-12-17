# Library System

## Objetivo
Aprender a utilizar clases en JavaScript para modelar un sistema simple de biblioteca.

## Instrucciones

Debes crear dos clases: `Book` y `Library`.

### Clase `Book`

La clase `Book` debe tener las siguientes propiedades y métodos:

- **Constructor**: Recibe `title` (título), `author` (autor) y `isbn` (identificador único).
- **Propiedad `isAvailable`**: Inicializada en `true` por defecto.
- **Método `toggleAvailability()`**: Cambia el estado de `isAvailable` al opuesto (de true a false y viceversa).

### Clase `Library`

La clase `Library` debe tener las siguientes propiedades y métodos:

- **Constructor**: Inicializa una propiedad `books` como un array vacío.
- **Método `addBook(book)`**: Recibe una instancia de `Book` y la añade al array `books`.
- **Método `findBook(isbn)`**: Busca y retorna un libro por su ISBN. Si no lo encuentra, retorna `undefined`.
- **Método `borrowBook(isbn)`**:
  - Busca el libro por ISBN.
  - Si el libro existe y está disponible (`isAvailable` es true), cambia su disponibilidad (usa `toggleAvailability`) y retorna el libro.
  - Si el libro no existe o no está disponible, retorna `null`.
- **Método `returnBook(isbn)`**:
  - Busca el libro por ISBN.
  - Si el libro existe y NO está disponible, cambia su disponibilidad y retorna el libro.
  - Si el libro no existe o ya estaba disponible, retorna `null`.

## Ejemplo de uso

```javascript
const myLibrary = new Library();
const book1 = new Book("1984", "George Orwell", "12345");

myLibrary.addBook(book1);
console.log(myLibrary.findBook("12345")); // Book { title: "1984", ... }

myLibrary.borrowBook("12345"); // Book { isAvailable: false, ... }
myLibrary.borrowBook("12345"); // null (ya está prestado)

myLibrary.returnBook("12345"); // Book { isAvailable: true, ... }
```
