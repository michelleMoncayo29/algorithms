const Library = require('./exercise');

describe('Sistema de Gestión de Biblioteca', () => {
    let library;
    let book1, book2, book3;
    let user1, user2, user3;

    beforeEach(() => {
        library = new Library();
        
        // Libros de prueba
        book1 = {
            id: "BOOK-001",
            title: "El Quijote",
            author: "Miguel de Cervantes",
            isbn: "978-84-376-0494-7",
            category: "Fiction",
            available: true,
            totalCopies: 3,
            availableCopies: 2
        };
        
        book2 = {
            id: "BOOK-002",
            title: "Cien Años de Soledad",
            author: "Gabriel García Márquez",
            isbn: "978-84-376-0495-4",
            category: "Fiction",
            available: true,
            totalCopies: 2,
            availableCopies: 2
        };
        
        book3 = {
            id: "BOOK-003",
            title: "Física Cuántica",
            author: "Richard Feynman",
            isbn: "978-84-376-0496-1",
            category: "Science",
            available: true,
            totalCopies: 1,
            availableCopies: 1
        };
        
        // Usuarios de prueba
        user1 = {
            id: "USER-001",
            name: "Juan Pérez",
            email: "juan@email.com",
            phone: "555-1234",
            membershipType: "student"
        };
        
        user2 = {
            id: "USER-002",
            name: "María García",
            email: "maria@email.com",
            phone: "555-5678",
            membershipType: "teacher"
        };
        
        user3 = {
            id: "USER-003",
            name: "Carlos López",
            email: "carlos@email.com",
            phone: "555-9012",
            membershipType: "public"
        };
    });

    // Tests del constructor
    test('debe inicializar la biblioteca vacía', () => {
        expect(library.books).toEqual([]);
        expect(library.users).toEqual([]);
        expect(library.loans).toEqual([]);
    });

    // Tests de agregar libros
    test('debe agregar libros válidos a la biblioteca', () => {
        const result = library.addBook(book1);
        
        expect(result).toBe(true);
        expect(library.books).toHaveLength(1);
        expect(library.books[0]).toEqual(book1);
    });

    test('debe agregar múltiples libros a la biblioteca', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        
        expect(library.books).toHaveLength(3);
    });

    test('debe rechazar libros con campos faltantes', () => {
        const invalidBook = {
            id: "BOOK-001",
            title: "El Quijote"
            // Faltan campos requeridos
        };
        
        const result = library.addBook(invalidBook);
        
        expect(result).toBe(false);
        expect(library.books).toHaveLength(0);
    });

    test('debe rechazar libros con ISBN duplicado', () => {
        library.addBook(book1);
        
        const duplicateBook = {
            ...book2,
            isbn: book1.isbn // Mismo ISBN
        };
        
        const result = library.addBook(duplicateBook);
        
        expect(result).toBe(false);
        expect(library.books).toHaveLength(1);
    });

    test('debe rechazar libros con totalCopies inválido', () => {
        const invalidBook = {
            ...book1,
            totalCopies: 0 // Inválido
        };
        
        const result = library.addBook(invalidBook);
        
        expect(result).toBe(false);
        expect(library.books).toHaveLength(0);
    });

    test('debe rechazar libros con availableCopies mayor que totalCopies', () => {
        const invalidBook = {
            ...book1,
            totalCopies: 2,
            availableCopies: 3 // Mayor que totalCopies
        };
        
        const result = library.addBook(invalidBook);
        
        expect(result).toBe(false);
        expect(library.books).toHaveLength(0);
    });

    // Tests de registrar usuarios
    test('debe registrar usuarios válidos', () => {
        const result = library.registerUser(user1);
        
        expect(result).toBe(true);
        expect(library.users).toHaveLength(1);
        expect(library.users[0]).toEqual(user1);
    });

    test('debe registrar múltiples usuarios', () => {
        library.registerUser(user1);
        library.registerUser(user2);
        library.registerUser(user3);
        
        expect(library.users).toHaveLength(3);
    });

    test('debe rechazar usuarios con campos faltantes', () => {
        const invalidUser = {
            id: "USER-001",
            name: "Juan Pérez"
            // Faltan campos requeridos
        };
        
        const result = library.registerUser(invalidUser);
        
        expect(result).toBe(false);
        expect(library.users).toHaveLength(0);
    });

    test('debe rechazar usuarios con email inválido', () => {
        const invalidUser = {
            ...user1,
            email: "email-invalido" // Email sin formato válido
        };
        
        const result = library.registerUser(invalidUser);
        
        expect(result).toBe(false);
        expect(library.users).toHaveLength(0);
    });

    test('debe rechazar usuarios con membershipType inválido', () => {
        const invalidUser = {
            ...user1,
            membershipType: "invalid" // Tipo inválido
        };
        
        const result = library.registerUser(invalidUser);
        
        expect(result).toBe(false);
        expect(library.users).toHaveLength(0);
    });

    test('debe rechazar usuarios con ID duplicado', () => {
        library.registerUser(user1);
        
        const duplicateUser = {
            ...user2,
            id: user1.id // Mismo ID
        };
        
        const result = library.registerUser(duplicateUser);
        
        expect(result).toBe(false);
        expect(library.users).toHaveLength(1);
    });

    // Tests de prestar libros
    test('debe prestar libros correctamente', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        
        expect(loanId).toBeTruthy();
        expect(library.loans).toHaveLength(1);
        expect(library.loans[0].userId).toBe("USER-001");
        expect(library.loans[0].bookId).toBe("BOOK-001");
        expect(library.loans[0].status).toBe("active");
    });

    test('debe actualizar availableCopies al prestar libro', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const initialCopies = book1.availableCopies;
        library.borrowBook("USER-001", "BOOK-001");
        
        const updatedBook = library.books.find(b => b.id === "BOOK-001");
        expect(updatedBook.availableCopies).toBe(initialCopies - 1);
    });

    test('debe rechazar préstamo si el libro no está disponible', () => {
        const unavailableBook = {
            ...book1,
            availableCopies: 0
        };
        
        library.addBook(unavailableBook);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        
        expect(loanId).toBe(null);
        expect(library.loans).toHaveLength(0);
    });

    test('debe rechazar préstamo si el usuario no existe', () => {
        library.addBook(book1);
        
        const loanId = library.borrowBook("INVALID-USER", "BOOK-001");
        
        expect(loanId).toBe(null);
        expect(library.loans).toHaveLength(0);
    });

    test('debe rechazar préstamo si el libro no existe', () => {
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "INVALID-BOOK");
        
        expect(loanId).toBe(null);
        expect(library.loans).toHaveLength(0);
    });

    test('debe respetar límites de préstamo por tipo de usuario', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        library.registerUser(user3); // Usuario público: máximo 2 libros
        
        // Prestar 2 libros (límite para usuario público)
        library.borrowBook("USER-003", "BOOK-001");
        library.borrowBook("USER-003", "BOOK-002");
        
        // Intentar prestar un tercer libro
        const thirdLoan = library.borrowBook("USER-003", "BOOK-003");
        
        expect(thirdLoan).toBe(null);
        expect(library.loans).toHaveLength(2);
    });

    // Tests de devolver libros
    test('debe devolver libros correctamente', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        const result = library.returnBook("USER-001", "BOOK-001");
        
        expect(result).toBe(true);
        
        const loan = library.loans.find(l => l.id === loanId);
        expect(loan.status).toBe("returned");
        expect(loan.returnDate).toBeTruthy();
        
        const updatedBook = library.books.find(b => b.id === "BOOK-001");
        expect(updatedBook.availableCopies).toBe(book1.availableCopies);
    });

    test('debe rechazar devolución si no hay préstamo activo', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const result = library.returnBook("USER-001", "BOOK-001");
        
        expect(result).toBe(false);
    });

    test('debe rechazar devolución de libro ya devuelto', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        library.borrowBook("USER-001", "BOOK-001");
        library.returnBook("USER-001", "BOOK-001");
        
        const result = library.returnBook("USER-001", "BOOK-001");
        
        expect(result).toBe(false);
    });

    // Tests de cálculo de multas
    test('debe calcular multas por retraso correctamente', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        
        // Simular préstamo vencido (5 días de retraso)
        const loan = library.loans.find(l => l.id === loanId);
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 35); // 35 días atrás (5 días de retraso)
        loan.dueDate = pastDate.toISOString().split('T')[0];
        
        const fine = library.calculateFine(loanId);
        
        expect(fine).toBe(5); // $5 por 5 días de retraso
    });

    test('debe retornar 0 de multa si el préstamo no está vencido', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        
        const fine = library.calculateFine(loanId);
        
        expect(fine).toBe(0);
    });

    test('debe retornar 0 de multa si el préstamo ya fue devuelto', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        library.returnBook("USER-001", "BOOK-001");
        
        const fine = library.calculateFine(loanId);
        
        expect(fine).toBe(0);
    });

    // Tests de libros vencidos
    test('debe obtener libros con préstamos vencidos', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.registerUser(user1);
        library.registerUser(user2);
        
        const loanId1 = library.borrowBook("USER-001", "BOOK-001");
        const loanId2 = library.borrowBook("USER-002", "BOOK-002");
        
        // Simular préstamos vencidos
        const loan1 = library.loans.find(l => l.id === loanId1);
        const loan2 = library.loans.find(l => l.id === loanId2);
        
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 5);
        
        loan1.dueDate = pastDate.toISOString().split('T')[0];
        loan2.dueDate = pastDate.toISOString().split('T')[0];
        
        const overdueBooks = library.getOverdueBooks();
        
        expect(overdueBooks).toHaveLength(2);
        expect(overdueBooks.every(loan => loan.status === "active")).toBe(true);
    });

    test('debe retornar array vacío si no hay libros vencidos', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        library.borrowBook("USER-001", "BOOK-001");
        
        const overdueBooks = library.getOverdueBooks();
        
        expect(overdueBooks).toHaveLength(0);
    });

    // Tests de búsqueda de libros
    test('debe buscar libros por título', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        
        const results = library.searchBooks({ title: "Quijote" });
        
        expect(results).toHaveLength(1);
        expect(results[0].title).toBe("El Quijote");
    });

    test('debe buscar libros por autor', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        
        const results = library.searchBooks({ author: "Miguel de Cervantes" });
        
        expect(results).toHaveLength(1);
        expect(results[0].author).toBe("Miguel de Cervantes");
    });

    test('debe buscar libros por categoría', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        
        const results = library.searchBooks({ category: "Fiction" });
        
        expect(results).toHaveLength(2);
        expect(results.every(book => book.category === "Fiction")).toBe(true);
    });

    test('debe buscar libros por ISBN', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        
        const results = library.searchBooks({ isbn: "978-84-376-0494-7" });
        
        expect(results).toHaveLength(1);
        expect(results[0].isbn).toBe("978-84-376-0494-7");
    });

    test('debe realizar búsquedas case-insensitive', () => {
        library.addBook(book1);
        library.addBook(book2);
        
        const results = library.searchBooks({ title: "quijote" });
        
        expect(results).toHaveLength(1);
        expect(results[0].title).toBe("El Quijote");
    });

    // Tests de préstamos de usuario
    test('debe obtener préstamos de un usuario específico', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.registerUser(user1);
        library.registerUser(user2);
        
        library.borrowBook("USER-001", "BOOK-001");
        library.borrowBook("USER-002", "BOOK-002");
        library.borrowBook("USER-001", "BOOK-002");
        
        const userLoans = library.getUserLoans("USER-001");
        
        expect(userLoans).toHaveLength(2);
        expect(userLoans.every(loan => loan.userId === "USER-001")).toBe(true);
    });

    test('debe retornar array vacío si el usuario no tiene préstamos', () => {
        library.registerUser(user1);
        
        const userLoans = library.getUserLoans("USER-001");
        
        expect(userLoans).toHaveLength(0);
    });

    // Tests de estadísticas
    test('debe generar estadísticas correctas de la biblioteca', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.registerUser(user1);
        library.registerUser(user2);
        
        library.borrowBook("USER-001", "BOOK-001");
        library.borrowBook("USER-002", "BOOK-002");
        
        const stats = library.getLibraryStats();
        
        expect(stats).toMatchObject({
            totalBooks: 2,
            totalUsers: 2,
            activeLoans: 2,
            overdueBooks: 0
        });
    });

    test('debe incluir libros vencidos en las estadísticas', () => {
        library.addBook(book1);
        library.registerUser(user1);
        
        const loanId = library.borrowBook("USER-001", "BOOK-001");
        
        // Simular préstamo vencido
        const loan = library.loans.find(l => l.id === loanId);
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 5);
        loan.dueDate = pastDate.toISOString().split('T')[0];
        
        const stats = library.getLibraryStats();
        
        expect(stats.overdueBooks).toBe(1);
    });

    // Tests de casos edge
    test('debe manejar fechas de vencimiento correctamente para diferentes tipos de usuario', () => {
        library.addBook(book1);
        library.registerUser(user1); // estudiante: 30 días
        library.registerUser(user2); // profesor: 60 días
        library.registerUser(user3); // público: 14 días
        
        const loan1 = library.borrowBook("USER-001", "BOOK-001");
        const loan2 = library.borrowBook("USER-002", "BOOK-001");
        const loan3 = library.borrowBook("USER-003", "BOOK-001");
        
        expect(loan1).toBeTruthy();
        expect(loan2).toBeTruthy();
        expect(loan3).toBeTruthy();
        
        // Verificar que las fechas de vencimiento sean diferentes
        const loans = library.loans;
        expect(loans[0].dueDate).not.toBe(loans[1].dueDate);
        expect(loans[1].dueDate).not.toBe(loans[2].dueDate);
    });

    test('debe manejar múltiples operaciones secuenciales', () => {
        // Agregar libros y usuarios
        library.addBook(book1);
        library.addBook(book2);
        library.registerUser(user1);
        library.registerUser(user2);
        
        // Prestar libros
        library.borrowBook("USER-001", "BOOK-001");
        library.borrowBook("USER-002", "BOOK-002");
        
        // Devolver un libro
        library.returnBook("USER-001", "BOOK-001");
        
        // Verificar estado final
        expect(library.books).toHaveLength(2);
        expect(library.users).toHaveLength(2);
        expect(library.loans).toHaveLength(2);
        
        const activeLoans = library.loans.filter(l => l.status === "active");
        const returnedLoans = library.loans.filter(l => l.status === "returned");
        
        expect(activeLoans).toHaveLength(1);
        expect(returnedLoans).toHaveLength(1);
    });
});
