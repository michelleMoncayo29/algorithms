/**
 * Sistema de Gestión de Biblioteca
 * 
 * Descripción: Implementa una clase Library que gestione un sistema completo de biblioteca
 * con libros, usuarios, préstamos, multas y reportes.
 * Dificultad: BEGINNER
 * 
 * Estructura de libros:
 * {
 *   id: "BOOK-001",
 *   title: "El Quijote",
 *   author: "Miguel de Cervantes",
 *   isbn: "978-84-376-0494-7",
 *   category: "Fiction",
 *   available: true,
 *   totalCopies: 3,
 *   availableCopies: 2
 * }
 * 
 * Estructura de usuarios:
 * {
 *   id: "USER-001",
 *   name: "Juan Pérez",
 *   email: "juan@email.com",
 *   phone: "555-1234",
 *   membershipType: "student" // "student", "teacher", "public"
 * }
 * 
 * Estructura de préstamos:
 * {
 *   id: "LOAN-001",
 *   userId: "USER-001",
 *   bookId: "BOOK-001",
 *   borrowDate: "2024-01-15",
 *   dueDate: "2024-02-15",
 *   returnDate: null,
 *   status: "active" // "active", "returned", "overdue"
 * }
 */

class Library {
    constructor() {
        // TODO: Inicializar la biblioteca
        // Pista: this.books = [], this.users = [], this.loans = []
    }

    /**
     * Agrega un libro a la biblioteca
     * @param {Object} book - Libro a agregar
     * @returns {boolean} True si se agregó correctamente
     */
    addBook(book) {
        // TODO: Implementar agregar libro
        // Pista 1: Validar que el libro tenga todos los campos requeridos
        // Pista 2: Verificar que el ISBN sea único
        // Pista 3: Validar que totalCopies > 0 y availableCopies <= totalCopies
        // Pista 4: Agregar el libro al array this.books
        // Pista 5: Retornar true si se agregó, false si falló
        
        throw new Error('Método addBook no implementado');
    }

    /**
     * Registra un nuevo usuario en la biblioteca
     * @param {Object} user - Usuario a registrar
     * @returns {boolean} True si se registró correctamente
     */
    registerUser(user) {
        // TODO: Implementar registrar usuario
        // Pista 1: Validar que el usuario tenga todos los campos requeridos
        // Pista 2: Verificar que el email tenga formato válido
        // Pista 3: Validar que membershipType sea válido ("student", "teacher", "public")
        // Pista 4: Verificar que el ID de usuario sea único
        // Pista 5: Agregar el usuario al array this.users
        // Pista 6: Retornar true si se registró, false si falló
        
        throw new Error('Método registerUser no implementado');
    }

    /**
     * Presta un libro a un usuario
     * @param {string} userId - ID del usuario
     * @param {string} bookId - ID del libro
     * @returns {string|null} ID del préstamo si es exitoso, null si falló
     */
    borrowBook(userId, bookId) {
        // TODO: Implementar prestar libro
        // Pista 1: Buscar el usuario y libro por ID
        // Pista 2: Verificar que el libro esté disponible (availableCopies > 0)
        // Pista 3: Verificar límites de préstamo por tipo de usuario
        // Pista 4: Calcular fecha de vencimiento según tipo de usuario
        // Pista 5: Crear el préstamo y agregarlo a this.loans
        // Pista 6: Actualizar availableCopies del libro
        // Pista 7: Retornar el ID del préstamo o null si falló
        
        throw new Error('Método borrowBook no implementado');
    }

    /**
     * Devuelve un libro prestado
     * @param {string} userId - ID del usuario
     * @param {string} bookId - ID del libro
     * @returns {boolean} True si se devolvió correctamente
     */
    returnBook(userId, bookId) {
        // TODO: Implementar devolver libro
        // Pista 1: Buscar el préstamo activo por userId y bookId
        // Pista 2: Verificar que el préstamo exista y esté activo
        // Pista 3: Actualizar el préstamo (returnDate, status)
        // Pista 4: Incrementar availableCopies del libro
        // Pista 5: Retornar true si se devolvió, false si falló
        
        throw new Error('Método returnBook no implementado');
    }

