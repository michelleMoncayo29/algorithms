# Gestor de Cuenta Bancaria (use classes)

**Dificultad:** INTERMEDIATE  
**Categoría:** Objetos, Validación de Datos, Manejo de Estado, Cálculos Financieros  
**Tiempo estimado:** 30-35 minutos

## 📋 Descripción

Crea un gestor de cuenta bancaria que permita realizar operaciones financieras básicas como depósitos, retiros, consulta de saldo, historial de transacciones y cálculo de intereses simples. El sistema debe validar todas las operaciones y mantener un registro completo de las transacciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar manejo de objetos y estado
- [ ] Implementar validación de datos financieros
- [ ] Trabajar con arrays para historial de transacciones
- [ ] Aprender cálculos financieros básicos (interés simple)
- [ ] Manejar casos edge (saldo insuficiente, montos inválidos)
- [ ] Implementar diferentes tipos de operaciones bancarias

## 📝 Enunciado

Implementa una clase `BankAccount` que gestione una cuenta bancaria con las siguientes funcionalidades:

### Estructura de la Cuenta
```javascript
{
  balance: 0,           // Saldo actual
  transactions: [],     // Historial de transacciones
  accountNumber: "ACC-001"  // Número de cuenta
}
```

### Métodos Requeridos

#### 1. `deposit(amount)`
- Agrega dinero a la cuenta
- Valida que el monto sea positivo
- Registra la transacción en el historial
- Retorna el nuevo saldo o `null` si es inválido

#### 2. `withdraw(amount)`
- Retira dinero de la cuenta
- Valida que el monto sea positivo y que haya saldo suficiente
- Registra la transacción en el historial
- Retorna el nuevo saldo o `null` si es inválido

#### 3. `getBalance()`
- Retorna el saldo actual de la cuenta

#### 4. `getTransactionHistory()`
- Retorna el array completo de transacciones

#### 5. `calculateInterest(rate, months)`
- Calcula interés simple sobre el saldo actual
- `rate`: Tasa de interés anual (en porcentaje, ej: 5 para 5%)
- `months`: Número de meses
- Fórmula: `Interés = (Saldo × Tasa × Meses) / (100 × 12)`
- Retorna el monto de interés calculado

## 💡 Ejemplos

### Ejemplo 1: Operaciones Básicas

```javascript
const account = new BankAccount();

// Depósito inicial
account.deposit(1000);
// Saldo: 1000, Transacción: {type: 'deposit', amount: 1000, balance: 1000}

// Retiro
account.withdraw(300);
// Saldo: 700, Transacción: {type: 'withdraw', amount: 300, balance: 700}

// Consulta de saldo
account.getBalance(); // 700
```

### Ejemplo 2: Cálculo de Interés

```javascript
const account = new BankAccount();
account.deposit(1000);

// Calcular interés del 5% anual por 12 meses
account.calculateInterest(5, 12);
// Interés = (1000 × 5 × 12) / (100 × 12) = 50
```

### Ejemplo 3: Validaciones

```javascript
const account = new BankAccount();

// Depósito inválido
account.deposit(-100); // null (monto negativo)

// Retiro sin saldo suficiente
account.withdraw(500); // null (saldo insuficiente)

// Retiro inválido
account.withdraw(-50); // null (monto negativo)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Saldo Inicial | Resultado Esperado | Explicación |
|-----------|------------|---------------|-------------------|-------------|
| deposit | 1000 | 0 | 1000 | Depósito válido |
| deposit | -100 | 0 | null | Monto negativo |
| deposit | 0 | 0 | null | Monto cero |
| withdraw | 300 | 1000 | 700 | Retiro válido |
| withdraw | 500 | 300 | null | Saldo insuficiente |
| withdraw | -50 | 1000 | null | Monto negativo |
| getBalance | - | 500 | 500 | Consulta de saldo |
| calculateInterest | 5, 12 | 1000 | 50 | Interés 5% anual por 12 meses |
| calculateInterest | 10, 6 | 2000 | 100 | Interés 10% anual por 6 meses |

## 📊 Estructura de Transacciones

Cada transacción se registra con la siguiente estructura:

```javascript
{
  type: 'deposit' | 'withdraw',
  amount: number,
  balance: number,
  timestamp: Date
}
```

### Ejemplo de Historial:
```javascript
[
  {
    type: 'deposit',
    amount: 1000,
    balance: 1000,
    timestamp: new Date('2024-01-01T10:00:00Z')
  },
  {
    type: 'withdraw',
    amount: 300,
    balance: 700,
    timestamp: new Date('2024-01-02T14:30:00Z')
  }
]
```

## 🧮 Fórmula de Interés Simple

```
Interés = (Saldo × Tasa × Meses) / (100 × 12)

Donde:
- Saldo: Saldo actual de la cuenta
- Tasa: Tasa de interés anual (en porcentaje)
- Meses: Número de meses
- 100: Para convertir porcentaje a decimal
- 12: Para convertir anual a mensual
```

### Ejemplos de Cálculo:
- **Saldo $1000, Tasa 5%, 12 meses:** `(1000 × 5 × 12) / (100 × 12) = 50`
- **Saldo $2000, Tasa 10%, 6 meses:** `(2000 × 10 × 6) / (100 × 12) = 100`
- **Saldo $500, Tasa 3%, 24 meses:** `(500 × 3 × 24) / (100 × 12) = 30`

## ⚠️ Validaciones Requeridas

### Depósitos
- El monto debe ser mayor que 0
- Debe ser un número válido
- Retorna `null` si es inválido

### Retiros
- El monto debe ser mayor que 0
- Debe ser un número válido
- El saldo debe ser suficiente
- Retorna `null` si es inválido

### Cálculo de Interés
- La tasa debe ser un número positivo
- Los meses deben ser un número positivo
- Retorna 0 si los parámetros son inválidos

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa un constructor para inicializar la cuenta con saldo 0, array de transacciones vacío y número de cuenta.

</details>

<details>
<summary>💡 Pista 2</summary>

Para validar montos, verifica que sean números positivos mayores que 0.

</details>

<details>
<summary>💡 Pista 3</summary>

Para retiros, verifica que el saldo actual sea mayor o igual al monto a retirar.

</details>

<details>
<summary>💡 Pista 4</summary>

Cada transacción debe incluir: tipo, monto, saldo resultante y timestamp.

</details>

<details>
<summary>💡 Pista 5</summary>

Para el cálculo de interés, usa la fórmula: `(balance * rate * months) / (100 * 12)`.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la clase `BankAccount` con todos los métodos
3. Ejecuta los tests: `npm test bank-account-manager`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Clases en JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Interés Simple - Wikipedia](https://es.wikipedia.org/wiki/Inter%C3%A9s_simple)
- [Validación de números en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates)
- [Manejo de fechas en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

**💡 Tip:** Este ejercicio simula un sistema bancario real y te ayudará a entender conceptos fundamentales de programación orientada a objetos, validación de datos y cálculos financieros básicos.
