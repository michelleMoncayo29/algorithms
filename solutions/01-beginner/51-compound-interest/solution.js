/**
 * SOLUCIÓN: Calculadora de Interés Compuesto
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function calculateCompoundInterest(principal, rate, time, compoundFrequency = 1) {
    // Validar que principal sea un número positivo
    if (typeof principal !== 'number' || principal <= 0) {
        throw new Error('Principal must be a positive number');
    }

    // Validar que rate sea un número no negativo
    if (typeof rate !== 'number' || rate < 0) {
        throw new Error('Rate must be a non-negative number');
    }

    // Validar que time sea un número positivo
    if (typeof time !== 'number' || time <= 0) {
        throw new Error('Time must be a positive number');
    }

    // Validar que compoundFrequency sea un número positivo
    if (typeof compoundFrequency !== 'number' || compoundFrequency <= 0) {
        throw new Error('Compound frequency must be a positive number');
    }

    // Aplicar la fórmula del interés compuesto: A = P * (1 + r/n)^(n*t)
    const amount = principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * time);

    // Redondear el resultado a 2 decimales
    return Math.round(amount * 100) / 100;
}

function calculateFutureValueWithDeposits(initialDeposit, monthlyDeposit, rate, years) {
    // Validar parámetros
    if (typeof initialDeposit !== 'number' || initialDeposit < 0) {
        throw new Error('Initial deposit must be a non-negative number');
    }
    if (typeof monthlyDeposit !== 'number' || monthlyDeposit < 0) {
        throw new Error('Monthly deposit must be a non-negative number');
    }
    if (typeof rate !== 'number' || rate < 0) {
        throw new Error('Rate must be a non-negative number');
    }
    if (typeof years !== 'number' || years < 0) {
        throw new Error('Years must be a non-negative number');
    }

    // Calcular el valor futuro del depósito inicial
    const futureValueInitial = calculateCompoundInterest(initialDeposit, rate, years, 12);

    // Calcular el valor futuro de los depósitos mensuales
    let futureValueDeposits = 0;
    
    if (rate === 0) {
        // Si la tasa es 0, simplemente suma los depósitos
        futureValueDeposits = monthlyDeposit * 12 * years;
    } else {
        // Fórmula de anualidad: FV = PMT * (((1 + r/n)^(n*t) - 1) / (r/n))
        const monthlyRate = rate / 12;
        const numberOfPayments = 12 * years;
        const futureValueFactor = (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / monthlyRate;
        futureValueDeposits = monthlyDeposit * futureValueFactor;
    }

    // Sumar ambos valores
    const total = futureValueInitial + futureValueDeposits;

    // Redondear a 2 decimales
    return Math.round(total * 100) / 100;
}

module.exports = {
    calculateCompoundInterest,
    calculateFutureValueWithDeposits
};

