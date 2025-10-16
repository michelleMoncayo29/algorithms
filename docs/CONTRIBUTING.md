# Guía de Contribución

## 🎯 Bienvenido

¡Gracias por tu interés en contribuir al repositorio de ejercicios de algoritmos! Este proyecto está diseñado para ayudar a estudiantes de programación a practicar y mejorar sus habilidades algorítmicas.

## 🚀 Cómo Contribuir

### 1. Configuración del Entorno

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd algorithms-exercises

# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

### 2. Tipos de Contribuciones

#### 🆕 Nuevos Ejercicios
- Agregar ejercicios en el nivel apropiado
- Seguir la estructura estándar de archivos
- Incluir documentación completa
- Escribir tests comprehensivos

#### 🐛 Corrección de Errores
- Reportar bugs en issues
- Proponer fixes con pull requests
- Mejorar casos de prueba existentes

#### 📚 Mejoras en Documentación
- Mejorar READMEs existentes
- Agregar explicaciones más claras
- Crear recursos adicionales

#### 🔧 Mejoras Técnicas
- Optimizar templates
- Mejorar configuración de herramientas
- Agregar nuevas funcionalidades

## 📋 Proceso de Contribución

### 1. Crear un Issue
Antes de empezar a trabajar, crea un issue describiendo:
- Tipo de contribución
- Descripción detallada
- Nivel de dificultad (si aplica)
- Justificación de la contribución

### 2. Fork y Branch
```bash
# Crear fork del repositorio
# Clonar tu fork
git clone [TU_FORK_URL]
cd algorithms-exercises

# Crear rama para tu contribución
git checkout -b feature/nombre-de-tu-contribucion
```

### 3. Desarrollo
- Sigue los estándares de código
- Aplica los principios de programación (consulta `docs/PRINCIPLES_GUIDE.md`)
- Usa los templates existentes
- Escribe tests estrictos y comprehensivos (consulta `docs/TESTING_GUIDELINES.md`)
- Documenta todo apropiadamente

### 4. Validación
```bash
# Ejecutar todas las validaciones
npm run validate

# Verificar que todos los tests pasen
npm test

# Verificar formato de código
npm run format:check
```

### 5. Pull Request
- Descripción clara del cambio
- Referencia al issue relacionado
- Screenshots o ejemplos (si aplica)
- Checklist completado

## 📁 Estructura de Nuevos Ejercicios

### Nivel Beginner
- Conceptos básicos de programación
- Algoritmos simples
- Manipulación de arrays y strings
- Lógica básica

### Nivel Intermediate
- Algoritmos clásicos
- Estructuras de datos básicas
- Técnicas de optimización
- Algoritmos de búsqueda y ordenamiento

### Nivel Advanced
- Algoritmos complejos
- Estructuras de datos avanzadas
- Optimización y complejidad
- Algoritmos de grafos

### Nivel Expert
- Problemas NP-completos
- Algoritmos de aproximación
- Estructuras de datos concurrentes
- Optimización extrema

## 🧪 Estándares de Testing

### Casos Obligatorios
- **Caso básico**: Ejemplo principal del enunciado
- **Casos edge**: Valores límite, arrays vacíos
- **Casos adicionales**: Al menos 2-3 casos más

### Ejemplo de Test
```javascript
describe('Nombre del Ejercicio', () => {
    test('debe manejar el caso básico', () => {
        expect(functionName(input)).toBe(expectedOutput);
    });

    test('debe manejar casos edge', () => {
        expect(functionName(edgeCase)).toBe(expectedOutput);
    });
});
```

## 📚 Estándares de Documentación

### README.md Obligatorio
- Descripción clara del problema
- Objetivos de aprendizaje
- Ejemplos con explicaciones
- Casos de prueba en tabla
- Restricciones
- Pistas progresivas
- Recursos adicionales

### Comentarios en Código
- JSDoc para todas las funciones
- Comentarios explicativos
- Pistas en templates iniciales

## 🔍 Proceso de Revisión

### Criterios de Aceptación
- [ ] Estructura de archivos correcta
- [ ] Tests comprehensivos
- [ ] Documentación completa
- [ ] Código sin errores
- [ ] Sigue estándares establecidos
- [ ] Nivel de dificultad apropiado

### Feedback
- Revisión constructiva
- Sugerencias de mejora
- Aprobación o solicitud de cambios

## 🏷️ Etiquetas de Issues

- `beginner` - Ejercicios para principiantes
- `intermediate` - Ejercicios intermedios
- `advanced` - Ejercicios avanzados
- `expert` - Ejercicios expertos
- `bug` - Reporte de error
- `documentation` - Mejora de documentación
- `enhancement` - Nueva funcionalidad

## 💡 Consejos para Contribuidores

### Para Nuevos Ejercicios
1. Elige un problema clásico o interesante
2. Asegúrate de que sea apropiado para el nivel
3. Aplica los principios de programación relevantes (consulta `docs/PRINCIPLES_GUIDE.md`)
4. Escribe tests estrictos siguiendo `docs/TESTING_GUIDELINES.md`
5. Proporciona múltiples ejemplos
6. Incluye casos edge importantes
7. Escribe pistas útiles pero no reveladoras
8. Incluye ejemplos de código "bueno" vs "malo" cuando sea apropiado
9. Verifica rendimiento y complejidad esperada

### Para Corrección de Errores
1. Reproduce el error consistentemente
2. Proporciona casos de prueba que fallen
3. Explica el comportamiento esperado vs actual
4. Propón una solución clara

### Para Documentación
1. Usa lenguaje claro y conciso
2. Incluye ejemplos visuales cuando sea útil
3. Mantén consistencia con el estilo existente
4. Verifica que todos los enlaces funcionen

## 📞 Contacto

Si tienes preguntas o necesitas ayuda:
- Abre un issue con la etiqueta `question`
- Revisa la documentación existente
- Consulta los issues cerrados para ejemplos

## 🙏 Reconocimientos

Todos los contribuidores serán reconocidos en el README principal del proyecto.

---

**¡Gracias por hacer este proyecto mejor para todos los estudiantes de programación!**
