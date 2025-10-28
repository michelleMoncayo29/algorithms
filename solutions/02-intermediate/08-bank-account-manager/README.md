# Solución: Gestor de Cuenta Bancaria

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos una clase `BankAccount` que:
1. **Gestione el estado** de una cuenta bancaria (saldo, transacciones)
2. **Valide operaciones** financieras (depósitos, retiros)
3. **Mantenga historial** completo de transacciones
4. **Calcule intereses** simples sobre el saldo
5. **Maneje casos edge** (saldo insuficiente, montos inválidos)

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Constructor**: Inicializar estado de la cuenta
2. **Validación**: Verificar datos antes de procesar
3. **Actualización de estado**: Modificar saldo y registrar transacciones
4. **Manejo de errores**: Retornar `null` para operaciones inválidas
5. **Cálculos financieros**: Implementar fórmula de interés simple

### Complejidad
- **Tiempo**: O(1) para operaciones individuales, O(n) para historial
- **Espacio**: O(n) donde n es el número de transacciones

## 💻 Solución Implementada

```javascript
class BankAccount {
    constructor(accountNumber = "ACC-001") {
        this.balance = 0;
        this.transactions = [];
        this.accountNumber = accountNumber;
    }

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

    getBalance() {
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactions;
    }

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
```

## 🔄 Versiones Alternativas

### Versión con Validaciones Estrictas
```javascript
class BankAccountStrict extends BankAccount {
    deposit(amount) {
        // Validación más estricta
        if (!this._isValidAmount(amount)) {
            return null;
        }

        // Verificar límites de depósito (máximo $10,000 por transacción)
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

        // Verificar límites de retiro (máximo $5,000 por transacción)
        if (amount > 5000) {
            return null;
        }

        return super.withdraw(amount);
    }

    _isValidAmount(amount) {
        return typeof amount === 'number' && 
               amount > 0 && 
               !isNaN(amount) && 
               isFinite(amount);
    }
}
```

### Versión con Funcionalidades Extendidas
```javascript
class BankAccountExtended extends BankAccount {
    constructor(accountNumber = "ACC-001") {
        super(accountNumber);
        this.interestRate = 0;
    }

    setInterestRate(rate) {
        if (typeof rate !== 'number' || rate < 0 || isNaN(rate)) {
            return false;
        }
        this.interestRate = rate;
        return true;
    }

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
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Inicialización del Constructor**
```javascript
constructor(accountNumber = "ACC-001") {
    this.balance = 0;
    this.transactions = [];
    this.accountNumber = accountNumber;
}
```
- Inicializa el estado de la cuenta
- Permite personalizar el número de cuenta
- Establece valores por defecto

### 2. **Validación de Montos**
```javascript
if (typeof amount !== 'number' || amount <= 0 || isNaN(amount)) {
    return null;
}
```
- Verifica tipo de dato
- Asegura que sea positivo
- Maneja valores NaN

### 3. **Registro de Transacciones**
```javascript
const transaction = {
    type: 'deposit',
    amount: amount,
    balance: this.balance,
    timestamp: new Date()
};
this.transactions.push(transaction);
```
- Estructura consistente para transacciones
- Incluye timestamp automático
- Mantiene historial completo

### 4. **Validación de Saldo para Retiros**
```javascript
if (this.balance < amount) {
    return null;
}
```
- Previene sobregiros
- Mantiene integridad del saldo

### 5. **Cálculo de Interés Simple**
```javascript
const interest = (this.balance * rate * months) / (100 * 12);
```
- Fórmula matemática correcta
- Validación de parámetros
- Manejo de casos edge

## 🧪 Casos de Prueba Clave

### Operaciones Básicas
- `deposit(1000)` → Saldo: 1000, Transacción registrada
- `withdraw(300)` → Saldo: 700, Transacción registrada
- `getBalance()` → 700

### Validaciones
- `deposit(-100)` → null (monto negativo)
- `withdraw(500)` con saldo 300 → null (saldo insuficiente)
- `deposit(0)` → null (monto cero)

### Cálculo de Interés
- Saldo 1000, Tasa 5%, 12 meses → Interés: 50
- Saldo 2000, Tasa 10%, 6 meses → Interés: 100

### Casos Edge
- Múltiples operaciones secuenciales
- Operaciones con decimales
- Múltiples cuentas independientes

## 🚀 Optimizaciones Implementadas

### 1. **Validación Temprana**
- Verificamos datos antes de procesar
- Evitamos operaciones innecesarias
- Retornamos `null` inmediatamente para casos inválidos

### 2. **Estructura de Transacciones Consistente**
- Formato uniforme para todas las transacciones
- Timestamp automático
- Información completa del estado

### 3. **Manejo de Errores Robusto**
- Validación de tipos de datos
- Manejo de valores NaN e infinitos
- Casos edge cubiertos

### 4. **Extensibilidad**
- Versiones con validaciones estrictas
- Funcionalidades adicionales
- Fácil mantenimiento y modificación

## 📚 Conceptos Aplicados

1. **Programación Orientada a Objetos**: Clases, constructores, métodos
2. **Manejo de Estado**: Actualización de propiedades de instancia
3. **Validación de Datos**: Verificación de tipos y rangos
4. **Manejo de Arrays**: Historial de transacciones
5. **Cálculos Matemáticos**: Fórmula de interés simple
6. **Manejo de Fechas**: Timestamps automáticos
7. **Manejo de Errores**: Retorno de valores nulos

## 🎓 Lecciones Aprendidas

- **Validación temprana**: Es crucial verificar datos antes de procesar
- **Estado consistente**: Mantener integridad de los datos en todo momento
- **Registro completo**: El historial de transacciones es fundamental
- **Manejo de errores**: Retornar valores claros para casos inválidos
- **Extensibilidad**: Diseñar para futuras mejoras y funcionalidades

## 🔧 Funcionalidades Adicionales

### Estadísticas de Cuenta
```javascript
getAccountStats() {
    return {
        currentBalance: this.balance,
        totalDeposits: totalDeposits,
        totalWithdrawals: totalWithdrawals,
        transactionCount: this.transactions.length,
        depositCount: deposits.length,
        withdrawalCount: withdrawals.length
    };
}
```

### Filtrado de Transacciones
```javascript
getTransactionsByType(type) {
    return this.transactions.filter(t => t.type === type);
}
```

### Límites de Transacción
- Límite máximo de depósito por transacción
- Límite máximo de retiro por transacción
- Validación de tasas de interés máximas

---

**💡 Tip:** Esta solución demuestra cómo implementar un sistema bancario básico con todas las validaciones necesarias. Es un excelente ejemplo de programación orientada a objetos aplicada a un problema del mundo real, con manejo robusto de errores y estado consistente.
