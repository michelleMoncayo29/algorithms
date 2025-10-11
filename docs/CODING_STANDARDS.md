# Estándares de Código

## 🎯 Propósito

Este documento establece los estándares de código que deben seguirse en todos los ejercicios del repositorio de algoritmos.

## 📋 Reglas Generales

### Estructura de Archivos
Cada ejercicio debe contener exactamente estos archivos:
- `README.md` - Documentación del problema
- `exercise.js` - Implementación del ejercicio
- `exercise.test.js` - Tests unitarios
- `hints.md` - Pistas progresivas (opcional)

### Nomenclatura
- **Archivos**: kebab-case (`two-sum`, `binary-search`)
- **Funciones**: camelCase (`twoSum`, `binarySearch`)
- **Variables**: camelCase (`targetSum`, `currentIndex`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_SIZE`, `DEFAULT_VALUE`)

## 🔧 Estándares de JavaScript

### Sintaxis
```javascript
// ✅ Correcto
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// ❌ Incorrecto
function calculate_sum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}
```

### Comentarios
```javascript
/**
 * Función que implementa el algoritmo de búsqueda binaria
 * @param {number[]} nums - Array ordenado de números
 * @param {number} target - Elemento a buscar
 * @returns {number} Índice del elemento o -1 si no existe
 */
function binarySearch(nums, target) {
    // Implementación aquí
}
```

### Manejo de Errores
```javascript
// ✅ Correcto
function safeDivide(a, b) {
    if (b === 0) {
        throw new Error('División por cero no permitida');
    }
    return a / b;
}

// ❌ Incorrecto
function safeDivide(a, b) {
    return a / b; // Sin validación
}
```

## 🧪 Estándares de Testing

### Estructura de Tests
```javascript
describe('Nombre del Ejercicio', () => {
    // Casos básicos
    test('debe manejar el caso básico', () => {
        expect(functionName(input)).toBe(expectedOutput);
    });

    // Casos edge
    test('debe manejar casos límite', () => {
        expect(functionName(edgeCaseInput)).toBe(expectedOutput);
    });

    // Casos adicionales
    test('debe manejar casos específicos', () => {
        expect(functionName(specificInput)).toBe(expectedOutput);
    });
});
```

### Casos de Prueba Obligatorios
1. **Caso básico**: El ejemplo principal del enunciado
2. **Casos edge**: Valores límite, arrays vacíos, valores nulos
3. **Casos adicionales**: Al menos 2-3 casos más para validar la lógica

## 📚 Estándares de Documentación

### README.md
- Título claro y descriptivo
- Descripción del problema
- Objetivos de aprendizaje
- Ejemplos con explicaciones
- Casos de prueba en tabla
- Restricciones claras
- Pistas progresivas
- Recursos adicionales

### Comentarios en Código
- Documentación JSDoc para funciones
- Comentarios explicativos para lógica compleja
- Pistas en el template inicial

## 🚀 Herramientas de Desarrollo

### ESLint
```json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### Prettier
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 📝 Checklist de Revisión

Antes de considerar un ejercicio completo, verificar:

- [ ] Estructura de archivos correcta
- [ ] Nomenclatura consistente
- [ ] Documentación JSDoc completa
- [ ] Tests comprehensivos
- [ ] README detallado
- [ ] Código sin errores de linting
- [ ] Todos los tests pasan
- [ ] Ejemplos funcionan correctamente

## 🔄 Flujo de Trabajo

1. Crear ejercicio usando templates
2. Implementar función básica
3. Escribir tests comprehensivos
4. Documentar en README
5. Ejecutar `npm run validate`
6. Revisar y ajustar según sea necesario

---

**💡 Tip:** Estos estándares aseguran consistencia y calidad en todo el repositorio.
