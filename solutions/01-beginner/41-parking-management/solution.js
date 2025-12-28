/**
 * Solución: Sistema de Gestión de Parqueadero
 * 
 * Esta implementación muestra cómo crear clases ParkingSpot y ParkingLot que gestionan
 * espacios de estacionamiento, validan compatibilidad de vehículos y calculan tarifas.
 */

class ParkingSpot {
    constructor(spotNumber, type) {
        // Valida que spotNumber sea un string no vacío
        if (typeof spotNumber !== 'string' || spotNumber.trim().length === 0) {
            throw new Error('Spot number is required');
        }

        // Valida que type sea uno de los valores permitidos
        const validTypes = ['compact', 'standard', 'large'];
        if (!validTypes.includes(type)) {
            throw new Error("Spot type must be 'compact', 'standard', or 'large'");
        }

        // Asigna los valores validados
        this.spotNumber = spotNumber.trim();
        this.type = type;
        this.isOccupied = false;
        this.vehiclePlate = null;
        this.entryTime = null;
    }

    parkVehicle(plate, entryTime) {
        // Valida que plate sea un string no vacío
        if (typeof plate !== 'string' || plate.trim().length === 0) {
            throw new Error('Vehicle plate is required');
        }

        // Valida que entryTime sea una instancia de Date
        if (!(entryTime instanceof Date)) {
            throw new Error('Entry time must be a Date object');
        }

        // Valida que el espacio no esté ocupado
        if (this.isOccupied) {
            throw new Error('Spot is already occupied');
        }

        // Asigna vehículo y marca como ocupado
        this.vehiclePlate = plate.trim();
        this.entryTime = entryTime;
        this.isOccupied = true;

        return true;
    }

    exitVehicle(exitTime, ratePerHour) {
        // Valida que exitTime sea una instancia de Date
        if (!(exitTime instanceof Date)) {
            throw new Error('Exit time must be a Date object');
        }

        // Valida que ratePerHour sea un número mayor que 0
        if (typeof ratePerHour !== 'number' || ratePerHour <= 0) {
            throw new Error('Rate per hour must be greater than 0');
        }

        // Valida que el espacio esté ocupado
        if (!this.isOccupied) {
            throw new Error('Spot is not occupied');
        }

        // Valida que exitTime sea posterior a entryTime
        if (exitTime <= this.entryTime) {
            throw new Error('Exit time must be after entry time');
        }

        // Calcula duración y tarifa
        const duration = this.getParkingDuration(exitTime);
        const fee = this.calculateFee(exitTime, ratePerHour);

        // Libera el espacio
        this.isOccupied = false;
        this.vehiclePlate = null;
        this.entryTime = null;

        return { duration, fee };
    }

    getParkingDuration(exitTime) {
        // Valida que exitTime sea una instancia de Date
        if (!(exitTime instanceof Date)) {
            throw new Error('Exit time must be a Date object');
        }

        // Valida que el espacio esté ocupado
        if (!this.isOccupied) {
            throw new Error('Spot is not occupied');
        }

        // Calcula diferencia en milisegundos
        const diffInMs = exitTime - this.entryTime;

        // Convierte a horas
        const hours = diffInMs / (1000 * 60 * 60);

        // Retorna con 2 decimales
        return parseFloat(hours.toFixed(2));
    }

    calculateFee(exitTime, ratePerHour) {
        // Valida que exitTime sea una instancia de Date
        if (!(exitTime instanceof Date)) {
            throw new Error('Exit time must be a Date object');
        }

        // Valida que ratePerHour sea un número mayor que 0
        if (typeof ratePerHour !== 'number' || ratePerHour <= 0) {
            throw new Error('Rate per hour must be greater than 0');
        }

        // Valida que el espacio esté ocupado
        if (!this.isOccupied) {
            throw new Error('Spot is not occupied');
        }

        // Calcula duración
        const duration = this.getParkingDuration(exitTime);

        // Calcula tarifa
        const fee = duration * ratePerHour;

        // Retorna con 2 decimales
        return parseFloat(fee.toFixed(2));
    }

    isCompatible(vehicleType) {
        // Valida que vehicleType sea un string
        if (typeof vehicleType !== 'string') {
            throw new Error('Vehicle type must be a string');
        }

        // Define compatibilidad según tipo de espacio
        if (this.type === 'compact') {
            return vehicleType === 'compact';
        } else if (this.type === 'standard') {
            return vehicleType === 'compact' || vehicleType === 'standard';
        } else if (this.type === 'large') {
            return vehicleType === 'compact' || vehicleType === 'standard' || vehicleType === 'large';
        }

        return false;
    }
}

