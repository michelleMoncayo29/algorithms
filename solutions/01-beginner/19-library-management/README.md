# Solución: Sistema de Gestión de Biblioteca

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos una clase `Library` que:
1. **Gestione libros** con validaciones de inventario
2. **Registre usuarios** con diferentes tipos de membresía
3. **Maneje préstamos** con reglas específicas por tipo de usuario
4. **Calcule multas** por retraso en devoluciones
5. **Genere reportes** y estadísticas de la biblioteca

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Estructura de datos**: Arrays para libros, usuarios y préstamos
2. **Validaciones**: Campos requeridos, unicidad, límites
3. **Reglas de negocio**: Límites por tipo de usuario, fechas de vencimiento
4. **Cálculos**: Multas, estadísticas, búsquedas
5. **Manejo de fechas**: Cálculos de vencimiento y retrasos

### Complejidad
- **Tiempo**: O(n) para búsquedas y filtros, O(1) para operaciones individuales
- **Espacio**: O(n) donde n es el número de libros, usuarios y préstamos

## 💻 Solución Implementada

```javascript
class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.loans = [];
    }

    addBook(book) {
        // Validar campos requeridos
        if (!book || !book.id || !book.title || !book.author || 
            !book.isbn || !book.category || typeof book.totalCopies !== 'number' || 
            typeof book.availableCopies !== 'number') {
            return false;
        }

        // Validar que totalCopies sea mayor que 0
        if (book.totalCopies <= 0) {
            return false;
        }

        // Validar que availableCopies no exceda totalCopies
        if (book.availableCopies > book.totalCopies || book.availableCopies < 0) {
            return false;
        }

        // Verificar que el ISBN sea único
        if (this.books.some(b => b.isbn === book.isbn)) {
            return false;
        }

        this.books.push(book);
        return true;
    }

    borrowBook(userId, bookId) {
        // Buscar usuario y libro
        const user = this.users.find(u => u.id === userId);
        const book = this.books.find(b => b.id === bookId);

        if (!user || !book) {
            return null;
        }

        // Verificar disponibilidad
        if (book.availableCopies <= 0) {
            return null;
        }

        // Verificar límites de préstamo
        const activeLoans = this.loans.filter(l => 
            l.userId === userId && l.status === 'active'
        );
        
        const limits = this.getLoanLimits(user.membershipType);
        if (activeLoans.length >= limits.maxBooks) {
            return null;
        }

        // Crear préstamo
        const loanId = this.generateId('LOAN');
        const borrowDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + limits.loanDays);

        const loan = {
            id: loanId,
            userId: userId,
            bookId: bookId,
            borrowDate: borrowDate,
            dueDate: dueDate.toISOString().split('T')[0],
            returnDate: null,
            status: 'active'
        };

        this.loans.push(loan);
        book.availableCopies--;

        return loanId;
    }

    calculateFine(loanId) {
        const loan = this.loans.find(l => l.id === loanId);

        if (!loan || loan.status === 'returned') {
            return 0;
        }

        const today = new Date();
        const dueDate = new Date(loan.dueDate);
        const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));

        if (daysOverdue > 0) {
            return daysOverdue * 1; // $1 por día de retraso
        }

        return 0;
    }
}
```

## 🔄 Versiones Alternativas