    /**
     * Calcula la multa por retraso en la devolución
     * @param {string} loanId - ID del préstamo
     * @returns {number} Monto de la multa
     */
    calculateFine(loanId) {
        // TODO: Implementar cálculo de multa
        // Pista 1: Buscar el préstamo por ID
        // Pista 2: Verificar que el préstamo esté vencido
        // Pista 3: Calcular días de retraso (fecha actual - fecha de vencimiento)
        // Pista 4: Aplicar multa de $1 por día de retraso
        // Pista 5: Retornar el monto de la multa
        
        throw new Error('Método calculateFine no implementado');
    }

    /**
     * Obtiene todos los libros con préstamos vencidos
     * @returns {Array} Array de préstamos vencidos
     */
    getOverdueBooks() {
        // TODO: Implementar obtener libros vencidos
        // Pista 1: Filtrar préstamos activos
        // Pista 2: Verificar cuáles están vencidos (fecha actual > fecha de vencimiento)
        // Pista 3: Retornar array de préstamos vencidos
        
        throw new Error('Método getOverdueBooks no implementado');
    }

    /**
     * Busca libros por diferentes criterios
     * @param {Object} criteria - Criterios de búsqueda
     * @returns {Array} Array de libros que coinciden
     */
    searchBooks(criteria) {
        // TODO: Implementar búsqueda de libros
        // Pista 1: Filtrar libros según los criterios proporcionados
        // Pista 2: Criterios posibles: title, author, category, isbn
        // Pista 3: Usar toLowerCase() para búsquedas case-insensitive
        // Pista 4: Retornar array de libros que coinciden
        
        throw new Error('Método searchBooks no implementado');
    }

    /**
     * Obtiene el historial de préstamos de un usuario
     * @param {string} userId - ID del usuario
     * @returns {Array} Array de préstamos del usuario
     */
    getUserLoans(userId) {
        // TODO: Implementar obtener préstamos de usuario
        // Pista 1: Filtrar préstamos por userId
        // Pista 2: Retornar array de préstamos del usuario
        
        throw new Error('Método getUserLoans no implementado');
    }

    /**
     * Obtiene estadísticas de la biblioteca
     * @returns {Object} Estadísticas de la biblioteca
     */
    getLibraryStats() {
        // TODO: Implementar estadísticas de biblioteca
        // Pista 1: Contar total de libros, usuarios, préstamos activos
        // Pista 2: Contar libros vencidos
        // Pista 3: Retornar objeto con las estadísticas
        
        throw new Error('Método getLibraryStats no implementado');
    }

    /**
     * Método auxiliar para generar ID único
     * @param {string} prefix - Prefijo del ID
     * @returns {string} ID único generado
     */
    generateId(prefix) {
        // TODO: Implementar generación de ID único
        // Pista: return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        throw new Error('Método generateId no implementado');
    }

    /**
     * Método auxiliar para validar email
     * @param {string} email - Email a validar
     * @returns {boolean} True si el email es válido
     */
    isValidEmail(email) {
        // TODO: Implementar validación de email
        // Pista: Usar expresión regular para validar formato de email
        // return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        throw new Error('Método isValidEmail no implementado');
    }

    /**
     * Método auxiliar para obtener límites de préstamo por tipo de usuario
     * @param {string} membershipType - Tipo de membresía
     * @returns {Object} Límites de préstamo
     */
    getLoanLimits(membershipType) {
        // TODO: Implementar límites de préstamo
        // Pista: Retornar objeto con maxBooks y loanDays según el tipo
        // student: { maxBooks: 3, loanDays: 30 }
        // teacher: { maxBooks: 5, loanDays: 60 }
        // public: { maxBooks: 2, loanDays: 14 }
        
        throw new Error('Método getLoanLimits no implementado');
    }
}

module.exports = Library;
