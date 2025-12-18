const { Book, Library } = require('./exercise');

describe('Sistema de Biblioteca', () => {
  // ===== CASOS BÁSICOS - CLASE BOOK =====
  describe('Clase Book', () => {
    test('crea un libro con las propiedades correctas', () => {
      // Este test verifica que el constructor asigna correctamente todas las propiedades básicas del libro.
      // Se espera que al crear un libro con título, autor e ISBN, estos valores se guarden correctamente y el libro esté disponible por defecto.
      const book = new Book('The Hobbit', 'J.R.R. Tolkien', '123');
      expect(book.title).toBe('The Hobbit');
      expect(book.author).toBe('J.R.R. Tolkien');
      expect(book.isbn).toBe('123');
      expect(book.isAvailable).toBe(true);
    });

    test('toggleAvailability cambia el estado de disponibilidad correctamente', () => {
      // Este test verifica que el método toggleAvailability alterna el estado de disponibilidad del libro.
      // Se espera que cuando un libro está disponible, al llamar toggleAvailability se vuelva no disponible, y viceversa.
      const book = new Book('1984', 'Orwell', '456');
      book.toggleAvailability();
      expect(book.isAvailable).toBe(false);
      book.toggleAvailability();
      expect(book.isAvailable).toBe(true);
    });
  });

  // ===== CASOS BÁSICOS - CLASE LIBRARY =====
  describe('Clase Library', () => {
    let library;
    let book1;
    let book2;

    beforeEach(() => {
      library = new Library();
      book1 = new Book('Book 1', 'Author 1', '001');
      book2 = new Book('Book 2', 'Author 2', '002');
    });

    test('inicia con un array de libros vacío', () => {
      // Este test verifica que al crear una nueva biblioteca, el array de libros está vacío.
      // El comportamiento esperado es que la biblioteca comience sin libros registrados.
      expect(library.books).toEqual([]);
    });

    test('agrega libros correctamente a la biblioteca', () => {
      // Este test verifica que el método addBook añade libros al array de la biblioteca.
      // Se espera que después de agregar un libro, el array contenga ese libro y el tamaño del array aumente.
      library.addBook(book1);
      expect(library.books).toHaveLength(1);
      expect(library.books[0]).toBe(book1);
    });

    test('encuentra un libro por su ISBN cuando existe en la biblioteca', () => {
      // Este test verifica que el método findBook localiza correctamente un libro por su ISBN.
      // Se espera que retorne el libro correspondiente cuando el ISBN existe, y undefined cuando no existe.
      library.addBook(book1);
      library.addBook(book2);
      expect(library.findBook('002')).toBe(book2);
      expect(library.findBook('999')).toBeUndefined();
    });

    test('presta un libro cuando está disponible', () => {
      // Este test verifica que el método borrowBook presta un libro disponible y marca su disponibilidad como false.
      // Se espera que retorne el libro prestado y que el estado de disponibilidad del libro cambie a false.
      library.addBook(book1);
      const borrowedBook = library.borrowBook('001');
      expect(borrowedBook).toBe(book1);
      expect(book1.isAvailable).toBe(false);
    });

    test('retorna null cuando se intenta prestar un libro que no está disponible', () => {
      // Este test verifica que borrowBook rechaza prestar un libro que ya fue prestado previamente.
      // Se espera que retorne null cuando el libro no está disponible y que el estado del libro no cambie.
      library.addBook(book1);
      library.borrowBook('001'); // Primer préstamo
      const result = library.borrowBook('001'); // Segundo intento de préstamo
      expect(result).toBeNull();
    });

    test('retorna null cuando se intenta prestar un libro que no existe en la biblioteca', () => {
      // Este test verifica que borrowBook maneja correctamente el caso cuando el ISBN no existe en la biblioteca.
      // Se espera que retorne null cuando no se encuentra el libro con el ISBN especificado.
      const result = library.borrowBook('999');
      expect(result).toBeNull();
    });

    test('devuelve un libro prestado correctamente y marca su disponibilidad como true', () => {
      // Este test verifica que el método returnBook devuelve un libro prestado y restaura su disponibilidad.
      // Se espera que retorne el libro devuelto y que el estado de disponibilidad del libro cambie a true.
      library.addBook(book1);
      library.borrowBook('001');
      const returnedBook = library.returnBook('001');
      expect(returnedBook).toBe(book1);
      expect(book1.isAvailable).toBe(true);
    });

    test('retorna null cuando se intenta devolver un libro que ya está disponible', () => {
      // Este test verifica que returnBook rechaza devolver un libro que no fue prestado previamente.
      // Se espera que retorne null cuando el libro ya está disponible y que el estado del libro no cambie.
      library.addBook(book1);
      const result = library.returnBook('001');
      expect(result).toBeNull();
      expect(book1.isAvailable).toBe(true);
    });
  });
});
