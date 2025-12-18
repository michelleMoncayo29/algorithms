# Calculadora Científica Básica

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Estado Interno, Validación de Datos  
**Tiempo estimado:** 20-25 minutos

## 📦 Contexto

Necesitas crear una calculadora básica que mantenga un valor acumulado y permita realizar operaciones matemáticas básicas (suma, resta, multiplicación, división). La calculadora debe validar las operaciones y manejar casos especiales como la división por cero. Este ejercicio te ayudará a practicar el manejo de estado interno en clases y la validación de operaciones matemáticas.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir una clase con estado interno (valor acumulado)
- [ ] Implementar métodos que modifican el estado interno
- [ ] Validar operaciones matemáticas (especialmente división por cero)
- [ ] Implementar métodos que consultan el estado sin modificarlo
- [ ] Manejar casos especiales y errores
- [ ] Practicar el uso de métodos que retornan valores para permitir encadenamiento

## 📝 Enunciado Detallado

Implementa la clase `Calculator` en `exercise.js`:

### Clase `Calculator`

- **Constructor**: Recibe un parámetro opcional:
  - `initialValue` (number, opcional): Valor inicial de la calculadora. Default: 0
  - El valor inicial se asigna a una propiedad interna `value`

- **Propiedad**:
  - `value` (number): Valor acumulado actual de la calculadora

- **Método `add(number)`** - Sumar:
  - Recibe un parámetro `number` (number): número a sumar
  - Suma el número al valor acumulado (`this.value`)
  - Retorna `this` (la instancia) para permitir encadenamiento de métodos
  - **No valida** si el número es válido (puede aceptar cualquier número)

- **Método `subtract(number)`** - Restar:
  - Recibe un parámetro `number` (number): número a restar
  - Resta el número del valor acumulado (`this.value`)
  - Retorna `this` (la instancia) para permitir encadenamiento de métodos
  - **No valida** si el número es válido

- **Método `multiply(number)`** - Multiplicar:
  - Recibe un parámetro `number` (number): número por el cual multiplicar
  - Multiplica el valor acumulado por el número
  - Retorna `this` (la instancia) para permitir encadenamiento de métodos
  - **No valida** si el número es válido

- **Método `divide(number)`** - Dividir:
  - Recibe un parámetro `number` (number): número por el cual dividir
  - **Debe validar** que el número no sea 0
  - Lanza `"Division by zero is not allowed"` si se intenta dividir por cero
  - Divide el valor acumulado por el número
  - Retorna `this` (la instancia) para permitir encadenamiento de métodos
  - **No valida** otros casos (puede aceptar números negativos, decimales, etc.)

- **Método `clear()`** - Limpiar/Resetear:
  - No recibe parámetros
  - Establece el valor acumulado en 0
  - Retorna `this` (la instancia) para permitir encadenamiento de métodos

- **Método `getValue()`** - Obtener valor:
  - No recibe parámetros
  - Retorna el valor acumulado actual sin modificarlo
  - Este es un método de solo lectura

## 💡 Ejemplos

### Ejemplo 1 - Operaciones básicas

```javascript
const calc = new Calculator(10);
calc.add(5);        // 15
calc.subtract(3);   // 12
calc.multiply(2);   // 24
calc.divide(4);     // 6
console.log(calc.getValue()); // 6
```

### Ejemplo 2 - Encadenamiento (usando retornos)

```javascript
const calc = new Calculator();
const result = calc.add(10).subtract(3).multiply(2).getValue();
console.log(result); // 14
```

### Ejemplo 3 - Limpiar y empezar de nuevo

```javascript
const calc = new Calculator(100);
calc.add(50);           // 150
calc.subtract(30);      // 120
console.log(calc.getValue()); // 120

calc.clear();           // 0
calc.add(25);           // 25
console.log(calc.getValue()); // 25
```

### Ejemplo 4 - Valor inicial personalizado

```javascript
const calc = new Calculator(5);
console.log(calc.getValue()); // 5

calc.add(10);           // 15
console.log(calc.getValue()); // 15
```

### Ejemplo 5 - Validación de división por cero

