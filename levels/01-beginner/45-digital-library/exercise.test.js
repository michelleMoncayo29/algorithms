const { DigitalBook, Reader, DigitalLibrary } = require('./exercise');

describe('Sistema de Gestión de Biblioteca Digital', () => {
    describe('Casos básicos', () => {
        test('debe crear un libro digital con propiedades correctas', () => {
            // Propósito: Verificar que el constructor asigna correctamente las propiedades iniciales
            // Entrada: new DigitalBook('978-123', 'JavaScript Guide', 'John Doe', 300, 'Programming')
            // Esperado: El libro debe tener todas las propiedades asignadas e isAvailable=true
            const book = new DigitalBook('978-123', 'JavaScript Guide', 'John Doe', 300, 'Programming');
            expect(book.isbn).toBe('978-123');
            expect(book.title).toBe('JavaScript Guide');
            expect(book.author).toBe('John Doe');
            expect(book.pages).toBe(300);
            expect(book.category).toBe('Programming');
            expect(book.isAvailable).toBe(true);
            expect(book.borrowHistory).toEqual([]);
        });

        test('debe prestar un libro correctamente', () => {
            // Propósito: Verificar que borrow registra el préstamo y marca libro como no disponible
            // Entrada: book.borrow('R001', new Date('2024-01-15')) - Prestar libro a lector
            // Esperado: isAvailable debe ser false y debe haber registro de préstamo
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            const borrowDate = new Date('2024-01-15');
            book.borrow('R001', borrowDate);
            expect(book.isAvailable).toBe(false);
        });

        test('debe devolver un libro correctamente y calcular días', () => {
            // Propósito: Verificar que return marca libro como disponible y calcula días de préstamo
            // Entrada: Libro prestado, return con fecha de devolución
            // Esperado: isAvailable debe ser true y debe retornar número de días
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            const borrowDate = new Date('2024-01-15');
            const returnDate = new Date('2024-01-20');
            book.borrow('R001', borrowDate);
            const days = book.return(returnDate);
            
            expect(book.isAvailable).toBe(true);
            expect(days).toBe(5);
        });

        test('debe contar correctamente los préstamos históricos', () => {
            // Propósito: Verificar que getBorrowCount cuenta todos los préstamos realizados
            // Entrada: Libro con múltiples préstamos y devoluciones
            // Esperado: Debe retornar el número total de préstamos históricos
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            book.borrow('R001', new Date('2024-01-15'));
            book.return(new Date('2024-01-20'));
            book.borrow('R002', new Date('2024-02-01'));
            book.return(new Date('2024-02-05'));
            
            expect(book.getBorrowCount()).toBe(2);
        });

        test('debe crear un lector con propiedades correctas', () => {
            // Propósito: Verificar que el constructor de Reader asigna correctamente las propiedades
            // Entrada: new Reader('R001', 'Juan', 'juan@email.com', 5)
            // Esperado: El lector debe tener todas las propiedades inicializadas correctamente
            const reader = new Reader('R001', 'Juan', 'juan@email.com', 5);
            expect(reader.readerId).toBe('R001');
            expect(reader.name).toBe('Juan');
            expect(reader.email).toBe('juan@email.com');
            expect(reader.borrowLimit).toBe(5);
            expect(reader.borrowedBooks).toEqual([]);
            expect(reader.borrowHistory).toEqual([]);
        });

        test('debe prestar libro a lector correctamente', () => {
            // Propósito: Verificar que borrowBook agrega libro a borrowedBooks
            // Entrada: reader.borrowBook(book) - Prestar libro al lector
            // Esperado: El libro debe estar en borrowedBooks y el préstamo debe registrarse
            const reader = new Reader('R001', 'Juan', 'juan@email.com');
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            book.borrow('R001', new Date());
            reader.borrowBook(book);
            
            expect(reader.borrowedBooks).toContain(book);
        });

        test('debe verificar correctamente si puede pedir más libros', () => {
            // Propósito: Verificar que canBorrowMore verifica límite de préstamos
            // Entrada: Lector con menos libros prestados que el límite
            // Esperado: Debe retornar true si puede pedir más, false si alcanzó el límite
            const reader = new Reader('R001', 'Juan', 'juan@email.com', 2);
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Fiction');
            
            book1.borrow('R001', new Date());
            book2.borrow('R001', new Date());
            reader.borrowBook(book1);
            reader.borrowBook(book2);
            
            expect(reader.canBorrowMore()).toBe(false);
        });

        test('debe crear una biblioteca y agregar libros y lectores', () => {
            // Propósito: Verificar que DigitalLibrary se inicializa y puede agregar elementos
            // Entrada: new DigitalLibrary('MyLibrary'), addBook, registerReader
            // Esperado: La biblioteca debe tener nombre correcto y los elementos agregados
            const library = new DigitalLibrary('MyLibrary');
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            const reader = new Reader('R001', 'Juan', 'juan@email.com');
            
            library.addBook(book);
            library.registerReader(reader);
            
            expect(library.name).toBe('MyLibrary');
            expect(library.books).toContain(book);
            expect(library.readers).toContain(reader);
        });

        test('debe encontrar libro por ISBN correctamente', () => {
            // Propósito: Verificar que findBook busca libro por ISBN
            // Entrada: library.findBook('978-123') - Buscar libro por ISBN
            // Esperado: Debe retornar el libro encontrado o null si no existe
            const library = new DigitalLibrary('MyLibrary');
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            library.addBook(book);
            
            expect(library.findBook('978-123')).toBe(book);
            expect(library.findBook('978-999')).toBeNull();
        });

        test('debe filtrar libros disponibles correctamente', () => {
            // Propósito: Verificar que getAvailableBooks filtra solo libros disponibles
            // Entrada: Biblioteca con libros disponibles y prestados
            // Esperado: Debe retornar solo libros con isAvailable=true
            const library = new DigitalLibrary('MyLibrary');
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Fiction');
            book2.borrow('R001', new Date());
            
            library.addBook(book1);
            library.addBook(book2);
            
            const available = library.getAvailableBooks();
            expect(available).toHaveLength(1);
            expect(available[0]).toBe(book1);
        });

        test('debe filtrar libros por categoría correctamente', () => {
            // Propósito: Verificar que getBooksByCategory filtra libros por categoría
            // Entrada: Biblioteca con libros de diferentes categorías
            // Esperado: Debe retornar solo libros de la categoría especificada
            const library = new DigitalLibrary('MyLibrary');
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Non-Fiction');
            const book3 = new DigitalBook('978-003', 'Book 3', 'Author', 100, 'Fiction');
            
            library.addBook(book1);
            library.addBook(book2);
            library.addBook(book3);
            
            const fictionBooks = library.getBooksByCategory('Fiction');
            expect(fictionBooks).toHaveLength(2);
            expect(fictionBooks).toContain(book1);
            expect(fictionBooks).toContain(book3);
        });
    });

    describe('Validación de inputs', () => {
        test('debe lanzar error cuando isbn está vacío', () => {
            // Propósito: Verificar validación de ISBN requerido
            // Entrada: new DigitalBook('', 'Title', 'Author', 100, 'Category') - ISBN vacío
            // Esperado: Error "Book ISBN is required"
            expect(() => new DigitalBook('', 'Title', 'Author', 100, 'Category')).toThrow('Book ISBN is required');
        });

        test('debe lanzar error cuando title está vacío', () => {
            // Propósito: Verificar validación de título requerido
            // Entrada: new DigitalBook('978-123', '', 'Author', 100, 'Category') - Título vacío
            // Esperado: Error "Book title is required"
            expect(() => new DigitalBook('978-123', '', 'Author', 100, 'Category')).toThrow('Book title is required');
        });

        test('debe lanzar error cuando pages es inválido', () => {
            // Propósito: Verificar validación de páginas positiva
            // Entrada: new DigitalBook('978-123', 'Title', 'Author', 0, 'Category') - Páginas inválidas
            // Esperado: Error "Book pages must be greater than 0"
            expect(() => new DigitalBook('978-123', 'Title', 'Author', 0, 'Category')).toThrow('Book pages must be greater than 0');
        });

        test('debe lanzar error al prestar libro ya prestado', () => {
            // Propósito: Verificar validación de disponibilidad antes de prestar
            // Entrada: borrow() en libro ya prestado
            // Esperado: Error "Book is not available"
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            book.borrow('R001', new Date());
            expect(() => book.borrow('R002', new Date())).toThrow('Book is not available');
        });

        test('debe lanzar error al devolver libro no prestado', () => {
            // Propósito: Verificar validación de préstamo activo antes de devolver
            // Entrada: return() en libro disponible
            // Esperado: Error "Book is not currently borrowed"
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            expect(() => book.return(new Date())).toThrow('Book is not currently borrowed');
        });

        test('debe lanzar error cuando readerId está vacío', () => {
            // Propósito: Verificar validación de ID de lector requerido
            // Entrada: new Reader('', 'Juan', 'juan@email.com') - ID vacío
            // Esperado: Error "Reader ID is required"
            expect(() => new Reader('', 'Juan', 'juan@email.com')).toThrow('Reader ID is required');
        });

        test('debe lanzar error al prestar más libros que el límite', () => {
            // Propósito: Verificar validación de límite de préstamos
            // Entrada: borrowBook cuando ya alcanzó el límite
            // Esperado: Error "Borrow limit reached"
            const reader = new Reader('R001', 'Juan', 'juan@email.com', 2);
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Fiction');
            const book3 = new DigitalBook('978-003', 'Book 3', 'Author', 100, 'Fiction');
            
            book1.borrow('R001', new Date());
            book2.borrow('R001', new Date());
            book3.borrow('R001', new Date());
            
            reader.borrowBook(book1);
            reader.borrowBook(book2);
            expect(() => reader.borrowBook(book3)).toThrow('Borrow limit reached');
        });

        test('debe lanzar error cuando library name está vacío', () => {
            // Propósito: Verificar validación de nombre de biblioteca requerido
            // Entrada: new DigitalLibrary('') - Nombre vacío
            // Esperado: Error "Library name is required"
            expect(() => new DigitalLibrary('')).toThrow('Library name is required');
        });

        test('debe lanzar error al agregar libro duplicado', () => {
            // Propósito: Verificar que no se permiten libros con mismo ISBN
            // Entrada: addBook dos veces con mismo ISBN
            // Esperado: Error "Book already exists"
            const library = new DigitalLibrary('MyLibrary');
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            library.addBook(book);
            expect(() => library.addBook(new DigitalBook('978-123', 'Other', 'Jane', 200, 'Other'))).toThrow('Book already exists');
        });
    });

    describe('Casos adicionales', () => {
        test('debe calcular correctamente el promedio de duración de préstamos', () => {
            // Propósito: Verificar que getAverageBorrowDuration calcula promedio de días
            // Entrada: Libro con préstamos de 5 y 7 días
            // Esperado: Debe retornar 6.00 días promedio
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            book.borrow('R001', new Date('2024-01-15'));
            book.return(new Date('2024-01-20')); // 5 días
            book.borrow('R002', new Date('2024-02-01'));
            book.return(new Date('2024-02-08')); // 7 días
            
            expect(book.getAverageBorrowDuration()).toBe(6.00);
        });

        test('debe verificar correctamente si un libro está vencido', () => {
            // Propósito: Verificar que isOverdue determina si el préstamo excede maxDays
            // Entrada: Libro prestado hace 35 días con maxDays=30
            // Esperado: Debe retornar true (está vencido)
            const book = new DigitalBook('978-123', 'JS Guide', 'John', 300, 'Tech');
            const borrowDate = new Date();
            borrowDate.setDate(borrowDate.getDate() - 35);
            book.borrow('R001', borrowDate);
            
            expect(book.isOverdue(30)).toBe(true);
        });

        test('debe encontrar el libro más prestado correctamente', () => {
            // Propósito: Verificar que getMostBorrowedBook identifica el libro con más préstamos
            // Entrada: Biblioteca con múltiples libros y préstamos
            // Esperado: Debe retornar el libro con más préstamos históricos
            const library = new DigitalLibrary('MyLibrary');
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Fiction');
            
            book1.borrow('R001', new Date('2024-01-15'));
            book1.return(new Date('2024-01-20'));
            book1.borrow('R002', new Date('2024-02-01'));
            book1.return(new Date('2024-02-05'));
            
            book2.borrow('R001', new Date('2024-01-10'));
            book2.return(new Date('2024-01-15'));
            
            library.addBook(book1);
            library.addBook(book2);
            
            expect(library.getMostBorrowedBook()).toBe(book1);
        });

        test('debe obtener estadísticas de la biblioteca correctamente', () => {
            // Propósito: Verificar que getLibraryStatistics retorna objeto con todas las estadísticas
            // Entrada: Biblioteca con libros y lectores
            // Esperado: Debe retornar objeto con totalBooks, totalReaders, availableBooks, etc.
            const library = new DigitalLibrary('MyLibrary');
            const book1 = new DigitalBook('978-001', 'Book 1', 'Author', 100, 'Fiction');
            const book2 = new DigitalBook('978-002', 'Book 2', 'Author', 100, 'Fiction');
            const reader = new Reader('R001', 'Juan', 'juan@email.com');
            
            book2.borrow('R001', new Date());
            library.addBook(book1);
            library.addBook(book2);
            library.registerReader(reader);
            
            const stats = library.getLibraryStatistics();
            expect(stats.totalBooks).toBe(2);
            expect(stats.totalReaders).toBe(1);
            expect(stats.availableBooks).toBe(1);
            expect(stats.borrowedBooks).toBe(1);
        });
    });
});

