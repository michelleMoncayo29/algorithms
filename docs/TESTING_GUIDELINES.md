# Guía de Testing Estricto

## 🎯 Propósito

Esta guía establece las pautas para crear tests más estrictos y comprehensivos que evalúen casos borde, rendimiento, validaciones y aspectos de calidad del código.

## 📋 Estructura del Template de Tests

### 1. Casos Básicos
**Propósito:** Verificar funcionalidad principal
- Caso básico del problema
- Ejemplo del enunciado
- Casos con datos típicos

### 2. Casos Edge y Límites
**Propósito:** Probar límites y comportamientos extremos
- Arrays vacíos
- Un solo elemento
- Valores nulos/undefined
- Valores extremos (mínimo/máximo)
- Valores negativos
- Valores decimales
- Valores cero

### 3. Validación de Inputs (Fail Fast)
**Propósito:** Verificar validación temprana de errores
- Tipos de datos incorrectos
- Strings cuando se espera número
- Objetos cuando se espera array
- Parámetros insuficientes/excesivos
- Valores fuera de rango

### 4. Casos Adicionales
**Propósito:** Verificar robustez y casos especiales
- Casos específicos del dominio
- Datos duplicados
- Datos ordenados/desordenados

### 5. Tests de Rendimiento
**Propósito:** Verificar eficiencia y escalabilidad
- Arrays pequeños, medianos y grandes
- Análisis de complejidad temporal
- Límites de tiempo de ejecución

### 6. Tests de Inmutabilidad
**Propósito:** Verificar que no se modifiquen datos originales
- Arrays originales no modificados
- Objetos originales no modificados

### 7. Tests de Precisión
**Propósito:** Verificar precisión numérica
- Números de punto flotante
- Números muy pequeños/grandes
- Precisión decimal

### 8. Tests de Comportamiento Determinístico
**Propósito:** Verificar consistencia
- Resultados idénticos en múltiples ejecuciones
- Thread-safety (si aplica)

### 9. Tests de Gestión de Memoria
**Propósito:** Verificar ausencia de memory leaks
- Ejecución múltiple sin acumulación de memoria

### 10. Tests de Errores Específicos
**Propósito:** Verificar manejo apropiado de errores
- Mensajes de error descriptivos
- Tipos de error correctos
- Manejo de overflow/underflow

## 🔧 Cómo Personalizar el Template

### Para Algoritmos de Arrays
```javascript
// Ejemplos específicos
const smallInput = Array.from({length: 10}, (_, i) => i);
const mediumInput = Array.from({length: 1000}, (_, i) => i);
const largeInput = Array.from({length: 10000}, (_, i) => i);

// Tests de rendimiento específicos
test('debe mantener complejidad O(n)', () => {
    const inputs = [
        Array.from({length: 100}, (_, i) => i),
        Array.from({length: 1000}, (_, i) => i),
        Array.from({length: 10000}, (_, i) => i)
    ];
    
    const times = inputs.map(input => {
        const start = performance.now();
        functionName(input);
        return performance.now() - start;
    });
    
    const ratio = times[2] / times[1];
    expect(ratio).toBeLessThan(15); // Factor para O(n)
});
```

### Para Algoritmos de Búsqueda
```javascript
// Tests específicos de búsqueda
test('debe manejar elemento no encontrado', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(-1);
});

test('debe manejar elemento duplicado', () => {
    expect(binarySearch([1, 2, 2, 3, 4], 2)).toBeGreaterThanOrEqual(1);
    expect(binarySearch([1, 2, 2, 3, 4], 2)).toBeLessThanOrEqual(2);
});
```

### Para Algoritmos de Ordenamiento
```javascript
// Tests específicos de ordenamiento
test('debe mantener estabilidad', () => {
    const items = [
        {value: 1, order: 1},
        {value: 2, order: 1},
        {value: 1, order: 2}
    ];
    const sorted = stableSort(items, (a, b) => a.value - b.value);
    
    expect(sorted[0].order).toBe(1);
    expect(sorted[1].order).toBe(2);
    expect(sorted[2].order).toBe(1);
});
```

## ⚡ Configuración de Rendimiento

### Límites de Tiempo Sugeridos
```javascript
// Arrays pequeños (n < 100)
expect(endTime - startTime).toBeLessThan(1); // 1ms

// Arrays medianos (100 ≤ n < 1000)
expect(endTime - startTime).toBeLessThan(10); // 10ms

// Arrays grandes (n ≥ 1000)
expect(endTime - startTime).toBeLessThan(100); // 100ms
```

