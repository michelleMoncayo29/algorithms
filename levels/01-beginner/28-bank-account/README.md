# Sistema de Cuenta Bancaria

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Programación Orientada a Objetos, Validación de Datos  
**Tiempo estimado:** 20-25 minutos

## 📦 Contexto

El banco *SeguroBank* necesita un sistema básico para gestionar cuentas bancarias de sus clientes. Como desarrollador, debes implementar la clase `BankAccount` que permita crear cuentas, realizar depósitos, retiros y consultar el saldo. El ejercicio refuerza el uso de constructores, métodos de instancia, validaciones básicas y el manejo del estado interno de un objeto.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir una clase con constructor y métodos de instancia
- [ ] Aplicar validaciones básicas en los métodos (saldo suficiente, valores positivos)
- [ ] Manejar el estado interno de un objeto (saldo de la cuenta)
- [ ] Practicar el uso de métodos que modifican y consultan propiedades
- [ ] Implementar validaciones que lancen errores descriptivos (Fail Fast)

## 📝 Enunciado Detallado

Implementa la clase `BankAccount` en `exercise.js` siguiendo la guía pedagógica del repositorio:

### Clase `BankAccount`

- **Constructor**: Recibe dos parámetros:
  - `accountHolder` (string): Nombre del titular de la cuenta (no puede estar vacío)
  - `initialBalance` (number, opcional): Saldo inicial de la cuenta (default: 0, no puede ser negativo)
  - Debe validar los parámetros y lanzar errores descriptivos con mensajes exactos:
    - `"Account holder name is required"` si el nombre está vacío o es solo espacios
    - `"Initial balance cannot be negative"` si el saldo inicial es negativo

- **Propiedades**:
  - `accountHolder` (string): Nombre del titular
  - `balance` (number): Saldo actual de la cuenta

- **Método `deposit(amount)`** - Depositar dinero:
  - Recibe un parámetro `amount` (number): cantidad a depositar
  - Debe validar que el monto sea un número positivo
  - Lanza `"Deposit amount must be positive"` si el monto es inválido
  - Incrementa el saldo de la cuenta
  - Retorna el nuevo saldo después del depósito

- **Método `withdraw(amount)`** - Retirar dinero:
  - Recibe un parámetro `amount` (number): cantidad a retirar
  - Debe validar que el monto sea un número positivo
  - Lanza `"Withdrawal amount must be positive"` si el monto es inválido
  - Debe verificar que haya saldo suficiente
  - Lanza `"Insufficient funds"` si no hay saldo suficiente
  - Decrementa el saldo de la cuenta
  - Retorna el nuevo saldo después del retiro

- **Método `getBalance()`** - Obtener saldo actual:
  - No recibe parámetros
  - Retorna el saldo actual de la cuenta

- **Método `getAccountInfo()`** - Obtener información de la cuenta:
  - No recibe parámetros
  - Retorna un string con el formato: `"Account holder: [nombre], Balance: $[saldo]"`
  - El saldo debe mostrarse con exactamente 2 decimales

## 💡 Ejemplos

### Ejemplo 1

```javascript
const account = new BankAccount('Juan Pérez', 1000);
console.log(account.getBalance()); // 1000
console.log(account.getAccountInfo()); // "Account holder: Juan Pérez, Balance: $1000.00"
```

### Ejemplo 2

```javascript
const account = new BankAccount('María García', 500);
account.deposit(250);
console.log(account.getBalance()); // 750

account.withdraw(100);
console.log(account.getBalance()); // 650
console.log(account.getAccountInfo()); // "Account holder: María García, Balance: $650.00"
```

### Ejemplo 3

```javascript
const account = new BankAccount('Carlos López');
console.log(account.getBalance()); // 0
console.log(account.getAccountInfo()); // "Account holder: Carlos López, Balance: $0.00"

account.deposit(100);
account.deposit(50);
console.log(account.getBalance()); // 150

account.withdraw(75);
console.log(account.getBalance()); // 75
```

### Ejemplo 4 - Validaciones

