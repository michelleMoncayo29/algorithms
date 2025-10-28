/**
 * Gestor de Cuenta Bancaria
 * 
 * Descripción: Implementa una clase BankAccount que gestione operaciones bancarias básicas
 * como depósitos, retiros, consulta de saldo, historial de transacciones y cálculo de intereses.
 * Dificultad: BEGINNER
 * 
 * Estructura de la cuenta:
 * {
 *   balance: 0,
 *   transactions: [],
 *   accountNumber: "ACC-001"
 * }
 */

class BankAccount {
    constructor(accountNumber = "ACC-001") {
        // TODO: Inicializar la cuenta con saldo 0, array de transacciones vacío y número de cuenta
        // Pista: this.balance = 0, this.transactions = [], this.accountNumber = accountNumber
    }

    /**
     * Realiza un depósito en la cuenta
     * @param {number} amount - Monto a depositar
     * @returns {number|null} Nuevo saldo o null si es inválido
     */
    deposit(amount) {
        // TODO: Implementar depósito
        // Pista 1: Validar que amount sea un número positivo mayor que 0
        // Pista 2: Si es válido, agregar al balance y registrar transacción
        // Pista 3: Retornar el nuevo saldo, o null si es inválido
        
        throw new Error('Método deposit no implementado');
    }

    /**
     * Realiza un retiro de la cuenta
     * @param {number} amount - Monto a retirar
     * @returns {number|null} Nuevo saldo o null si es inválido
     */
    withdraw(amount) {
        // TODO: Implementar retiro
        // Pista 1: Validar que amount sea un número positivo mayor que 0
        // Pista 2: Validar que haya saldo suficiente (this.balance >= amount)
        // Pista 3: Si es válido, restar del balance y registrar transacción
        // Pista 4: Retornar el nuevo saldo, o null si es inválido
        
        throw new Error('Método withdraw no implementado');
    }

    /**
     * Obtiene el saldo actual de la cuenta
     * @returns {number} Saldo actual
     */
    getBalance() {
        // TODO: Retornar el saldo actual
        // Pista: return this.balance
        
        throw new Error('Método getBalance no implementado');
    }

    /**
     * Obtiene el historial completo de transacciones
     * @returns {Array} Array de transacciones
     */
    getTransactionHistory() {
        // TODO: Retornar el array de transacciones
        // Pista: return this.transactions
        
        throw new Error('Método getTransactionHistory no implementado');
    }

    /**
     * Calcula interés simple sobre el saldo actual
     * @param {number} rate - Tasa de interés anual (en porcentaje)
     * @param {number} months - Número de meses
     * @returns {number} Monto de interés calculado
     */
    calculateInterest(rate, months) {
        // TODO: Implementar cálculo de interés simple
        // Pista 1: Validar que rate y months sean números positivos
        // Pista 2: Usar la fórmula: (this.balance * rate * months) / (100 * 12)
        // Pista 3: Retornar 0 si los parámetros son inválidos
        
        throw new Error('Método calculateInterest no implementado');
    }
}

module.exports = BankAccount;