### Factores de Complejidad
```javascript
// O(1) - Constante
const factor = 2;

// O(log n) - Logarítmica
const factor = 5;

// O(n) - Lineal
const factor = 15;

// O(n log n) - Lineal logarítmica
const factor = 50;

// O(n²) - Cuadrática
const factor = 200;
```

## 🎯 Casos Edge Específicos por Tipo

### Algoritmos Numéricos
- Overflow/underflow
- División por cero
- Números infinitos
- NaN (Not a Number)

### Algoritmos de Strings
- Strings vacíos
- Strings con solo espacios
- Strings con caracteres especiales
- Strings muy largos
- Codificación UTF-8

### Algoritmos de Grafos
- Grafos vacíos
- Grafos con un solo nodo
- Grafos desconectados
- Grafos con ciclos
- Grafos con pesos negativos

### Algoritmos de Estructuras de Datos
- Estructuras vacías
- Estructuras con un elemento
- Estructuras llenas
- Operaciones en estructuras vacías

## 📊 Métricas de Calidad

### Cobertura de Tests
- **Casos básicos:** 100% obligatorio
- **Casos edge:** 90% recomendado
- **Validaciones:** 100% obligatorio
- **Rendimiento:** 80% recomendado

### Tiempo de Ejecución
- Tests individuales: < 100ms
- Suite completa: < 5 segundos
- Tests de rendimiento: < 1 segundo

## 🔍 Herramientas de Análisis

### Para Detectar Memory Leaks
```javascript
// Usar herramientas como:
// - Node.js: --inspect
// - Chrome DevTools: Memory tab
// - Jest: --detectLeaks
```

### Para Análisis de Complejidad
```javascript
// Medir tiempo de ejecución
const measureTime = (fn, input) => {
    const start = performance.now();
    fn(input);
    return performance.now() - start;
};

// Comparar complejidades
const compareComplexity = (inputs, fn) => {
    const times = inputs.map(measureTime.bind(null, fn));
    return times;
};
```

## 📝 Checklist de Tests

### Antes de considerar tests completos:
- [ ] ¿Cubren todos los casos básicos?
- [ ] ¿Incluyen casos edge importantes?
- [ ] ¿Validan inputs apropiadamente?
- [ ] ¿Verifican rendimiento esperado?
- [ ] ¿Comprueban inmutabilidad?
- [ ] ¿Manejan errores correctamente?
- [ ] ¿Son determinísticos?
- [ ] ¿No causan memory leaks?

### Para cada test:
- [ ] ¿Tiene un nombre descriptivo y específico?
- [ ] ¿Incluye comentarios explicando propósito, entrada y resultado esperado?
- [ ] ¿Es independiente de otros tests?
- [ ] ¿Verifica un comportamiento específico y único?
- [ ] ¿Es rápido de ejecutar?
- [ ] ¿Es fácil de entender sin contexto adicional?
- [ ] ¿Explica claramente qué está probando y por qué?

### Estándares de Descripción de Tests:
- [ ] **Nombre del test**: Debe ser específico y explicar exactamente qué comportamiento se está probando
- [ ] **Comentarios obligatorios**: Cada test debe incluir:
  - Propósito: Qué se está verificando y por qué
  - Entrada: Descripción específica de los datos de entrada
  - Esperado: Descripción específica del resultado esperado
- [ ] **Claridad**: Al leer el test, debe quedar completamente claro qué hace y qué espera

## 🚀 Mejores Prácticas

### 1. Organización
- Agrupar tests por funcionalidad
- Usar describe() para organizar con títulos descriptivos
- Nombres descriptivos y específicos que expliquen exactamente qué se prueba

### 2. Descripciones Detalladas
- **Nombres específicos**: "debe manejar correctamente un array completamente vacío (sin elementos)"
- **Comentarios obligatorios**: Incluir propósito, entrada y resultado esperado
- **Claridad total**: Al leer el test debe quedar claro qué hace y qué espera

### 3. Datos de Prueba
- Usar datos realistas y específicos
- Incluir casos extremos bien documentados
- Variar tamaños de entrada con explicaciones
- Describir claramente qué representa cada dato de prueba

### 4. Assertions
- Usar assertions específicas y apropiadas
- Verificar tipos de datos explícitamente
- Incluir mensajes descriptivos en assertions
- Explicar por qué se usa cada assertion específica

### 5. Mantenimiento
- Mantener tests actualizados con descripciones claras
- Refactorizar tests cuando sea necesario manteniendo claridad
- Eliminar tests obsoletos
- Documentar cambios en tests para futuros desarrolladores

---

**Esta guía asegura que los tests sean comprehensivos, estrictos y mantengan alta calidad en todos los ejercicios.**