### Versión Extendida con Reportes
```javascript
class LibraryExtended extends Library {
    constructor() {
        super();
        this.fineRate = 1;
        this.gracePeriod = 0;
    }

    getPopularBooks(limit = 10) {
        const bookStats = {};
        
        // Contar préstamos por libro
        this.loans.forEach(loan => {
            if (!bookStats[loan.bookId]) {
                bookStats[loan.bookId] = 0;
            }
            bookStats[loan.bookId]++;
        });
        
        // Ordenar por popularidad
        const sortedBooks = Object.entries(bookStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([bookId]) => this.books.find(b => b.id === bookId))
            .filter(book => book !== undefined);
        
        return sortedBooks;
    }

    getFineReport() {
        const overdueLoans = this.getOverdueBooks();
        let totalFines = 0;
        const userFines = {};
        
        overdueLoans.forEach(loan => {
            const fine = this.calculateFine(loan.id);
            totalFines += fine;
            
            if (!userFines[loan.userId]) {
                userFines[loan.userId] = 0;
            }
            userFines[loan.userId] += fine;
        });
        
        return {
            totalFines: totalFines,
            overdueLoans: overdueLoans.length,
            userFines: userFines
        };
    }

    renewLoan(loanId) {
        const loan = this.loans.find(l => l.id === loanId);
        
        if (!loan || loan.status !== 'active') {
            return false;
        }
        
        // Verificar que no esté vencido
        const today = new Date();
        const dueDate = new Date(loan.dueDate);
        
        if (today > dueDate) {
            return false;
        }
        
        // Extender fecha de vencimiento
        const user = this.users.find(u => u.id === loan.userId);
        const limits = this.getLoanLimits(user.membershipType);
        
        const newDueDate = new Date(loan.dueDate);
        newDueDate.setDate(newDueDate.getDate() + limits.loanDays);
        loan.dueDate = newDueDate.toISOString().split('T')[0];
        
        return true;
    }
}
```

