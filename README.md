# 🧠 Repositorio de Ejercicios de Algoritmos

Un repositorio estructurado y pedagógicamente diseñado para aprender algoritmos y estructuras de datos a través de ejercicios prácticos.

## 🎯 Propósito

Este repositorio está diseñado para estudiantes de programación que quieren:
- Practicar algoritmos fundamentales
- Desarrollar habilidades de resolución de problemas
- Prepararse para entrevistas técnicas
- Aprender mejores prácticas de programación

## 📚 Estructura del Proyecto

```
algorithms-repo/
├── 📁 .cursor/
│   └── rules.mdc                    # Reglas globales del proyecto
├── 📁 levels/
│   ├── 📁 beginner/                 # Fundamentos y conceptos básicos
│   │   ├── 📁 01-two-sum/
│   │   ├── 📁 02-fizz-buzz/
│   │   └── 📁 03-palindrome-check/
│   ├── 📁 intermediate/            # Algoritmos clásicos
│   │   ├── 📁 01-binary-search/
│   │   ├── 📁 02-linked-list/
│   │   └── 📁 03-quick-sort/
│   ├── 📁 advanced/                # Problemas complejos
│   │   ├── 📁 01-dijkstra/
│   │   ├── 📁 02-knapsack/
│   │   └── 📁 03-red-black-tree/
│   └── 📁 expert/                  # Para desafíos extremos
│       ├── 📁 01-traveling-salesman/
│       └── 📁 02-concurrent-data-structures/
├── 📁 templates/                   # Templates reutilizables
├── 📁 solutions/                   # SOLUCIONES (separadas)
├── 📁 docs/                        # Documentación del proyecto
└── package.json
```

## 🚀 Inicio Rápido

### 1. Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd algorithms-exercises

# Instalar dependencias
npm install
```

### 2. Ejecutar un Ejercicio
```bash
# Ejecutar tests para un ejercicio específico
npm test two-sum

# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

### 3. Validación del Código
```bash
# Verificar formato de código
npm run format:check

# Formatear código
npm run format

# Verificar linting
npm run lint

# Validación completa
npm run validate
```

## 📖 Cómo Usar Este Repositorio

### Para Estudiantes

1. **Elige tu nivel**: Comienza con `beginner` si eres nuevo en algoritmos
2. **Lee el README**: Cada ejercicio tiene documentación completa
3. **Implementa la solución**: Usa el archivo `exercise.js` como base
4. **Ejecuta los tests**: Verifica que tu solución sea correcta
5. **Consulta pistas**: Si te quedas atascado, revisa `hints.md`
6. **Compara soluciones**: Solo después de intentar resolver por tu cuenta

### Para Instructores

1. **Usa los templates**: Para crear nuevos ejercicios consistentemente
2. **Consulta las soluciones**: En la carpeta `solutions/` para referencia
3. **Revisa la documentación**: En `docs/` para entender la filosofía pedagógica
4. **Personaliza según necesidades**: Adapta ejercicios para tu clase

## 🎓 Niveles de Dificultad

### 🟢 Beginner (Principiante)
- **Enfoque**: Conceptos básicos de programación
- **Ejemplos**: Two Sum, Fizz Buzz, Palindrome Check
- **Objetivos**: Desarrollar confianza y comprensión fundamental

### 🟡 Intermediate (Intermedio)
- **Enfoque**: Algoritmos clásicos y estructuras de datos
- **Ejemplos**: Binary Search, Linked Lists, Quick Sort
- **Objetivos**: Dominar algoritmos estándar y eficiencia básica

### 🟠 Advanced (Avanzado)
- **Enfoque**: Problemas complejos y optimización
- **Ejemplos**: Dijkstra, Knapsack, Red-Black Trees
- **Objetivos**: Resolver problemas complejos y diseñar soluciones eficientes

### 🔴 Expert (Experto)
- **Enfoque**: Desafíos extremos y problemas de investigación
- **Ejemplos**: Traveling Salesman, Concurrent Data Structures
- **Objetivos**: Trabajar en problemas de vanguardia y contribuir al conocimiento

## 📋 Estructura de Cada Ejercicio

Cada ejercicio sigue una estructura consistente:

```
📁 ejercicio-name/
├── README.md           # Documentación completa del problema
├── exercise.js         # Template con estructura base
├── exercise.test.js    # Tests comprehensivos
└── hints.md           # Pistas progresivas (opcional)
```

### README.md Incluye:
- Descripción clara del problema
- Objetivos de aprendizaje
- Ejemplos con explicaciones
- Casos de prueba en tabla
- Restricciones
- Pistas progresivas
- Recursos adicionales

## 🧪 Sistema de Testing

Cada ejercicio incluye tests comprehensivos que cubren:
- **Casos básicos**: Ejemplos principales del enunciado
- **Casos edge**: Valores límite, arrays vacíos, casos especiales
- **Casos adicionales**: Validación de lógica y comprensión

## 🛠️ Herramientas de Desarrollo

### Configuración Incluida:
- **Jest**: Framework de testing
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Babel**: Transpilación de JavaScript

### Scripts Disponibles:
```bash
npm test              # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con cobertura
npm run lint          # Verificar código
npm run lint:fix      # Corregir errores de linting
npm run format        # Formatear código
npm run validate      # Validación completa
```

## 📚 Documentación

### Documentos Principales:
- [`CODING_STANDARDS.md`](docs/CODING_STANDARDS.md) - Estándares de código
- [`CONTRIBUTING.md`](docs/CONTRIBUTING.md) - Guía de contribución
- [`PEDAGOGY.md`](docs/PEDAGOGY.md) - Filosofía pedagógica

### Para Soluciones:
- Las soluciones están en la carpeta `solutions/`
- ⚠️ **No mires las soluciones hasta haber intentado resolver**

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Lee [`CONTRIBUTING.md`](docs/CONTRIBUTING.md)
2. Sigue los estándares de código
3. Asegúrate de que todos los tests pasen
4. Documenta tus cambios apropiadamente

### Tipos de Contribuciones:
- Nuevos ejercicios
- Mejoras en documentación
- Corrección de errores
- Optimizaciones de código

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Inspirado en LeetCode, HackerRank y otros recursos de algoritmos
- Comunidad de programadores que contribuyen con ideas y feedback
- Estudiantes que prueban los ejercicios y proporcionan mejoras

## 📞 Contacto

Si tienes preguntas o sugerencias:
- Abre un issue en GitHub
- Revisa la documentación existente
- Consulta los issues cerrados para ejemplos

---

**¡Feliz coding! 🚀 Recuerda: la práctica hace al maestro.**
