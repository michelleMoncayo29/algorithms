const { ParkingSpot, ParkingLot } = require('./exercise');

describe('Sistema de Gestión de Parqueadero', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe crear un espacio de estacionamiento con propiedades correctas', () => {
            // Propósito: Verificar que el constructor asigna correctamente las propiedades y valores iniciales
            // Entrada: new ParkingSpot('A1', 'standard') - Crear espacio con número y tipo
            // Esperado: El espacio debe tener spotNumber='A1', type='standard', isOccupied=false, vehiclePlate=null, entryTime=null
            const spot = new ParkingSpot('A1', 'standard');
            expect(spot.spotNumber).toBe('A1');
            expect(spot.type).toBe('standard');
            expect(spot.isOccupied).toBe(false);
            expect(spot.vehiclePlate).toBeNull();
            expect(spot.entryTime).toBeNull();
        });

        test('debe estacionar un vehículo correctamente y actualizar el estado del espacio', () => {
            // Propósito: Verificar que parkVehicle registra correctamente un vehículo y marca el espacio como ocupado
            // Entrada: spot.parkVehicle('ABC123', new Date('2024-01-15T10:00:00')) - Estacionar vehículo con placa y hora
            // Esperado: El método debe retornar true, isOccupied=true, vehiclePlate='ABC123', entryTime debe ser la fecha proporcionada
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const result = spot.parkVehicle('ABC123', entryTime);
            
            expect(result).toBe(true);
            expect(spot.isOccupied).toBe(true);
            expect(spot.vehiclePlate).toBe('ABC123');
            expect(spot.entryTime).toEqual(entryTime);
        });

        test('debe calcular correctamente la duración de estacionamiento en horas', () => {
            // Propósito: Verificar que getParkingDuration calcula correctamente las horas transcurridas
            // Entrada: spot con entrada a las 10:00 y calcular duración hasta las 12:30
            // Esperado: Debe retornar 2.50 horas (2 horas y 30 minutos)
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T12:30:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const duration = spot.getParkingDuration(exitTime);
            
            expect(duration).toBe(2.50);
        });

        test('debe calcular correctamente la tarifa según duración y tarifa por hora', () => {
            // Propósito: Verificar que calculateFee calcula correctamente el costo total
            // Entrada: spot con 2.5 horas de estancia y tarifa de $3/hora
            // Esperado: Debe retornar 7.50 (2.5 × 3)
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T12:30:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const fee = spot.calculateFee(exitTime, 3);
            
            expect(fee).toBe(7.50);
        });

        test('debe liberar el espacio y retornar duración y tarifa al salir', () => {
            // Propósito: Verificar que exitVehicle libera el espacio y retorna información correcta
            // Entrada: spot ocupado, exitVehicle con hora de salida y tarifa
            // Esperado: Debe retornar objeto con duration y fee, y el espacio debe quedar libre
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T11:00:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const result = spot.exitVehicle(exitTime, 3);
            
            expect(result.duration).toBe(1.00);
            expect(result.fee).toBe(3.00);
            expect(spot.isOccupied).toBe(false);
            expect(spot.vehiclePlate).toBeNull();
            expect(spot.entryTime).toBeNull();
        });

        test('debe crear un parqueadero y agregar espacios correctamente', () => {
            // Propósito: Verificar que ParkingLot se inicializa correctamente y puede agregar espacios
            // Entrada: new ParkingLot('Downtown') y addSpot('A1', 'compact')
            // Esperado: El parqueadero debe tener nombre correcto y el espacio agregado
            const lot = new ParkingLot('Downtown');
            const spot = lot.addSpot('A1', 'compact');
            
            expect(lot.name).toBe('Downtown');
            expect(spot).toBeInstanceOf(ParkingSpot);
            expect(spot.spotNumber).toBe('A1');
            expect(spot.type).toBe('compact');
        });

        test('debe encontrar un espacio disponible compatible con el tipo de vehículo', () => {
            // Propósito: Verificar que findAvailableSpot encuentra espacios libres compatibles
            // Entrada: Parqueadero con espacios compact y standard, buscar espacio para vehículo 'compact'
            // Esperado: Debe retornar el primer espacio disponible compatible
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            lot.addSpot('A2', 'standard');
            
            const spot = lot.findAvailableSpot('compact');
            
            expect(spot).toBeInstanceOf(ParkingSpot);
            expect(spot.isCompatible('compact')).toBe(true);
            expect(spot.isOccupied).toBe(false);
        });

        test('debe estacionar un vehículo en el parqueadero y encontrar el espacio correcto', () => {
            // Propósito: Verificar que parkVehicle encuentra espacio y estaciona correctamente
            // Entrada: Parqueadero con espacios, parkVehicle('compact', 'XYZ789', fecha)
            // Esperado: Debe retornar el espacio donde se estacionó y el espacio debe estar ocupado
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            const entryTime = new Date('2024-01-15T09:00:00');
            
            const spot = lot.parkVehicle('compact', 'XYZ789', entryTime);
            
            expect(spot.spotNumber).toBe('A1');
            expect(spot.isOccupied).toBe(true);
            expect(spot.vehiclePlate).toBe('XYZ789');
        });

        test('debe calcular correctamente la tasa de ocupación del parqueadero', () => {
            // Propósito: Verificar que getOccupancyRate calcula el porcentaje de espacios ocupados
            // Entrada: Parqueadero con 5 espacios, 2 ocupados
            // Esperado: Debe retornar 40.00 (2/5 * 100)
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'standard');
            lot.addSpot('A2', 'standard');
            lot.addSpot('A3', 'standard');
            lot.addSpot('A4', 'standard');
            lot.addSpot('A5', 'standard');
            
            lot.parkVehicle('standard', 'CAR1', new Date('2024-01-15T08:00:00'));
            lot.parkVehicle('standard', 'CAR2', new Date('2024-01-15T08:00:00'));
            
            const rate = lot.getOccupancyRate();
            expect(rate).toBe(40.00);
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe retornar null cuando no hay espacios disponibles', () => {
            // Propósito: Verificar comportamiento cuando no hay espacios libres compatibles
            // Entrada: Parqueadero sin espacios o todos ocupados
            // Esperado: findAvailableSpot debe retornar null
            const lot = new ParkingLot('Mall');
            const spot = lot.findAvailableSpot('compact');
            expect(spot).toBeNull();
        });

        test('debe manejar correctamente espacios completamente vacíos', () => {
            // Propósito: Verificar comportamiento con parqueadero sin espacios
            // Entrada: Parqueadero recién creado sin espacios agregados
            // Esperado: getOccupancyRate debe retornar 0
            const lot = new ParkingLot('Empty');
            expect(lot.getOccupancyRate()).toBe(0);
        });

        test('debe manejar correctamente duraciones muy cortas (menos de 1 hora)', () => {
            // Propósito: Verificar cálculo de duración para períodos menores a una hora
            // Entrada: Estacionamiento de 30 minutos (0.5 horas)
            // Esperado: Debe retornar 0.50 horas
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T10:30:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const duration = spot.getParkingDuration(exitTime);
            
            expect(duration).toBe(0.50);
        });

        test('debe manejar correctamente duraciones muy largas (múltiples días)', () => {
            // Propósito: Verificar cálculo de duración para períodos extensos
            // Entrada: Estacionamiento de 2 días completos (48 horas)
            // Esperado: Debe retornar 48.00 horas
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-17T10:00:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const duration = spot.getParkingDuration(exitTime);
            
            expect(duration).toBe(48.00);
        });

        test('debe retornar espacios vacíos cuando se filtran por tipo sin coincidencias', () => {
            // Propósito: Verificar comportamiento cuando no hay espacios del tipo solicitado
            // Entrada: Parqueadero solo con espacios 'compact', filtrar por 'large'
            // Esperado: Debe retornar array vacío []
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            lot.addSpot('A2', 'compact');
            
            const spots = lot.getSpotsByType('large');
            expect(spots).toEqual([]);
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error cuando spotNumber está vacío en constructor', () => {
            // Propósito: Verificar validación de spotNumber requerido (principio Fail Fast)
            // Entrada: new ParkingSpot('', 'standard') - Número de espacio vacío
            // Esperado: Error "Spot number is required"
            expect(() => new ParkingSpot('', 'standard')).toThrow('Spot number is required');
        });

        test('debe lanzar error cuando type es inválido en constructor', () => {
            // Propósito: Verificar validación de tipo de espacio válido
            // Entrada: new ParkingSpot('A1', 'invalid') - Tipo inválido
            // Esperado: Error "Spot type must be 'compact', 'standard', or 'large'"
            expect(() => new ParkingSpot('A1', 'invalid')).toThrow("Spot type must be 'compact', 'standard', or 'large'");
        });

        test('debe lanzar error cuando se intenta estacionar en espacio ya ocupado', () => {
            // Propósito: Verificar validación de espacio disponible antes de estacionar
            // Entrada: Intentar estacionar segundo vehículo en espacio ocupado
            // Esperado: Error "Spot is already occupied"
            const spot = new ParkingSpot('A1', 'standard');
            spot.parkVehicle('ABC123', new Date('2024-01-15T10:00:00'));
            
            expect(() => spot.parkVehicle('XYZ789', new Date('2024-01-15T11:00:00'))).toThrow('Spot is already occupied');
        });

        test('debe lanzar error cuando plate está vacío en parkVehicle', () => {
            // Propósito: Verificar validación de placa requerida
            // Entrada: spot.parkVehicle('', fecha) - Placa vacía
            // Esperado: Error "Vehicle plate is required"
            const spot = new ParkingSpot('A1', 'standard');
            expect(() => spot.parkVehicle('', new Date())).toThrow('Vehicle plate is required');
        });

        test('debe lanzar error cuando entryTime no es Date en parkVehicle', () => {
            // Propósito: Verificar validación de tipo Date para hora de entrada
            // Entrada: spot.parkVehicle('ABC123', 'invalid') - Fecha inválida
            // Esperado: Error "Entry time must be a Date object"
            const spot = new ParkingSpot('A1', 'standard');
            expect(() => spot.parkVehicle('ABC123', 'invalid')).toThrow('Entry time must be a Date object');
        });

        test('debe lanzar error cuando exitTime no es Date en getParkingDuration', () => {
            // Propósito: Verificar validación de tipo Date para hora de salida
            // Entrada: spot.getParkingDuration('invalid') - Fecha inválida
            // Esperado: Error "Exit time must be a Date object"
            const spot = new ParkingSpot('A1', 'standard');
            spot.parkVehicle('ABC123', new Date());
            expect(() => spot.getParkingDuration('invalid')).toThrow('Exit time must be a Date object');
        });

        test('debe lanzar error cuando se intenta calcular duración en espacio vacío', () => {
            // Propósito: Verificar validación de espacio ocupado antes de calcular duración
            // Entrada: getParkingDuration en espacio no ocupado
            // Esperado: Error "Spot is not occupied"
            const spot = new ParkingSpot('A1', 'standard');
            expect(() => spot.getParkingDuration(new Date())).toThrow('Spot is not occupied');
        });

        test('debe lanzar error cuando exitTime es anterior a entryTime', () => {
            // Propósito: Verificar validación lógica de fechas (salida después de entrada)
            // Entrada: exitTime anterior a entryTime
            // Esperado: Error "Exit time must be after entry time"
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T12:00:00');
            const exitTime = new Date('2024-01-15T10:00:00');
            
            spot.parkVehicle('ABC123', entryTime);
            expect(() => spot.exitVehicle(exitTime, 3)).toThrow('Exit time must be after entry time');
        });

        test('debe lanzar error cuando ratePerHour es inválido en calculateFee', () => {
            // Propósito: Verificar validación de tarifa positiva
            // Entrada: calculateFee con ratePerHour <= 0
            // Esperado: Error "Rate per hour must be greater than 0"
            const spot = new ParkingSpot('A1', 'standard');
            spot.parkVehicle('ABC123', new Date('2024-01-15T10:00:00'));
            
            expect(() => spot.calculateFee(new Date('2024-01-15T11:00:00'), 0)).toThrow('Rate per hour must be greater than 0');
            expect(() => spot.calculateFee(new Date('2024-01-15T11:00:00'), -5)).toThrow('Rate per hour must be greater than 0');
        });

        test('debe lanzar error cuando vehicleType no es string en isCompatible', () => {
            // Propósito: Verificar validación de tipo de vehículo
            // Entrada: spot.isCompatible(123) - Tipo inválido
            // Esperado: Error "Vehicle type must be a string"
            const spot = new ParkingSpot('A1', 'standard');
            expect(() => spot.isCompatible(123)).toThrow('Vehicle type must be a string');
        });

        test('debe lanzar error cuando name está vacío en ParkingLot constructor', () => {
            // Propósito: Verificar validación de nombre del parqueadero
            // Entrada: new ParkingLot('') - Nombre vacío
            // Esperado: Error "Parking lot name is required"
            expect(() => new ParkingLot('')).toThrow('Parking lot name is required');
        });

        test('debe lanzar error cuando se intenta agregar espacio con número duplicado', () => {
            // Propósito: Verificar que no se permiten números de espacio duplicados
            // Entrada: addSpot('A1', 'compact') dos veces con mismo número
            // Esperado: Error "Spot number already exists"
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            expect(() => lot.addSpot('A1', 'standard')).toThrow('Spot number already exists');
        });

        test('debe lanzar error cuando no hay espacio disponible para el tipo de vehículo', () => {
            // Propósito: Verificar validación de disponibilidad antes de estacionar
            // Entrada: parkVehicle('large') sin espacios large disponibles
            // Esperado: Error "No available spot for this vehicle type"
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            expect(() => lot.parkVehicle('large', 'TRUCK1', new Date())).toThrow('No available spot for this vehicle type');
        });

        test('debe lanzar error cuando se intenta salir con vehículo no encontrado', () => {
            // Propósito: Verificar validación de existencia del vehículo
            // Entrada: exitVehicle con placa que no existe
            // Esperado: Error "Vehicle not found"
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'standard');
            expect(() => lot.exitVehicle('NOTFOUND', new Date())).toThrow('Vehicle not found');
        });
    });

    // ===== CASOS ADICIONALES =====
    describe('Casos adicionales', () => {
        test('debe verificar correctamente la compatibilidad de vehículos con espacios', () => {
            // Propósito: Verificar lógica de compatibilidad entre tipos de vehículos y espacios
            // Entrada: Espacios de diferentes tipos y verificar compatibilidad
            // Esperado: compact acepta compact; standard acepta compact y standard; large acepta todos
            const compactSpot = new ParkingSpot('A1', 'compact');
            const standardSpot = new ParkingSpot('A2', 'standard');
            const largeSpot = new ParkingSpot('A3', 'large');
            
            expect(compactSpot.isCompatible('compact')).toBe(true);
            expect(compactSpot.isCompatible('standard')).toBe(false);
            expect(compactSpot.isCompatible('large')).toBe(false);
            
            expect(standardSpot.isCompatible('compact')).toBe(true);
            expect(standardSpot.isCompatible('standard')).toBe(true);
            expect(standardSpot.isCompatible('large')).toBe(false);
            
            expect(largeSpot.isCompatible('compact')).toBe(true);
            expect(largeSpot.isCompatible('standard')).toBe(true);
            expect(largeSpot.isCompatible('large')).toBe(true);
        });

        test('debe calcular correctamente ingresos acumulados por tipo de espacio', () => {
            // Propósito: Verificar que getRevenueByType rastrea correctamente los ingresos
            // Entrada: Múltiples salidas de diferentes tipos de espacios
            // Esperado: Objeto con ingresos correctos por cada tipo
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            lot.addSpot('A2', 'standard');
            lot.addSpot('A3', 'large');
            
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T11:00:00'); // 1 hora
            
            lot.parkVehicle('compact', 'CAR1', entryTime);
            lot.exitVehicle('CAR1', exitTime); // $2
            
            lot.parkVehicle('standard', 'CAR2', entryTime);
            lot.exitVehicle('CAR2', exitTime); // $3
            
            lot.parkVehicle('large', 'TRUCK1', entryTime);
            lot.exitVehicle('TRUCK1', exitTime); // $5
            
            const revenue = lot.getRevenueByType();
            expect(revenue.compact).toBe(2.00);
            expect(revenue.standard).toBe(3.00);
            expect(revenue.large).toBe(5.00);
        });

        test('debe filtrar correctamente espacios por tipo', () => {
            // Propósito: Verificar que getSpotsByType filtra correctamente los espacios
            // Entrada: Parqueadero con espacios de diferentes tipos
            // Esperado: Array solo con espacios del tipo solicitado
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            lot.addSpot('A2', 'compact');
            lot.addSpot('B1', 'standard');
            lot.addSpot('B2', 'standard');
            lot.addSpot('C1', 'large');
            
            const compactSpots = lot.getSpotsByType('compact');
            expect(compactSpots).toHaveLength(2);
            expect(compactSpots.every(spot => spot.type === 'compact')).toBe(true);
            
            const standardSpots = lot.getSpotsByType('standard');
            expect(standardSpots).toHaveLength(2);
            expect(standardSpots.every(spot => spot.type === 'standard')).toBe(true);
        });

        test('debe manejar correctamente múltiples entradas y salidas', () => {
            // Propósito: Verificar comportamiento con múltiples operaciones secuenciales
            // Entrada: Varios vehículos entrando y saliendo
            // Esperado: Cada operación debe funcionar correctamente sin afectar otras
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'standard');
            lot.addSpot('A2', 'standard');
            
            const entry1 = new Date('2024-01-15T08:00:00');
            const exit1 = new Date('2024-01-15T10:00:00');
            
            lot.parkVehicle('standard', 'CAR1', entry1);
            const result1 = lot.exitVehicle('CAR1', exit1);
            
            expect(result1.duration).toBe(2.00);
            expect(result1.fee).toBe(6.00); // 2 horas × $3
            
            const entry2 = new Date('2024-01-15T11:00:00');
            const exit2 = new Date('2024-01-15T13:00:00');
            
            lot.parkVehicle('standard', 'CAR2', entry2);
            const result2 = lot.exitVehicle('CAR2', exit2);
            
            expect(result2.duration).toBe(2.00);
            expect(result2.fee).toBe(6.00);
        });
    });

    // ===== TESTS DE PRECISIÓN =====
    describe('Precisión numérica', () => {
        test('debe calcular duración con precisión de 2 decimales', () => {
            // Propósito: Verificar que los cálculos de duración mantienen precisión adecuada
            // Entrada: Estacionamiento de 1 hora y 15 minutos (1.25 horas)
            // Esperado: Debe retornar exactamente 1.25 con 2 decimales
            const spot = new ParkingSpot('A1', 'standard');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T11:15:00');
            
            spot.parkVehicle('ABC123', entryTime);
            const duration = spot.getParkingDuration(exitTime);
            
            expect(duration).toBe(1.25);
        });

        test('debe calcular tarifas con precisión de 2 decimales', () => {
            // Propósito: Verificar que los cálculos de tarifa mantienen precisión adecuada
            // Entrada: 1.33 horas × $2.50/hora = $3.325
            // Esperado: Debe retornar 3.33 (redondeado a 2 decimales)
            const spot = new ParkingSpot('A1', 'compact');
            const entryTime = new Date('2024-01-15T10:00:00');
            const exitTime = new Date('2024-01-15T11:20:00'); // 1.33 horas aproximadamente
            
            spot.parkVehicle('ABC123', entryTime);
            const fee = spot.calculateFee(exitTime, 2.5);
            
            expect(fee).toBeCloseTo(3.33, 2);
        });
    });

    // ===== TESTS DE INMUTABILIDAD =====
    describe('Inmutabilidad', () => {
        test('getRevenueByType no debe exponer el objeto interno directamente', () => {
            // Propósito: Verificar que se retorna una copia del objeto de ingresos
            // Entrada: Obtener ingresos y modificar el objeto retornado
            // Esperado: El objeto interno no debe modificarse
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            
            lot.parkVehicle('compact', 'CAR1', new Date('2024-01-15T10:00:00'));
            lot.exitVehicle('CAR1', new Date('2024-01-15T11:00:00'));
            
            const revenue1 = lot.getRevenueByType();
            revenue1.compact = 999; // Intentar modificar
            
            const revenue2 = lot.getRevenueByType();
            expect(revenue2.compact).toBe(2.00); // No debe cambiar
        });

        test('getSpotsByType no debe exponer el array interno directamente', () => {
            // Propósito: Verificar que se retorna un nuevo array filtrado
            // Entrada: Obtener espacios por tipo y modificar el array retornado
            // Esperado: El array interno no debe modificarse
            const lot = new ParkingLot('Mall');
            lot.addSpot('A1', 'compact');
            lot.addSpot('A2', 'compact');
            
            const spots = lot.getSpotsByType('compact');
            expect(spots).toHaveLength(2);
            
            spots.push(new ParkingSpot('A3', 'compact')); // Intentar modificar
            
            const spots2 = lot.getSpotsByType('compact');
            expect(spots2).toHaveLength(2); // No debe cambiar
        });
    });
});