```javascript
const calc = new Calculator(100);
try {
    calc.divide(0);
} catch (error) {
    console.log(error.message); // "Division by zero is not allowed"
}
console.log(calc.getValue()); // 100 (el valor no cambió)
```

### Ejemplo 6 - Números decimales

```javascript
const calc = new Calculator();
calc.add(10.5);         // 10.5
calc.multiply(2);       // 21
calc.divide(3);         // 7
console.log(calc.getValue()); // 7
```

### Ejemplo 7 - Números negativos

```javascript
const calc = new Calculator(10);
calc.add(-5);           // 5
calc.multiply(-2);      // -10
calc.subtract(-3);      // -7
console.log(calc.getValue()); // -7
```

## ⚙️ Restricciones y Reglas

- El método `divide()` **DEBE** validar división por cero y lanzar el error exacto especificado
- Los métodos `add()`, `subtract()`, `multiply()` retornan el nuevo valor para permitir encadenamiento
- Los métodos modifican el estado interno (`this.value`)
- `getValue()` y `clear()` también retornan valores (aunque `clear()` siempre retorna 0)
- El valor inicial por defecto es 0 si no se proporciona

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Crear calculadora con valor inicial | `new Calculator(10)` | `value = 10` | Caso básico |
| Crear calculadora sin valor inicial | `new Calculator()` | `value = 0` | Caso básico |
| Sumar números | `calc.add(5)` | Incrementa valor en 5 | Caso básico |
| Restar números | `calc.subtract(3)` | Decrementa valor en 3 | Caso básico |
| Multiplicar números | `calc.multiply(2)` | Multiplica valor por 2 | Caso básico |
| Dividir números | `calc.divide(4)` | Divide valor por 4 | Caso básico |
| Dividir por cero | `calc.divide(0)` | Error "Division by zero is not allowed" | Validación |
| Limpiar calculadora | `calc.clear()` | `value = 0` | Caso básico |
| Obtener valor | `calc.getValue()` | Retorna valor actual | Caso básico |
| Números decimales | `calc.add(10.5)` | Funciona correctamente | Edge case |
| Números negativos | `calc.add(-5)` | Funciona correctamente | Edge case |
| Encadenamiento | `calc.add(5).multiply(2)` | Funciona correctamente | Caso básico |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Constructor</summary>

El constructor debe aceptar un parámetro opcional con valor por defecto 0:
```javascript
constructor(initialValue = 0) {
    this.value = initialValue;
}
```

</details>

<details>
<summary>💡 Pista 2 – Métodos de operación</summary>

Los métodos modifican `this.value` y retornan el nuevo valor:
```javascript
add(number) {
    this.value += number;
    return this.value;
}
```

</details>

<details>
<summary>💡 Pista 3 – Validación de división</summary>

Valida antes de dividir:
```javascript
divide(number) {
    if (number === 0) {
        throw new Error('Division by zero is not allowed');
    }
    this.value /= number;
    return this.value;
}
```

</details>

<details>
<summary>💡 Pista 4 – Método clear</summary>

El método `clear()` establece el valor en 0:
```javascript
clear() {
    this.value = 0;
    return this.value;
}
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa el constructor con valor inicial opcional
2. Implementa `getValue()` para consultar el valor
3. Implementa `add()` y `subtract()` (más simples)
4. Implementa `multiply()` y `divide()` (con validación en divide)
5. Implementa `clear()` para resetear
6. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] El método `divide()` valida división por cero y lanza el error exacto
- [ ] Todos los métodos retornan el valor acumulado (excepto `getValue()` que retorna el valor sin modificarlo)
- [ ] El constructor acepta un valor inicial opcional (default: 0)
- [ ] `clear()` establece el valor en 0 y lo retorna
- [ ] Los métodos modifican correctamente el estado interno
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa la clase `Calculator` con todos los métodos requeridos
3. Ejecuta los tests con `npm test` o `npm run test -- 30-calculator`
4. Asegúrate de validar la división por cero correctamente

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Default Parameters - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [Error Object - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error)

---

**💡 Tip:** Empieza implementando el constructor y `getValue()`, luego los métodos de operación más simples (add, subtract) y finalmente los más complejos (multiply, divide con validación). Recuerda que los métodos deben retornar el valor para permitir encadenamiento.

