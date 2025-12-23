const { Bus, Route, TransitSystem } = require('./exercise');

describe('Sistema de Gestión de Transporte Público', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe crear un bus con propiedades correctas', () => {
            // Propósito: Verificar que el constructor asigna correctamente las propiedades iniciales
            // Entrada: new Bus('B101', 50) - Crear bus con número y capacidad
            // Esperado: El bus debe tener busNumber='B101', capacity=50, currentPassengers=0, currentRoute=null, isInService=true
            const bus = new Bus('B101', 50);
            expect(bus.busNumber).toBe('B101');
            expect(bus.capacity).toBe(50);
            expect(bus.currentPassengers).toBe(0);
            expect(bus.currentRoute).toBeNull();
            expect(bus.isInService).toBe(true);
        });

        test('debe permitir abordar pasajeros y actualizar el conteo', () => {
            // Propósito: Verificar que boardPassengers incrementa correctamente los pasajeros
            // Entrada: bus.boardPassengers(30) - Abordar 30 pasajeros
            // Esperado: Debe retornar 30 y currentPassengers debe ser 30
            const bus = new Bus('B101', 50);
            const result = bus.boardPassengers(30);
            expect(result).toBe(30);
            expect(bus.currentPassengers).toBe(30);
        });

        test('debe calcular correctamente los asientos disponibles', () => {
            // Propósito: Verificar que getAvailableSeats calcula correctamente la capacidad restante
            // Entrada: Bus con capacidad 50 y 30 pasajeros
            // Esperado: Debe retornar 20 asientos disponibles
            const bus = new Bus('B101', 50);
            bus.boardPassengers(30);
            expect(bus.getAvailableSeats()).toBe(20);
        });

        test('debe calcular correctamente la tasa de ocupación', () => {
            // Propósito: Verificar que getOccupancyRate calcula el porcentaje correcto
            // Entrada: Bus con capacidad 50 y 30 pasajeros
            // Esperado: Debe retornar 60.00 (30/50 * 100)
            const bus = new Bus('B101', 50);
            bus.boardPassengers(30);
            expect(bus.getOccupancyRate()).toBe(60.00);
        });

        test('debe crear una ruta con propiedades correctas', () => {
            // Propósito: Verificar que el constructor de Route asigna correctamente las propiedades
            // Entrada: new Route('R1', 15.5, 2.50) - Crear ruta con número, distancia y tarifa
            // Esperado: La ruta debe tener routeNumber='R1', distance=15.5, fare=2.50, stops=[]
            const route = new Route('R1', 15.5, 2.50);
            expect(route.routeNumber).toBe('R1');
            expect(route.distance).toBe(15.5);
            expect(route.fare).toBe(2.50);
            expect(route.stops).toEqual([]);
        });

        test('debe agregar paradas a la ruta correctamente', () => {
            // Propósito: Verificar que addStop agrega paradas y retorna el total
            // Entrada: route.addStop('Downtown') y route.addStop('Airport')
            // Esperado: Debe retornar 1 y luego 2, y stops debe contener ambas paradas
            const route = new Route('R1', 10, 2.50);
            expect(route.addStop('Downtown')).toBe(1);
            expect(route.addStop('Airport')).toBe(2);
            expect(route.getTotalStops()).toBe(2);
        });

        test('debe calcular correctamente el tiempo de viaje', () => {
            // Propósito: Verificar que calculateTravelTime calcula correctamente las horas
            // Entrada: Ruta de 30 km con velocidad promedio de 60 km/h
            // Esperado: Debe retornar 0.50 horas (30/60)
            const route = new Route('R1', 30, 2.50);
            expect(route.calculateTravelTime(60)).toBe(0.50);
        });

        test('debe crear un sistema de transporte y agregar buses y rutas', () => {
            // Propósito: Verificar que TransitSystem se inicializa y puede agregar elementos
            // Entrada: new TransitSystem('City Transit'), addBus, addRoute
            // Esperado: El sistema debe tener nombre correcto y los elementos agregados
            const system = new TransitSystem('City Transit');
            const bus = new Bus('B101', 50);
            const route = new Route('R1', 10, 2.50);
            
            expect(system.addBus(bus)).toBe(1);
            expect(system.addRoute(route)).toBe(1);
            expect(system.name).toBe('City Transit');
        });

        test('debe asignar un bus a una ruta correctamente', () => {
            // Propósito: Verificar que assignBusToRoute asocia bus y ruta
            // Entrada: Sistema con bus y ruta, assignBusToRoute('B101', 'R1')
            // Esperado: Debe retornar true y bus.currentRoute debe ser la ruta
            const system = new TransitSystem('City Transit');
            const bus = new Bus('B101', 50);
            const route = new Route('R1', 10, 2.50);
            
            system.addBus(bus);
            system.addRoute(route);
            const result = system.assignBusToRoute('B101', 'R1');
            
            expect(result).toBe(true);
            expect(bus.currentRoute).toBe(route);
        });

        test('debe calcular correctamente el total de pasajeros', () => {
            // Propósito: Verificar que getTotalPassengers suma pasajeros de todos los buses
            // Entrada: Sistema con 2 buses, uno con 30 y otro con 20 pasajeros
            // Esperado: Debe retornar 50 pasajeros totales
            const system = new TransitSystem('City Transit');
            const bus1 = new Bus('B101', 50);
            const bus2 = new Bus('B102', 50);
            
            bus1.boardPassengers(30);
            bus2.boardPassengers(20);
            
            system.addBus(bus1);
            system.addBus(bus2);
            
            expect(system.getTotalPassengers()).toBe(50);
        });

        test('debe calcular correctamente los ingresos del sistema', () => {
            // Propósito: Verificar que getRevenue calcula ingresos multiplicando pasajeros por tarifa
            // Entrada: Bus con 40 pasajeros asignado a ruta con tarifa $2.50
            // Esperado: Debe retornar 100.00 (40 × 2.50)
            const system = new TransitSystem('City Transit');
            const bus = new Bus('B101', 50);
            const route = new Route('R1', 10, 2.50);
            
            bus.boardPassengers(40);
            system.addBus(bus);
            system.addRoute(route);
            system.assignBusToRoute('B101', 'R1');
            
            expect(system.getRevenue()).toBe(100.00);
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe retornar 0 asientos disponibles cuando el bus está lleno', () => {
            // Propósito: Verificar comportamiento cuando el bus alcanza su capacidad máxima
            // Entrada: Bus con capacidad 50 y 50 pasajeros
            // Esperado: getAvailableSeats debe retornar 0
            const bus = new Bus('B101', 50);
            bus.boardPassengers(50);
            expect(bus.getAvailableSeats()).toBe(0);
        });

        test('debe manejar correctamente buses sin pasajeros', () => {
            // Propósito: Verificar comportamiento con bus vacío
            // Entrada: Bus recién creado sin pasajeros
            // Esperado: getOccupancyRate debe retornar 0.00
            const bus = new Bus('B101', 50);
            expect(bus.getOccupancyRate()).toBe(0.00);
        });

        test('debe manejar correctamente rutas sin paradas', () => {
            // Propósito: Verificar comportamiento con ruta sin paradas agregadas
            // Entrada: Ruta recién creada
            // Esperado: getTotalStops debe retornar 0
            const route = new Route('R1', 10, 2.50);
            expect(route.getTotalStops()).toBe(0);
        });

        test('debe retornar array vacío cuando no hay buses asignados a una ruta', () => {
            // Propósito: Verificar comportamiento cuando una ruta no tiene buses
            // Entrada: Sistema con ruta pero sin buses asignados
            // Esperado: getBusesByRoute debe retornar array vacío
            const system = new TransitSystem('City Transit');
            system.addRoute(new Route('R1', 10, 2.50));
            expect(system.getBusesByRoute('R1')).toEqual([]);
        });

        test('debe retornar null cuando no hay rutas para getMostPopularRoute', () => {
            // Propósito: Verificar comportamiento cuando no hay rutas en el sistema
            // Entrada: Sistema sin rutas
            // Esperado: getMostPopularRoute debe retornar null
            const system = new TransitSystem('City Transit');
            expect(system.getMostPopularRoute()).toBeNull();
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error cuando busNumber está vacío', () => {
            // Propósito: Verificar validación de número de bus requerido
            // Entrada: new Bus('', 50) - Número vacío
            // Esperado: Error "Bus number is required"
            expect(() => new Bus('', 50)).toThrow('Bus number is required');
        });

        test('debe lanzar error cuando capacity es inválida', () => {
            // Propósito: Verificar validación de capacidad positiva
            // Entrada: new Bus('B101', 0) - Capacidad inválida
            // Esperado: Error "Bus capacity must be greater than 0"
            expect(() => new Bus('B101', 0)).toThrow('Bus capacity must be greater than 0');
            expect(() => new Bus('B101', -10)).toThrow('Bus capacity must be greater than 0');
        });

        test('debe lanzar error cuando se intenta abordar más pasajeros que la capacidad', () => {
            // Propósito: Verificar validación de capacidad antes de abordar
            // Entrada: Bus con capacidad 50, intentar abordar 60 pasajeros
            // Esperado: Error "Not enough capacity"
            const bus = new Bus('B101', 50);
            expect(() => bus.boardPassengers(60)).toThrow('Not enough capacity');
        });

        test('debe lanzar error cuando se intenta descender más pasajeros de los que hay', () => {
            // Propósito: Verificar validación de pasajeros antes de descender
            // Entrada: Bus con 20 pasajeros, intentar descender 30
            // Esperado: Error "Not enough passengers on board"
            const bus = new Bus('B101', 50);
            bus.boardPassengers(20);
            expect(() => bus.alightPassengers(30)).toThrow('Not enough passengers on board');
        });

        test('debe lanzar error cuando routeNumber está vacío', () => {
            // Propósito: Verificar validación de número de ruta requerido
            // Entrada: new Route('', 10, 2.50) - Número vacío
            // Esperado: Error "Route number is required"
            expect(() => new Route('', 10, 2.50)).toThrow('Route number is required');
        });

        test('debe lanzar error cuando se intenta agregar parada duplicada', () => {
            // Propósito: Verificar que no se permiten paradas duplicadas
            // Entrada: route.addStop('Downtown') dos veces
            // Esperado: Error "Stop already exists"
            const route = new Route('R1', 10, 2.50);
            route.addStop('Downtown');
            expect(() => route.addStop('Downtown')).toThrow('Stop already exists');
        });

        test('debe lanzar error cuando se intenta agregar bus duplicado', () => {
            // Propósito: Verificar que no se permiten buses con mismo número
            // Entrada: addBus con mismo busNumber dos veces
            // Esperado: Error "Bus number already exists"
            const system = new TransitSystem('City Transit');
            const bus = new Bus('B101', 50);
            system.addBus(bus);
            expect(() => system.addBus(new Bus('B101', 60))).toThrow('Bus number already exists');
        });

        test('debe lanzar error cuando se intenta asignar bus inexistente', () => {
            // Propósito: Verificar validación de existencia del bus
            // Entrada: assignBusToRoute con busNumber que no existe
            // Esperado: Error "Bus not found"
            const system = new TransitSystem('City Transit');
            system.addRoute(new Route('R1', 10, 2.50));
            expect(() => system.assignBusToRoute('B999', 'R1')).toThrow('Bus not found');
        });

        test('debe lanzar error cuando se intenta asignar ruta inexistente', () => {
            // Propósito: Verificar validación de existencia de la ruta
            // Entrada: assignBusToRoute con routeNumber que no existe
            // Esperado: Error "Route not found"
            const system = new TransitSystem('City Transit');
            system.addBus(new Bus('B101', 50));
            expect(() => system.assignBusToRoute('B101', 'R999')).toThrow('Route not found');
        });
    });

    // ===== CASOS ADICIONALES =====
    describe('Casos adicionales', () => {
        test('debe manejar correctamente múltiples operaciones de abordaje y descenso', () => {
            // Propósito: Verificar comportamiento con múltiples operaciones secuenciales
            // Entrada: Abordar 30, luego 10 más, luego descender 15
            // Esperado: Debe tener 25 pasajeros al final
            const bus = new Bus('B101', 50);
            bus.boardPassengers(30);
            bus.boardPassengers(10);
            bus.alightPassengers(15);
            expect(bus.currentPassengers).toBe(25);
        });

        test('debe encontrar correctamente la ruta más popular', () => {
            // Propósito: Verificar que getMostPopularRoute identifica la ruta con más pasajeros
            // Entrada: Ruta R1 con 50 pasajeros, Ruta R2 con 30 pasajeros
            // Esperado: Debe retornar R1
            const system = new TransitSystem('City Transit');
            const route1 = new Route('R1', 10, 2.50);
            const route2 = new Route('R2', 15, 3.00);
            const bus1 = new Bus('B101', 50);
            const bus2 = new Bus('B102', 50);
            
            bus1.boardPassengers(50);
            bus2.boardPassengers(30);
            
            system.addRoute(route1);
            system.addRoute(route2);
            system.addBus(bus1);
            system.addBus(bus2);
            system.assignBusToRoute('B101', 'R1');
            system.assignBusToRoute('B102', 'R2');
            
            expect(system.getMostPopularRoute()).toBe(route1);
        });

        test('debe calcular ingresos correctamente con múltiples buses y rutas', () => {
            // Propósito: Verificar cálculo de ingresos con múltiples buses en diferentes rutas
            // Entrada: 2 buses en R1 ($2.50) con 40 y 30 pasajeros, 1 bus en R2 ($3.00) con 25 pasajeros
            // Esperado: (40+30)*2.50 + 25*3.00 = 175 + 75 = 250.00
            const system = new TransitSystem('City Transit');
            const route1 = new Route('R1', 10, 2.50);
            const route2 = new Route('R2', 15, 3.00);
            
            const bus1 = new Bus('B101', 50);
            const bus2 = new Bus('B102', 50);
            const bus3 = new Bus('B103', 50);
            
            bus1.boardPassengers(40);
            bus2.boardPassengers(30);
            bus3.boardPassengers(25);
            
            system.addRoute(route1);
            system.addRoute(route2);
            system.addBus(bus1);
            system.addBus(bus2);
            system.addBus(bus3);
            system.assignBusToRoute('B101', 'R1');
            system.assignBusToRoute('B102', 'R1');
            system.assignBusToRoute('B103', 'R2');
            
            expect(system.getRevenue()).toBe(250.00);
        });
    });

    // ===== TESTS DE PRECISIÓN =====
    describe('Precisión numérica', () => {
        test('debe calcular tasa de ocupación con precisión de 2 decimales', () => {
            // Propósito: Verificar que los cálculos de porcentaje mantienen precisión adecuada
            // Entrada: Bus con capacidad 33 y 10 pasajeros
            // Esperado: Debe retornar 30.30 (10/33 * 100)
            const bus = new Bus('B101', 33);
            bus.boardPassengers(10);
            expect(bus.getOccupancyRate()).toBe(30.30);
        });

        test('debe calcular tiempo de viaje con precisión de 2 decimales', () => {
            // Propósito: Verificar que los cálculos de tiempo mantienen precisión adecuada
            // Entrada: Ruta de 25 km con velocidad de 40 km/h
            // Esperado: Debe retornar 0.63 horas (25/40)
            const route = new Route('R1', 25, 2.50);
            expect(route.calculateTravelTime(40)).toBe(0.63);
        });
    });
});

