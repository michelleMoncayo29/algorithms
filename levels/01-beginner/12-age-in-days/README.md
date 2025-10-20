# Calculadora de Edad en Días

**Dificultad:** BEGINNER  
**Categoría:** Matemáticas, Fechas  
**Tiempo estimado:** 20-25 minutos

## 📋 Descripción

Crea una función que calcule cuántos días ha vivido una persona desde su nacimiento hasta el día de hoy.

La función debe tomar el año de nacimiento como parámetro y devolver el número total de días vividos.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar operaciones matemáticas básicas
- [ ] Entender el manejo de fechas en programación
- [ ] Aprender a calcular diferencias temporales
- [ ] Desarrollar lógica para manejar años bisiestos
- [ ] Practicar el uso de funciones y parámetros

## 📝 Enunciado

Implementa la función `calculateAgeInDays` que tome un año de nacimiento y devuelva el número total de días que ha vivido esa persona hasta el día de hoy.

**Consideraciones importantes:**
- Debes considerar los años bisiestos (cada 4 años, excepto los divisibles por 100 pero no por 400)
- Usa el año actual como referencia
- No incluyas el día de nacimiento en el conteo

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
calculateAgeInDays(1990)

// Output esperado (aproximado, depende del día actual)
// Si hoy es 2024: aproximadamente 12410 días
```

### Ejemplo 2

```javascript
// Input
calculateAgeInDays(2000)

// Output esperado (aproximado, depende del día actual)
// Si hoy es 2024: aproximadamente 8760 días
```

## 🔍 Casos de Prueba

| Año Nacimiento | Año Actual | Días Esperados (aprox) | Explicación |
|----------------|------------|------------------------|-------------|
| 1990           | 2024       | ~12410                 | 34 años × 365 + años bisiestos |
| 2000           | 2024       | ~8760                  | 24 años × 365 + años bisiestos |
| 2020           | 2024       | ~1460                  | 4 años × 365 + años bisiestos |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Primero calcula la diferencia en años entre el año actual y el año de nacimiento.

</details>

<details>
<summary>💡 Pista 2</summary>

Multiplica los años por 365, pero recuerda agregar un día extra por cada año bisiesto en ese rango.

</details>

<details>
<summary>💡 Pista 3</summary>

Un año es bisiesto si es divisible por 4, excepto si es divisible por 100 pero no por 400.

</details>

<details>
<summary>💡 Pista 4</summary>

Puedes usar `new Date().getFullYear()` para obtener el año actual.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `calculateAgeInDays`
3. Ejecuta los tests: `npm test age-in-days`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN - Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Años Bisiestos - Wikipedia](https://es.wikipedia.org/wiki/A%C3%B1o_bisiesto)

---

**💡 Tip:** Este ejercicio te ayudará a entender cómo manejar fechas y cálculos temporales, habilidades fundamentales en programación.
