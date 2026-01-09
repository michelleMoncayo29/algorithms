/**
 * Sistema de Gestión de Biblioteca Digital (Digital Library System)
 */
class DigitalBook {
    constructor(isbn, title, author, pages, category) {
        if (typeof isbn !== 'string' || isbn.trim().length === 0) {
            throw new Error('Book ISBN is required');
        }
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Book title is required');
        }
        if (typeof author !== 'string' || author.trim().length === 0) {
            throw new Error('Book author is required');
        }
        if (typeof pages !== 'number' || pages <= 0) {
            throw new Error('Book pages must be greater than 0');
        }
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error('Book category is required');
        }
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.category = category;
        this.borrowHistory = [];
        this.isAvailable = true;
        this.currentBorrow = null;
    }

    borrow(readerId, borrowDate) {
        throw new Error('Method borrow not implemented');
    }

    return(returnDate) {
        throw new Error('Method return not implemented');
    }

    getBorrowCount() {
        return this.borrowHistory.length;
    }

    getAverageBorrowDuration() {
        throw new Error('Method getAverageBorrowDuration not implemented');
    }

    isOverdue(maxDays) {
        throw new Error('Method isOverdue not implemented');
    }
}

class Reader {
    constructor(readerId, name, email, borrowLimit = 5) {
        if (typeof readerId !== 'string' || readerId.trim().length === 0) {
            throw new Error('Reader ID is required');
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Reader name is required');
        }
        if (typeof email !== 'string' || email.trim().length === 0) {
            throw new Error('Reader email is required');
        }
        if (typeof borrowLimit !== 'number' || borrowLimit <= 0) {
            throw new Error('Borrow limit must be greater than 0');
        }
        this.readerId = readerId;
        this.name = name;
        this.email = email;
        this.borrowLimit = borrowLimit;
        this.borrowedBooks = [];
        this.borrowHistory = [];
    }

    borrowBook(book) {
        throw new Error('Method borrowBook not implemented');
    }

    returnBook(isbn) {
        throw new Error('Method returnBook not implemented');
    }

    getBorrowedCount() {
        return this.borrowedBooks.length;
    }

    canBorrowMore() {
        return this.borrowedBooks.length < this.borrowLimit;
    }

    getBorrowHistory() {
        return [...this.borrowHistory];
    }

    getFavoriteCategory() {
        throw new Error('Method getFavoriteCategory not implemented');
    }
}

class DigitalLibrary {
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Library name is required');
        }
        this.name = name.trim();
        this.books = [];
        this.readers = [];
    }

    addBook(book) {
        throw new Error('Method addBook not implemented');
    }

    registerReader(reader) {
        throw new Error('Method registerReader not implemented');
    }

    findBook(isbn) {
        throw new Error('Method findBook not implemented');
    }

    getAvailableBooks() {
        throw new Error('Method getAvailableBooks not implemented');
    }

    getBooksByCategory(category) {
        throw new Error('Method getBooksByCategory not implemented');
    }

    getMostBorrowedBook() {
        throw new Error('Method getMostBorrowedBook not implemented');
    }

    getOverdueBooks() {
        throw new Error('Method getOverdueBooks not implemented');
    }

    getLibraryStatistics() {
        throw new Error('Method getLibraryStatistics not implemented');
    }
}

module.exports = { DigitalBook, Reader, DigitalLibrary };

