# Two Sum

**Dificultad:** BEGINNER  
**Categoría:** Arrays, Hash Maps  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Dado un array de enteros `nums` y un entero `target`, devuelve los índices de los dos números que suman `target`.

Puedes asumir que cada entrada tiene exactamente una solución y no puedes usar el mismo elemento dos veces.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de búsqueda en arrays
- [ ] Aprender a usar hash maps para optimizar búsquedas
- [ ] Practicar el manejo de índices en arrays
- [ ] Comprender la diferencia entre complejidad O(n²) y O(n)

## 📝 Enunciado

Implementa la función `twoSum` que tome un array de números enteros y un número objetivo, y devuelva un array con los índices de los dos números que suman el objetivo.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
((nums = [2, 7, 11, 15]),
  (target = (9)[
    // Output esperado
    (0, 1)
  ]));

// Explicación
// nums[0] + nums[1] = 2 + 7 = 9
```

### Ejemplo 2

```javascript
// Input
((nums = [3, 2, 4]),
  (target = (6)[
    // Output esperado
    (1, 2)
  ]));

// Explicación
// nums[1] + nums[2] = 2 + 4 = 6
```

## 🔍 Casos de Prueba

| Input          | Target | Output Esperado | Explicación |
| -------------- | ------ | --------------- | ----------- |
| [2, 7, 11, 15] | 9      | [0, 1]          | 2 + 7 = 9   |
| [3, 2, 4]      | 6      | [1, 2]          | 2 + 4 = 6   |
| [3, 3]         | 6      | [0, 1]          | 3 + 3 = 6   |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Piensa en usar un hash map para almacenar los números que ya has visto junto con sus índices.

</details>

<details>
<summary>💡 Pista 2</summary>

Para cada número, calcula el complemento (target - número actual) y verifica si ya lo has visto.

</details>

<details>
<summary>💡 Pista 3</summary>

Si encuentras el complemento en el hash map, devuelve los índices. Si no, agrega el número actual al hash map.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `twoSum`
3. Ejecuta los tests: `npm test two-sum`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [LeetCode - Two Sum](https://leetcode.com/problems/two-sum/)
- [Hash Map Tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

---

**💡 Tip:** Este es un problema clásico que se puede resolver de manera eficiente usando hash maps para reducir la complejidad de tiempo.
