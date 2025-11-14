# Gestor de Mantenimiento de Flota

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Arrays  
**Tiempo estimado:** 25-30 minutos

## 📦 Contexto

La empresa de entregas *Km Express* necesita un registro simple para controlar el kilometraje de sus vehículos y decidir cuándo deben ir a mantenimiento. Tu misión es crear dos clases básicas en JavaScript (`Vehicle` y `FleetManager`) que permitan agregar vehículos, registrar viajes y obtener reportes, siempre aplicando validaciones *fail fast* y manteniendo los nombres de propiedades/métodos en inglés.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con constructores y métodos de instancia.  
- [ ] Aplicar validaciones tempranas usando mensajes en inglés.  
- [ ] Gestionar colecciones internas sin exponer referencias directas.  
- [ ] Implementar búsquedas y filtros simples con métodos de arrays.  
- [ ] Reforzar principios KISS, Código Expresivo y Fail Fast.

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

1. **`Vehicle`**
   - Propiedades obligatorias:  
     - `plate` (string alfanumérica, mínimo 5 caracteres, se almacena en mayúsculas)  
     - `type` (string no vacío, por ejemplo: `"truck"`, `"van"`)  
     - `mileage` (número entero ≥ 0)
   - Constructor: valida cada campo y lanza errores exactos:  
     - `"Vehicle plate is required"`  
     - `"Vehicle type is required"`  
     - `"Vehicle mileage must be a number greater than or equal to 0"`
   - Métodos:  
     - `getSummary()` → `"ABC123 (truck) has 1500 km"`  
     - `addTrip(kilometers)` → valida que `kilometers` sea número positivo entero, suma al kilometraje y retorna la nueva lectura. Mensaje de error: `"Trip distance must be a positive number"`.

2. **`FleetManager`**
   - Mantiene un arreglo interno `vehicles`.
   - Métodos:  
     - `addVehicle(vehicle)` → solo acepta instancias de `Vehicle`. Si la placa ya existe, lanza `"Vehicle plate already registered"`. En cualquier otro caso inválido lanza `"Vehicle must be an instance of Vehicle"`. Retorna el total almacenado.  
     - `findByPlate(plate)` → busca ignorando mayúsculas/minúsculas y retorna la coincidencia o `null`.  
     - `getMaintenanceList(threshold)` → retorna un nuevo array con los resúmenes (`getSummary()`) de los vehículos cuyo kilometraje sea mayor o igual que `threshold`. Debe validar que `threshold` sea número entero ≥ 0 (mensaje `"Maintenance threshold must be a number greater than or equal to 0"`).

> Recuerda mantener los métodos cortos, validar antes de avanzar (Fail Fast) y no exponer el array interno.

## 💡 Ejemplos

### Ejemplo 1
```javascript
const truck = new Vehicle('abc123', 'truck', 12000);
console.log(truck.getSummary());
// "ABC123 (truck) has 12000 km"
```

### Ejemplo 2
```javascript
const fleet = new FleetManager();
const van = new Vehicle('XYZ45', 'van', 8000);
fleet.addVehicle(van);
van.addTrip(500);

console.log(fleet.findByPlate('xyz45') === van); // true
console.log(fleet.getMaintenanceList(7000));
// ["XYZ45 (van) has 8500 km"]
```

### Ejemplo 3
```javascript
const fleet = new FleetManager();
fleet.addVehicle(new Vehicle('TRK900', 'truck', 15000));
fleet.addVehicle(new Vehicle('CAR250', 'car', 4000));

console.log(fleet.getMaintenanceList(10000));
// ["TRK900 (truck) has 15000 km"]
```

## ⚙️ Restricciones y Reglas

- Toda la lógica, mensajes de error y nombres de propiedades/métodos deben estar en inglés.  
- No se permite usar librerías externas.  
- No expongas ni retornes el array interno de `FleetManager`.  
- Usa validaciones *fail fast* con los mensajes exactos listados.  
- `addTrip` solo acepta números enteros positivos.  
- Las placas se guardan siempre en mayúsculas y deben ser únicas dentro del registro.

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Resumen básico | `new Vehicle('abc123','truck',12000).getSummary()` | `"ABC123 (truck) has 12000 km"` | Caso básico |
| Validación de placa | `new Vehicle('', 'truck', 0)` | Error `"Vehicle plate is required"` | Fail Fast |
| Validación de tipo | `new Vehicle('abc123', ' ', 0)` | Error `"Vehicle type is required"` | Fail Fast |
| Validación de kilometraje | `new Vehicle('abc123', 'truck', -5)` | Error `"Vehicle mileage must be a number greater than or equal to 0"` | Fail Fast |
| addTrip inválido | `vehicle.addTrip(0)` | Error `"Trip distance must be a positive number"` | Validación |
| Registro duplicado | `fleet.addVehicle(vehicleDeMismaPlaca)` | Error `"Vehicle plate already registered"` | Validación |
| findByPlate inexistente | `fleet.findByPlate('ZZZ999')` | `null` | Edge |
| getMaintenanceList | `fleet.getMaintenanceList(8000)` | Array de resúmenes ≥ 8000 km | Filtro |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Normaliza la placa</summary>
Convierte la placa a mayúsculas en el constructor (`this.plate = plate.trim().toUpperCase();`) para comparar fácilmente.
</details>

<details>
<summary>💡 Pista 2 – Evita duplicados</summary>
Antes de agregar, busca con `findByPlate`. Si existe, lanza el error de duplicado.
</details>

<details>
<summary>💡 Pista 3 – Reporte de mantenimiento</summary>
Usa `this.vehicles.filter(...)` para seleccionar y luego `map(vehicle => vehicle.getSummary())` para construir el resultado.
</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Vehicle` con todas las validaciones y métodos.  
2. Crea `FleetManager`, inicializa el arreglo interno y agrega las validaciones faltantes.  
3. Genera `getMaintenanceList` validando el umbral y usando filtros.  
4. Ejecuta los tests: `npm test fleet-maintenance` (o `npm run t fleet-maintenance`).  
5. Refactoriza si encuentras duplicaciones o métodos largos.

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden exactamente.  
- [ ] No se exponen referencias del array interno.  
- [ ] Los métodos de búsqueda y filtros son *case-insensitive* para la placa.  
- [ ] Los tests `npm test fleet-maintenance` pasan al 100 %.  
- [ ] El README describe cualquier decisión adicional.

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`.  
2. Implementa las clases solicitadas.  
3. Corre `npm test fleet-maintenance` (o `npm run t fleet-maintenance`).  
4. Opcional: `npm start fleet-maintenance` carga el archivo con el runner.

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)  
- [Object-Oriented Programming in JS](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object-oriented_JS)  
- [Array.prototype.filter](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

---

**💡 Tip:** Mantén las funciones cortas y expresivas. Si una validación se repite, extrae una función auxiliar privada dentro de la clase para mantener el código limpio.

