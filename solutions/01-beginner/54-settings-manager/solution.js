/**
 * SOLUCIÓN: Gestor de Configuración (Settings Manager)
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

class SettingsManager {
    constructor(defaults = {}) {
        // Validar que defaults sea un objeto
        if (typeof defaults !== 'object' || defaults === null || Array.isArray(defaults)) {
            throw new Error('Defaults must be an object');
        }

        // Inicializar settings con defaults
        this.settings = { ...defaults };
        // Guardar copia de defaults para reset
        this.defaults = { ...defaults };
    }

    get(key) {
        // Validar que key sea un string no vacío
        if (typeof key !== 'string' || key.trim().length === 0) {
            throw new Error('Key must be a non-empty string');
        }

        return this.settings[key];
    }

    set(key, value) {
        // Validar que key sea un string no vacío
        if (typeof key !== 'string' || key.trim().length === 0) {
            throw new Error('Key must be a non-empty string');
        }

        this.settings[key] = value;
        return this; // Method chaining
    }

    setMultiple(settings) {
        // Validar que settings sea un objeto
        if (typeof settings !== 'object' || settings === null || Array.isArray(settings)) {
            throw new Error('Settings must be an object');
        }

        // Iterar sobre settings y establecer cada key-value
        for (const [key, value] of Object.entries(settings)) {
            this.set(key, value);
        }

        return this; // Method chaining
    }

    has(key) {
        if (typeof key !== 'string' || key.trim().length === 0) {
            return false;
        }

        return key in this.settings;
    }

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

    reset() {
        // Restablecer a defaults
        this.settings = { ...this.defaults };
        return this; // Method chaining
    }

    getAll() {
        // Retornar copia inmutable
        return { ...this.settings };
    }

    clear() {
        this.settings = {};
        return this; // Method chaining
    }

    size() {
        return Object.keys(this.settings).length;
    }
}

module.exports = SettingsManager;

