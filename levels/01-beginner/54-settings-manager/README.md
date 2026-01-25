# Gestor de Configuración (Settings Manager)

**Dificultad:** BEGINNER  
**Categoría:** Clases, OOP, Gestión de Estado  
**Tiempo estimado:** 30-45 minutos

## 📋 Descripción

Implementa una clase `SettingsManager` para gestionar configuraciones de aplicación con operaciones get, set, reset, validate y más. Este ejercicio te enseñará a trabajar con clases, encapsulación, gestión de estado interno y method chaining.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a crear clases con estado interno
- [ ] Practicar encapsulación y gestión de datos
- [ ] Entender method chaining (retornar `this`)
- [ ] Aplicar validación de inputs
- [ ] Trabajar con objetos y copias inmutables

## 📝 Enunciado

Implementa la clase `SettingsManager` que gestiona configuraciones de aplicación.

### Constructor

- `constructor(defaults = {})`: Crea un nuevo gestor con configuraciones por defecto opcionales

### Métodos

- `get(key)`: Obtiene el valor de una configuración
  - Retorna el valor o `undefined` si no existe
  
- `set(key, value)`: Establece una configuración
  - Retorna `this` para method chaining
  
- `setMultiple(settings)`: Establece múltiples configuraciones a la vez
  - Recibe un objeto con key-value pairs
  - Retorna `this` para method chaining
  
- `has(key)`: Verifica si una configuración existe
  - Retorna `true` o `false`
  
- `remove(key)`: Elimina una configuración
  - Retorna `true` si se eliminó, `false` si no existía
  
- `reset()`: Restablece todas las configuraciones a los valores por defecto
  - Retorna `this` para method chaining
  
- `getAll()`: Obtiene todas las configuraciones como objeto (copia inmutable)
  - Retorna una copia del objeto de configuraciones
  
- `clear()`: Limpia todas las configuraciones
  - Retorna `this` para method chaining
  
- `size()`: Obtiene el número de configuraciones
  - Retorna el número de configuraciones almacenadas

## 💡 Ejemplos

### Ejemplo 1
```javascript
const SettingsManager = require('./exercise');

const settings = new SettingsManager({ theme: 'dark', language: 'en' });

settings.set('fontSize', 14);
console.log(settings.get('fontSize')); // 14
console.log(settings.get('theme')); // 'dark'
```

### Ejemplo 2
```javascript
const settings = new SettingsManager({ theme: 'dark' });

settings
    .set('fontSize', 14)
    .set('language', 'es')
    .setMultiple({ width: 800, height: 600 });

console.log(settings.getAll());
// { theme: 'dark', fontSize: 14, language: 'es', width: 800, height: 600 }
```

### Ejemplo 3
```javascript
const settings = new SettingsManager({ theme: 'dark', language: 'en' });

settings.set('fontSize', 14);
settings.reset();

console.log(settings.getAll());
// { theme: 'dark', language: 'en' }
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `settings.get('key')` | `undefined` | Clave no existe |
| `settings.set('key', 'value').get('key')` | `'value'` | Method chaining funciona |
| `settings.reset()` | Configuraciones por defecto | Restablece a defaults |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para method chaining, retorna `this` al final de los métodos que modifican estado:
```javascript
set(key, value) {
    // ... lógica ...
    return this;
}
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para crear una copia inmutable de un objeto:
```javascript
getAll() {
    return { ...this.settings };
}
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para iterar sobre un objeto y establecer múltiples valores:
```javascript
setMultiple(settings) {
    for (const [key, value] of Object.entries(settings)) {
        this.set(key, value);
    }
    return this;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la clase `SettingsManager`
3. Ejecuta los tests: `npm test 54-settings-manager`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [MDN: Object.entries()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Method Chaining Pattern](https://en.wikipedia.org/wiki/Method_chaining)

---

**💡 Tip:** Almacena una copia de los defaults en el constructor para poder restablecerlos más tarde con `reset()`.

