# Ejercicio 21: Conversor de Sistemas Numéricos

## Descripción

Este ejercicio te introduce al mundo de los sistemas numéricos, un concepto fundamental en programación y matemáticas. Aprenderás a convertir números entre diferentes bases (decimal, binario, hexadecimal, octal) y validar su formato correctamente.

## Objetivos de Aprendizaje

- Comprender sistemas numéricos posicionales
- Dominar algoritmos de conversión entre bases
- Implementar validación de datos en diferentes formatos
- Aprender representaciones binarias y hexadecimales
- Trabajar con strings y operaciones matemáticas básicas

## Conceptos Clave

### ¿Qué es un Sistema Numérico?

Un sistema numérico es una forma de representar cantidades usando símbolos (dígitos) y reglas de combinación. La base determina cuántos símbolos diferentes se pueden usar.

**Principio fundamental:** Cada posición tiene un peso igual a `base^posición`

### Bases Numéricas Comunes

#### Decimal (Base 10)
- **Símbolos:** 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- **Uso:** Sistema humano estándar
- **Ejemplo:** `255` = 2×10² + 5×10¹ + 5×10⁰

#### Binario (Base 2)
- **Símbolos:** 0, 1
- **Uso:** Computadoras, sistemas digitales
- **Ejemplo:** `1010` = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 10

#### Hexadecimal (Base 16)
- **Símbolos:** 0-9, A-F
- **Uso:** Representación compacta en programación
- **Ejemplo:** `FF` = 15×16¹ + 15×16⁰ = 255

#### Octal (Base 8)
- **Símbolos:** 0-7
- **Uso:** Sistemas antiguos, permisos de archivos Unix
- **Ejemplo:** `377` = 3×8² + 7×8¹ + 7×8⁰ = 255

## Funciones a Implementar

### 1. `decimalToBinary(decimal)`

Convierte un número decimal a su representación binaria.

**Parámetros:**
- `decimal` (number): Número decimal a convertir

**Retorna:** String binario o `null` si es inválido

**Ejemplo:**
```javascript
decimalToBinary(5)    // "101"
decimalToBinary(10)   // "1010"
decimalToBinary(255)  // "11111111"
decimalToBinary(0)    // "0"
```

**Algoritmo:**
1. Si el número es 0, retornar "0"
2. Dividir repetidamente por 2
3. Tomar los restos (0 o 1) de derecha a izquierda
4. Construir el string resultante

**Ejemplo paso a paso para 10:**
```
10 ÷ 2 = 5 residuo 0
5 ÷ 2 = 2 residuo 1
2 ÷ 2 = 1 residuo 0
1 ÷ 2 = 0 residuo 1

Leyendo de abajo arriba: 1010
```

### 2. `binaryToDecimal(binary)`

Convierte un número binario a su representación decimal.

**Parámetros:**
- `binary` (string): Número binario a convertir

**Retorna:** Número decimal o `null` si es inválido

**Ejemplo:**
```javascript
binaryToDecimal("101")        // 5
binaryToDecimal("1010")       // 10
binaryToDecimal("11111111")   // 255
binaryToDecimal("0")          // 0
```

**Algoritmo:**
1. Validar que solo contenga 0s y 1s
2. Leer de derecha a izquierda
3. Multiplicar cada dígito por 2^posición
4. Sumar todos los resultados

**Ejemplo paso a paso para "1010":**
```
Posición:  3  2  1  0
Dígito:    1  0  1  0
Valor:     1×2³ + 0×2² + 1×2¹ + 0×2⁰
         = 8 + 0 + 2 + 0
         = 10
```

### 3. `decimalToHex(decimal)`

Convierte un número decimal a su representación hexadecimal.

**Parámetros:**
- `decimal` (number): Número decimal a convertir

**Retorna:** String hexadecimal o `null` si es inválido

**Ejemplo:**
```javascript
decimalToHex(10)    // "A"
decimalToHex(15)    // "F"
decimalToHex(255)   // "FF"
decimalToHex(0)     // "0"
```

**Mapeo especial:**
- 10 → A
- 11 → B
- 12 → C
- 13 → D
- 14 → E
- 15 → F

**Algoritmo:**
Similar a `decimalToBinary`, pero dividiendo por 16

### 4. `hexToDecimal(hex)`

