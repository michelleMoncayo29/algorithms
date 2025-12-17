# Sistema de Calificaciones para Estudiante

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos Anidados, Cálculos, Validación de Datos  
**Tiempo estimado:** 35-40 minutos

## 📦 Contexto

Necesitas crear un sistema básico para gestionar las calificaciones de un estudiante en múltiples materias. El sistema debe permitir agregar calificaciones por materia, calcular promedios (general y por materia), determinar si el estudiante ha aprobado, y encontrar la mejor materia. Este ejercicio te ayudará a practicar el manejo de objetos anidados, cálculos complejos y búsquedas sobre estructuras de datos más complejas.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir una clase que maneja objetos anidados (materias como claves)
- [ ] Implementar métodos que realizan cálculos sobre estructuras de datos complejas
- [ ] Usar métodos de arrays y objetos (reduce, Object.keys, etc.)
- [ ] Realizar validaciones en múltiples niveles
- [ ] Implementar lógica condicional para determinar aprobación
- [ ] Encontrar valores máximos y realizar comparaciones

## 📝 Enunciado Detallado

Implementa la clase `Student` en `exercise.js`:

### Clase `Student`

- **Constructor**: Recibe dos parámetros:
  - `name` (string): Nombre del estudiante (no puede estar vacío)
  - `studentId` (string): ID del estudiante (no puede estar vacío)
  - Debe validar los parámetros y lanzar errores descriptivos:
    - `"Student name is required"` si el nombre está vacío
    - `"Student ID is required"` si el ID está vacío
  - Inicializa un objeto vacío `grades` para almacenar las calificaciones por materia

- **Propiedades**:
  - `name` (string): Nombre del estudiante
  - `studentId` (string): ID del estudiante
  - `grades` (object): Objeto que almacena las calificaciones, donde las claves son nombres de materias y los valores son arrays de números

- **Método `addGrade(subject, grade)`** - Agregar calificación:
  - Recibe dos parámetros:
    - `subject` (string): Nombre de la materia (no puede estar vacío)
    - `grade` (number): Calificación (debe estar entre 0 y 100)
  - Valida los parámetros:
    - Lanza `"Subject name is required"` si el subject está vacío
    - Lanza `"Grade must be a number between 0 and 100"` si la calificación es inválida
  - Si la materia no existe en `grades`, crea un array vacío para esa materia
  - Agrega la calificación al array de esa materia
  - Retorna el número total de calificaciones de esa materia después de agregar

- **Método `getAverage()`** - Calcular promedio general (usa `reduce`):
  - No recibe parámetros
  - Calcula el promedio de todas las calificaciones de todas las materias
  - Retorna un número entre 0 y 100 con 2 decimales
  - Si no hay calificaciones, retorna 0
  - **Debe usar el método `reduce()` para calcular la suma total**

- **Método `getAverageBySubject(subject)`** - Calcular promedio por materia:
  - Recibe un parámetro `subject` (string): nombre de la materia
  - Calcula el promedio de las calificaciones de esa materia específica
  - Retorna un número entre 0 y 100 con 2 decimales
  - Si la materia no existe o no tiene calificaciones, retorna 0
  - **Debe usar el método `reduce()` para calcular la suma**

- **Método `getGradesBySubject(subject)`** - Obtener calificaciones de una materia:
  - Recibe un parámetro `subject` (string): nombre de la materia
  - Retorna un nuevo array con todas las calificaciones de esa materia
  - Si la materia no existe, retorna un array vacío
  - **No debe mutar** el array original

- **Método `hasPassed(minGrade)`** - Determinar si el estudiante ha aprobado:
  - Recibe un parámetro opcional `minGrade` (number, default: 70): nota mínima para aprobar
  - Calcula el promedio general usando `getAverage()`
  - Retorna `true` si el promedio es >= `minGrade`, `false` en caso contrario
  - Si no hay calificaciones, retorna `false`

- **Método `getBestSubject()`** - Obtener materia con mejor promedio:
  - No recibe parámetros
  - Calcula el promedio de cada materia usando `getAverageBySubject()`
  - Retorna el nombre de la materia con el promedio más alto
  - Si hay empate, retorna la primera materia encontrada
  - Si no hay calificaciones, retorna `null`
  - **Debe usar `Object.keys()` para iterar sobre las materias**

- **Método `getSubjectCount()`** - Contar materias distintas:
  - No recibe parámetros
  - Retorna el número de materias diferentes en las que el estudiante tiene calificaciones
  - Si no hay calificaciones, retorna 0
  - **Debe usar `Object.keys()` para obtener las materias**

## 💡 Ejemplos

### Ejemplo 1 - Agregar calificaciones

```javascript
const student = new Student('Juan Pérez', 'ST001');
student.addGrade('Matemáticas', 85);
student.addGrade('Matemáticas', 90);
student.addGrade('Historia', 75);

console.log(student.grades);
// { Matemáticas: [85, 90], Historia: [75] }
```

### Ejemplo 2 - Calcular promedios

```javascript
const student = new Student('María García', 'ST002');
student.addGrade('Matemáticas', 80);
student.addGrade('Matemáticas', 90);
student.addGrade('Historia', 70);
student.addGrade('Historia', 80);

console.log(student.getAverage()); // 80.00 (promedio general)
console.log(student.getAverageBySubject('Matemáticas')); // 85.00
console.log(student.getAverageBySubject('Historia')); // 75.00
```

### Ejemplo 3 - Verificar aprobación

```javascript
const student = new Student('Carlos López', 'ST003');
student.addGrade('Matemáticas', 85);
student.addGrade('Historia', 90);

console.log(student.hasPassed()); // true (promedio >= 70)
console.log(student.hasPassed(80)); // true (promedio >= 80)
console.log(student.hasPassed(90)); // false (promedio < 90)
```

