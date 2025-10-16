# Guía de Principios de Programación para Generación de Ejercicios

## 🎯 Propósito

Esta guía proporciona una referencia rápida y completa de los principios de programación que deben aplicarse al generar nuevos ejercicios de algoritmos. Está diseñada para ser utilizada por Cursor y otros asistentes de IA para asegurar que todos los ejercicios promuevan buenas prácticas de programación.

## 📋 Principios Fundamentales

### 1. DRY (Don't Repeat Yourself)
**Definición:** Evita código duplicado. Mejora mantenibilidad y reduce errores.

**Aplicación en ejercicios:**
- Incluir casos donde se pueda extraer lógica común
- Sugerir refactoring cuando hay duplicación
- Mostrar cómo crear funciones auxiliares reutilizables

**Ejemplo en ejercicio:**
```javascript
// ❌ Malo - Lógica duplicada
function processNumbers(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0) {
            sum += numbers[i];
        }
    }
    
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0) {
            count++;
        }
    }
    return { sum, count };
}

// ✅ Bueno - Sin duplicación
function processNumbers(numbers) {
    const positiveNumbers = filterPositive(numbers);
    return {
        sum: calculateSum(positiveNumbers),
        count: positiveNumbers.length
    };
}
```

### 2. KISS (Keep It Simple, Stupid)
**Definición:** Simple es mejor que complejo. Código fácil de entender.

**Aplicación en ejercicios:**
- Priorizar soluciones claras sobre optimizaciones prematuras
- Evitar over-engineering en ejemplos
- Mostrar múltiples enfoques de complejidad creciente

**Ejemplo en ejercicio:**
```javascript
// ✅ Simple y claro
function findMax(numbers) {
    return Math.max(...numbers);
}

// ❌ Innecesariamente complejo para el caso
function findMax(numbers) {
    return numbers.reduce((max, current) => 
        current > max ? current : max, -Infinity
    );
}
```

### 3. YAGNI (You Aren't Gonna Need It)
**Definición:** No agregues cosas "por si acaso". Solo lo necesario.

**Aplicación en ejercicios:**
- Enfocarse en el problema específico
- Evitar funcionalidades adicionales no solicitadas
- Mostrar cómo resistir la tentación de over-engineering

### 4. Responsabilidad Única
**Definición:** Cada cosa debe tener un solo propósito claro.

**Aplicación en ejercicios:**
- Dividir problemas complejos en funciones más pequeñas
- Mostrar separación clara de responsabilidades
- Enfatizar la cohesión en el diseño

**Ejemplo en ejercicio:**
```javascript
// ✅ Separación clara de responsabilidades
function validateUser(user) {
    return isValidEmail(user.email) && 
           isValidAge(user.age) && 
           isValidName(user.name);
}

function isValidEmail(email) { /* lógica específica */ }
function isValidAge(age) { /* lógica específica */ }
function isValidName(name) { /* lógica específica */ }
```

### 5. Código Expresivo
**Definición:** Nombres que digan qué hace el código.

**Aplicación en ejercicios:**
- Usar nombres descriptivos en todos los ejemplos
- Mostrar la diferencia entre nombres buenos y malos
- Enfatizar la importancia de la legibilidad

**Ejemplo en ejercicio:**
```javascript
// ✅ Expresivo
function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.price, 0);
}

// ❌ No expresivo
function calc(items) {
    return items.reduce((t, i) => t + i.p, 0);
}
```

### 6. Funciones Pequeñas
**Definición:** Una función = una tarea específica.

**Aplicación en ejercicios:**
- Mostrar cómo dividir funciones largas
- Enfatizar la importancia de funciones enfocadas
- Proporcionar ejemplos de refactoring

### 7. Composición sobre Herencia
**Definición:** Mejor unir componentes que heredar complejidad.

**Aplicación en ejercicios:**
- Preferir composición en ejemplos de OOP
- Mostrar cuándo usar herencia vs composición
- Evitar jerarquías complejas de herencia

### 8. Principio Boy Scout
**Definición:** Siempre mejora un poco el código que tocas.

**Aplicación en ejercicios:**
- Incluir ejercicios de refactoring
- Mostrar mejoras incrementales
- Enfatizar la mejora continua

### 9. Encapsulación
**Definición:** Oculta detalles internos, muestra solo lo necesario.

**Aplicación en ejercicios:**
- Mostrar interfaces claras
- Enfatizar la importancia de ocultar implementación
- Proporcionar ejemplos de APIs bien diseñadas

### 10. Fail Fast
**Definición:** Detecta y reporta errores inmediatamente.

**Aplicación en ejercicios:**
- Incluir validación de inputs en todos los ejemplos
- Mostrar manejo apropiado de errores
- Enfatizar la detección temprana de problemas

**Ejemplo en ejercicio:**
```javascript
// ✅ Fail Fast
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Los argumentos deben ser números');
    }
    if (b === 0) {
        throw new Error('División por cero no permitida');
    }
    return a / b;
}
```