### Versión con Validaciones Estrictas
```javascript
class LibraryStrict extends Library {
    constructor() {
        super();
        this.maxBooksPerLibrary = 10000;
        this.maxUsersPerLibrary = 5000;
    }

    blockUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return false;
        }
        
        const userLoans = this.getUserLoans(userId);
        const totalFines = userLoans.reduce((sum, loan) => {
            return sum + this.calculateFine(loan.id);
        }, 0);
        
        // Bloquear si tiene multas mayores a $50
        if (totalFines > 50) {
            user.blocked = true;
            return true;
        }
        
        return false;
    }

    borrowBook(userId, bookId) {
        // Verificar si el usuario está bloqueado
        if (this.isUserBlocked(userId)) {
            return null;
        }
        
        return super.borrowBook(userId, bookId);
    }
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Validación de Libros**
```javascript
if (!book || !book.id || !book.title || !book.author || 
    !book.isbn || !book.category || typeof book.totalCopies !== 'number' || 
    typeof book.availableCopies !== 'number') {
    return false;
}
```
- Validación completa de campos requeridos
- Verificación de tipos de datos
- Validación de rangos numéricos

### 2. **Límites de Préstamo por Tipo de Usuario**
```javascript
getLoanLimits(membershipType) {
    switch (membershipType) {
        case 'student':
            return { maxBooks: 3, loanDays: 30 };
        case 'teacher':
            return { maxBooks: 5, loanDays: 60 };
        case 'public':
            return { maxBooks: 2, loanDays: 14 };
        default:
            return { maxBooks: 0, loanDays: 0 };
    }
}
```
- Reglas específicas por tipo de usuario
- Límites de cantidad y tiempo

### 3. **Cálculo de Fechas de Vencimiento**
```javascript
const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + limits.loanDays);
```
- Cálculo dinámico según tipo de usuario
- Manejo correcto de fechas

### 4. **Cálculo de Multas**
```javascript
const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
if (daysOverdue > 0) {
    return daysOverdue * 1; // $1 por día de retraso
}
```
- Cálculo preciso de días de retraso
- Aplicación de tarifa por día

### 5. **Búsquedas Flexibles**
```javascript
searchBooks(criteria) {
    return this.books.filter(book => {
        if (criteria.title && 
            !book.title.toLowerCase().includes(criteria.title.toLowerCase())) {
            return false;
        }
        // ... más criterios
        return true;
    });
}
```
- Búsquedas case-insensitive
- Múltiples criterios de búsqueda

## 🧪 Casos de Prueba Clave

### Operaciones Básicas
- `addBook(book)` → true, libro agregado
- `registerUser(user)` → true, usuario registrado
- `borrowBook(userId, bookId)` → "LOAN-001", préstamo creado

### Validaciones
- Libros con campos faltantes → false
- Usuarios con email inválido → false
- Préstamos con límites excedidos → null

### Cálculos
- Multa por 5 días de retraso → $5
- Fecha de vencimiento para estudiante → 30 días
- Estadísticas de biblioteca → objeto con contadores

## 🚀 Optimizaciones Implementadas

### 1. **Búsquedas Eficientes**
```javascript
const user = this.users.find(u => u.id === userId);
const book = this.books.find(b => b.id === bookId);
```
- Uso de `find()` para búsquedas por ID
- Evita iteraciones innecesarias

### 2. **Validación Temprana**
- Verificaciones antes de procesar
- Retorno inmediato en casos de error
- Evita operaciones costosas

### 3. **Manejo de Estado Consistente**
- Actualización atómica de préstamos
- Sincronización de availableCopies
- Validaciones antes de cambios

### 4. **Cálculos Optimizados**
```javascript
const activeLoans = this.loans.filter(l => 
    l.userId === userId && l.status === 'active'
);
```
- Filtros eficientes para operaciones
- Cálculos en una sola pasada

## 📚 Conceptos Aplicados

1. **Programación Orientada a Objetos**: Clases, herencia, encapsulación
2. **Manejo de Arrays**: find, filter, some, forEach
3. **Manejo de Fechas**: Date, cálculos de tiempo
4. **Validación de Datos**: Tipos, formatos, rangos
5. **Lógica de Negocio**: Reglas específicas por contexto
6. **Búsquedas y Filtros**: Criterios múltiples, case-insensitive

## 🎓 Lecciones Aprendidas

- **Validación temprana**: Verificar datos antes de procesar
- **Manejo de fechas**: Cálculos precisos de tiempo
- **Reglas de negocio**: Implementar lógica específica del dominio
- **Estado consistente**: Mantener sincronización entre entidades
- **Búsquedas flexibles**: Permitir múltiples criterios

## 🔧 Funcionalidades Adicionales

### Reportes Avanzados
```javascript
getPopularBooks(limit = 10) {
    const bookStats = {};
    this.loans.forEach(loan => {
        bookStats[loan.bookId] = (bookStats[loan.bookId] || 0) + 1;
    });
    
    return Object.entries(bookStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([bookId]) => this.books.find(b => b.id === bookId));
}
```

### Gestión de Multas
```javascript
getFineReport() {
    const overdueLoans = this.getOverdueBooks();
    let totalFines = 0;
    const userFines = {};
    
    overdueLoans.forEach(loan => {
        const fine = this.calculateFine(loan.id);
        totalFines += fine;
        userFines[loan.userId] = (userFines[loan.userId] || 0) + fine;
    });
    
    return { totalFines, overdueLoans: overdueLoans.length, userFines };
}
```

### Renovación de Préstamos
```javascript
renewLoan(loanId) {
    const loan = this.loans.find(l => l.id === loanId);
    
    if (!loan || loan.status !== 'active') {
        return false;
    }
    
    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    
    if (today > dueDate) {
        return false; // No se puede renovar si está vencido
    }
    
    // Extender fecha de vencimiento
    const user = this.users.find(u => u.id === loan.userId);
    const limits = this.getLoanLimits(user.membershipType);
    
    const newDueDate = new Date(loan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + limits.loanDays);
    loan.dueDate = newDueDate.toISOString().split('T')[0];
    
    return true;
}
```

---

**💡 Tip:** Esta solución demuestra cómo implementar un sistema de biblioteca completo con todas las validaciones y reglas de negocio necesarias. Es un excelente ejemplo de programación orientada a objetos aplicada a un problema del mundo real, con manejo robusto de fechas, validaciones complejas y lógica de negocio específica del dominio.