### Ejemplo 4 - Obtener mejor materia

```javascript
const student = new Student('Ana Martínez', 'ST004');
student.addGrade('Matemáticas', 85);
student.addGrade('Historia', 90);
student.addGrade('Ciencia', 88);

console.log(student.getBestSubject()); // "Historia"
```

### Ejemplo 5 - Obtener calificaciones por materia

```javascript
const student = new Student('Pedro Sánchez', 'ST005');
student.addGrade('Matemáticas', 85);
student.addGrade('Matemáticas', 90);
student.addGrade('Historia', 75);

const mathGrades = student.getGradesBySubject('Matemáticas');
console.log(mathGrades); // [85, 90]
```

### Ejemplo 6 - Validaciones

```javascript
const student = new Student('Luisa Fernández', 'ST006');

// Error: materia vacía
try {
    student.addGrade('', 85);
} catch (error) {
    console.log(error.message); // "Subject name is required"
}

// Error: calificación inválida
try {
    student.addGrade('Matemáticas', 150);
} catch (error) {
    console.log(error.message); // "Grade must be a number between 0 and 100"
}
```

## ⚙️ Restricciones y Reglas

- Las calificaciones deben estar entre 0 y 100 (inclusive)
- Los nombres de materias y estudiante no pueden estar vacíos
- El método `getAverage()` debe usar `reduce()` para calcular la suma total
- `getAverageBySubject()` debe usar `reduce()` para calcular la suma
- `getBestSubject()` y `getSubjectCount()` deben usar `Object.keys()`
- Los métodos que retornan arrays deben retornar nuevos arrays (no mutar el original)
- Los promedios deben retornarse con 2 decimales
- Los mensajes de error deben ser exactos como se especifican

## 🔍 Casos de Prueba Recomendados

| Escenario | Método | Resultado Esperado | Categoría |
|-----------|--------|--------------------|-----------|
| Agregar calificación válida | `addGrade()` | Calificación agregada correctamente | Caso básico |
| Agregar calificación a materia nueva | `addGrade()` | Se crea el array para la materia | Caso básico |
| Calcular promedio general | `getAverage()` | Promedio de todas las calificaciones | Cálculo |
| Calcular promedio por materia | `getAverageBySubject()` | Promedio de esa materia específica | Cálculo |
| Obtener calificaciones de materia | `getGradesBySubject()` | Array con calificaciones | Consulta |
| Verificar aprobación | `hasPassed()` | true/false según promedio | Lógica condicional |
| Obtener mejor materia | `getBestSubject()` | Nombre de materia con mejor promedio | Búsqueda |
| Contar materias | `getSubjectCount()` | Número de materias distintas | Conteo |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Estructura de grades</summary>

El objeto `grades` debe tener esta estructura:
```javascript
grades = {
    'Matemáticas': [85, 90],
    'Historia': [75, 80]
}
```

Para agregar una calificación, verifica si la materia existe, si no, crea el array.

</details>

<details>
<summary>💡 Pista 2 – Calcular promedio general con reduce()</summary>

Primero obtén todos los valores (arrays de calificaciones), luego aplana y calcula:
```javascript
const allGrades = Object.values(this.grades).flat();
if (allGrades.length === 0) return 0;
const sum = allGrades.reduce((acc, grade) => acc + grade, 0);
return parseFloat((sum / allGrades.length).toFixed(2));
```

</details>

<details>
<summary>💡 Pista 3 – Encontrar mejor materia</summary>

Usa `Object.keys()` para iterar sobre las materias y compara promedios:
```javascript
const subjects = Object.keys(this.grades);
if (subjects.length === 0) return null;
let bestSubject = subjects[0];
let bestAverage = this.getAverageBySubject(bestSubject);
// ... comparar con el resto
```

</details>

<details>
<summary>💡 Pista 4 – Validación de calificación</summary>

Valida que la calificación sea un número y esté en el rango:
```javascript
if (typeof grade !== 'number' || grade < 0 || grade > 100) {
    throw new Error('Grade must be a number between 0 and 100');
}
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa el constructor con validaciones y objeto `grades` vacío
2. Implementa `addGrade()` con validaciones y lógica para agregar a la estructura
3. Implementa `getAverageBySubject()` usando `reduce()`
4. Implementa `getAverage()` usando `reduce()` sobre todas las calificaciones
5. Implementa `getGradesBySubject()` retornando un nuevo array
6. Implementa `hasPassed()` usando `getAverage()`
7. Implementa `getBestSubject()` usando `Object.keys()` y comparaciones
8. Implementa `getSubjectCount()` usando `Object.keys()`
9. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] El constructor valida nombre e ID correctamente
- [ ] `addGrade()` valida subject y grade (0-100)
- [ ] `getAverage()` usa `reduce()` y retorna promedio con 2 decimales
- [ ] `getAverageBySubject()` usa `reduce()` y maneja materias inexistentes
- [ ] `getBestSubject()` usa `Object.keys()` y retorna null si no hay calificaciones
- [ ] `getSubjectCount()` usa `Object.keys()`
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa la clase `Student` con todos los métodos requeridos
3. Ejecuta los tests con `npm test` o `npm run test -- 32-student-grades`
4. Asegúrate de usar `reduce()` y `Object.keys()` donde se especifica

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Object.keys() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.flat() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

---

**💡 Tip:** Empieza implementando `addGrade()` para entender cómo se estructura el objeto `grades`. Luego implementa los métodos de cálculo comenzando por `getAverageBySubject()` antes de `getAverage()`, ya que el primero es más simple.

