const { Room, BookingSystem } = require('./exercise');

describe('Sistema de Reservas de Sala', () => {
    // ===== CASOS BÁSICOS - CLASE ROOM =====
    describe('Clase Room - Casos básicos', () => {
        test('crea una sala con propiedades correctas', () => {
            // Este test verifica que el constructor de Room asigna correctamente las propiedades básicas.
            // Se espera que al crear una sala, todas sus propiedades se inicialicen con los valores proporcionados.
            const room = new Room('Sala A', 10, 50);
            expect(room.name).toBe('Sala A');
            expect(room.capacity).toBe(10);
            expect(room.pricePerHour).toBe(50);
        });
    });

    // ===== VALIDACIONES - CLASE ROOM =====
    describe('Clase Room - Validaciones', () => {
        test('lanza error cuando el nombre está vacío', () => {
            // Este test verifica que el constructor valida que el nombre no esté vacío.
            // Se espera que lance un error descriptivo cuando el nombre es una cadena vacía o solo espacios.
            expect(() => new Room('', 10, 50)).toThrow('Room name is required');
            expect(() => new Room('   ', 10, 50)).toThrow('Room name is required');
        });

        test('lanza error cuando la capacidad es inválida', () => {
            // Este test verifica que el constructor valida que la capacidad sea mayor que 0.
            // Se espera que lance un error cuando la capacidad es 0 o negativa.
            expect(() => new Room('Sala A', 0, 50)).toThrow('Room capacity must be greater than 0');
            expect(() => new Room('Sala A', -5, 50)).toThrow('Room capacity must be greater than 0');
        });

        test('lanza error cuando el precio por hora es inválido', () => {
            // Este test verifica que el constructor valida que el precio por hora sea mayor que 0.
            // Se espera que lance un error cuando el precio es 0 o negativo.
            expect(() => new Room('Sala A', 10, 0)).toThrow('Room price per hour must be greater than 0');
            expect(() => new Room('Sala A', 10, -10)).toThrow('Room price per hour must be greater than 0');
        });
    });

    // ===== CASOS BÁSICOS - CLASE BOOKINGSYSTEM =====
    describe('Clase BookingSystem - Casos básicos', () => {
        test('inicializa con arrays vacíos', () => {
            // Este test verifica que el constructor de BookingSystem inicializa correctamente los arrays.
            // Se espera que al crear un sistema nuevo, los arrays de salas y reservas estén vacíos.
            const system = new BookingSystem();
            expect(system.rooms).toEqual([]);
            expect(system.bookings).toEqual([]);
        });

        test('addRoom agrega una nueva sala y la retorna', () => {
            // Este test verifica que addRoom crea y agrega una nueva sala al sistema.
            // El comportamiento esperado es que la sala se agregue al array y se retorne la instancia creada.
            const system = new BookingSystem();
            const room = system.addRoom('Sala A', 10, 50);
            
            expect(room).toBeInstanceOf(Room);
            expect(room.name).toBe('Sala A');
            expect(system.rooms).toHaveLength(1);
            expect(system.rooms[0]).toBe(room);
        });

        test('addRoom puede agregar múltiples salas', () => {
            // Este test verifica que se pueden agregar múltiples salas al sistema.
            // Se espera que cada sala se agregue correctamente y el array crezca en tamaño.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            system.addRoom('Sala C', 15, 75);
            
            expect(system.rooms).toHaveLength(3);
        });
    });

    // ===== VALIDACIONES - CLASE BOOKINGSYSTEM =====
    describe('Clase BookingSystem - Validaciones', () => {
        test('lanza error cuando se intenta agregar una sala duplicada', () => {
            // Este test verifica que addRoom valida que no existan salas duplicadas por nombre.
            // Se espera que lance un error cuando se intenta agregar una sala con un nombre que ya existe.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.addRoom('Sala A', 20, 100)).toThrow('Room already exists');
        });

        test('addRoom es case-sensitive para nombres duplicados', () => {
            // Este test verifica que la validación de duplicados distingue entre mayúsculas y minúsculas.
            // Se espera que 'Sala A' y 'sala a' se consideren salas diferentes.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            // Esto no debería lanzar error porque son nombres diferentes (case-sensitive)
            const room2 = system.addRoom('sala a', 20, 100);
            expect(room2).toBeInstanceOf(Room);
        });
    });

    // ===== MÉTODO findRoom() =====
    describe('Método findRoom()', () => {
        test('encuentra una sala existente por nombre', () => {
            // Este test verifica que findRoom encuentra correctamente una sala usando find().
            // Se espera que cuando existe una sala con el nombre buscado, se retorne esa sala.
            const system = new BookingSystem();
            const room1 = system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            
            const found = system.findRoom('Sala A');
            expect(found).toBe(room1);
            expect(found.name).toBe('Sala A');
        });

        test('retorna null cuando no encuentra la sala', () => {
            // Este test verifica que findRoom retorna null cuando no existe una sala con ese nombre.
            // El comportamiento esperado es que find() no encuentre nada y se retorne null.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const found = system.findRoom('Sala B');
            expect(found).toBeNull();
        });
    });

    // ===== MÉTODO bookRoom() =====
    describe('Método bookRoom()', () => {
        test('reserva una sala disponible correctamente', () => {
            // Este test verifica que bookRoom crea correctamente una reserva cuando la sala está disponible.
            // Se espera que se cree el objeto de reserva con todas las propiedades correctas.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const booking = system.bookRoom('Sala A', 9, 2);
            expect(booking).toEqual({
                roomName: 'Sala A',
                startTime: 9,
                duration: 2,
                endTime: 11
            });
            expect(system.bookings).toHaveLength(1);
        });

        test('lanza error cuando la sala no existe', () => {
            // Este test verifica que bookRoom valida que la sala exista antes de reservar.
            // Se espera que lance un error cuando se intenta reservar una sala que no existe.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.bookRoom('Sala B', 9, 2)).toThrow('Room not found');
        });

        test('lanza error cuando startTime está fuera del rango válido', () => {
            // Este test verifica que bookRoom valida que startTime esté entre 0 y 23.
            // Se espera que lance un error cuando startTime es menor que 0 o mayor que 23.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.bookRoom('Sala A', -1, 2)).toThrow('Start time must be between 0 and 23');
            expect(() => system.bookRoom('Sala A', 24, 2)).toThrow('Start time must be between 0 and 23');
        });

        test('lanza error cuando la duración es inválida', () => {
            // Este test verifica que bookRoom valida que duration sea mayor que 0.
            // Se espera que lance un error cuando duration es 0 o negativa.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.bookRoom('Sala A', 9, 0)).toThrow('Duration must be greater than 0');
            expect(() => system.bookRoom('Sala A', 9, -1)).toThrow('Duration must be greater than 0');
        });

        test('lanza error cuando la reserva se extiende más allá de 24 horas', () => {
            // Este test verifica que bookRoom valida que la reserva no se extienda más allá de las 24:00.
            // Se espera que lance un error cuando endTime > 24.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.bookRoom('Sala A', 23, 2)).toThrow('Booking extends beyond 24 hours');
            expect(() => system.bookRoom('Sala A', 22, 3)).toThrow('Booking extends beyond 24 hours');
        });

        test('permite reservas que terminan exactamente a las 24:00', () => {
            // Este test verifica que se pueden hacer reservas que terminan exactamente a las 24:00.
            // El comportamiento esperado es que endTime === 24 sea válido.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const booking = system.bookRoom('Sala A', 22, 2);
            expect(booking.endTime).toBe(24);
        });
    });

    // ===== VALIDACIÓN DE SOLAPAMIENTOS =====
    describe('Validación de solapamientos', () => {
        test('lanza error cuando hay solapamiento exacto', () => {
            // Este test verifica que bookRoom detecta solapamientos cuando las reservas tienen el mismo horario.
            // Se espera que lance un error cuando se intenta reservar en un horario ya ocupado.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2); // 9:00 - 11:00
            
            expect(() => system.bookRoom('Sala A', 9, 2)).toThrow('Room is already booked at this time');
        });

        test('lanza error cuando la nueva reserva comienza durante una reserva existente', () => {
            // Este test verifica que bookRoom detecta solapamientos cuando la nueva reserva comienza durante otra.
            // Se espera que detecte el solapamiento correctamente.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 3); // 9:00 - 12:00
            
            expect(() => system.bookRoom('Sala A', 10, 2)).toThrow('Room is already booked at this time');
        });

        test('lanza error cuando la nueva reserva termina durante una reserva existente', () => {
            // Este test verifica que bookRoom detecta solapamientos cuando la nueva reserva termina durante otra.
            // Se espera que detecte el solapamiento correctamente.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 10, 3); // 10:00 - 13:00
            
            expect(() => system.bookRoom('Sala A', 9, 2)).toThrow('Room is already booked at this time');
        });

        test('lanza error cuando la nueva reserva contiene completamente una reserva existente', () => {
            // Este test verifica que bookRoom detecta solapamientos cuando la nueva reserva contiene otra.
            // Se espera que detecte el solapamiento cuando una reserva está completamente dentro de otra.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 10, 2); // 10:00 - 12:00
            
            expect(() => system.bookRoom('Sala A', 9, 4)).toThrow('Room is already booked at this time');
        });

        test('permite reservas consecutivas sin solapamiento', () => {
            // Este test verifica que se pueden hacer reservas consecutivas que no se solapan.
            // Se espera que reservas que terminan cuando otra comienza sean válidas.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2); // 9:00 - 11:00
            
            const booking2 = system.bookRoom('Sala A', 11, 2); // 11:00 - 13:00 (no se solapa)
            expect(booking2).toBeDefined();
            expect(system.bookings).toHaveLength(2);
        });

        test('permite reservas en diferentes salas al mismo tiempo', () => {
            // Este test verifica que se pueden reservar diferentes salas al mismo tiempo.
            // Se espera que el solapamiento solo se valide para la misma sala.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            system.bookRoom('Sala A', 9, 2); // 9:00 - 11:00
            
            const booking2 = system.bookRoom('Sala B', 9, 2); // 9:00 - 11:00 (diferente sala)
            expect(booking2).toBeDefined();
            expect(system.bookings).toHaveLength(2);
        });
    });

    // ===== MÉTODO getAvailableRooms() - Usa filter() =====
    describe('Método getAvailableRooms() - Usa filter()', () => {
        test('retorna todas las salas cuando no hay reservas', () => {
            // Este test verifica que getAvailableRooms retorna todas las salas cuando no hay reservas.
            // Se espera que todas las salas estén disponibles si no tienen reservas.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            
            const available = system.getAvailableRooms(9, 2);
            expect(available).toHaveLength(2);
        });

        test('filtra correctamente salas disponibles usando filter()', () => {
            // Este test verifica que getAvailableRooms filtra correctamente usando filter() para obtener salas disponibles.
            // Se espera que retorne solo las salas que no tienen reservas que se solapen con el horario solicitado.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            system.addRoom('Sala C', 15, 75);
            
            system.bookRoom('Sala A', 9, 2); // 9:00 - 11:00 (ocupada)
            system.bookRoom('Sala B', 10, 1); // 10:00 - 11:00 (ocupada)
            
            const available = system.getAvailableRooms(9, 2); // Buscar 9:00 - 11:00
            expect(available).toHaveLength(1);
            expect(available[0].name).toBe('Sala C');
        });

        test('retorna array vacío cuando todas las salas están ocupadas', () => {
            // Este test verifica que getAvailableRooms retorna un array vacío cuando todas las salas están ocupadas.
            // El comportamiento esperado es que filter() no encuentre salas disponibles.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            
            system.bookRoom('Sala A', 9, 2);
            system.bookRoom('Sala B', 9, 2);
            
            const available = system.getAvailableRooms(9, 2);
            expect(available).toEqual([]);
        });

        test('retorna un nuevo array (no muta el original)', () => {
            // Este test verifica que getAvailableRooms retorna un nuevo array sin modificar el array original.
            // El comportamiento esperado es que filter() cree un nuevo array.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const available = system.getAvailableRooms(9, 2);
            available.push('intento de modificación');
            
            expect(system.getAvailableRooms(9, 2)).toHaveLength(1);
        });
    });

    // ===== MÉTODO cancelBooking() =====
    describe('Método cancelBooking()', () => {
        test('cancela una reserva existente correctamente', () => {
            // Este test verifica que cancelBooking elimina correctamente una reserva del sistema.
            // Se espera que la reserva se elimine del array bookings.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2);
            
            const cancelled = system.cancelBooking('Sala A', 9);
            expect(cancelled).toBe(true);
            expect(system.bookings).toHaveLength(0);
        });

        test('lanza error cuando la reserva no existe', () => {
            // Este test verifica que cancelBooking valida que la reserva exista antes de cancelar.
            // Se espera que lance un error cuando se intenta cancelar una reserva que no existe.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2);
            
            expect(() => system.cancelBooking('Sala A', 10)).toThrow('Booking not found');
        });

        test('permite reservar de nuevo después de cancelar', () => {
            // Este test verifica que después de cancelar una reserva, se puede reservar de nuevo en ese horario.
            // Se espera que la cancelación libere el horario para nuevas reservas.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2);
            system.cancelBooking('Sala A', 9);
            
            const booking = system.bookRoom('Sala A', 9, 2);
            expect(booking).toBeDefined();
        });
    });

    // ===== MÉTODO getRoomRevenue() - Usa reduce() =====
    describe('Método getRoomRevenue() - Usa reduce()', () => {
        test('calcula correctamente los ingresos de una sala usando reduce()', () => {
            // Este test verifica que getRoomRevenue calcula correctamente usando reduce() para sumar ingresos.
            // Se espera que calcule (precio × duración) de todas las reservas de esa sala.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50); // $50/hora
            system.bookRoom('Sala A', 9, 2);   // $50 × 2 = $100
            system.bookRoom('Sala A', 14, 3);  // $50 × 3 = $150
            
            const revenue = system.getRoomRevenue('Sala A');
            expect(revenue).toBe(250);
        });

        test('retorna 0 cuando la sala no tiene reservas', () => {
            // Este test verifica que getRoomRevenue retorna 0 cuando la sala no tiene reservas.
            // El comportamiento esperado es que reduce() sobre un array vacío retorne el valor inicial (0).
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const revenue = system.getRoomRevenue('Sala A');
            expect(revenue).toBe(0);
        });

        test('lanza error cuando la sala no existe', () => {
            // Este test verifica que getRoomRevenue valida que la sala exista antes de calcular ingresos.
            // Se espera que lance un error cuando se intenta calcular ingresos de una sala inexistente.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            expect(() => system.getRoomRevenue('Sala B')).toThrow('Room not found');
        });
    });

    // ===== MÉTODO getTotalRevenue() - Usa reduce() =====
    describe('Método getTotalRevenue() - Usa reduce()', () => {
        test('calcula correctamente los ingresos totales usando reduce()', () => {
            // Este test verifica que getTotalRevenue calcula correctamente usando reduce() para sumar todos los ingresos.
            // Se espera que calcule los ingresos de todas las reservas de todas las salas.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);  // $50/hora
            system.addRoom('Sala B', 20, 100); // $100/hora
            
            system.bookRoom('Sala A', 9, 2);   // $50 × 2 = $100
            system.bookRoom('Sala A', 14, 1);  // $50 × 1 = $50
            system.bookRoom('Sala B', 10, 2);  // $100 × 2 = $200
            
            const total = system.getTotalRevenue();
            expect(total).toBe(350);
        });

        test('retorna 0 cuando no hay reservas', () => {
            // Este test verifica que getTotalRevenue retorna 0 cuando no hay reservas.
            // El comportamiento esperado es que reduce() sobre un array vacío retorne el valor inicial (0).
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            
            const total = system.getTotalRevenue();
            expect(total).toBe(0);
        });
    });

    // ===== MÉTODO getBookingsByRoom() - Usa filter() =====
    describe('Método getBookingsByRoom() - Usa filter()', () => {
        test('retorna todas las reservas de una sala usando filter()', () => {
            // Este test verifica que getBookingsByRoom filtra correctamente usando filter() para obtener reservas de una sala.
            // Se espera que retorne un nuevo array con todas las reservas de esa sala.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            
            const booking1 = system.bookRoom('Sala A', 9, 2);
            const booking2 = system.bookRoom('Sala A', 14, 1);
            system.bookRoom('Sala B', 10, 2);
            
            const bookings = system.getBookingsByRoom('Sala A');
            expect(bookings).toHaveLength(2);
            expect(bookings).toContainEqual(booking1);
            expect(bookings).toContainEqual(booking2);
        });

        test('retorna array vacío cuando la sala no tiene reservas', () => {
            // Este test verifica que getBookingsByRoom retorna un array vacío cuando la sala no tiene reservas.
            // El comportamiento esperado es que filter() no encuentre coincidencias y retorne un array vacío.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2);
            system.addRoom('Sala B', 20, 100);
            
            const bookings = system.getBookingsByRoom('Sala B');
            expect(bookings).toEqual([]);
        });

        test('retorna un nuevo array (no muta el original)', () => {
            // Este test verifica que getBookingsByRoom retorna un nuevo array sin modificar el array original.
            // El comportamiento esperado es que filter() cree un nuevo array.
            const system = new BookingSystem();
            system.addRoom('Sala A', 10, 50);
            system.bookRoom('Sala A', 9, 2);
            
            const bookings = system.getBookingsByRoom('Sala A');
            bookings.push('intento de modificación');
            
            expect(system.getBookingsByRoom('Sala A')).toHaveLength(1);
        });
    });

    // ===== INTEGRACIÓN - OPERACIONES COMBINADAS =====
    describe('Integración - Operaciones combinadas', () => {
        test('permite realizar operaciones complejas con múltiples salas y reservas', () => {
            // Este test verifica que todos los métodos trabajan correctamente juntos en un escenario real.
            // Se espera que se puedan agregar salas, reservar, cancelar, y realizar consultas sin problemas.
            const system = new BookingSystem();
            
            // Agregar salas
            system.addRoom('Sala A', 10, 50);
            system.addRoom('Sala B', 20, 100);
            
            // Reservar salas
            system.bookRoom('Sala A', 9, 2);   // $100
            system.bookRoom('Sala A', 14, 1);  // $50
            system.bookRoom('Sala B', 10, 3);  // $300
            
            // Verificar cálculos
            expect(system.getRoomRevenue('Sala A')).toBe(150);
            expect(system.getTotalRevenue()).toBe(450);
            
            // Verificar disponibilidad
            const available = system.getAvailableRooms(11, 2);
            expect(available.length).toBeGreaterThan(0);
            
            // Cancelar reserva
            system.cancelBooking('Sala A', 9);
            expect(system.getTotalRevenue()).toBe(350);
            
            // Verificar reservas por sala
            const bookings = system.getBookingsByRoom('Sala A');
            expect(bookings).toHaveLength(1);
        });
    });
});

