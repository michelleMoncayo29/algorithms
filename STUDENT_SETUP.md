# 🎓 Configuración para Estudiantes

Este documento explica cómo configurar el entorno de desarrollo para que sea amigable para estudiantes principiantes.

## 🚀 Configuración Rápida

### Para VS Code (Recomendado)

1. **Instala la extensión ESLint** (si no la tienes):
   - Abre VS Code
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "ESLint" e instálala

2. **El proyecto ya está configurado** para ser amigable con principiantes:
   - ✅ No hay errores de indentación
   - ✅ Puedes usar `console.log()` para debugging
   - ✅ No importa si usas comillas simples o dobles
   - ✅ No importa si usas punto y coma o no

### Para otros editores

El proyecto funciona igual de bien con cualquier editor de código.

## 🧪 Cómo ejecutar los ejercicios

### Ejecutar tests de un ejercicio específico:
```bash
npm test fizz-buzz
npm test two-sum
npm test palindrome-check
npm test find-maximum
```

### Ejecutar todos los tests:
```bash
npm test
```

### Ejecutar tests en modo watch (se ejecutan automáticamente al guardar):
```bash
npm run test:watch
```

## 🔧 Si aún ves advertencias molestas

### Opción 1: Desactivar ESLint en VS Code temporalmente
1. Abre VS Code
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Escribe "ESLint: Disable ESLint"
4. Selecciona la opción para el workspace

### Opción 2: Desactivar solo las advertencias visuales
1. En VS Code, ve a File → Preferences → Settings
2. Busca "problems decorations"
3. Desactiva "Problems: Decorations Enabled"

### Opción 3: Usar solo los tests (sin linting)
```bash
# En lugar de usar npm run validate, usa:
npm run validate:student
```

## 📝 Consejos para estudiantes

### ✅ Está bien hacer esto:
- Usar `console.log()` para debugging
- Usar cualquier estilo de indentación (espacios o tabs)
- Usar comillas simples o dobles
- Usar `var`, `let`, o `const` (aunque `const` es recomendado)
- No usar punto y coma si no quieres

### ❌ Evita esto:
- Variables no definidas (como `x` sin declarar `let x`)
- Redeclarar variables con el mismo nombre
- Errores de sintaxis básicos

## 🆘 ¿Necesitas ayuda?

Si sigues teniendo problemas con las advertencias:

1. **Reinicia VS Code** después de hacer cambios
2. **Verifica que estés en la carpeta correcta** del proyecto
3. **Ejecuta los tests** - si pasan, tu código está bien
4. **Ignora las advertencias visuales** - lo importante es que los tests pasen

## 🎯 Enfoque recomendado

1. **Escribe tu código** sin preocuparte por el estilo
2. **Usa `console.log()`** para debuggear
3. **Ejecuta los tests** para ver si funciona
4. **Itera** hasta que todos los tests pasen
5. **El estilo viene después** - primero haz que funcione

---

**💡 Recuerda:** El objetivo es aprender algoritmos, no perfeccionar el estilo de código. ¡Concéntrate en hacer que tus soluciones funcionen!
