/**
 * Gestor de Configuración (Settings Manager)
 *
 * Description: Implementa una clase para gestionar configuraciones de aplicación.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - KISS and expressive naming
 * - Fail Fast when validating inputs
 * - Encapsulation for internal state
 */

/**
 * Manages application settings with get, set, reset, and validate operations.
 * @class
 */
class SettingsManager {
    /**
     * Creates a new SettingsManager with default settings.
     * @param {Object} defaults - Default settings object (optional).
     *
     * TODO:
     * - Initialize internal settings object with defaults or empty object
     * - Store a copy of defaults for reset functionality
     */
    constructor(defaults = {}) {
        if (typeof defaults !== 'object' || defaults === null || Array.isArray(defaults)) {
            throw new Error('Defaults must be an object');
        }

        this.settings = { ...defaults };
        this.defaults = { ...defaults };
    }

    /**
     * Gets a setting value by key.
     * @param {string} key - Setting key.
     * @returns {*} The setting value, or undefined if not found.
     *
     * TODO:
     * - Validate that key is a non-empty string
     * - Return the value for the key, or undefined if not found
     */
    get(key) {
        if (typeof key !== 'string' || key.trim().length === 0) {
            throw new Error('Key must be a non-empty string');
        }

        return this.settings[key];
    }

    /**
     * Sets a setting value.
     * @param {string} key - Setting key.
     * @param {*} value - Setting value.
     * @returns {SettingsManager} Returns this for method chaining.
     *
     * TODO:
     * - Validate that key is a non-empty string
     * - Store the key-value pair
     * - Return this for method chaining
     */
    set(key, value) {
        if (typeof key !== 'string' || key.trim().length === 0) {
            throw new Error('Key must be a non-empty string');
        }

        this.settings[key] = value;
        return this;
    }

    /**
     * Sets multiple settings at once.
     * @param {Object} settings - Object with key-value pairs.
     * @returns {SettingsManager} Returns this for method chaining.
     *
     * TODO:
     * - Validate that settings is an object
     * - Iterate over settings and call set() for each key-value pair
     * - Return this for method chaining
     */
    setMultiple(settings) {
        
        if (typeof settings !== 'object' || settings === null || Array.isArray(settings)) {
            throw new Error('Settings must be an object');
        }

        // Iterar sobre settings y establecer cada key-value
        for (const [key, value] of Object.entries(settings)) {
            this.set(key, value);
        }

        return this; // Method chaining
    }

    /**
     * Checks if a setting exists.
     * @param {string} key - Setting key.
     * @returns {boolean} true if setting exists, false otherwise.
     */
    has(key) {
        if (typeof key !== 'string' || key.trim().length === 0) {
            return false;
        }

        return key in this.settings;
    }

    /**
     * Removes a setting.
     * @param {string} key - Setting key.
     * @returns {boolean} true if setting was removed, false if it didn't exist.
     */
    remove(key) {
        if (typeof key !== 'string' || key.trim().length === 0) {
            return false;
        }

        if (key in this.settings) {
            delete this.settings[key];
            return true;
        }

        return false;
    }

    /**
     * Resets all settings to defaults.
     * @returns {SettingsManager} Returns this for method chaining.
     *
     * TODO:
     * - Reset settings to the original defaults
     * - Return this for method chaining
     */
    reset() {
        this.settings = { ...this.defaults };
        return this;
    }

    /**
     * Gets all settings as an object (immutable copy).
     * @returns {Object} Copy of all settings.
     */
    getAll() {
        return { ...this.settings };
    }

    /**
     * Clears all settings.
     * @returns {SettingsManager} Returns this for method chaining.
     */
    clear() {
        this.settings = {};
        return this;
    }

    /**
     * Gets the number of settings.
     * @returns {number} Number of settings.
     */
    size() {
        return Object.keys(this.settings).length;
    }
}

module.exports = SettingsManager;

