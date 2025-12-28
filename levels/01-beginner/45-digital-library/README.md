# Sistema de Gestión de Biblioteca Digital

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Gestión de Préstamos  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Una biblioteca digital necesita gestionar libros digitales, lectores y préstamos. El sistema debe permitir agregar libros, registrar lectores, gestionar préstamos con fechas de vencimiento, calcular estadísticas y generar reportes. Tu misión es crear tres clases (`DigitalBook`, `Reader` y `DigitalLibrary`) que permitan gestionar estas operaciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con múltiples propiedades y métodos complejos
- [ ] Aplicar validaciones tempranas (Fail Fast) con mensajes descriptivos
- [ ] Implementar gestión de préstamos con fechas y vencimientos
- [ ] Gestionar relaciones entre clases (lectores y libros)
- [ ] Usar métodos de arrays (filter, reduce) para reportes
- [ ] Reforzar principios KISS, Código Expresivo y Responsabilidad Única

## 📝 Enunciado Detallado

Implementa tres clases en `exercise.js`:

### 1. Clase `DigitalBook`

**Propiedades:**
- `isbn` (string): ISBN único del libro
- `title` (string): Título del libro
- `author` (string): Autor del libro
- `pages` (number): Número de páginas
- `category` (string): Categoría del libro
- `isAvailable` (boolean): Indica si está disponible
- `borrowHistory` (array): Historial de préstamos { readerId, borrowDate, returnDate }

**Métodos:**

- `borrow(readerId, borrowDate)` - Registra préstamo
- `return(returnDate)` - Registra devolución y calcula días
- `getBorrowCount()` - Cuenta préstamos históricos
- `getAverageBorrowDuration()` - Promedio de días de préstamo
- `isOverdue(maxDays)` - Verifica si está vencido

### 2. Clase `Reader`

**Propiedades:**
- `readerId` (string): ID único del lector
- `name` (string): Nombre del lector
- `email` (string): Email del lector
- `borrowedBooks` (array): Libros prestados actualmente
- `borrowLimit` (number): Límite de préstamos simultáneos

**Métodos:**

- `borrowBook(book)` - Presta libro validando límite
- `returnBook(isbn)` - Devuelve libro
- `getBorrowedCount()` - Cuenta libros prestados
- `canBorrowMore()` - Verifica si puede pedir más
- `getBorrowHistory()` - Historial de préstamos
- `getFavoriteCategory()` - Categoría más prestada

### 3. Clase `DigitalLibrary`

**Propiedades:**
- `name` (string): Nombre de la biblioteca
- `books` (array): Libros disponibles
- `readers` (array): Lectores registrados

**Métodos:**

- `addBook(book)` - Agrega libro validando duplicados por ISBN
- `registerReader(reader)` - Registra lector
- `findBook(isbn)` - Busca libro por ISBN
- `getAvailableBooks()` - Filtra libros disponibles
- `getBooksByCategory(category)` - Filtra por categoría
- `getMostBorrowedBook()` - Libro más prestado
- `getOverdueBooks()` - Libros vencidos
- `getLibraryStatistics()` - Estadísticas completas

## 💡 Ejemplos

Ver README completo para ejemplos detallados.

## ⚙️ Restricciones y Reglas

- Todos los mensajes de error y nombres deben estar en inglés
- No se permite usar librerías externas
- Los préstamos tienen fecha de inicio y fin
- Un libro vencido es aquel prestado por más de maxDays días

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases solicitadas
3. Corre `npm test digital-library`
4. Verifica que todos los tests pasen

---

**💡 Tip:** Usa métodos de arrays para filtrar y calcular estadísticas eficientemente.

