const { Book, Library } = require('./exercise');

describe('Library System', () => {
  describe('Book Class', () => {
    test('should create a book with correct properties', () => {
      const book = new Book('The Hobbit', 'J.R.R. Tolkien', '123');
      expect(book.title).toBe('The Hobbit');
      expect(book.author).toBe('J.R.R. Tolkien');
      expect(book.isbn).toBe('123');
      expect(book.isAvailable).toBe(true);
    });

    test('should toggle availability', () => {
      const book = new Book('1984', 'Orwell', '456');
      book.toggleAvailability();
      expect(book.isAvailable).toBe(false);
      book.toggleAvailability();
      expect(book.isAvailable).toBe(true);
    });
  });

  describe('Library Class', () => {
    let library;
    let book1;
    let book2;

    beforeEach(() => {
      library = new Library();
      book1 = new Book('Book 1', 'Author 1', '001');
      book2 = new Book('Book 2', 'Author 2', '002');
    });

    test('should start with empty books array', () => {
      expect(library.books).toEqual([]);
    });

    test('should add books', () => {
      library.addBook(book1);
      expect(library.books).toHaveLength(1);
      expect(library.books[0]).toBe(book1);
    });

    test('should find book by isbn', () => {
      library.addBook(book1);
      library.addBook(book2);
      expect(library.findBook('002')).toBe(book2);
      expect(library.findBook('999')).toBeUndefined();
    });

    test('should borrow book if available', () => {
      library.addBook(book1);
      const borrowedBook = library.borrowBook('001');
      expect(borrowedBook).toBe(book1);
      expect(book1.isAvailable).toBe(false);
    });

    test('should return null if borrowing unavailable book', () => {
      library.addBook(book1);
      library.borrowBook('001'); // First borrow
      const result = library.borrowBook('001'); // Second borrow
      expect(result).toBeNull();
    });

    test('should return null if borrowing non-existent book', () => {
      const result = library.borrowBook('999');
      expect(result).toBeNull();
    });

    test('should return book', () => {
      library.addBook(book1);
      library.borrowBook('001');
      const returnedBook = library.returnBook('001');
      expect(returnedBook).toBe(book1);
      expect(book1.isAvailable).toBe(true);
    });

    test('should return null if returning available book', () => {
      library.addBook(book1);
      const result = library.returnBook('001');
      expect(result).toBeNull();
      expect(book1.isAvailable).toBe(true);
    });
  });
});
