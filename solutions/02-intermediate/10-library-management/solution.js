/**
 * SOLUCIÓN: Sistema de Gestión de Biblioteca
 * 
 * Esta es la solución completa para el ejercicio de sistema de gestión de biblioteca.
 * La clase Library implementa un sistema completo con libros, usuarios, préstamos,
 * multas y reportes con todas las validaciones y reglas de negocio.
 */

class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.loans = [];
    }

    /**
     * Agrega un libro a la biblioteca
     * @param {Object} book - Libro a agregar
     * @returns {boolean} True si se agregó correctamente
     */
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

        // Agregar el libro
        this.books.push(book);
        return true;
    }

    /**
     * Registra un nuevo usuario en la biblioteca
     * @param {Object} user - Usuario a registrar
     * @returns {boolean} True si se registró correctamente
     */
    registerUser(user) {
        // Validar campos requeridos
        if (!user || !user.id || !user.name || !user.email || 
            !user.phone || !user.membershipType) {
            return false;
        }

        // Validar email
        if (!this.isValidEmail(user.email)) {
            return false;
        }

        // Validar tipo de membresía
        const validMembershipTypes = ['student', 'teacher', 'public'];
        if (!validMembershipTypes.includes(user.membershipType)) {
            return false;
        }

        // Verificar que el ID de usuario sea único
        if (this.users.some(u => u.id === user.id)) {
            return false;
        }

        // Agregar el usuario
        this.users.push(user);
        return true;
    }

    /**
     * Presta un libro a un usuario
     * @param {string} userId - ID del usuario
     * @param {string} bookId - ID del libro
     * @returns {string|null} ID del préstamo si es exitoso, null si falló
     */
    borrowBook(userId, bookId) {
        // Buscar usuario y libro
        const user = this.users.find(u => u.id === userId);
        const book = this.books.find(b => b.id === bookId);

        if (!user || !book) {
            return null;
        }

        // Verificar que el libro esté disponible
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

        // Verificar que no tenga el mismo libro prestado
        if (activeLoans.some(l => l.bookId === bookId)) {
            return null;
        }

        // Crear el préstamo
        const loanId = this.generateId('LOAN');
        const borrowDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + limits.loanDays);
        const dueDateStr = dueDate.toISOString().split('T')[0];

        const loan = {
            id: loanId,
            userId: userId,
            bookId: bookId,
            borrowDate: borrowDate,
            dueDate: dueDateStr,
            returnDate: null,
            status: 'active'
        };

        this.loans.push(loan);

        // Actualizar availableCopies del libro
        book.availableCopies--;

        return loanId;
    }

    /**
     * Devuelve un libro prestado
     * @param {string} userId - ID del usuario
     * @param {string} bookId - ID del libro
     * @returns {boolean} True si se devolvió correctamente
     */
    returnBook(userId, bookId) {
        // Buscar préstamo activo
        const loan = this.loans.find(l => 
            l.userId === userId && l.bookId === bookId && l.status === 'active'
        );

        if (!loan) {
            return false;
        }

        // Actualizar el préstamo
        loan.returnDate = new Date().toISOString().split('T')[0];
        loan.status = 'returned';

        // Actualizar availableCopies del libro
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            book.availableCopies++;
        }

        return true;
    }

    /**
     * Calcula la multa por retraso en la devolución
     * @param {string} loanId - ID del préstamo
     * @returns {number} Monto de la multa
     */
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

    /**
     * Obtiene todos los libros con préstamos vencidos
     * @returns {Array} Array de préstamos vencidos
     */
    getOverdueBooks() {
        const today = new Date();
        
        return this.loans.filter(loan => {
            if (loan.status !== 'active') {
                return false;
            }
            
            const dueDate = new Date(loan.dueDate);
            return today > dueDate;
        });
    }

    /**
     * Busca libros por diferentes criterios
     * @param {Object} criteria - Criterios de búsqueda
     * @returns {Array} Array de libros que coinciden
     */
    searchBooks(criteria) {
        return this.books.filter(book => {
            if (criteria.title && 
                !book.title.toLowerCase().includes(criteria.title.toLowerCase())) {
                return false;
            }
            
            if (criteria.author && 
                !book.author.toLowerCase().includes(criteria.author.toLowerCase())) {
                return false;
            }
            
            if (criteria.category && 
                !book.category.toLowerCase().includes(criteria.category.toLowerCase())) {
                return false;
            }
            
            if (criteria.isbn && book.isbn !== criteria.isbn) {
                return false;
            }
            
            return true;
        });
    }

    /**
     * Obtiene el historial de préstamos de un usuario
     * @param {string} userId - ID del usuario
     * @returns {Array} Array de préstamos del usuario
     */
    getUserLoans(userId) {
        return this.loans.filter(loan => loan.userId === userId);
    }

    /**
     * Obtiene estadísticas de la biblioteca
     * @returns {Object} Estadísticas de la biblioteca
     */
    getLibraryStats() {
        const activeLoans = this.loans.filter(l => l.status === 'active');
        const overdueBooks = this.getOverdueBooks();

        return {
            totalBooks: this.books.length,
            totalUsers: this.users.length,
            activeLoans: activeLoans.length,
            overdueBooks: overdueBooks.length
        };
    }

    /**
     * Método auxiliar para generar ID único
     * @param {string} prefix - Prefijo del ID
     * @returns {string} ID único generado
     */
    generateId(prefix) {
        return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Método auxiliar para validar email
     * @param {string} email - Email a validar
     * @returns {boolean} True si el email es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Método auxiliar para obtener límites de préstamo por tipo de usuario
     * @param {string} membershipType - Tipo de membresía
     * @returns {Object} Límites de préstamo
     */
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
}

