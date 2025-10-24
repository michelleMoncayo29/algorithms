# Sistema de Gestión de Biblioteca

**Dificultad:** BEGINNER  
**Categoría:** Objetos, Arrays, Manejo de Fechas, Lógica de Negocio, Búsquedas  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de biblioteca que permita gestionar libros, usuarios, préstamos y multas. El sistema debe manejar diferentes tipos de usuarios con reglas de préstamo específicas, calcular multas por retraso y generar reportes de la biblioteca.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar manejo de objetos y arrays complejos
- [ ] Implementar relaciones entre entidades (libros, usuarios, préstamos)
- [ ] Manejar fechas y cálculos de tiempo
- [ ] Aplicar lógica de negocio de bibliotecas
- [ ] Trabajar con búsquedas y filtros avanzados
- [ ] Implementar validaciones de reglas de negocio

## 📝 Enunciado

Implementa una clase `Library` que gestione un sistema completo de biblioteca con las siguientes funcionalidades:

### Estructura de Libros
```javascript
{
  id: "BOOK-001",
  title: "El Quijote",
  author: "Miguel de Cervantes",
  isbn: "978-84-376-0494-7",
  category: "Fiction",
  available: true,
  totalCopies: 3,
  availableCopies: 2
}
```

### Estructura de Usuarios
```javascript
{
  id: "USER-001",
  name: "Juan Pérez",
  email: "juan@email.com",
  phone: "555-1234",
  membershipType: "student" // "student", "teacher", "public"
}
```

### Estructura de Préstamos
```javascript
{
  id: "LOAN-001",
  userId: "USER-001",
  bookId: "BOOK-001",
  borrowDate: "2024-01-15",
  dueDate: "2024-02-15",
  returnDate: null,
  status: "active" // "active", "returned", "overdue"
}
```

### Métodos Requeridos

#### 1. `addBook(book)`
- Agrega un libro a la biblioteca
- Valida que el libro tenga todos los campos requeridos
- Retorna `true` si se agregó correctamente, `false` si falló

#### 2. `registerUser(user)`
- Registra un nuevo usuario en la biblioteca
- Valida que el usuario tenga todos los campos requeridos
- Retorna `true` si se registró correctamente, `false` si falló

#### 3. `borrowBook(userId, bookId)`
- Presta un libro a un usuario
- Valida que el usuario y libro existan
- Verifica que el libro esté disponible
- Verifica límites de préstamo por tipo de usuario
- Retorna el ID del préstamo si es exitoso, `null` si falló

#### 4. `returnBook(userId, bookId)`
- Devuelve un libro prestado
- Actualiza el estado del préstamo
- Actualiza la disponibilidad del libro
- Retorna `true` si se devolvió correctamente, `false` si falló

#### 5. `calculateFine(loanId)`
- Calcula la multa por retraso en la devolución
- Multa: $1 por día de retraso
- Retorna el monto de la multa

#### 6. `getOverdueBooks()`
- Obtiene todos los libros con préstamos vencidos
- Retorna array de préstamos vencidos

#### 7. `searchBooks(criteria)`
- Busca libros por diferentes criterios
- Criterios: title, author, category, isbn
- Retorna array de libros que coinciden

#### 8. `getUserLoans(userId)`
- Obtiene el historial de préstamos de un usuario
- Retorna array de préstamos del usuario

#### 9. `getLibraryStats()`
- Obtiene estadísticas de la biblioteca
- Incluye: total libros, usuarios, préstamos activos, libros vencidos

## 💡 Ejemplos

### Ejemplo 1: Agregar Libro y Usuario

```javascript
const library = new Library();

// Agregar libro
const book = {
  id: "BOOK-001",
  title: "El Quijote",
  author: "Miguel de Cervantes",
  isbn: "978-84-376-0494-7",
  category: "Fiction",
  available: true,
  totalCopies: 3,
  availableCopies: 2
};
library.addBook(book);

// Registrar usuario
const user = {
  id: "USER-001",
  name: "Juan Pérez",
  email: "juan@email.com",
  phone: "555-1234",
  membershipType: "student"
};
library.registerUser(user);
```

### Ejemplo 2: Prestar Libro

```javascript
// Prestar libro
const loanId = library.borrowBook("USER-001", "BOOK-001");
// Retorna: "LOAN-001" (ID del préstamo)

// El libro ahora tiene availableCopies: 1
// Se crea un préstamo con dueDate 30 días después (estudiante)
```

### Ejemplo 3: Calcular Multa

