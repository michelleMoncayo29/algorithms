# Solución: Count Vowels

Esta carpeta contiene la implementación de referencia para el ejercicio "Count Vowels".

## Solución Principal

La solución utiliza un enfoque iterativo simple:

1. **Iteración**: Recorre cada carácter de la string
2. **Normalización**: Convierte cada carácter a minúscula para facilitar la comparación
3. **Verificación**: Comprueba si el carácter es una vocal (a, e, i, o, u)
4. **Conteo**: Incrementa un contador cuando encuentra una vocal

## Alternativas de Implementación

El archivo `solution.js` incluye varias implementaciones alternativas:

- **Básica**: Uso de condicionales if individuales
- **Con includes()**: Uso del método `includes()` para verificar vocales
- **Con for...of**: Iteración moderna usando `for...of`
- **Funcional**: Uso de `reduce()` para un enfoque más funcional

## Complejidad

- **Tiempo**: O(n) donde n es la longitud de la string
- **Espacio**: O(1) - espacio constante independiente del input

## Conceptos Clave

- Manipulación de strings
- Iteración sobre caracteres
- Comparación de caracteres
- Uso de condicionales
- Conteo y acumulación