### 11. Inmutabilidad
**Definición:** Datos que no cambian evitan efectos secundarios.

**Aplicación en ejercicios:**
- Preferir operaciones que no muten datos originales
- Mostrar el uso de spread operator y métodos inmutables
- Enfatizar la importancia de evitar efectos secundarios

### 12. Ley de Demeter
**Definición:** Habla solo con tus amigos directos.

**Aplicación en ejercicios:**
- Evitar encadenamiento profundo de métodos
- Mostrar cómo reducir acoplamiento
- Enfatizar la comunicación directa

### 13. Separación de Intereses
**Definición:** Divide problemas en partes independientes.

**Aplicación en ejercicios:**
- Organizar código en módulos lógicos
- Mostrar separación clara de responsabilidades
- Enfatizar la modularidad

### 14. Abierto/Cerrado
**Definición:** Extiende comportamiento sin modificar código existente.

**Aplicación en ejercicios:**
- Mostrar diseño extensible
- Enfatizar la importancia de interfaces estables
- Proporcionar ejemplos de extensibilidad

### 15. Depender de Abstracciones
**Definición:** Usa interfaces, no implementaciones concretas.

**Aplicación en ejercicios:**
- Mostrar inyección de dependencias
- Enfatizar el uso de abstracciones
- Proporcionar ejemplos de interfaces bien diseñadas

### 16. Código Probable
**Definición:** Escribe código fácil de testear desde el inicio.

**Aplicación en ejercicios:**
- Incluir casos de prueba comprehensivos
- Mostrar cómo diseñar para testabilidad
- Enfatizar la importancia de los tests

## 🎯 Aplicación por Nivel de Dificultad

### Beginner
**Principios principales:**
- KISS
- Código Expresivo
- Funciones Pequeñas
- Fail Fast

**Enfoque:** Simplicidad y claridad

### Intermediate
**Principios principales:**
- DRY
- Responsabilidad Única
- Separación de Intereses
- Inmutabilidad

**Enfoque:** Organización y mantenibilidad

### Advanced
**Principios principales:**
- Encapsulación
- Composición sobre Herencia
- Abierto/Cerrado
- Ley de Demeter

**Enfoque:** Diseño y arquitectura

### Expert
**Principios principales:**
- Depender de Abstracciones
- Código Probable
- Principio Boy Scout
- YAGNI

**Enfoque:** Excelencia y optimización

## 📝 Checklist para Generación de Ejercicios

### Antes de crear un ejercicio:
- [ ] ¿Qué principios son más relevantes para este problema?
- [ ] ¿Cómo puedo mostrar la aplicación de estos principios?
- [ ] ¿Qué ejemplos de código "malo" vs "bueno" puedo incluir?
- [ ] ¿Cómo puedo estructurar el problema para promover buenas prácticas?

### En el ejercicio:
- [ ] ¿Los nombres de variables y funciones son expresivos?
- [ ] ¿Hay oportunidades para mostrar DRY?
- [ ] ¿Se puede dividir en funciones más pequeñas?
- [ ] ¿Se valida input apropiadamente (Fail Fast)?
- [ ] ¿Se evita mutar datos originales innecesariamente?

### En los tests:
- [ ] ¿Se prueban casos de validación (Fail Fast)?
- [ ] ¿Se incluyen casos edge apropiados?
- [ ] ¿Los tests son fáciles de entender?
- [ ] ¿Se verifica comportamiento inmutabilidad cuando aplique?

### En la documentación:
- [ ] ¿Se mencionan los principios aplicables?
- [ ] ¿Se proporciona checklist de principios?
- [ ] ¿Se incluyen preguntas de reflexión?
- [ ] ¿Se dan ejemplos de código mejorado?

## 🔄 Flujo de Trabajo para Cursor

1. **Analizar el problema:** Identificar qué principios son más relevantes
2. **Diseñar la estructura:** Crear ejercicio que promueva esos principios
3. **Escribir ejemplos:** Incluir código que demuestre buenas prácticas
4. **Crear tests:** Asegurar que se prueben los principios importantes
5. **Documentar:** Explicar cómo aplicar los principios en este contexto
6. **Revisar:** Verificar que el ejercicio promueve buenas prácticas

## 💡 Consejos Específicos

### Para ejercicios de algoritmos:
- Siempre incluir validación de inputs
- Mostrar múltiples enfoques (simple vs optimizado)
- Enfatizar la legibilidad sobre micro-optimizaciones
- Incluir casos que requieran refactoring

### Para ejercicios de estructuras de datos:
- Mostrar encapsulación apropiada
- Enfatizar la separación de responsabilidades
- Incluir ejemplos de composición
- Mostrar interfaces bien diseñadas

### Para ejercicios de patrones:
- Enfatizar principios de diseño
- Mostrar extensibilidad
- Incluir ejemplos de abstracciones
- Demostrar composición sobre herencia

---

**Esta guía debe ser consultada cada vez que se genere un nuevo ejercicio para asegurar que promueva las mejores prácticas de programación.**
