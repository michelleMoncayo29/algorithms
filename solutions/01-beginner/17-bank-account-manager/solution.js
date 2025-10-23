/**
 * SOLUCIÓN: Gestor de Cuenta Bancaria
 * 
 * Esta es la solución completa para el ejercicio de gestión de cuenta bancaria.
 * La clase BankAccount implementa operaciones bancarias básicas con validación
 * completa de datos y manejo de estado.
 */

class BankAccount {
    constructor(accountNumber = "ACC-001") {
        this.balance = 0;
        this.transactions = [];
        this.accountNumber = accountNumber;
    }

    /**
     * Realiza un depósito en la cuenta
     * @param {number} amount - Monto a depositar
     * @returns {number|null} Nuevo saldo o null si es inválido
     */
    deposit(amount) {
        // Validar que el monto sea un número positivo mayor que 0
        if (typeof amount !== 'number' || amount <= 0 || isNaN(amount)) {
            return null;
        }

        // Actualizar el saldo
        this.balance += amount;

        // Registrar la transacción
        const transaction = {
            type: 'deposit',
            amount: amount,
            balance: this.balance,
            timestamp: new Date()
        };
        this.transactions.push(transaction);

        return this.balance;
    }

    /**
     * Realiza un retiro de la cuenta
     * @param {number} amount - Monto a retirar
     * @returns {number|null} Nuevo saldo o null si es inválido
     */
    withdraw(amount) {
        // Validar que el monto sea un número positivo mayor que 0
        if (typeof amount !== 'number' || amount <= 0 || isNaN(amount)) {
            return null;
        }

        // Validar que haya saldo suficiente
        if (this.balance < amount) {
            return null;
        }

        // Actualizar el saldo
        this.balance -= amount;

        // Registrar la transacción
        const transaction = {
            type: 'withdraw',
            amount: amount,
            balance: this.balance,
            timestamp: new Date()
        };
        this.transactions.push(transaction);

        return this.balance;
    }

    /**
     * Obtiene el saldo actual de la cuenta
     * @returns {number} Saldo actual
     */
    getBalance() {
        return this.balance;
    }

    /**
     * Obtiene el historial completo de transacciones
     * @returns {Array} Array de transacciones
     */
    getTransactionHistory() {
        return this.transactions;
    }

    /**
     * Calcula interés simple sobre el saldo actual
     * @param {number} rate - Tasa de interés anual (en porcentaje)
     * @param {number} months - Número de meses
     * @returns {number} Monto de interés calculado
     */
    calculateInterest(rate, months) {
        // Validar que rate y months sean números positivos
        if (typeof rate !== 'number' || typeof months !== 'number' || 
            rate <= 0 || months <= 0 || isNaN(rate) || isNaN(months)) {
            return 0;
        }

        // Calcular interés simple: (Saldo × Tasa × Meses) / (100 × 12)
        const interest = (this.balance * rate * months) / (100 * 12);
        return interest;
    }
}

// Versión alternativa con validaciones más estrictas
class BankAccountStrict extends BankAccount {
    constructor(accountNumber = "ACC-001") {
        super(accountNumber);
    }

    deposit(amount) {
        // Validación más estricta
        if (!this._isValidAmount(amount)) {
            return null;
        }

        // Verificar límites de depósito (ejemplo: máximo $10,000 por transacción)
        if (amount > 10000) {
            return null;
        }

        return super.deposit(amount);
    }

    withdraw(amount) {
        // Validación más estricta
        if (!this._isValidAmount(amount)) {
            return null;
        }

        // Verificar límites de retiro (ejemplo: máximo $5,000 por transacción)
        if (amount > 5000) {
            return null;
        }

        return super.withdraw(amount);
    }

    calculateInterest(rate, months) {
        // Validación más estricta para tasas de interés
        if (typeof rate !== 'number' || typeof months !== 'number' || 
            rate <= 0 || months <= 0 || isNaN(rate) || isNaN(months)) {
            return 0;
        }

        // Límite de tasa de interés (ejemplo: máximo 20% anual)
        if (rate > 20) {
            return 0;
        }

        // Límite de período (ejemplo: máximo 60 meses)
        if (months > 60) {
            return 0;
        }

        return super.calculateInterest(rate, months);
    }

    /**
     * Método privado para validar montos
     * @param {number} amount - Monto a validar
     * @returns {boolean} True si es válido
     */
    _isValidAmount(amount) {
        return typeof amount === 'number' && 
               amount > 0 && 
               !isNaN(amount) && 
               isFinite(amount);
    }
}

// Versión con funcionalidades adicionales
class BankAccountExtended extends BankAccount {
    constructor(accountNumber = "ACC-001") {
        super(accountNumber);
        this.interestRate = 0; // Tasa de interés por defecto
    }

    /**
     * Establece la tasa de interés de la cuenta
     * @param {number} rate - Tasa de interés anual
     * @returns {boolean} True si se estableció correctamente
     */
    setInterestRate(rate) {
        if (typeof rate !== 'number' || rate < 0 || isNaN(rate)) {
            return false;
        }
        this.interestRate = rate;
        return true;
    }

    /**
     * Calcula interés usando la tasa establecida
     * @param {number} months - Número de meses
     * @returns {number} Monto de interés calculado
     */
    calculateInterestWithRate(months) {
        return this.calculateInterest(this.interestRate, months);
    }

    /**
     * Obtiene estadísticas de la cuenta
     * @returns {Object} Estadísticas de la cuenta
     */
    getAccountStats() {
        const deposits = this.transactions.filter(t => t.type === 'deposit');
        const withdrawals = this.transactions.filter(t => t.type === 'withdraw');
        
        const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0);
        const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);

        return {
            currentBalance: this.balance,
            totalDeposits: totalDeposits,
            totalWithdrawals: totalWithdrawals,
            transactionCount: this.transactions.length,
            depositCount: deposits.length,
            withdrawalCount: withdrawals.length,
            interestRate: this.interestRate
        };
    }

    /**
     * Obtiene transacciones por tipo
     * @param {string} type - Tipo de transacción ('deposit' o 'withdraw')
     * @returns {Array} Array de transacciones del tipo especificado
     */
    getTransactionsByType(type) {
        if (type !== 'deposit' && type !== 'withdraw') {
            return [];
        }
        return this.transactions.filter(t => t.type === type);
    }
}

module.exports = BankAccount;