Convierte un número hexadecimal a su representación decimal.

**Parámetros:**
- `hex` (string): Número hexadecimal a convertir

**Retorna:** Número decimal o `null` si es inválido

**Ejemplo:**
```javascript
hexToDecimal("A")      // 10
hexToDecimal("FF")     // 255
hexToDecimal("FFFF")   // 65535
hexToDecimal("0")      // 0
```

**Nota:** Debe soportar mayúsculas y minúsculas (A-F y a-f)

### 5. `validateNumberInBase(number, base)`

Valida si un número es válido en una base específica.

**Parámetros:**
- `number` (string): Número a validar
- `base` (number): Base numérica (2, 8, 10, 16)

**Retorna:** `true` si es válido, `false` en caso contrario

**Ejemplo:**
```javascript
validateNumberInBase("101", 2)     // true (binario válido)
validateNumberInBase("1012", 2)    // false (tiene un 2)
validateNumberInBase("FF", 16)     // true (hex válido)
validateNumberInBase("GH", 16)     // false (G no es válido)
```

**Reglas de validación:**
- Base 2: solo 0-1
- Base 8: solo 0-7
- Base 10: solo 0-9
- Base 16: 0-9 y A-F (case insensitive)

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Solo enteros no negativos**: No soportar negativos ni decimales
2. **Números válidos en base**: Verificar que los caracteres sean permitidos
3. **Tipos correctos**: Validar que los parámetros sean del tipo esperado
4. **Case insensitive**: Hexadecimal debe aceptar A-F y a-f
5. **Strings vacíos**: Retornar null para inputs vacíos

### Casos Edge

- **0**: Retornar "0" en todas las conversiones
- **Números grandes**: Probar con 255, 65535, etc.
- **Todos los dígitos a 1**: 255 en binario es "11111111"
- **Conversión ida y vuelta**: Un número debe poder convertir y volver
- **Caracteres inválidos**: Rechazar números con caracteres no permitidos
- **Bases no soportadas**: Solo 2, 8, 10, 16

## Ejemplos de Uso

### Ejemplo 1: Conversiones Básicas

```javascript
// Decimal a binario
console.log(decimalToBinary(5));    // "101"
console.log(decimalToBinary(10));   // "1010"

// Binario a decimal
console.log(binaryToDecimal("101"));    // 5
console.log(binaryToDecimal("1010"));   // 10

// Decimal a hexadecimal
console.log(decimalToHex(255));     // "FF"
console.log(decimalToHex(15));      // "F"

// Hexadecimal a decimal
console.log(hexToDecimal("FF"));    // 255
console.log(hexToDecimal("A"));     // 10
```

### Ejemplo 2: Validación

```javascript
// Validar números
console.log(validateNumberInBase("1010", 2));    // true
console.log(validateNumberInBase("ABC", 16));    // true
console.log(validateNumberInBase("123", 16));    // true
console.log(validateNumberInBase("GHI", 16));    // false
```

### Ejemplo 3: Conversiones de Ida y Vuelta

```javascript
function convertAndBack(number) {
    // Convertir a binario y de vuelta
    const binary = decimalToBinary(number);
    const backToDecimal = binaryToDecimal(binary);
    
    console.log(`${number} → ${binary} → ${backToDecimal}`);
    return number === backToDecimal;
}

convertAndBack(255);  // true
convertAndBack(1024); // true
```

### Ejemplo 4: Tabla de Conversiones

```javascript
function printConversionTable(maxNumber) {
    console.log('Decimal | Binario      | Hexadecimal');
    console.log('--------|--------------|------------');
    
    for (let i = 0; i <= maxNumber; i++) {
        const bin = decimalToBinary(i);
        const hex = decimalToHex(i);
        console.log(`${i.toString().padStart(7)} | ${bin.padStart(12)} | ${hex}`);
    }
}

printConversionTable(15);
// Decimal | Binario      | Hexadecimal
// --------|--------------|------------
//       0 |            0 | 0
//       1 |            1 | 1
//       2 |           10 | 2
//     ...
//      15 |         1111 | F
```

## Consejos para la Implementación

### 1. Conversión Decimal a Otra Base

