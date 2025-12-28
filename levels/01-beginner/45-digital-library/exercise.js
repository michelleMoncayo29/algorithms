/**
 * Sistema de Gestión de Biblioteca Digital (Digital Library System)
 */
class DigitalBook {
    constructor(isbn, title, author, pages, category) {
        throw new Error('DigitalBook constructor not implemented');
    }

    borrow(readerId, borrowDate) {
        throw new Error('Method borrow not implemented');
    }

    return(returnDate) {
        throw new Error('Method return not implemented');
    }

    getBorrowCount() {
        throw new Error('Method getBorrowCount not implemented');
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
        throw new Error('Reader constructor not implemented');
    }

    borrowBook(book) {
        throw new Error('Method borrowBook not implemented');
    }

    returnBook(isbn) {
        throw new Error('Method returnBook not implemented');
    }

    getBorrowedCount() {
        throw new Error('Method getBorrowedCount not implemented');
    }

    canBorrowMore() {
        throw new Error('Method canBorrowMore not implemented');
    }

    getBorrowHistory() {
        throw new Error('Method getBorrowHistory not implemented');
    }

    getFavoriteCategory() {
        throw new Error('Method getFavoriteCategory not implemented');
    }
}

class DigitalLibrary {
    constructor(name) {
        throw new Error('DigitalLibrary constructor not implemented');
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

