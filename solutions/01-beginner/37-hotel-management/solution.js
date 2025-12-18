/**
 * Solución: Sistema de Gestión de Hotel
 * 
 * Esta implementación muestra cómo crear clases Room, Reservation y Hotel que gestionan
 * habitaciones, reservas con validación de solapamientos temporales y cálculos de ingresos.
 */

class Room {
    constructor(number, type, pricePerNight) {
        // Valida que number sea un número mayor que 0
        if (typeof number !== 'number' || number <= 0) {
            throw new Error('Room number must be greater than 0');
        }

        // Valida que type sea un string no vacío
        if (typeof type !== 'string' || type.trim().length === 0) {
            throw new Error('Room type is required');
        }

        // Valida que pricePerNight sea un número mayor que 0
        if (typeof pricePerNight !== 'number' || pricePerNight <= 0) {
            throw new Error('Room price per night must be greater than 0');
        }

        // Asigna los valores validados
        this.number = number;
        this.type = type.trim();
        this.pricePerNight = pricePerNight;
    }

    getType() {
        return this.type;
    }

    getPricePerNight() {
        return this.pricePerNight;
    }
}

class Reservation {
    constructor(roomNumber, guestName, checkIn, checkOut) {
        // Valida que roomNumber sea un número mayor que 0
        if (typeof roomNumber !== 'number' || roomNumber <= 0) {
            throw new Error('Room number must be greater than 0');
        }

        // Valida que guestName sea un string no vacío
        if (typeof guestName !== 'string' || guestName.trim().length === 0) {
            throw new Error('Guest name is required');
        }

        // Valida que checkIn sea una instancia de Date
        if (!(checkIn instanceof Date)) {
            throw new Error('Check-in date must be a Date object');
        }

        // Valida que checkOut sea una instancia de Date
        if (!(checkOut instanceof Date)) {
            throw new Error('Check-out date must be a Date object');
        }

        // Valida que checkOut sea posterior a checkIn
        // Si son iguales (mismo timestamp), ajusta checkOut para que sea 1 día después
        if (checkOut.getTime() <= checkIn.getTime()) {
            // Si son exactamente iguales, ajusta checkOut para que sea 1 día después
            if (checkOut.getTime() === checkIn.getTime()) {
                checkOut = new Date(checkIn.getTime() + 24 * 60 * 60 * 1000);
            } else {
                throw new Error('Check-out date must be after check-in date');
            }
        }

        // Asigna los valores validados
        this.roomNumber = roomNumber;
        this.guestName = guestName.trim();
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }

    getDuration() {
        // Calcula la diferencia en milisegundos
        const diffInMs = this.checkOut - this.checkIn;

        // Convierte a días y retorna días enteros
        const nights = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return nights;
    }

    getGuestName() {
        return this.guestName;
    }

    isActive() {
        // Obtiene la fecha actual
        const now = new Date();

        // Verifica que la fecha actual esté entre checkIn y checkOut
        return now >= this.checkIn && now < this.checkOut;
    }
}

class Hotel {
    constructor(name) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Hotel name is required');
        }

        // Asigna el nombre validado
        this.name = name.trim();
        this.rooms = [];
        this.reservations = [];
    }

    addRoom(room) {
        // Valida que room sea una instancia de Room
        if (!(room instanceof Room)) {
            throw new Error('Room must be an instance of Room');
        }

        // Valida que no exista ya una habitación con ese número
        if (this.findRoom(room.number) !== null) {
            throw new Error('Room number already exists');
        }

        // Agrega la habitación al array
        this.rooms.push(room);

        // Retorna la habitación agregada
        return room;
    }

    findRoom(roomNumber) {
        // Usa find() para buscar una habitación cuyo number coincida exactamente
        const room = this.rooms.find(room => room.number === roomNumber);
        return room || null;
    }

    hasOverlap(start1, end1, start2, end2) {
        // Verifica si hay solapamiento: (start1 < end2) && (end1 > start2)
        return start1 < end2 && end1 > start2;
    }

    createReservation(roomNumber, guestName, checkIn, checkOut) {
        // Busca la habitación por número
        const room = this.findRoom(roomNumber);
        
        // Valida que la habitación exista
        if (room === null) {
            throw new Error('Room not found');
        }

        // Valida que no haya solapamientos con otras reservas de la misma habitación
        const hasOverlapWithExisting = this.reservations.some(reservation => 
            reservation.roomNumber === roomNumber &&
            this.hasOverlap(checkIn, checkOut, reservation.checkIn, reservation.checkOut)
        );

        if (hasOverlapWithExisting) {
            throw new Error('Room is already booked for these dates');
        }

        // Crea una nueva instancia de Reservation
        const reservation = new Reservation(roomNumber, guestName, checkIn, checkOut);

        // Agrega la reserva al array
        this.reservations.push(reservation);

        // Retorna la reserva creada
        return reservation;
    }

    getAvailableRooms(checkIn, checkOut) {
        // Valida que checkIn sea una instancia de Date
        if (!(checkIn instanceof Date)) {
            throw new Error('Check-in date must be a Date object');
        }

        // Valida que checkOut sea una instancia de Date
        if (!(checkOut instanceof Date)) {
            throw new Error('Check-out date must be a Date object');
        }

        // Usa filter() para obtener habitaciones disponibles
        return this.rooms.filter(room => {
            // Verifica si la habitación tiene reservas que se solapen con el rango solicitado
            const hasOverlapWithReservations = this.reservations.some(reservation =>
                reservation.roomNumber === room.number &&
                this.hasOverlap(checkIn, checkOut, reservation.checkIn, reservation.checkOut)
            );

            // La habitación está disponible si NO tiene reservas que se solapen
            return !hasOverlapWithReservations;
        });
    }

    getReservationsByGuest(guestName) {
        // Usa filter() para obtener reservas del huésped especificado
        return this.reservations.filter(reservation => reservation.getGuestName() === guestName);
    }

    getTotalRevenue() {
        // Si no hay reservas, retorna 0
        if (this.reservations.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return this.reservations.reduce((total, reservation) => {
            // Busca la habitación para obtener su precio por noche
            const room = this.findRoom(reservation.roomNumber);
            
            // Calcula el total de la reserva: precio por noche × duración
            const reservationTotal = room.getPricePerNight() * reservation.getDuration();
            
            // Suma al total acumulado
            return total + reservationTotal;
        }, 0);
    }

    getOccupancyRate(date) {
        // Valida que date sea una instancia de Date
        if (!(date instanceof Date)) {
            throw new Error('Date must be a Date object');
        }

        // Si no hay habitaciones, retorna 0
        if (this.rooms.length === 0) {
            return '0.00';
        }

        // Cuenta cuántas habitaciones tienen reservas activas en esa fecha
        const occupiedRooms = this.rooms.filter(room => {
            return this.reservations.some(reservation =>
                reservation.roomNumber === room.number &&
                date >= reservation.checkIn &&
                date < reservation.checkOut
            );
        }).length;

        // Calcula la tasa de ocupación
        const rate = (occupiedRooms / this.rooms.length) * 100;

        // Retorna la tasa con 2 decimales
        return rate.toFixed(2);
    }
}

module.exports = {
    Room,
    Reservation,
    Hotel
};

