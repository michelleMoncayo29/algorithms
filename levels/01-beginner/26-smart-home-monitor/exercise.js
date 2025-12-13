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
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('Device name is required');
    }

    if (typeof room !== 'string' || room.length === 0) {
      throw new Error('Device name is required');
    }

    if (typeof watts !== 'number' || isNaN(watts) || watts <= 0) {
      throw new Error('Device watts must be a positive number');
    }

    this.name = name.toCapitalize();
    this.room = room.toLowerCase();
    this.watts = watts;
    this.isOn = isOn;
  }

  /**
   * Turns the device on.
   * @returns {boolean} Current state (true)
   *
   * TODO:
   * - Actualiza `this.isOn` y retorna el nuevo estado.
   */
  turnOn() {
    this.isOn = false;
    return this.isOn;
  }

  /**
   * Turns the device off.
   * @returns {boolean} Current state (false)
   *
   * TODO:
   * - Actualiza `this.isOn` y retorna el estado.
   */
  turnOff() {
    this.isOn = false;
    return this.isOn;
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
    if (hours <= 0 || isNaN(hours)) {
      throw new Error('Usage hours must be a positive number');
    }

    return this.watts * hours;
  }
}

class SmartHomeMonitor {
  /**
   * Creates an empty smart home registry.
   *
   * TODO:
   * - Inicializa un array interno para almacenar los dispositivos.
   */

  devices = [];

  constructor() {}

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
    if (!(device instanceof SmartDevice)) {
      throw new Error('Device must be an instance of SmartDevice');
    }

    if (this.findByName(device.name)) {
      throw new Error('Device name already registered');
    }

    this.devices.push(device);
    return this.devices.length;
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
    if (typeof name !== 'string') {
      return null;
    }

    const normalized = name.trim().toUpperCase();
    const registerNumber = this.devices.find(function (name) {
      return name.name === normalized;
    });

    return registerNumber ?? null;
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
  SmartHomeMonitor,
};