```javascript
function decimalToBase(decimal, base) {
    if (decimal === 0) return "0";
    
    const digits = "0123456789ABCDEF";
    let result = "";
    let num = decimal;
    
    while (num > 0) {
        result = digits[num % base] + result;
        num = Math.floor(num / base);
    }
    
    return result;
}
```

### 2. Conversión de Otra Base a Decimal

```javascript
function baseToDecimal(number, base) {
    let result = 0;
    const len = number.length;
    
    for (let i = 0; i < len; i++) {
        const char = number[len - 1 - i]; // Leer de derecha
        const value = parseInt(char, base);
        result += value * Math.pow(base, i);
    }
    
    return result;
}
```

### 3. Validación con Expresiones Regulares

```javascript
// Binario: solo 0-1
const isValidBinary = /^[01]+$/.test(number);

// Octal: solo 0-7
const isValidOctal = /^[0-7]+$/.test(number);

// Decimal: solo 0-9
const isValidDecimal = /^[0-9]+$/.test(number);

// Hexadecimal: 0-9 y A-F
const isValidHex = /^[0-9A-F]+$/i.test(number);
```

### 4. Mapeo de Caracteres

```javascript
// Crear mapa de caracteres
const HEX_VALUES = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15
};
```

### 5. Manejo de Errores

```javascript
// Validar tipos
if (typeof decimal !== 'number') return null;
if (typeof binary !== 'string') return null;

// Validar rangos
if (decimal < 0 || !Number.isInteger(decimal)) return null;

// Validar formato
if (!/^[01]+$/.test(binary)) return null;
```

## Aplicaciones en el Mundo Real

### Programación

- **Representación de colores**: RGB en hexadecimal (#FF0000)
- **Permisos de archivos**: Octal para permisos Unix (755)
- **Direcciones IP**: Binario para subnet masks
- **Encoding**: Representación de caracteres

### Criptografía

- **Encriptación**: Algoritmos usan operaciones binarias
- **Hashing**: Resultados en hexadecimal
- **Claves**: Generación y validación

### Sistemas y Hardware

- **Compiladores**: Conversión de direcciones
- **Microcontroladores**: Comunicación en binario
- **Redes**: Direcciones MAC en hexadecimal
- **Debugging**: Valores de memoria

### Desarrollo Web

- **CSS Colors**: Hexadecimal para colores
- **Encoding**: Base64, UTF-8
- **Cookies**: Valores en diferentes bases
- **URLs**: Encoding de caracteres especiales

## Tabla de Referencia Rápida

| Decimal | Binario | Hexadecimal | Significado |
|---------|---------|-------------|-------------|
| 0 | 0 | 0 | Cero |
| 1 | 1 | 1 | Uno |
| 5 | 101 | 5 | Cinco |
| 10 | 1010 | A | Diez |
| 15 | 1111 | F | Quince |
| 16 | 10000 | 10 | Dieciséis |
| 255 | 11111111 | FF | Max byte |
| 256 | 100000000 | 100 | 256 |
| 1024 | 10000000000 | 400 | 1K |

## Preguntas de Reflexión

1. ¿Por qué las computadoras usan binario?
2. ¿Qué ventaja tiene hexadecimal sobre binario?
3. ¿Cómo se representan los números negativos en binario?
4. ¿Qué es la aritmética modular y cómo ayuda en las conversiones?
5. ¿Por qué 0 tiene la misma representación en todas las bases?

## Recursos Adicionales

- [Sistemas Numéricos en Wikipedia](https://es.wikipedia.org/wiki/Sistema_de_numeraci%C3%B3n)
- [Binario y Hexadecimal](https://es.wikipedia.org/wiki/Sistema_binario)
- [JavaScript parseInt() y toString()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Two's Complement](https://es.wikipedia.org/wiki/Complemento_a_dos) - Representación de negativos
- [IEEE 754](https://es.wikipedia.org/wiki/IEEE_754) - Estándar de punto flotante

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Sistemas numéricos posicionales
- Algoritmos de conversión
- Validación de datos
- Manipulación de strings
- Operaciones matemáticas básicas
- Lógica de programación

## Próximos Pasos

Después de completar este ejercicio, podrías intentar:
- Agregar soporte para números negativos
- Implementar conversión a/desde octal
- Crear conversor universal (cualquier base 2-36)
- Implementar operaciones aritméticas en binario
- Agregar validación de overflow
- Crear interfaz visual para conversiones

