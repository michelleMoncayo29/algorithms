/**
 * Fleet Maintenance Manager
 *
 * Description: Implement two beginner-friendly classes (`Vehicle` and
 * `FleetManager`) to register #vehicles, track mileage and build maintenance
 * reports. Follow the README instructions and keep all identifiers/messages
 * in English.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - Fail Fast: valida todos los datos antes de continuar
 * - KISS + Código Expresivo: métodos cortos y nombres claros
 * - Inmutabilidad: nunca expongas el array interno del registro
 */

class Vehicle {
    /**
     * @param {string} plate - License plate (stored uppercase, >= 5 chars)
     * @param {string} type - Vehicle type (truck, van, etc.)
     * @param {number} mileage - Current mileage (integer >= 0)
     *
     * TODO:
     * - Valida cada argumento y lanza los errores descritos en el README.
     * - Normaliza la placa con `trim()` y `toUpperCase()`.
     * - Asigna las propiedades a `this`.
     */
    constructor(plate, type, mileage) {
        if (plate.trim().length === 0 || typeof plate !== 'string') { 
            throw new Error('Vehicle plate is required');
        }

        if (typeof mileage !== 'number' || mileage < 0 || !Number.isInteger(mileage)) {
            throw new Error('Vehicle mileage must be a number greater than or equal to 0');
        }
        if (type.trim().length === 0 || typeof type !== 'string') { 
            throw new Error('Vehicle type is required');
        }
            
        

        this.plate = plate.toUpperCase().trim();
        this.type = type;
        this.mileage = mileage;
    }

    /**
     * Builds a summary string such as "ABC123 (truck) has 1500 km".
     * @returns {string}
     *
     * TODO:
     * - Usa template literals y respeta el formato solicitado.
     */
    getSummary() {
        return `${this.plate} (${this.type}) has ${this.mileage} km`;
    }

    /**
     * Adds a new trip to the mileage.
     * @param {number} kilometers - Positive integer number
     * @returns {number} Updated mileage
     *
     * TODO:
     * - Valida que `kilometers` sea entero positivo (>0).
     * - Lanza "Trip distance must be a positive number" si no cumple.
     * - Suma al kilometraje y retorna el nuevo valor.
     */
    addTrip(kilometers) {
        if (kilometers <= 0 || isNaN(kilometers)) {
            throw new Error('Trip distance must be a positive number');            
        }
        
        // se suma cada vez que se ejecuta de nuevo el metodo de la clase
        this.mileage += kilometers;
        return this.mileage;
    }
}

class FleetManager {
    /**
     * Creates an empty fleet registry.
     *
     * TODO:
     * - Inicializa `this.#vehicles` como array vacío.
    */

    #vehicles = [];

    constructor() {}

    /**
     * Adds a vehicle to the fleet.
     * @param {Vehicle} vehicle
     * @returns {number} Total #vehicles stored
     *
     * TODO:
     * - Valida que sea instancia de `Vehicle` o lanza
     *   "Vehicle must be an instance of Vehicle".
     * - Evita duplicados comparando placas (case-insensitive). Si existe,
     *   lanza "Vehicle plate already registered".
     * - Agrega al array y retorna `length`.
     */
    addVehicle(vehicle) {
        if(!(vehicle instanceof Vehicle)) {
            throw new Error('Vehicle must be an instance of Vehicle');
        }

        const isDuplicated = this.isDuplicatedPlate(vehicle.plate);
        
        if (isDuplicated) {
            throw new Error('Vehicle plate already registered');
        }
        
        this.#vehicles.push(vehicle);
        return this.#vehicles.length;
    }
    
    /**
     * Finds a vehicle by plate (case-insensitive).
     * @param {string} plate
     * @returns {Vehicle|null}
     *
     * TODO:
     * - Normaliza la entrada (trim + uppercase) y busca en el array.
     * - Retorna la coincidencia o `null` si no existe.
     * MATRICULA: " abc123 " === "ABC123"
     */
    findByPlate(plate) {
        if(typeof plate !== 'string') {
            return null;
        }

        const normalizedPlate = plate.trim().toUpperCase();

        const foundVehicle = this.#vehicles.find(function(vehicle) {
            return vehicle.plate === normalizedPlate;
        });

        return foundVehicle ?? null;
    }

    /**
     * Returns maintenance summaries for #vehicles above a threshold.
     * @param {number} threshold
     * @returns {string[]} Array with `getSummary()` results
     *
     * TODO:
     * - Valida que `threshold` sea entero >= 0, de lo contrario lanza
     *   "Maintenance threshold must be a number greater than or equal to 0".
     * - Filtra vehículos con `mileage >= threshold` y mapea con `getSummary`.
     * - Retorna un nuevo array (no expongas el original).
     */
    getMaintenanceList(threshold) {
        if (threshold < 0) { 
            throw new Error('Maintenance threshold must be a number greater than or equal to 0');
        }

        console.log("⭐⭐⭐", threshold);
 
        // me retorna un nuevo array que el kilometro sea mayor o igual al threshold
        const mutedArray = this.#vehicles.filter(function(vehicle) {
            return vehicle.mileage >= threshold;
        });

        const arrSummaries = mutedArray.map(function(vehicle) {
            return vehicle.getSummary();
        });

        return arrSummaries;
    }

    isDuplicatedPlate(plate) {
        
        const filterPlate = this.#vehicles.filter((vehicle) => {
            return vehicle.plate.toLowerCase() === plate.toLowerCase()
        })

        return filterPlate.length > 0; 
    }
}

const toyota = new Vehicle('ref01', 'Truck', 2000);
const fleet = new FleetManager();
fleet.addVehicle(toyota);
// fleet.isDuplicatedPlate('MCKC2');

console.log(fleet);

module.exports = {
    Vehicle,
    FleetManager
};

