# Traveling Salesman Problem (TSP)

**Dificultad:** EXPERT  
**Categoría:** Programación Dinámica, Optimización Combinatoria  
**Tiempo estimado:** 90-120 minutos

## 📋 Descripción

Implementa una solución para el problema del viajante de comercio (TSP) usando programación dinámica. El TSP consiste en encontrar la ruta más corta que visite cada ciudad exactamente una vez y regrese a la ciudad de origen.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el problema NP-completo del TSP
- [ ] Aprender técnicas de programación dinámica
- [ ] Practicar optimización combinatoria
- [ ] Comprender máscaras de bits para representar subconjuntos

## 📝 Enunciado

Implementa la función `tsp` que tome una matriz de distancias entre ciudades y devuelva la distancia mínima de la ruta óptima del TSP.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
distances = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];

// Output esperado
80;

// Explicación
// Ruta óptima: 0 -> 1 -> 3 -> 2 -> 0
// Distancia: 10 + 25 + 30 + 15 = 80
```

## 🔍 Casos de Prueba

| Distancias | Output Esperado | Explicación            |
| ---------- | --------------- | ---------------------- |
| Matriz 4x4 | 80              | Ruta óptima encontrada |
| Matriz 3x3 | 15              | TSP pequeño            |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa programación dinámica con estado (nodo_actual, conjunto_visitado).

</details>

<details>
<summary>💡 Pista 2</summary>

Representa el conjunto de ciudades visitadas usando máscaras de bits.

</details>

<details>
<summary>💡 Pista 3</summary>

Para cada subconjunto de ciudades, encuentra el costo mínimo visitando todas y regresando al origen.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `tsp`
3. Ejecuta los tests: `npm test traveling-salesman`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Traveling Salesman Problem](https://en.wikipedia.org/wiki/Traveling_salesman_problem)
- [Dynamic Programming for TSP](https://www.geeksforgeeks.org/traveling-salesman-problem-using-dynamic-programming/)

---

**💡 Tip:** Este es uno de los problemas más famosos en ciencias de la computación. La solución exacta tiene complejidad O(n²2ⁿ), por lo que solo es práctica para instancias pequeñas.
