# 🚀 Ejecutor de Ejercicios CLI

Este proyecto incluye un sistema CLI que te permite ejecutar cualquier ejercicio desde la raíz del proyecto, sin necesidad de navegar a carpetas específicas.

## 📋 Comandos Disponibles

### Usando npm scripts (Recomendado)

```bash
# COMANDOS SÚPER CORTOS (Más rápidos)
npm start two-sum              # Ejecutar ejercicio (más corto)
npm run e fizz-buzz           # Ejecutar ejercicio (ultra corto)
npm run t two-sum             # Ejecutar pruebas (ultra corto)

# COMANDOS NORMALES
npm run list                  # Listar todos los ejercicios
npm run level 01-beginner     # Ver ejercicios por nivel
npm run run two-sum          # Ejecutar ejercicio
npm run test-exercise two-sum # Ejecutar pruebas
npm run exercise help        # Ver ayuda completa
```

### Usando directamente el script

```bash
# Listar todos los ejercicios
node run-exercise.js list

# Ver ejercicios por nivel
node run-exercise.js level 01-beginner

# Ejecutar un ejercicio
node run-exercise.js run two-sum

# Ejecutar pruebas de un ejercicio
node run-exercise.js test two-sum

# Ver ayuda
node run-exercise.js help
```

## 🎯 Ejemplos de Uso

### 1. Ver todos los ejercicios disponibles
```bash
npm run list
```
Salida:
```
📚 Ejercicios Disponibles:

🎯 01-BEGINNER:
   01-two-sum - Two Sum
       Encuentra dos números que sumen un objetivo
   02-fizz-buzz - Fizz Buzz
       Clásico juego de Fizz Buzz
   ...

🎯 02-INTERMEDIATE:
   01-binary-search - Binary Search
       Búsqueda binaria en array ordenado
   ...
```

### 2. Ver ejercicios de un nivel específico
```bash
npm run level 01-beginner
```

### 3. Ejecutar un ejercicio (Formas más cortas)
```bash
# Opción 1: Usando npm start (más corto)
npm start two-sum

# Opción 2: Usando npm run e (ultra corto)
npm run e two-sum

# Opción 3: Usando npm run run (normal)
npm run run two-sum
```
Todas estas opciones cargarán y ejecutarán el ejercicio Two Sum.

### 4. Ejecutar pruebas de un ejercicio (Formas más cortas)
```bash
# Opción 1: Usando npm run t (ultra corto)
npm run t two-sum

# Opción 2: Usando npm run test-exercise (normal)
npm run test-exercise two-sum

# Opción 3: Usando el script directo
node run-exercise.js test two-sum
```
Todas estas opciones ejecutarán las pruebas de Jest para el ejercicio especificado.

## 🔍 Búsqueda Inteligente

El sistema incluye búsqueda inteligente que permite usar nombres parciales:

```bash
# Todas estas opciones funcionan para "two-sum":
npm run run two-sum
npm run run two
npm run run sum
npm run run 01-two-sum
```

## 📁 Estructura de Ejercicios

Cada ejercicio sigue esta estructura:
```
levels/
├── 01-beginner/
│   ├── 01-two-sum/
│   │   ├── exercise.js      # Código del ejercicio
│   │   ├── exercise.test.js # Pruebas
│   │   └── README.md        # Documentación
│   └── ...
├── 02-intermediate/
└── ...
```

## 🛠️ Agregar Nuevos Ejercicios

Para agregar un nuevo ejercicio al sistema CLI:

1. Crea el ejercicio en la estructura de carpetas apropiada
2. Actualiza el mapeo en `run-exercise.js` en la variable `EXERCISES`

Ejemplo:
```javascript
const EXERCISES = {
  '01-beginner': {
    // ... ejercicios existentes ...
    '05-nuevo-ejercicio': {
      name: 'Nuevo Ejercicio',
      description: 'Descripción del nuevo ejercicio',
      path: 'levels/01-beginner/05-nuevo-ejercicio'
    }
  }
};
```

## 🎨 Características

- ✅ **Búsqueda inteligente**: Encuentra ejercicios por nombre parcial
- ✅ **Navegación por niveles**: Filtra ejercicios por dificultad
- ✅ **Ejecución directa**: No necesitas cambiar de directorio
- ✅ **Integración con Jest**: Ejecuta pruebas fácilmente
- ✅ **Ayuda contextual**: Comandos de ayuda integrados
- ✅ **Mensajes claros**: Interfaz amigable con emojis y colores

## 🚨 Solución de Problemas

### Error: "Ejercicio no encontrado"
- Verifica que el ejercicio existe con `npm run list`
- Usa nombres parciales más específicos
- Asegúrate de que el ejercicio esté mapeado en `run-exercise.js`

### Error: "Directorio no encontrado"
- Verifica que la estructura de carpetas sea correcta
- Asegúrate de que el path en el mapeo sea correcto

### Error: "Archivo exercise.js no encontrado"
- Verifica que el archivo `exercise.js` existe en el directorio del ejercicio
- Asegúrate de que el archivo tenga la estructura correcta

## ⚡ Comandos Rápidos - Resumen

Para uso diario, estos son los comandos más útiles y cortos:

```bash
# 🚀 EJECUTAR EJERCICIOS (más rápido)
npm start two-sum        # Ejecutar ejercicio
npm run e fizz-buzz      # Ejecutar ejercicio (ultra corto)

# 🧪 EJECUTAR PRUEBAS (más rápido)
npm run t two-sum        # Ejecutar pruebas (ultra corto)

# 📋 VER EJERCICIOS
npm run list             # Ver todos los ejercicios
npm run level 01-beginner # Ver ejercicios por nivel

# ❓ AYUDA
npm run exercise help    # Ver ayuda completa
```

## 📝 Notas

- El sistema está diseñado para ser usado desde la raíz del proyecto
- Todos los comandos funcionan tanto con npm scripts como directamente
- La búsqueda es case-insensitive y permite coincidencias parciales
- El sistema mantiene la estructura original de ejercicios intacta
- **Recomendación**: Usa `npm start` para ejecutar ejercicios (más corto que `npm run run`)