class ParkingLot {
    constructor(name) {
        // Valida que name sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Parking lot name is required');
        }

        // Asigna valores iniciales
        this.name = name.trim();
        this.spots = [];
        this.hourlyRates = {
            compact: 2,
            standard: 3,
            large: 5
        };
        this.revenue = {
            compact: 0,
            standard: 0,
            large: 0
        };
    }

    addSpot(spotNumber, type) {
        // Valida que spotNumber sea un string no vacío
        if (typeof spotNumber !== 'string' || spotNumber.trim().length === 0) {
            throw new Error('Spot number is required');
        }

        // Valida que type sea uno de los valores permitidos
        const validTypes = ['compact', 'standard', 'large'];
        if (!validTypes.includes(type)) {
            throw new Error("Spot type must be 'compact', 'standard', or 'large'");
        }

        // Verifica que no exista espacio con mismo número
        const existingSpot = this.spots.find(spot => spot.spotNumber === spotNumber.trim());
        if (existingSpot) {
            throw new Error('Spot number already exists');
        }

        // Crea y agrega nuevo espacio
        const spot = new ParkingSpot(spotNumber, type);
        this.spots.push(spot);

        return spot;
    }

    findAvailableSpot(vehicleType) {
        // Valida que vehicleType sea un string
        if (typeof vehicleType !== 'string') {
            throw new Error('Vehicle type must be a string');
        }

        // Busca primer espacio disponible compatible
        return this.spots.find(spot => 
            !spot.isOccupied && spot.isCompatible(vehicleType)
        ) || null;
    }

    parkVehicle(vehicleType, plate, entryTime) {
        // Valida que vehicleType sea un string
        if (typeof vehicleType !== 'string') {
            throw new Error('Vehicle type must be a string');
        }

        // Valida que plate sea un string no vacío
        if (typeof plate !== 'string' || plate.trim().length === 0) {
            throw new Error('Vehicle plate is required');
        }

        // Valida que entryTime sea una instancia de Date
        if (!(entryTime instanceof Date)) {
            throw new Error('Entry time must be a Date object');
        }

        // Busca espacio disponible
        const spot = this.findAvailableSpot(vehicleType);
        if (!spot) {
            throw new Error('No available spot for this vehicle type');
        }

        // Estaciona vehículo
        spot.parkVehicle(plate.trim(), entryTime);

        return spot;
    }

    exitVehicle(plate, exitTime) {
        // Valida que plate sea un string no vacío
        if (typeof plate !== 'string' || plate.trim().length === 0) {
            throw new Error('Vehicle plate is required');
        }

        // Valida que exitTime sea una instancia de Date
        if (!(exitTime instanceof Date)) {
            throw new Error('Exit time must be a Date object');
        }

        // Busca espacio ocupado por esa placa
        const spot = this.spots.find(s => 
            s.isOccupied && s.vehiclePlate === plate.trim()
        );

        if (!spot) {
            throw new Error('Vehicle not found');
        }

        // Obtiene tarifa por hora según tipo de espacio
        const ratePerHour = this.hourlyRates[spot.type];

        // Calcula tarifa y libera espacio
        const result = spot.exitVehicle(exitTime, ratePerHour);

        // Acumula ingresos
        this.revenue[spot.type] += result.fee;

        return {
            spot,
            duration: result.duration,
            fee: result.fee
        };
    }

    getOccupancyRate() {
        // Si no hay espacios, retorna 0
        if (this.spots.length === 0) {
            return 0;
        }

        // Cuenta espacios ocupados
        const occupiedCount = this.spots.filter(spot => spot.isOccupied).length;

        // Calcula porcentaje
        const rate = (occupiedCount / this.spots.length) * 100;

        // Retorna con 2 decimales
        return parseFloat(rate.toFixed(2));
    }

    getRevenueByType() {
        // Retorna copia del objeto de ingresos
        return { ...this.revenue };
    }

    getSpotsByType(type) {
        // Valida que type sea uno de los valores permitidos
        const validTypes = ['compact', 'standard', 'large'];
        if (!validTypes.includes(type)) {
            throw new Error("Spot type must be 'compact', 'standard', or 'large'");
        }

        // Filtra espacios por tipo
        return this.spots.filter(spot => spot.type === type);
    }
}

module.exports = {
    ParkingSpot,
    ParkingLot
};