```javascript
// Error: nombre vacío
try {
  new BankAccount('', 100);
} catch (error) {
  console.log(error.message); // "Account holder name is required"
}

// Error: saldo inicial negativo
try {
  new BankAccount('Juan', -100);
} catch (error) {
  console.log(error.message); // "Initial balance cannot be negative"
}

// Error: depósito inválido
const account = new BankAccount('Juan', 100);
try {
  account.deposit(-50);
} catch (error) {
  console.log(error.message); // "Deposit amount must be positive"
}

// Error: retiro sin fondos
const account2 = new BankAccount('María', 50);
try {
  account2.withdraw(100);
} catch (error) {
  console.log(error.message); // "Insufficient funds"
}
```

## ⚙️ Restricciones y Reglas

- No utilices librerías externas; solo JavaScript estándar
- Los mensajes de error anteriores son obligatorios para facilitar la retroalimentación automatizada
- Mantén los métodos pequeños y expresivos
- El saldo debe manejarse con precisión numérica (considera usar `toFixed()` para mostrar 2 decimales)
- Lanza errores inmediatamente cuando los datos no cumplan con los criterios (Fail Fast)
- Los montos deben ser números positivos

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Crear cuenta con saldo inicial | `new BankAccount('Juan', 1000)` | Saldo inicial = 1000 | Caso básico |
| Crear cuenta sin saldo inicial | `new BankAccount('María')` | Saldo inicial = 0 | Caso básico |
| Depositar dinero | `account.deposit(250)` | Incrementa saldo en 250 | Caso básico |
| Retirar dinero | `account.withdraw(100)` | Decrementa saldo en 100 | Caso básico |
| Obtener información | `account.getAccountInfo()` | String con formato específico | Caso básico |
| Validación nombre vacío | `new BankAccount('')` | Error "Account holder name is required" | Validación |
| Validación saldo negativo | `new BankAccount('Juan', -100)` | Error "Initial balance cannot be negative" | Validación |
| Validación depósito negativo | `account.deposit(-50)` | Error "Deposit amount must be positive" | Validación |
| Validación retiro negativo | `account.withdraw(-50)` | Error "Withdrawal amount must be positive" | Validación |
| Retiro sin fondos | `account.withdraw(1000)` con saldo 500 | Error "Insufficient funds" | Validación |
| Retiro exacto del saldo | `account.withdraw(500)` con saldo 500 | Saldo final = 0 | Edge case |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Constructor</summary>

Valida cada argumento en el constructor antes de asignarlo. Para el nombre usa `typeof accountHolder === 'string' && accountHolder.trim().length > 0`. Para el saldo inicial, verifica que sea un número y que no sea negativo.

</details>

<details>
<summary>💡 Pista 2 – Métodos de depósito y retiro</summary>

Ambos métodos deben validar que el monto sea positivo antes de realizar la operación. El método `withdraw` además debe verificar que el saldo sea suficiente comparando `this.balance >= amount`.

</details>

<details>
<summary>💡 Pista 3 – Formato del saldo</summary>

Para mostrar el saldo con 2 decimales en `getAccountInfo()`, puedes usar `this.balance.toFixed(2)` que retorna un string con el formato deseado.

</details>

## 🧭 Pasos Sugeridos

1. Implementa el constructor con validaciones básicas
2. Implementa el método `getBalance()` para consultar el saldo
3. Implementa el método `deposit()` con validación del monto
4. Implementa el método `withdraw()` con validación del monto y saldo suficiente
5. Implementa el método `getAccountInfo()` con formato adecuado
6. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden con los solicitados
- [ ] Los métodos validan correctamente los parámetros recibidos
- [ ] El saldo se muestra con 2 decimales en `getAccountInfo()`
- [ ] Los nombres de variables y métodos están en inglés y son expresivos
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa la clase `BankAccount` requerida
3. Ejecuta los tests con `npm test` o `npm run test -- 28-bank-account`
4. Opcional: ejecuta manualmente algunos ejemplos del README

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Object-Oriented Programming in JS](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object-oriented_JS)
- [Number.prototype.toFixed()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

---

**💡 Tip:** Empieza implementando el constructor y el método `getBalance()`, luego prueba los métodos de depósito y retiro. Recuerda validar siempre antes de modificar el estado interno de la cuenta.

