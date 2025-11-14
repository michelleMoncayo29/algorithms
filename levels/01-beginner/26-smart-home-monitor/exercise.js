/**
 * Smart Home Monitor
 *
 * Description: Implement two beginner-level classes (`SmartDevice` and
 * `SmartHomeMonitor`) to practice constructors, validations, collection
 * handling and simple aggregate calculations. Follow the README instructions
 * exactly and keep every identifier/message in English.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - Fail Fast: valida entradas antes de modificar estado
 * - KISS + Código Expresivo: métodos cortos y claros
 * - Responsabilidad Única: cada método cumple una sola tarea
 */

class SmartDevice {
    /**
     * @param {string} name - Device name (capitalized)
     * @param {string} room - Room identifier (lowercase)
     * @param {number} watts - Power consumption in watts (> 0)
     * @param {boolean} [isOn=false] - Initial state
     *
     * TODO:
     * - Valida cada argumento y lanza los errores descritos en el README.
     * - Normaliza `name` (capitalizado) y `room` (minúsculas).
     * - Asigna `isOn` con el valor recibido o `false`.
     */
    constructor(name, room, watts, isOn = false) {
        throw new Error('SmartDevice constructor not implemented');
    }

    /**
     * Turns the device on.
     * @returns {boolean} Current state (true)
     *
     * TODO:
     * - Actualiza `this.isOn` y retorna el nuevo estado.
     */
    turnOn() {
        throw new Error('Method turnOn not implemented');
    }

    /**
     * Turns the device off.
     * @returns {boolean} Current state (false)
     *
     * TODO:
     * - Actualiza `this.isOn` y retorna el estado.
     */
    turnOff() {
        throw new Error('Method turnOff not implemented');
    }

    /**
     * Calculates consumption based on current state.
     * @param {number} hours - Usage hours (>0)
     * @returns {number} Watts consumed or 0 if device is off
     *
     * TODO:
     * - Valida `hours` y lanza "Usage hours must be a positive number" si falla.
     * - Si `this.isOn` es falso, retorna 0.
     * - En caso contrario, retorna `this.watts * hours`.
     */
    getConsumption(hours) {
        throw new Error('Method getConsumption not implemented');
    }
}

class SmartHomeMonitor {
    /**
     * Creates an empty smart home registry.
     *
     * TODO:
     * - Inicializa un array interno para almacenar los dispositivos.
     */
    constructor() {
        throw new Error('SmartHomeMonitor constructor not implemented');
    }

    /**
     * Adds a new smart device.
     * @param {SmartDevice} device
     * @returns {number} Total devices stored
     *
     * TODO:
     * - Valida instancia o lanza "Device must be an instance of SmartDevice".
     * - Evita duplicados por nombre (case-insensitive). Si existe, lanza
     *   "Device name already registered".
     * - Agrega el dispositivo y retorna el total.
     */
    addDevice(device) {
        throw new Error('Method addDevice not implemented');
    }

    /**
     * Finds a device by name (case-insensitive).
     * @param {string} name
     * @returns {SmartDevice|null}
     *
     * TODO:
     * - Normaliza `name` y busca en la colección interna.
     * - Retorna el dispositivo o `null`.
     */
    findByName(name) {
        throw new Error('Method findByName not implemented');
    }

    /**
     * Builds a room report.
     * @param {string} room
     * @returns {{room: string, devices: string[], activeDevices: number, totalWatts: number}}
     *
     * TODO:
     * - Valida `room` (no vacío) y lanza "Room name is required" si falla.
     * - Filtra los dispositivos que pertenecen a la habitación (case-insensitive).
     * - Retorna un objeto nuevo con las claves solicitadas.
     */
    getRoomReport(room) {
        throw new Error('Method getRoomReport not implemented');
    }

    /**
     * Calculates total consumption for active devices.
     * @param {number} hours
     * @returns {number} Summed consumption
     *
     * TODO:
     * - Valida `hours` como entero positivo (>0), mismo mensaje que `SmartDevice`.
     * - Suma `device.getConsumption(hours)` para cada dispositivo y retorna el total.
     */
    getActiveConsumption(hours) {
        throw new Error('Method getActiveConsumption not implemented');
    }
}

module.exports = {
    SmartDevice,
    SmartHomeMonitor
};

