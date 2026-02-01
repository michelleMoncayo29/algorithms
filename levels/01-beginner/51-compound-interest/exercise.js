/**
 * Calculadora de Interés Compuesto
 *
 * Descripción: Calcula el interés compuesto, valor futuro y pagos de préstamos.
 * Dificultad: BEGINNER
 *
 * @param {number} principal - Capital inicial (debe ser mayor que 0)
 * @param {number} rate - Tasa de interés anual como decimal (ej: 0.05 para 5%)
 * @param {number} time - Tiempo en años (debe ser mayor que 0)
 * @param {number} compoundFrequency - Frecuencia de capitalización por año (1=anual, 12=mensual, 365=daily)
 * @returns {number} Valor futuro con interés compuesto
 *
 * Ejemplo:
 * calculateCompoundInterest(1000, 0.05, 5, 12) // Calcula interés compuesto mensual por 5 años
 */

function calculateCompoundInterest(
  principal,
  rate,
  time,
  compoundFrequency = 1
) {
  // 1. Validaciones (Principio Fail Fast)
  if (typeof principal !== 'number' || isNaN(principal) || principal < 0) {
    throw new Error('Principal must be a non-negative number');
  }
  if (typeof rate !== 'number' || isNaN(rate) || rate < 0) {
    throw new Error('Rate must be a non-negative number');
  }
  if (typeof time !== 'number' || isNaN(time) || time < 0) {
    throw new Error('Time must be a non-negative number');
  }
  if (typeof compoundFrequency !== 'number' || compoundFrequency <= 0) {
    throw new Error('Compound frequency must be a positive number');
  }

  // 2. Lógica Matemática
  // Fórmula: A = P * (1 + r/n)^(n*t)
  const amount = principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * time);

  // 3. Redondeo a 2 decimales
  return Math.round(amount * 100) / 100;
}

/**
 * Calcula el valor futuro de una inversión con depósitos periódicos.
 *
 * @param {number} initialDeposit - Depósito inicial
 * @param {number} monthlyDeposit - Depósito mensual
 * @param {number} rate - Tasa de interés anual como decimal
 * @param {number} years - Número de años
 * @returns {number} Valor futuro total
 *
 * Ejemplo:
 * calculateFutureValueWithDeposits(1000, 100, 0.05, 10) // Inversión inicial + depósitos mensuales
 */
function calculateFutureValueWithDeposits(
  initialDeposit,
  monthlyDeposit,
  rate,
  years
) {
  // 1. Validaciones
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

  // 2. Cálculo del interés del depósito inicial (Capitalización mensual n=12)
  const futureValueInitial = calculateCompoundInterest(initialDeposit, rate, years, 12);

  // 3. Cálculo del valor futuro de los depósitos mensuales (Anualidad)
  let futureValueDeposits = 0;

  if (rate === 0) {
    // Si no hay interés, es simplemente la suma de los depósitos
    futureValueDeposits = monthlyDeposit * 12 * years;
  } else {
    // Fórmula de anualidad ordinaria: FV = PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const n = 12; // Mensual
    const monthlyRate = rate / n;
    const totalPayments = n * years;
    
    const growthFactor = (Math.pow(1 + monthlyRate, totalPayments) - 1) / monthlyRate;
    futureValueDeposits = monthlyDeposit * growthFactor;
  }

  // 4. Resultado final
  const total = futureValueInitial + futureValueDeposits;

  return Math.round(total * 100) / 100;
}

module.exports = {
  calculateCompoundInterest,
  calculateFutureValueWithDeposits,
};
