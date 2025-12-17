/**
 * Solución: Sistema de Reservas de Sala
 * 
 * Esta implementación muestra cómo crear clases Room y BookingSystem que gestionan
 * reservas de salas con validación de solapamientos temporales y cálculos de ingresos.
 */

class Room {
    /**
     * Constructor de la clase Room
     * Traducción: Constructor de Sala
     *
     * Crea una nueva sala con nombre, capacidad y precio por hora.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     */
    constructor(name, capacity, pricePerHour) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Room name is required');
        }

        // Valida que la capacidad sea un número mayor que 0
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error('Room capacity must be greater than 0');
        }

        // Valida que el precio por hora sea un número mayor que 0
        if (typeof pricePerHour !== 'number' || pricePerHour <= 0) {
            throw new Error('Room price per hour must be greater than 0');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.capacity = capacity;
        this.pricePerHour = pricePerHour;
    }
}

class BookingSystem {
    /**
     * Constructor de la clase BookingSystem
     * Traducción: Constructor de Sistema de Reservas
     *
     * Crea un nuevo sistema de reservas con arrays vacíos para salas y reservas.
     */
    constructor() {
        this.rooms = [];
        this.bookings = [];
    }

    /**
     * Agrega una nueva sala al sistema.
     * Traducción: Agregar Sala
     *
     * Crea una nueva instancia de Room y la agrega al sistema.
     * Valida que no exista ya una sala con el mismo nombre.
     */
    addRoom(name, capacity, pricePerHour) {
        // Valida que no exista ya una sala con ese nombre
        if (this.findRoom(name) !== null) {
            throw new Error('Room already exists');
        }

        // Crea una nueva instancia de Room
        const room = new Room(name, capacity, pricePerHour);
        
        // Agrega la sala al array
        this.rooms.push(room);
        
        // Retorna la sala creada
        return room;
    }

    /**
     * Busca una sala por su nombre usando find().
     * Traducción: Buscar Sala
     *
     * Busca una sala cuyo name coincida exactamente con el parámetro recibido.
     */
    findRoom(name) {
        const room = this.rooms.find(room => room.name === name);
        return room || null;
    }

    /**
     * Reserva una sala en un horario específico.
     * Traducción: Reservar Sala
     *
     * Crea una reserva para una sala en un horario específico.
     * Valida que la sala exista, que los horarios sean válidos, y que no haya solapamientos.
     */
    bookRoom(roomName, startTime, duration) {
        // Busca la sala por nombre
        const room = this.findRoom(roomName);
        
        // Valida que la sala exista
        if (room === null) {
            throw new Error('Room not found');
        }

        // Valida que startTime esté entre 0 y 23
        if (typeof startTime !== 'number' || startTime < 0 || startTime > 23) {
            throw new Error('Start time must be between 0 and 23');
        }

        // Valida que duration sea mayor que 0
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Duration must be greater than 0');
        }

        // Calcula endTime
        const endTime = startTime + duration;

        // Valida que la reserva no se extienda más allá de 24 horas
        if (endTime > 24) {
            throw new Error('Booking extends beyond 24 hours');
        }

        // Valida que no haya solapamientos
        // Dos reservas se solapan si: (startTime < existingEndTime) && (endTime > existingStartTime)
        const hasOverlap = this.bookings.some(booking => 
            booking.roomName === roomName &&
            startTime < booking.endTime &&
            endTime > booking.startTime
        );

        if (hasOverlap) {
            throw new Error('Room is already booked at this time');
        }

        // Crea el objeto de reserva
        const booking = {
            roomName,
            startTime,
            duration,
            endTime
        };

        // Agrega la reserva al array
        this.bookings.push(booking);

        // Retorna el objeto de reserva creado
        return booking;
    }

    /**
     * Obtiene todas las salas disponibles en un horario específico usando filter().
     * Traducción: Obtener Salas Disponibles
     *
     * Retorna un nuevo array con todas las salas que NO tienen reservas
     * que se solapen con el horario solicitado.
     */
    getAvailableRooms(startTime, duration) {
        // Calcula endTime
        const endTime = startTime + duration;

        // Usa filter() para obtener salas disponibles
        return this.rooms.filter(room => {
            // Verifica si la sala tiene reservas que se solapen
            const hasOverlap = this.bookings.some(booking => 
                booking.roomName === room.name &&
                startTime < booking.endTime &&
                endTime > booking.startTime
            );

            // La sala está disponible si NO tiene solapamientos
            return !hasOverlap;
        });
    }

    /**
     * Cancela una reserva específica.
     * Traducción: Cancelar Reserva
     *
     * Elimina una reserva que coincida exactamente con el nombre de la sala
     * y la hora de inicio.
     */
    cancelBooking(roomName, startTime) {
        // Busca el índice de la reserva
        const bookingIndex = this.bookings.findIndex(booking => 
            booking.roomName === roomName && booking.startTime === startTime
        );

        // Valida que la reserva exista
        if (bookingIndex === -1) {
            throw new Error('Booking not found');
        }

        // Elimina la reserva del array
        this.bookings.splice(bookingIndex, 1);

        // Retorna true si se canceló correctamente
        return true;
    }

    /**
     * Calcula los ingresos de una sala específica usando reduce().
     * Traducción: Obtener Ingresos de Sala
     *
     * Calcula los ingresos totales de una sala sumando (precio por hora × duración)
     * de todas sus reservas.
     */
    getRoomRevenue(roomName) {
        // Busca la sala por nombre
        const room = this.findRoom(roomName);
        
        // Valida que la sala exista
        if (room === null) {
            throw new Error('Room not found');
        }

        // Filtra las reservas de esa sala
        const roomBookings = this.bookings.filter(booking => booking.roomName === roomName);

        // Si no hay reservas, retorna 0
        if (roomBookings.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return roomBookings.reduce((total, booking) => {
            return total + (room.pricePerHour * booking.duration);
        }, 0);
    }

    /**
     * Calcula los ingresos totales del sistema usando reduce().
     * Traducción: Obtener Ingresos Totales
     *
     * Calcula los ingresos totales de todas las salas sumando todos los ingresos.
     */
    getTotalRevenue() {
        // Si no hay reservas, retorna 0
        if (this.bookings.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return this.bookings.reduce((total, booking) => {
            // Busca la sala para obtener su precio por hora
            const room = this.findRoom(booking.roomName);
            
            // Suma (precio por hora × duración) al total
            return total + (room.pricePerHour * booking.duration);
        }, 0);
    }

    /**
     * Obtiene todas las reservas de una sala específica usando filter().
     * Traducción: Obtener Reservas por Sala
     *
     * Retorna un nuevo array con todas las reservas de la sala especificada.
     */
    getBookingsByRoom(roomName) {
        // Usa filter() para filtrar reservas de esa sala
        return this.bookings.filter(booking => booking.roomName === roomName);
    }
}

module.exports = {
    Room,
    BookingSystem
};