// Versión extendida con funcionalidades adicionales
class LibraryExtended extends Library {
    constructor() {
        super();
        this.fineRate = 1; // $1 por día de retraso
        this.gracePeriod = 0; // Días de gracia
    }

    /**
     * Obtiene libros más populares
     * @param {number} limit - Número máximo de libros a retornar
     * @returns {Array} Array de libros más populares
     */
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

    /**
     * Obtiene usuarios con más préstamos
     * @param {number} limit - Número máximo de usuarios a retornar
     * @returns {Array} Array de usuarios más activos
     */
    getActiveUsers(limit = 10) {
        const userStats = {};
        
        // Contar préstamos por usuario
        this.loans.forEach(loan => {
            if (!userStats[loan.userId]) {
                userStats[loan.userId] = 0;
            }
            userStats[loan.userId]++;
        });
        
        // Ordenar por actividad
        const sortedUsers = Object.entries(userStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([userId]) => this.users.find(u => u.id === userId))
            .filter(user => user !== undefined);
        
        return sortedUsers;
    }

    /**
     * Obtiene reporte de multas
     * @returns {Object} Reporte de multas
     */
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

    /**
     * Renueva un préstamo
     * @param {string} loanId - ID del préstamo
     * @returns {boolean} True si se renovó correctamente
     */
    renewLoan(loanId) {
        const loan = this.loans.find(l => l.id === loanId);
        
        if (!loan || loan.status !== 'active') {
            return false;
        }
        
        // Verificar que no esté vencido
        const today = new Date();
        const dueDate = new Date(loan.dueDate);
        
        if (today > dueDate) {
            return false; // No se puede renovar si está vencido
        }
        
        // Extender la fecha de vencimiento
        const user = this.users.find(u => u.id === loan.userId);
        const limits = this.getLoanLimits(user.membershipType);
        
        const newDueDate = new Date(loan.dueDate);
        newDueDate.setDate(newDueDate.getDate() + limits.loanDays);
        loan.dueDate = newDueDate.toISOString().split('T')[0];
        
        return true;
    }
}

// Versión con validaciones más estrictas
class LibraryStrict extends Library {
    constructor() {
        super();
        this.maxBooksPerLibrary = 10000;
        this.maxUsersPerLibrary = 5000;
    }

    addBook(book) {
        // Validación adicional: límite de libros en la biblioteca
        if (this.books.length >= this.maxBooksPerLibrary) {
            return false;
        }
        
        return super.addBook(book);
    }

    registerUser(user) {
        // Validación adicional: límite de usuarios en la biblioteca
        if (this.users.length >= this.maxUsersPerLibrary) {
            return false;
        }
        
        return super.registerUser(user);
    }

    /**
     * Bloquea un usuario por multas excesivas
     * @param {string} userId - ID del usuario
     * @returns {boolean} True si el usuario fue bloqueado
     */
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

    /**
     * Verifica si un usuario está bloqueado
     * @param {string} userId - ID del usuario
     * @returns {boolean} True si está bloqueado
     */
    isUserBlocked(userId) {
        const user = this.users.find(u => u.id === userId);
        return user && user.blocked === true;
    }

    borrowBook(userId, bookId) {
        // Verificar si el usuario está bloqueado
        if (this.isUserBlocked(userId)) {
            return null;
        }
        
        return super.borrowBook(userId, bookId);
    }
}

module.exports = Library;
