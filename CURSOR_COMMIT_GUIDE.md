# Guía de Commits para Cursor AI

## 📋 Resumen

Esta guía explica cómo generar commits siguiendo las mejores prácticas de **Atomic Commits** y en **inglés** para el proyecto de ejercicios de algoritmos.

## 🎯 Principios de Atomic Commits

### ¿Qué es un Atomic Commit?
Un atomic commit es un commit que contiene **una sola funcionalidad completa** o **un solo cambio lógico**. Cada commit debe ser:
- **Completo**: Funciona por sí solo
- **Atómico**: No se puede dividir en partes más pequeñas
- **Consistente**: No rompe el código
- **Descriptivo**: Explica claramente qué hace

## 📝 Estructura del Mensaje de Commit

### Formato Estándar
```
<tipo>(<scope>): <descripción>

<cuerpo opcional>

<footer opcional>
```

### Tipos de Commit (Conventional Commits)
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en herramientas, configuración, etc.

## 🚀 Ejemplos para el Proyecto

### 1. Agregar Nuevo Ejercicio
```bash
git commit -m "feat: add 'Calculator of Age in Days' exercise for beginner level

- New exercise that calculates days lived since birth year
- Includes leap year handling and edge cases
- 10 automated test cases with comprehensive coverage
- Complete documentation with progressive hints
- Reference solution implemented
- Perfect for beginner students learning programming logic"
```

### 2. Agregar Ejercicio de Strings
```bash
git commit -m "feat: add 'Character Counter in Text' exercise for beginner level

- New exercise that counts frequency of each letter in text
- Includes uppercase/lowercase handling and character filtering
- 12 automated test cases with edge cases
- Complete documentation with progressive hints
- Reference solution implemented
- Focused on string manipulation and object usage as counters"
```

### 3. Corregir Bug en Tests
```bash
git commit -m "fix(tests): correct expected output for accented characters test

- Fixed test case for 'Héllo Wörld' to match actual character filtering
- Removed incorrect 'e' and 'o' counts from expected result
- Test now passes correctly with character counter implementation"
```

### 4. Actualizar Documentación
```bash
git commit -m "docs: update README with new beginner exercises

- Added descriptions for age calculator and character counter exercises
- Updated exercise count and difficulty progression
- Improved setup instructions for new students"
```

### 5. Refactorizar Código
```bash
git commit -m "refactor: improve test helper functions in character counter

- Extracted common test logic into reusable helper functions
- Reduced code duplication across test cases
- Improved test readability and maintainability"
```

## 🔧 Comandos Git Útiles

### Verificar Estado
```bash
git status
git diff --staged
```

### Agregar Archivos
```bash
# Agregar archivos específicos
git add levels/01-beginner/14-new-exercise/

# Agregar todos los cambios
git add .
```

### Hacer Commit
```bash
# Commit con mensaje corto
git commit -m "feat: add new exercise for beginner level"

# Commit con mensaje detallado
git commit -m "feat: add new exercise for beginner level

- Detailed description of changes
- List of specific improvements
- Any additional context"
```

### Ver Historial
```bash
git log --oneline
git log --graph --oneline --all
```

## 📋 Checklist para Cada Commit

### Antes del Commit
- [ ] ¿El commit contiene una sola funcionalidad completa?
- [ ] ¿Todos los tests pasan?
- [ ] ¿El código funciona correctamente?
- [ ] ¿El mensaje está en inglés?
- [ ] ¿El mensaje describe claramente el cambio?

### Estructura del Mensaje
- [ ] ¿Usa el tipo correcto (feat, fix, docs, etc.)?
- [ ] ¿La descripción es clara y concisa?
- [ ] ¿Incluye detalles relevantes en el cuerpo?
- [ ] ¿Menciona archivos o funcionalidades específicas?

## 🎯 Ejemplos Específicos para Ejercicios

### Agregar Ejercicio Completo
```bash
git add levels/01-beginner/XX-exercise-name/
git add solutions/01-beginner/XX-exercise-name/
git commit -m "feat: add 'Exercise Name' for beginner level

- New exercise focusing on [concept]
- [X] automated test cases covering [scenarios]
- Complete documentation with progressive hints
- Reference solution implemented
- Perfect for students learning [specific skills]"
```

### Corregir Ejercicio Existente
```bash
git add levels/01-beginner/XX-exercise-name/
git commit -m "fix: correct edge case handling in 'Exercise Name'

- Fixed issue with [specific problem]
- Updated test cases to cover [scenario]
- Improved solution robustness"
```

### Actualizar Documentación
```bash
git add README.md
git add docs/
git commit -m "docs: update exercise documentation and setup guide

- Added new exercises to beginner level list
- Updated difficulty progression
- Improved student onboarding instructions"
```

## 🚨 Errores Comunes a Evitar

### ❌ Malos Ejemplos
```bash
# Muy vago
git commit -m "fix stuff"

# Múltiples cambios no relacionados
git commit -m "add exercise and fix tests and update docs"

# En español
git commit -m "agregar nuevo ejercicio"

# Sin contexto
git commit -m "update files"
```

### ✅ Buenos Ejemplos
```bash
# Específico y claro
git commit -m "fix: correct leap year calculation in age calculator"

# Un solo cambio
git commit -m "feat: add palindrome checker exercise for beginner level"

# En inglés con contexto
git commit -m "docs: update README with new beginner exercises and setup instructions"
```

## 🔄 Flujo de Trabajo Recomendado

1. **Desarrollar** la funcionalidad completa
2. **Probar** que todo funciona correctamente
3. **Revisar** los cambios con `git status` y `git diff`
4. **Agregar** archivos específicos con `git add`
5. **Commitear** con mensaje descriptivo en inglés
6. **Verificar** el commit con `git log --oneline -1`

## 📚 Recursos Adicionales

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Commits](https://www.freshconsulting.com/insights/blog/atomic-commits/)
- [Git Best Practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices)

---

**💡 Tip:** Siempre piensa en el commit como una unidad de trabajo completa que alguien más podría entender y aplicar independientemente.
