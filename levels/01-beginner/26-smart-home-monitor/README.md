# Monitor de Dispositivos Inteligentes

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Validaciones  
**Tiempo estimado:** 25-30 minutos

## 📦 Contexto

Una familia quiere registrar los dispositivos inteligentes conectados en su casa para saber cuánta energía consume cada habitación. Necesitan una herramienta sencilla que permita agregar dispositivos, encender/apagar y obtener reportes de consumo agrupados por habitación. Tu tarea es crear dos clases en JavaScript (`SmartDevice` y `SmartHomeMonitor`) siguiendo las guías pedagógicas del repositorio y manteniendo todos los identificadores/mensajes en inglés.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar constructores y métodos de instancia en clases.  
- [ ] Aplicar validaciones Fail Fast con mensajes descriptivos en inglés.  
- [ ] Administrar colecciones internas sin exponer referencias directas.  
- [ ] Implementar cálculos básicos usando métodos de arrays (`filter`, `map`, `reduce`).  
- [ ] Reforzar los principios KISS, Código Expresivo y Responsabilidad Única.

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

1. **`SmartDevice`**
   - Propiedades obligatorias:  
     - `name` (string no vacío, se almacena capitalizado: `"lamp" → "Lamp"`)  
     - `room` (string no vacío, se almacena en minúsculas)  
     - `watts` (número entero > 0)  
   - Propiedad opcional: `isOn` (boolean, por defecto `false`)
   - Constructor: valida cada campo y lanza errores exactos:  
     - `"Device name is required"`  
     - `"Device room is required"`  
     - `"Device watts must be a number greater than 0"`
   - Métodos:  
     - `turnOn()` y `turnOff()` → cambian `isOn` y retornan el estado actual (`true`/`false`).  
     - `getConsumption(hours)` → valida que `hours` sea número > 0 y retorna `watts * hours` sólo si el dispositivo está encendido; en caso contrario retorna `0`. Mensaje de error: `"Usage hours must be a positive number"`.  

2. **`SmartHomeMonitor`**
   - Propiedad interna `devices` (array).
   - Métodos:  
     - `addDevice(device)` → solo acepta instancias de `SmartDevice`. Si ya existe un dispositivo con el mismo nombre (ignorando mayúsculas/minúsculas), lanza `"Device name already registered"`. Para valores inválidos lanza `"Device must be an instance of SmartDevice"`. Retorna el total almacenado.  
     - `findByName(name)` → busca sin importar mayúsculas/minúsculas. Retorna coincidencia o `null`.  
     - `getRoomReport(room)` → recibe el nombre de la habitación (case-insensitive), filtra los dispositivos que pertenecen a esa habitación y retorna un objeto con la forma:  
       ```javascript
       {
         room: 'kitchen',
         devices: ['Lamp', 'Fridge'],
         activeDevices: 1,
         totalWatts: 120
       }
       ```  
       Debe validar que `room` sea string no vacío (mensaje `"Room name is required"`).  
     - `getActiveConsumption(hours)` → valida `hours` (misma regla que `getConsumption`) y retorna el consumo total (suma de `getConsumption(hours)` de cada dispositivo).

## 💡 Ejemplos

### Ejemplo 1
```javascript
const lamp = new SmartDevice('lamp', 'LivingRoom', 40);
lamp.turnOn();
console.log(lamp.getConsumption(5));
// 200
```

### Ejemplo 2
```javascript
const monitor = new SmartHomeMonitor();
const ac = new SmartDevice('AC', 'bedroom', 900);
monitor.addDevice(ac);
ac.turnOn();

console.log(monitor.getRoomReport('Bedroom'));
// {
//   room: 'bedroom',
//   devices: ['AC'],
//   activeDevices: 1,
//   totalWatts: 900
// }
```

### Ejemplo 3
```javascript
const monitor = new SmartHomeMonitor();
monitor.addDevice(new SmartDevice('TV', 'livingroom', 120));
monitor.addDevice(new SmartDevice('Console', 'livingroom', 200));

monitor.findByName('tv').turnOn();

console.log(monitor.getActiveConsumption(3));
// 360
```

## ⚙️ Restricciones y Reglas

- Los nombres de clases, propiedades, métodos y mensajes de error deben estar en inglés.  
- No utilices librerías externas.  
- No expongas directamente el array interno de `SmartHomeMonitor`.  
- Usa `trim()` para limpiar entradas de texto.  
- El método `getRoomReport` debe devolver un objeto nuevo en cada llamada.  
- `watts` y `hours` deben ser números enteros positivos.

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Normalización | `new SmartDevice('lamp','LivingRoom',40)` | `name === 'Lamp'`, `room === 'livingroom'` | Caso básico |
| Validación de name | `new SmartDevice('', 'kitchen', 10)` | Error `"Device name is required"` | Fail Fast |
| Validación de watts | `new SmartDevice('Fan', 'room', 0)` | Error `"Device watts must be a number greater than 0"` | Fail Fast |
| Duplicado | `monitor.addDevice(new SmartDevice('Lamp','room',30))` dos veces | Error `"Device name already registered"` | Validación |
| Reporte por habitación | `getRoomReport('kitchen')` | Objeto con totales correctos | Lógica |
| Consumo activo | `getActiveConsumption(2)` con dispositivos activos | Suma correcta | Agregado |
| findByName sin resultado | `findByName('unknown')` | `null` | Edge |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Capitaliza el nombre</summary>
Puedes capitalizar el nombre usando `name.trim()` y luego `name[0].toUpperCase()` combinado con `slice(1).toLowerCase()`.
</details>

<details>
<summary>💡 Pista 2 – Evita duplicados</summary>
Usa `findByName` dentro de `addDevice`. Si ya existe, lanza el error correspondiente.
</details>

<details>
<summary>💡 Pista 3 – Reportes</summary>
`getRoomReport` puede usar `filter` → `map` → `reduce`. Mantén el objeto final con claves `room`, `devices`, `activeDevices`, `totalWatts`.
</details>

## 🧭 Pasos Sugeridos

1. Implementa `SmartDevice` con todas las validaciones y métodos de estado.  
2. Crea `SmartHomeMonitor`, inicializa el arreglo interno y agrega validaciones para `addDevice`.  
3. Implementa `getRoomReport` calculando totales y lista de nombres.  
4. Implementa `getActiveConsumption`.  
5. Ejecuta los tests: `npm test smart-home-monitor` (o `npm run t smart-home-monitor`).  
6. Ajusta según reporten los tests.

## ✅ Checklist antes de enviar

- [ ] Mensajes de error exactos y en inglés.  
- [ ] Reportes devuelven nuevos objetos/arrays.  
- [ ] Las búsquedas son case-insensitive para nombres/room.  
- [ ] Los tests `npm test smart-home-monitor` pasan al 100 %.  
- [ ] README documenta cualquier decisión adicional.

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`.  
2. Implementa las clases solicitadas.  
3. Corre `npm test smart-home-monitor`.  
4. Opcional: usa `npm start smart-home-monitor` para cargar el ejercicio con el runner.

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)  
- [Array.prototype.filter](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)  
- [Array.prototype.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

---

**💡 Tip:** Mantén cada método pequeño y enfocado. Si notas que repites validaciones, crea funciones auxiliares privadas dentro de la clase para mantener el código limpio y coherente.

