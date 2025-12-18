const { Movie, Screening, Cinema } = require('./exercise');

describe('Sistema de Gestión de Cine', () => {
    // ===== CLASE MOVIE =====
    describe('Clase Movie', () => {
        describe('Casos básicos', () => {
            test('crea una película con todos los datos correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: title='Avengers', duration=180, genre='Action', rating='PG-13'
                // Esperado: Movie creada con todas las propiedades correctas
                const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
                expect(movie.title).toBe('Avengers');
                expect(movie.duration).toBe(180);
                expect(movie.genre).toBe('Action');
                expect(movie.rating).toBe('PG-13');
            });

            test('obtiene la duración correctamente', () => {
                // Propósito: Verificar que getDuration retorna la duración
                // Entrada: duration=120
                // Esperado: Retorna 120
                const movie = new Movie('Test', 120, 'Genre', 'R');
                expect(movie.getDuration()).toBe(120);
            });

            test('obtiene el género correctamente', () => {
                // Propósito: Verificar que getGenre retorna el género
                // Entrada: genre='Comedy'
                // Esperado: Retorna 'Comedy'
                const movie = new Movie('Test', 90, 'Comedy', 'PG');
                expect(movie.getGenre()).toBe('Comedy');
            });

            test('obtiene la clasificación correctamente', () => {
                // Propósito: Verificar que getRating retorna la clasificación
                // Entrada: rating='PG-13'
                // Esperado: Retorna 'PG-13'
                const movie = new Movie('Test', 100, 'Action', 'PG-13');
                expect(movie.getRating()).toBe('PG-13');
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el título está vacío', () => {
                // Propósito: Verificar validación de título no vacío
                // Entrada: title=''
                // Esperado: Error "Movie title is required"
                expect(() => new Movie('', 120, 'Genre', 'R')).toThrow('Movie title is required');
            });

            test('lanza error cuando la duración es inválida', () => {
                // Propósito: Verificar validación de duración > 0
                // Entrada: duration=0 o negativo
                // Esperado: Error "Movie duration must be greater than 0"
                expect(() => new Movie('Test', 0, 'Genre', 'R')).toThrow('Movie duration must be greater than 0');
                expect(() => new Movie('Test', -10, 'Genre', 'R')).toThrow('Movie duration must be greater than 0');
            });

            test('lanza error cuando el género está vacío', () => {
                // Propósito: Verificar validación de género no vacío
                // Entrada: genre=''
                // Esperado: Error "Movie genre is required"
                expect(() => new Movie('Test', 120, '', 'R')).toThrow('Movie genre is required');
            });

            test('lanza error cuando la clasificación está vacía', () => {
                // Propósito: Verificar validación de clasificación no vacía
                // Entrada: rating=''
                // Esperado: Error "Movie rating is required"
                expect(() => new Movie('Test', 120, 'Genre', '')).toThrow('Movie rating is required');
            });
        });
    });

    // ===== CLASE SCREENING =====
    describe('Clase Screening', () => {
        let cinema;
        let movie;

        beforeEach(() => {
            cinema = new Cinema('CineMax', 500);
            movie = new Movie('Avengers', 180, 'Action', 'PG-13');
            cinema.addMovie(movie);
            cinema.setRoomCapacity('Sala 1', 100);
        });

        describe('Casos básicos', () => {
            test('crea una proyección correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: movie, room='Sala 1', startTime=new Date(), ticketPrice=12.50
                // Esperado: Screening creada con todas las propiedades correctas
                const startTime = new Date('2024-12-25T19:00:00');
                const screening = new Screening(movie, 'Sala 1', startTime, 12.50);
                expect(screening.movie).toBe(movie);
                expect(screening.room).toBe('Sala 1');
                expect(screening.startTime).toBe(startTime);
                expect(screening.ticketPrice).toBe(12.50);
                expect(screening.ticketsSold).toBe(0);
            });

            test('calcula asientos disponibles correctamente', () => {
                // Propósito: Verificar que getAvailableSeats calcula correctamente
                // Entrada: Sala con capacidad 100, 0 boletos vendidos
                // Esperado: Retorna 100
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                expect(screening.getAvailableSeats(cinema)).toBe(100);
            });

            test('vende boletos correctamente', () => {
                // Propósito: Verificar que sellTickets vende boletos y actualiza ticketsSold
                // Entrada: quantity=50
                // Esperado: ticketsSold=50, asientos disponibles=50
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                const sold = screening.sellTickets(cinema, 50);
                expect(sold).toBe(50);
                expect(screening.ticketsSold).toBe(50);
                expect(screening.getAvailableSeats(cinema)).toBe(50);
            });

            test('calcula ingresos correctamente', () => {
                // Propósito: Verificar que getRevenue calcula precio × boletos vendidos
                // Entrada: ticketPrice=12.50, ticketsSold=50
                // Esperado: Retorna 625
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                screening.sellTickets(cinema, 50);
                expect(screening.getRevenue()).toBe(625);
            });

            test('verifica si está llena correctamente', () => {
                // Propósito: Verificar que isFull retorna true cuando no hay asientos disponibles
                // Entrada: Vender todos los asientos (100)
                // Esperado: Retorna true
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                screening.sellTickets(cinema, 100);
                expect(screening.isFull(cinema)).toBe(true);
            });

            test('calcula hora de finalización correctamente', () => {
                // Propósito: Verificar que getEndTime suma la duración a la hora de inicio
                // Entrada: startTime=19:00, duration=180 minutos
                // Esperado: Retorna 22:00 (3 horas después)
                const startTime = new Date('2024-12-25T19:00:00');
                const screening = new Screening(movie, 'Sala 1', startTime, 12.50);
                const endTime = screening.getEndTime();
                expect(endTime.getHours()).toBe(22);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando movie no es instancia de Movie', () => {
                // Propósito: Verificar validación de instancia de Movie
                // Entrada: movie={}
                // Esperado: Error "Movie must be an instance of Movie"
                expect(() => new Screening({}, 'Sala 1', new Date(), 12.50)).toThrow('Movie must be an instance of Movie');
            });

            test('lanza error cuando room está vacío', () => {
                // Propósito: Verificar validación de room no vacío
                // Entrada: room=''
                // Esperado: Error "Room name is required"
                expect(() => new Screening(movie, '', new Date(), 12.50)).toThrow('Room name is required');
            });

            test('lanza error cuando startTime no es Date', () => {
                // Propósito: Verificar validación de startTime como Date
                // Entrada: startTime='2024-12-25'
                // Esperado: Error "Start time must be a Date object"
                expect(() => new Screening(movie, 'Sala 1', '2024-12-25', 12.50)).toThrow('Start time must be a Date object');
            });

            test('lanza error cuando ticketPrice es inválido', () => {
                // Propósito: Verificar validación de ticketPrice > 0
                // Entrada: ticketPrice=0 o negativo
                // Esperado: Error "Ticket price must be greater than 0"
                expect(() => new Screening(movie, 'Sala 1', new Date(), 0)).toThrow('Ticket price must be greater than 0');
            });

            test('lanza error cuando quantity es inválida', () => {
                // Propósito: Verificar validación de quantity > 0 en sellTickets
                // Entrada: quantity=0 o negativo
                // Esperado: Error "Quantity must be greater than 0"
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                expect(() => screening.sellTickets(cinema, 0)).toThrow('Quantity must be greater than 0');
            });

            test('lanza error cuando no hay suficientes asientos', () => {
                // Propósito: Verificar validación de asientos disponibles
                // Entrada: quantity=150 cuando capacidad=100
                // Esperado: Error "Not enough seats available"
                const screening = new Screening(movie, 'Sala 1', new Date(), 12.50);
                expect(() => screening.sellTickets(cinema, 150)).toThrow('Not enough seats available');
            });
        });
    });

    // ===== CLASE CINEMA =====
    describe('Clase Cinema', () => {
        describe('Casos básicos', () => {
            test('crea un cine correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: name='CineMax', totalSeats=500
                // Esperado: Cinema creado con name y totalSeats correctos, arrays inicializados
                const cinema = new Cinema('CineMax', 500);
                expect(cinema.name).toBe('CineMax');
                expect(cinema.totalSeats).toBe(500);
                expect(Array.isArray(cinema.movies)).toBe(true);
                expect(Array.isArray(cinema.screenings)).toBe(true);
                expect(typeof cinema.roomCapacities).toBe('object');
            });

            test('agrega una película correctamente', () => {
                // Propósito: Verificar que addMovie agrega una película válida
                // Entrada: movie (instancia de Movie)
                // Esperado: Película agregada al array movies
                const cinema = new Cinema('CineMax', 500);
                const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
                const added = cinema.addMovie(movie);
                expect(cinema.movies.length).toBe(1);
                expect(added).toBe(movie);
            });

            test('establece capacidad de sala correctamente', () => {
                // Propósito: Verificar que setRoomCapacity establece la capacidad
                // Entrada: roomName='Sala 1', capacity=100
                // Esperado: Capacidad almacenada correctamente
                const cinema = new Cinema('CineMax', 500);
                const result = cinema.setRoomCapacity('Sala 1', 100);
                expect(result).toBe(true);
                expect(cinema.getRoomCapacity('Sala 1')).toBe(100);
            });

            test('obtiene capacidad de sala correctamente', () => {
                // Propósito: Verificar que getRoomCapacity retorna la capacidad correcta
                // Entrada: roomName='Sala 1' con capacidad establecida
                // Esperado: Retorna la capacidad correcta
                const cinema = new Cinema('CineMax', 500);
                cinema.setRoomCapacity('Sala 1', 100);
                expect(cinema.getRoomCapacity('Sala 1')).toBe(100);
            });

            test('retorna 0 cuando la sala no existe', () => {
                // Propósito: Verificar que getRoomCapacity retorna 0 para sala inexistente
                // Entrada: roomName='Sala Inexistente'
                // Esperado: Retorna 0
                const cinema = new Cinema('CineMax', 500);
                expect(cinema.getRoomCapacity('Sala Inexistente')).toBe(0);
            });

            test('crea una proyección correctamente', () => {
                // Propósito: Verificar que createScreening crea y agrega una proyección
                // Entrada: movie, room, startTime, ticketPrice
                // Esperado: Proyección creada y agregada
                const cinema = new Cinema('CineMax', 500);
                const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
                cinema.addMovie(movie);
                const startTime = new Date('2024-12-25T19:00:00');
                const screening = cinema.createScreening(movie, 'Sala 1', startTime, 12.50);
                expect(cinema.screenings.length).toBe(1);
                expect(screening.movie).toBe(movie);
            });

            test('obtiene proyecciones por película correctamente', () => {
                // Propósito: Verificar que getScreeningsByMovie filtra correctamente
                // Entrada: movieTitle='Avengers'
                // Esperado: Retorna solo proyecciones de esa película
                const cinema = new Cinema('CineMax', 500);
                const movie1 = new Movie('Avengers', 180, 'Action', 'PG-13');
                const movie2 = new Movie('Titanic', 195, 'Drama', 'PG-13');
                cinema.addMovie(movie1);
                cinema.addMovie(movie2);
                const screening1 = cinema.createScreening(movie1, 'Sala 1', new Date(), 12.50);
                const screening2 = cinema.createScreening(movie2, 'Sala 2', new Date(), 10.00);
                const screenings = cinema.getScreeningsByMovie('Avengers');
                expect(screenings.length).toBe(1);
                expect(screenings[0]).toBe(screening1);
            });

            test('obtiene proyecciones por fecha correctamente', () => {
                // Propósito: Verificar que getScreeningsByDate filtra correctamente
                // Entrada: date=new Date('2024-12-25')
                // Esperado: Retorna solo proyecciones de ese día
                const cinema = new Cinema('CineMax', 500);
                const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
                cinema.addMovie(movie);
                const date1 = new Date('2024-12-25T19:00:00');
                const date2 = new Date('2024-12-26T19:00:00');
                const screening1 = cinema.createScreening(movie, 'Sala 1', date1, 12.50);
                const screening2 = cinema.createScreening(movie, 'Sala 1', date2, 12.50);
                const screenings = cinema.getScreeningsByDate(new Date('2024-12-25'));
                expect(screenings.length).toBe(1);
                expect(screenings[0]).toBe(screening1);
            });

            test('calcula ingresos totales correctamente', () => {
                // Propósito: Verificar que getTotalRevenue suma ingresos de todas las proyecciones
                // Entrada: Múltiples proyecciones con ventas
                // Esperado: Suma de todos los ingresos
                const cinema = new Cinema('CineMax', 500);
                const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
                cinema.addMovie(movie);
                cinema.setRoomCapacity('Sala 1', 100);
                const screening1 = cinema.createScreening(movie, 'Sala 1', new Date(), 12.50);
                const screening2 = cinema.createScreening(movie, 'Sala 1', new Date(), 10.00);
                screening1.sellTickets(cinema, 50); // 625
                screening2.sellTickets(cinema, 30); // 300
                expect(cinema.getTotalRevenue()).toBe(925);
            });

            test('obtiene película más popular correctamente', () => {
                // Propósito: Verificar que getMostPopularMovie encuentra la película más vendida
                // Entrada: Múltiples películas con diferentes ventas
                // Esperado: Retorna título de la película más vendida
                const cinema = new Cinema('CineMax', 500);
                const movie1 = new Movie('Avengers', 180, 'Action', 'PG-13');
                const movie2 = new Movie('Titanic', 195, 'Drama', 'PG-13');
                cinema.addMovie(movie1);
                cinema.addMovie(movie2);
                cinema.setRoomCapacity('Sala 1', 100);
                const screening1 = cinema.createScreening(movie1, 'Sala 1', new Date(), 12.50);
                const screening2 = cinema.createScreening(movie2, 'Sala 1', new Date(), 10.00);
                screening1.sellTickets(cinema, 80); // Más boletos
                screening2.sellTickets(cinema, 50);
                expect(cinema.getMostPopularMovie()).toBe('Avengers');
            });

            test('retorna null cuando no hay proyecciones para getMostPopularMovie', () => {
                // Propósito: Verificar que getMostPopularMovie retorna null sin proyecciones
                // Entrada: Cine sin proyecciones
                // Esperado: Retorna null
                const cinema = new Cinema('CineMax', 500);
                expect(cinema.getMostPopularMovie()).toBeNull();
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Cinema name is required"
                expect(() => new Cinema('', 500)).toThrow('Cinema name is required');
            });

            test('lanza error cuando totalSeats es inválido', () => {
                // Propósito: Verificar validación de totalSeats > 0
                // Entrada: totalSeats=0 o negativo
                // Esperado: Error "Total seats must be greater than 0"
                expect(() => new Cinema('CineMax', 0)).toThrow('Total seats must be greater than 0');
            });

            test('lanza error cuando movie no es instancia de Movie', () => {
                // Propósito: Verificar validación de instancia de Movie en addMovie
                // Entrada: movie={}
                // Esperado: Error "Movie must be an instance of Movie"
                const cinema = new Cinema('CineMax', 500);
                expect(() => cinema.addMovie({})).toThrow('Movie must be an instance of Movie');
            });

            test('lanza error cuando roomName está vacío en setRoomCapacity', () => {
                // Propósito: Verificar validación de roomName no vacío
                // Entrada: roomName=''
                // Esperado: Error "Room name is required"
                const cinema = new Cinema('CineMax', 500);
                expect(() => cinema.setRoomCapacity('', 100)).toThrow('Room name is required');
            });

            test('lanza error cuando capacity es inválido en setRoomCapacity', () => {
                // Propósito: Verificar validación de capacity > 0
                // Entrada: capacity=0 o negativo
                // Esperado: Error "Room capacity must be greater than 0"
                const cinema = new Cinema('CineMax', 500);
                expect(() => cinema.setRoomCapacity('Sala 1', 0)).toThrow('Room capacity must be greater than 0');
            });

            test('lanza error cuando date no es Date en getScreeningsByDate', () => {
                // Propósito: Verificar validación de date como Date
                // Entrada: date='2024-12-25'
                // Esperado: Error "Date must be a Date object"
                const cinema = new Cinema('CineMax', 500);
                expect(() => cinema.getScreeningsByDate('2024-12-25')).toThrow('Date must be a Date object');
            });
        });
    });
});