```javascript
// Si el libro se devuelve 5 días después del vencimiento
const fine = library.calculateFine("LOAN-001");
// Retorna: 5 (multa de $5 por 5 días de retraso)
```

### Ejemplo 4: Buscar Libros

```javascript
// Buscar por autor
const books = library.searchBooks({ author: "Miguel de Cervantes" });
// Retorna: [book] (array con libros del autor)

// Buscar por categoría
const fictionBooks = library.searchBooks({ category: "Fiction" });
// Retorna: [book1, book2, ...] (todos los libros de ficción)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| addBook | book válido | true | Libro agregado correctamente |
| addBook | book inválido | false | Falta información requerida |
| registerUser | user válido | true | Usuario registrado correctamente |
| registerUser | user inválido | false | Falta información requerida |
| borrowBook | userId, bookId válidos | "LOAN-001" | Préstamo creado exitosamente |
| borrowBook | libro no disponible | null | No hay copias disponibles |
| borrowBook | límite excedido | null | Usuario excedió límite de préstamos |
| returnBook | préstamo activo | true | Libro devuelto correctamente |
| calculateFine | préstamo vencido | 5 | Multa por 5 días de retraso |
| getOverdueBooks | - | [loan1, loan2] | Libros con préstamos vencidos |

## 📚 Reglas de Negocio

### Límites de Préstamo por Tipo de Usuario

| Tipo de Usuario | Máximo Libros | Días de Préstamo |
|-----------------|---------------|------------------|
| student | 3 | 30 días |
| teacher | 5 | 60 días |
| public | 2 | 14 días |

### Cálculo de Multas
- **Multa por día**: $1
- **Días de gracia**: 0 (multa desde el primer día de retraso)
- **Máximo de multa**: Sin límite

### Validaciones de Libros
- Debe tener: id, title, author, isbn, category
- totalCopies debe ser mayor que 0
- availableCopies no puede ser mayor que totalCopies
- availableCopies no puede ser negativo

### Validaciones de Usuarios
- Debe tener: id, name, email, phone, membershipType
- membershipType debe ser: "student", "teacher", "public"
- email debe tener formato válido

## 🧮 Cálculos de Fechas

### Fechas de Vencimiento
```javascript
// Para estudiantes (30 días)
const dueDate = new Date(borrowDate);
dueDate.setDate(dueDate.getDate() + 30);

// Para profesores (60 días)
const dueDate = new Date(borrowDate);
dueDate.setDate(dueDate.getDate() + 60);

// Para público (14 días)
const dueDate = new Date(borrowDate);
dueDate.setDate(dueDate.getDate() + 14);
```

### Cálculo de Multas
```javascript
const today = new Date();
const dueDate = new Date(loan.dueDate);
const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));

if (daysOverdue > 0) {
  const fine = daysOverdue * 1; // $1 por día
  return fine;
}
return 0;
```

## ⚠️ Validaciones Requeridas

### Libros
- Todos los campos requeridos deben estar presentes
- totalCopies > 0
- availableCopies >= 0 y <= totalCopies
- ISBN debe ser único

### Usuarios
- Todos los campos requeridos deben estar presentes
- membershipType debe ser válido
- Email debe tener formato válido
- ID de usuario debe ser único

### Préstamos
- Usuario y libro deben existir
- Libro debe estar disponible
- Usuario no debe exceder límite de préstamos
- No se puede prestar el mismo libro dos veces al mismo usuario

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa arrays para almacenar libros, usuarios y préstamos. Cada entidad debe tener un ID único.

</details>

<details>
<summary>💡 Pista 2</summary>

Para las fechas, usa el objeto Date de JavaScript y calcula las fechas de vencimiento sumando días.

</details>

<details>
<summary>💡 Pista 3</summary>

Para validar límites de préstamo, cuenta cuántos préstamos activos tiene el usuario.

</details>

<details>
<summary>💡 Pista 4</summary>

Para calcular multas, compara la fecha actual con la fecha de vencimiento y calcula la diferencia en días.

</details>

<details>
<summary>💡 Pista 5</summary>

Para búsquedas, usa el método filter() en el array de libros con los criterios especificados.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la clase `Library` con todos los métodos
3. Ejecuta los tests: `npm test library-management`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Date Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Object Validation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [Email Validation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

---

**💡 Tip:** Este ejercicio simula un sistema de biblioteca real y te ayudará a entender conceptos fundamentales de programación orientada a objetos, manejo de fechas, validación de datos y lógica de negocio aplicada a la gestión de bibliotecas.
