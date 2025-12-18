/**
 * Solución: Sistema de Gestión de Cine
 * 
 * Esta implementación muestra cómo crear clases Movie, Screening y Cinema que gestionan
 * películas, proyecciones, venta de boletos y cálculos de ingresos.
 */

class Movie {
    constructor(title, duration, genre, rating) {
        // Valida que el título sea un string no vacío
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Movie title is required');
        }

        // Valida que la duración sea un número mayor que 0
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Movie duration must be greater than 0');
        }

        // Valida que el género sea un string no vacío
        if (typeof genre !== 'string' || genre.trim().length === 0) {
            throw new Error('Movie genre is required');
        }

        // Valida que la clasificación sea un string no vacío
        if (typeof rating !== 'string' || rating.trim().length === 0) {
            throw new Error('Movie rating is required');
        }

        // Asigna los valores validados
        this.title = title.trim();
        this.duration = duration;
        this.genre = genre.trim();
        this.rating = rating.trim();
    }

    getDuration() {
        return this.duration;
    }

    getGenre() {
        return this.genre;
    }

    getRating() {
        return this.rating;
    }
}

class Screening {
    constructor(movie, room, startTime, ticketPrice) {
        // Valida que movie sea una instancia de Movie
        if (!(movie instanceof Movie)) {
            throw new Error('Movie must be an instance of Movie');
        }

        // Valida que room sea un string no vacío
        if (typeof room !== 'string' || room.trim().length === 0) {
            throw new Error('Room name is required');
        }

        // Valida que startTime sea una instancia de Date
        if (!(startTime instanceof Date)) {
            throw new Error('Start time must be a Date object');
        }

        // Valida que ticketPrice sea un número mayor que 0
        if (typeof ticketPrice !== 'number' || ticketPrice <= 0) {
            throw new Error('Ticket price must be greater than 0');
        }

        // Asigna los valores validados
        this.movie = movie;
        this.room = room.trim();
        this.startTime = startTime;
        this.ticketPrice = ticketPrice;
        this.ticketsSold = 0;
    }

    getAvailableSeats(cinema) {
        // Valida que cinema sea una instancia de Cinema
        if (!(cinema instanceof Cinema)) {
            throw new Error('Cinema must be an instance of Cinema');
        }

        // Obtiene la capacidad de la sala
        const capacity = cinema.getRoomCapacity(this.room);

        // Calcula asientos disponibles
        const available = capacity - this.ticketsSold;

        // Retorna 0 si es negativo (no puede haber asientos negativos)
        return Math.max(0, available);
    }

    sellTickets(cinema, quantity) {
        // Valida que quantity sea un número mayor que 0
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Obtiene los asientos disponibles
        const availableSeats = this.getAvailableSeats(cinema);

        // Valida que haya suficientes asientos disponibles
        if (availableSeats < quantity) {
            throw new Error('Not enough seats available');
        }

        // Incrementa los boletos vendidos
        this.ticketsSold += quantity;

        // Retorna la cantidad de boletos vendidos
        return quantity;
    }

    getRevenue() {
        // Calcula ingresos: precio del boleto × boletos vendidos
        return this.ticketPrice * this.ticketsSold;
    }

    isFull(cinema) {
        // Obtiene los asientos disponibles
        const availableSeats = this.getAvailableSeats(cinema);

        // Retorna true si no hay asientos disponibles
        return availableSeats === 0;
    }

    getEndTime() {
        // Crea una nueva fecha basada en startTime
        const endTime = new Date(this.startTime);

        // Suma la duración de la película (en minutos) a la hora de inicio
        endTime.setMinutes(endTime.getMinutes() + this.movie.getDuration());

        // Retorna la fecha de finalización
        return endTime;
    }
}

class Cinema {
    constructor(name, totalSeats) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Cinema name is required');
        }

        // Valida que totalSeats sea un número mayor que 0
        if (typeof totalSeats !== 'number' || totalSeats <= 0) {
            throw new Error('Total seats must be greater than 0');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.totalSeats = totalSeats;
        this.movies = [];
        this.screenings = [];
        this.roomCapacities = {};
    }

    addMovie(movie) {
        // Valida que movie sea una instancia de Movie
        if (!(movie instanceof Movie)) {
            throw new Error('Movie must be an instance of Movie');
        }

        // Agrega la película al array
        this.movies.push(movie);

        // Retorna la película agregada
        return movie;
    }

    setRoomCapacity(roomName, capacity) {
        // Valida que roomName sea un string no vacío
        if (typeof roomName !== 'string' || roomName.trim().length === 0) {
            throw new Error('Room name is required');
        }

        // Valida que capacity sea un número mayor que 0
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error('Room capacity must be greater than 0');
        }

        // Almacena la capacidad de la sala
        this.roomCapacities[roomName.trim()] = capacity;

        // Retorna true
        return true;
    }

    getRoomCapacity(roomName) {
        // Retorna la capacidad de la sala si existe, o 0 si no existe
        return this.roomCapacities[roomName] || 0;
    }

    createScreening(movie, room, startTime, ticketPrice) {
        // Crea una nueva instancia de Screening
        const screening = new Screening(movie, room, startTime, ticketPrice);

        // Agrega la proyección al array
        this.screenings.push(screening);

        // Retorna la proyección creada
        return screening;
    }

    getScreeningsByMovie(movieTitle) {
        // Usa filter() para obtener proyecciones de la película especificada
        return this.screenings.filter(screening => screening.movie.title === movieTitle);
    }

    getScreeningsByDate(date) {
        // Valida que date sea una instancia de Date
        if (!(date instanceof Date)) {
            throw new Error('Date must be a Date object');
        }

        // Normaliza la fecha de búsqueda usando UTC para evitar problemas de zona horaria
        const searchYear = date.getUTCFullYear();
        const searchMonth = date.getUTCMonth();
        const searchDate = date.getUTCDate();

        // Usa filter() para obtener proyecciones del día especificado
        return this.screenings.filter(screening => {
            const screeningDate = screening.startTime;
            return (
                screeningDate.getUTCFullYear() === searchYear &&
                screeningDate.getUTCMonth() === searchMonth &&
                screeningDate.getUTCDate() === searchDate
            );
        });
    }

    getTotalRevenue() {
        // Si no hay proyecciones, retorna 0
        if (this.screenings.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return this.screenings.reduce((total, screening) => {
            return total + screening.getRevenue();
        }, 0);
    }

    getMostPopularMovie() {
        // Si no hay proyecciones, retorna null
        if (this.screenings.length === 0) {
            return null;
        }

        // Objeto para almacenar ventas por película
        const salesByMovie = {};

        // Suma los boletos vendidos por película
        this.screenings.forEach(screening => {
            const movieTitle = screening.movie.title;
            if (!salesByMovie[movieTitle]) {
                salesByMovie[movieTitle] = 0;
            }
            salesByMovie[movieTitle] += screening.ticketsSold;
        });

        // Encuentra la película con más boletos vendidos
        let mostPopular = null;
        let maxSales = 0;

        Object.keys(salesByMovie).forEach(movieTitle => {
            if (salesByMovie[movieTitle] > maxSales) {
                maxSales = salesByMovie[movieTitle];
                mostPopular = movieTitle;
            }
        });

        // Retorna el título de la película más popular
        return mostPopular;
    }
}

module.exports = {
    Movie,
    Screening,
    Cinema
};

