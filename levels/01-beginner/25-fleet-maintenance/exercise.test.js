const { Vehicle, FleetManager } = require('./exercise');

const buildVehicle = (plate = 'ABC123', type = 'truck', mileage = 10000) =>
    new Vehicle(plate, type, mileage);

describe('Fleet Maintenance Manager', () => {
    // ===== BASIC SCENARIOS =====
    describe('Basic scenarios', () => {
        test('stores normalized plate and properties when instantiating Vehicle', () => {
            // Purpose: ensure constructor assigns values and normalizes the plate.
            const vehicle = buildVehicle('abc123', 'truck', 12000);
            expect(vehicle.plate).toBe('ABC123');
            expect(vehicle.type).toBe('truck');
            expect(vehicle.mileage).toBe(12000);
        });

        test('getSummary generates the expected string format', () => {
            // Purpose: confirm the requested summary format.
            const vehicle = buildVehicle('xyz45', 'van', 8500);
            expect(vehicle.getSummary()).toBe('XYZ45 (van) has 8500 km');
        });

        test('addTrip increments mileage and returns the updated value', () => {
            // Purpose: validate state change and return value.
            const vehicle = buildVehicle('TRK900', 'truck', 15000);
            expect(vehicle.addTrip(500)).toBe(15500);
            expect(vehicle.mileage).toBe(15500);
        });

        test('FleetManager starts empty and addVehicle returns total count', () => {
            // Purpose: verify initialization and accumulator behavior.
            const fleet = new FleetManager();
            const van = buildVehicle('VAN10', 'van', 4000);
            expect(fleet.addVehicle(van)).toBe(1);
            expect(fleet.vehicles).toBeUndefined(); // Should not expose array
            expect(fleet.getMaintenanceList(0)).toEqual(['VAN10 (van) has 4000 km']);
        });
    });

    // ===== EDGE CASES AND LIMITS =====
    describe('Edge cases and limits', () => {
        test('findByPlate returns null when vehicle does not exist', () => {
            // Purpose: ensure null is returned on missing entries.
            const fleet = new FleetManager();
            expect(fleet.findByPlate('NOPE')).toBeNull();
        });

        test('findByPlate ignores casing and whitespace', () => {
            // Purpose: enforce case-insensitive search.
            const fleet = new FleetManager();
            const truck = buildVehicle('TRK500', 'truck', 9000);
            fleet.addVehicle(truck);
            expect(fleet.findByPlate('   trk500  ')).toBe(truck);
        });

        test('getMaintenanceList filters vehicles above threshold', () => {
            // Purpose: verify filtering logic for maintenance reports.
            const fleet = new FleetManager();
            fleet.addVehicle(buildVehicle('CAR100', 'car', 3000));
            fleet.addVehicle(buildVehicle('CAR200', 'car', 12000));
            const result = fleet.getMaintenanceList(10000);
            expect(result).toEqual(['CAR200 (car) has 12000 km']);
        });
    });

    // ===== INPUT VALIDATION (FAIL FAST) =====
    describe('Input validation (Fail Fast)', () => {
        test('throws when plate is empty', () => {
            // Purpose: enforce plate requirement.
            expect(() => new Vehicle('', 'truck', 0)).toThrow('Vehicle plate is required');
        });

        test('throws when type is empty', () => {
            // Purpose: enforce type requirement.
            expect(() => new Vehicle('ABC123', '   ', 0)).toThrow('Vehicle type is required');
        });

        test('throws when mileage is negative', () => {
            // Purpose: enforce non-negative mileage.
            expect(() => new Vehicle('ABC123', 'truck', -10)).toThrow(
                'Vehicle mileage must be a number greater than or equal to 0'
            );
        });

        test('throws when trip distance is invalid', () => {
            // Purpose: validate addTrip inputs.
            const vehicle = buildVehicle();
            expect(() => vehicle.addTrip(0)).toThrow('Trip distance must be a positive number');
        });

        test('addVehicle rejects non Vehicle instances', () => {
            // Purpose: enforce instance validation.
            const fleet = new FleetManager();
            expect(() => fleet.addVehicle({ plate: 'fake' })).toThrow(
                'Vehicle must be an instance of Vehicle'
            );
        });

        test('addVehicle rejects duplicated plates', () => {
            // Purpose: avoid duplicated records.
            const fleet = new FleetManager();
            const truck = buildVehicle('DUP01', 'truck', 5000);
            fleet.addVehicle(truck);
            expect(() => fleet.addVehicle(buildVehicle('dup01', 'truck', 6000))).toThrow(
                'Vehicle plate already registered'
            );
        });

        test('getMaintenanceList validates threshold', () => {
            // Purpose: ensure threshold validation.
            const fleet = new FleetManager();
            expect(() => fleet.getMaintenanceList(-1)).toThrow(
                'Maintenance threshold must be a number greater than or equal to 0'
            );
        });
    });

    // ===== IMMUTABILITY AND CONSISTENCY =====
    describe('Immutability and consistency', () => {
        test('getMaintenanceList returns a new array each time', () => {
            // Purpose: ensure internal array is not exposed.
            const fleet = new FleetManager();
            fleet.addVehicle(buildVehicle('IMM01', 'car', 7000));
            const firstSnapshot = fleet.getMaintenanceList(0);
            firstSnapshot.push('mutation attempt');
            expect(fleet.getMaintenanceList(0)).toEqual(['IMM01 (car) has 7000 km']);
        });

        test('findByPlate always returns the stored instance', () => {
            // Purpose: guarantee deterministic references.
            const fleet = new FleetManager();
            const van = buildVehicle('REF01', 'van', 1000);
            fleet.addVehicle(van);
            expect(fleet.findByPlate('ref01')).toBe(van);
            expect(fleet.findByPlate('REF01')).toBe(van);
        });
    });

    // ===== PERFORMANCE AND SCALABILITY =====
    describe('Performance and scalability', () => {
        test('handles multiple vehicles and preserves data integrity', () => {
            // Purpose: ensure operations remain correct with larger inputs.
            const fleet = new FleetManager();
            for (let i = 0; i < 30; i += 1) {
                fleet.addVehicle(buildVehicle(`CAR${i}`, 'car', i * 1000));
            }
            const list = fleet.getMaintenanceList(20000);
            expect(list).toEqual([
                'CAR20 (car) has 20000 km',
                'CAR21 (car) has 21000 km',
                'CAR22 (car) has 22000 km',
                'CAR23 (car) has 23000 km',
                'CAR24 (car) has 24000 km',
                'CAR25 (car) has 25000 km',
                'CAR26 (car) has 26000 km',
                'CAR27 (car) has 27000 km',
                'CAR28 (car) has 28000 km',
                'CAR29 (car) has 29000 km'
            ]);
        });
    });
});

