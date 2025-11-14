/**
 * Fleet Maintenance Manager
 *
 * Description: Implement two beginner-friendly classes (`Vehicle` and
 * `FleetManager`) to register vehicles, track mileage and build maintenance
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
        throw new Error('Vehicle constructor not implemented');
    }

    /**
     * Builds a summary string such as "ABC123 (truck) has 1500 km".
     * @returns {string}
     *
     * TODO:
     * - Usa template literals y respeta el formato solicitado.
     */
    getSummary() {
        throw new Error('Method getSummary not implemented');
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
        throw new Error('Method addTrip not implemented');
    }
}

class FleetManager {
    /**
     * Creates an empty fleet registry.
     *
     * TODO:
     * - Inicializa `this.vehicles` como array vacío.
     */
    constructor() {
        throw new Error('FleetManager constructor not implemented');
    }

    /**
     * Adds a vehicle to the fleet.
     * @param {Vehicle} vehicle
     * @returns {number} Total vehicles stored
     *
     * TODO:
     * - Valida que sea instancia de `Vehicle` o lanza
     *   "Vehicle must be an instance of Vehicle".
     * - Evita duplicados comparando placas (case-insensitive). Si existe,
     *   lanza "Vehicle plate already registered".
     * - Agrega al array y retorna `length`.
     */
    addVehicle(vehicle) {
        throw new Error('Method addVehicle not implemented');
    }

    /**
     * Finds a vehicle by plate (case-insensitive).
     * @param {string} plate
     * @returns {Vehicle|null}
     *
     * TODO:
     * - Normaliza la entrada (trim + uppercase) y busca en el array.
     * - Retorna la coincidencia o `null` si no existe.
     */
    findByPlate(plate) {
        throw new Error('Method findByPlate not implemented');
    }

    /**
     * Returns maintenance summaries for vehicles above a threshold.
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
        throw new Error('Method getMaintenanceList not implemented');
    }
}

module.exports = {
    Vehicle,
    FleetManager
};

