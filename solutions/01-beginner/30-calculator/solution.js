/**
 * Solución: Calculadora Científica Básica
 * 
 * Esta implementación muestra cómo crear una clase Calculator que mantiene
 * un valor acumulado y permite realizar operaciones matemáticas básicas.
 */

class Calculator {
    /**
     * Constructor de la clase Calculator
     * Traducción: Constructor de Calculadora
     *
     * Crea una nueva calculadora con un valor inicial opcional.
     * Si no se proporciona un valor inicial, se usa 0 por defecto.
     */
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    /**
     * Suma un número al valor acumulado.
     * Traducción: Sumar
     *
     * Incrementa el valor acumulado sumando el número proporcionado.
     * Retorna this para permitir encadenamiento de métodos.
     */
    add(number) {
        this.value += number;
        return this;
    }

    /**
     * Resta un número del valor acumulado.
     * Traducción: Restar
     *
     * Decrementa el valor acumulado restando el número proporcionado.
     * Retorna this para permitir encadenamiento de métodos.
     */
    subtract(number) {
        this.value -= number;
        return this;
    }

    /**
     * Multiplica el valor acumulado por un número.
     * Traducción: Multiplicar
     *
     * Multiplica el valor acumulado por el número proporcionado.
     * Retorna this para permitir encadenamiento de métodos.
     */
    multiply(number) {
        this.value *= number;
        return this;
    }

    /**
     * Divide el valor acumulado por un número.
     * Traducción: Dividir
     *
     * Divide el valor acumulado por el número proporcionado.
     * Valida que no se intente dividir por cero.
     * Retorna this para permitir encadenamiento de métodos.
     */
    divide(number) {
        // Valida que no se intente dividir por cero
        if (number === 0) {
            throw new Error('Division by zero is not allowed');
        }
        
        this.value /= number;
        return this;
    }

    /**
     * Resetea el valor acumulado a cero.
     * Traducción: Limpiar
     *
     * Establece el valor acumulado en 0, permitiendo empezar de nuevo.
     * Retorna this para permitir encadenamiento de métodos.
     */
    clear() {
        this.value = 0;
        return this;
    }

    /**
     * Obtiene el valor acumulado actual sin modificarlo.
     * Traducción: Obtener Valor
     *
     * Retorna el valor acumulado sin realizar ninguna modificación.
     */
    getValue() {
        return this.value;
    }
}

module.exports = {
    Calculator
};

