/**
 * Solución: Sistema de Cuenta Bancaria
 * 
 * Esta implementación muestra cómo crear una clase BankAccount que gestiona
 * cuentas bancarias con depósitos, retiros y consultas de saldo.
 */

class BankAccount {
    /**
     * Constructor de la clase BankAccount
     * Traducción: Constructor de Cuenta Bancaria
     *
     * Crea una nueva cuenta bancaria con el nombre del titular y un saldo inicial.
     * Valida que el nombre no esté vacío y que el saldo inicial no sea negativo.
     * 
     * @param {string} accountHolder - Nombre del titular de la cuenta
     * @param {number} initialBalance - Saldo inicial de la cuenta (default: 0)
     */
    constructor(accountHolder, initialBalance = 0) {
        // Valida que el nombre del titular sea un string no vacío
        if (typeof accountHolder !== 'string' || accountHolder.trim().length === 0) {
            throw new Error('Account holder name is required');
        }

        // Valida que el saldo inicial sea un número y no sea negativo
        if (typeof initialBalance !== 'number' || initialBalance < 0) {
            throw new Error('Initial balance cannot be negative');
        }

        // Asigna los valores validados a las propiedades de la instancia
        this.accountHolder = accountHolder.trim();
        this.balance = initialBalance;
    }

    /**
     * Deposita dinero en la cuenta.
     * Traducción: Depositar
     *
     * Incrementa el saldo de la cuenta con el monto especificado.
     * Valida que el monto sea un número positivo antes de realizar el depósito.
     * 
     * @param {number} amount - Cantidad de dinero a depositar
     * @returns {number} El nuevo saldo después del depósito
     */
    deposit(amount) {
        // Valida que el monto sea un número positivo
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }

        // Incrementa el saldo con el monto depositado
        this.balance += amount;
        
        // Retorna el nuevo saldo
        return this.balance;
    }

    /**
     * Retira dinero de la cuenta.
     * Traducción: Retirar
     *
     * Decrementa el saldo de la cuenta con el monto especificado.
     * Valida que el monto sea positivo y que haya saldo suficiente antes de realizar el retiro.
     * 
     * @param {number} amount - Cantidad de dinero a retirar
     * @returns {number} El nuevo saldo después del retiro
     */
    withdraw(amount) {
        // Valida que el monto sea un número positivo
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }

        // Valida que haya saldo suficiente para el retiro
        if (this.balance < amount) {
            throw new Error('Insufficient funds');
        }

        // Decrementa el saldo con el monto retirado
        this.balance -= amount;
        
        // Retorna el nuevo saldo
        return this.balance;
    }

    /**
     * Obtiene el saldo actual de la cuenta.
     * Traducción: Obtener Saldo
     *
     * Retorna el saldo actual sin modificarlo.
     * 
     * @returns {number} El saldo actual de la cuenta
     */
    getBalance() {
        return this.balance;
    }

    /**
     * Obtiene la información completa de la cuenta en formato legible.
     * Traducción: Obtener Información de la Cuenta
     *
     * Genera un string con el nombre del titular y el saldo formateado con 2 decimales.
     * 
     * @returns {string} String con el formato "Account holder: [nombre], Balance: $[saldo]"
     */
    getAccountInfo() {
        // Formatea el saldo con 2 decimales usando toFixed(2)
        const formattedBalance = this.balance.toFixed(2);
        
        // Retorna el string formateado con template literals
        return `Account holder: ${this.accountHolder}, Balance: $${formattedBalance}`;
    }
}

module.exports = {
    BankAccount
};

