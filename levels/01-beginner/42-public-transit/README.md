# Sistema de Gestión de Transporte Público

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Gestión de Estado  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Un sistema de transporte público necesita gestionar buses, rutas y pasajeros. El sistema debe permitir registrar buses con capacidad limitada, asignar buses a rutas, gestionar el abordaje y descenso de pasajeros, y generar reportes de ocupación e ingresos. Tu misión es crear tres clases (`Bus`, `Route` y `TransitSystem`) que permitan gestionar estas operaciones con validaciones apropiadas.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con múltiples propiedades y métodos complejos
- [ ] Aplicar validaciones tempranas (Fail Fast) con mensajes descriptivos
- [ ] Implementar gestión de capacidad y límites (pasajeros vs capacidad)
- [ ] Gestionar relaciones entre clases (asignación de buses a rutas)
- [ ] Usar métodos de arrays (filter, reduce, find) para reportes
- [ ] Reforzar principios KISS, Código Expresivo y Responsabilidad Única

## 📝 Enunciado Detallado

Implementa tres clases en `exercise.js`:

### 1. Clase `Bus`

**Propiedades:**
- `busNumber` (string): Número identificador del bus (no puede estar vacío)
- `capacity` (number): Capacidad máxima de pasajeros (debe ser mayor que 0)
- `currentPassengers` (number): Pasajeros actuales a bordo (inicializa en 0)
- `currentRoute` (Route|null): Ruta asignada actualmente (null si no tiene ruta)
- `isInService` (boolean): Indica si el bus está en servicio (inicializa en true)

**Constructor:**
- Valida que `busNumber` sea string no vacío → Error: "Bus number is required"
- Valida que `capacity` sea número mayor que 0 → Error: "Bus capacity must be greater than 0"
- Inicializa `currentPassengers = 0`, `currentRoute = null`, `isInService = true`

**Métodos:**

- `boardPassengers(count)`
  - Valida que `count` sea número mayor que 0 → Error: "Passenger count must be greater than 0"
  - Valida que haya capacidad disponible → Error: "Not enough capacity"
  - Incrementa `currentPassengers` y retorna nuevo total

- `alightPassengers(count)`
  - Valida que `count` sea número mayor que 0 → Error: "Passenger count must be greater than 0"
  - Valida que haya suficientes pasajeros → Error: "Not enough passengers on board"
  - Decrementa `currentPassengers` y retorna nuevo total

- `getAvailableSeats()`
  - Calcula y retorna asientos disponibles (capacity - currentPassengers)

- `setRoute(route)`
  - Valida que `route` sea instancia de `Route` → Error: "Route must be an instance of Route"
  - Asigna ruta al bus y retorna `true`

- `getOccupancyRate()`
  - Calcula porcentaje de ocupación (currentPassengers / capacity * 100)
  - Retorna número con 2 decimales (0-100)

### 2. Clase `Route`

**Propiedades:**
- `routeNumber` (string): Número identificador de la ruta (no puede estar vacío)
- `stops` (array): Array de nombres de paradas (inicializa vacío)
- `distance` (number): Distancia total en kilómetros (debe ser mayor que 0)
- `fare` (number): Tarifa del viaje (debe ser mayor que 0)

**Constructor:**
- Valida que `routeNumber` sea string no vacío → Error: "Route number is required"
- Valida que `distance` sea número mayor que 0 → Error: "Route distance must be greater than 0"
- Valida que `fare` sea número mayor que 0 → Error: "Route fare must be greater than 0"
- Inicializa `stops = []`

**Métodos:**

- `addStop(stopName)`
  - Valida que `stopName` sea string no vacío → Error: "Stop name is required"
  - Valida que la parada no exista ya → Error: "Stop already exists"
  - Agrega parada al array y retorna número total de paradas

- `getTotalStops()`
  - Retorna número total de paradas

- `getDistance()`
  - Retorna distancia total de la ruta

- `calculateTravelTime(averageSpeed)`
  - Valida que `averageSpeed` sea número mayor que 0 → Error: "Average speed must be greater than 0"
  - Calcula tiempo: distancia / velocidad (horas)
  - Retorna número con 2 decimales

### 3. Clase `TransitSystem`

**Propiedades:**
- `name` (string): Nombre del sistema de transporte (no puede estar vacío)
- `buses` (array): Array de instancias de `Bus`
- `routes` (array): Array de instancias de `Route`

**Constructor:**
- Valida que `name` sea string no vacío → Error: "Transit system name is required"
- Inicializa `buses = []`, `routes = []`

**Métodos:**

- `addBus(bus)`
  - Valida que `bus` sea instancia de `Bus` → Error: "Bus must be an instance of Bus"
  - Valida que no exista bus con mismo número → Error: "Bus number already exists"
  - Agrega bus y retorna total de buses

- `addRoute(route)`
  - Valida que `route` sea instancia de `Route` → Error: "Route must be an instance of Route"
  - Valida que no exista ruta con mismo número → Error: "Route number already exists"
  - Agrega ruta y retorna total de rutas

- `assignBusToRoute(busNumber, routeNumber)`
  - Valida que `busNumber` sea string → Error: "Bus number must be a string"
  - Valida que `routeNumber` sea string → Error: "Route number must be a string"
  - Busca bus y ruta por números
  - Si no encuentra bus → Error: "Bus not found"
  - Si no encuentra ruta → Error: "Route not found"
  - Asigna ruta al bus usando `setRoute()` y retorna `true`

- `getBusesByRoute(routeNumber)`
  - Valida que `routeNumber` sea string → Error: "Route number must be a string"
  - Filtra buses asignados a esa ruta usando `filter()`
  - Retorna nuevo array

- `getTotalPassengers()`
  - Suma pasajeros de todos los buses usando `reduce()`
  - Retorna total

- `getRevenue()`
  - Calcula ingresos: suma (pasajeros × tarifa de ruta) de todos los buses
  - Usa `reduce()` para calcular
  - Retorna total con 2 decimales

- `getMostPopularRoute()`
  - Encuentra ruta con más pasajeros totales
  - Retorna `Route|null` (null si no hay buses asignados)

## 💡 Ejemplos

### Ejemplo 1
```javascript
const bus = new Bus('B101', 50);
bus.boardPassengers(30);
console.log(bus.getAvailableSeats()); // 20
console.log(bus.getOccupancyRate()); // 60.00
```

### Ejemplo 2
```javascript
const route = new Route('R1', 15.5, 2.50);
route.addStop('Downtown');
route.addStop('Airport');
console.log(route.getTotalStops()); // 2
console.log(route.calculateTravelTime(30)); // 0.52 horas
```

### Ejemplo 3
```javascript
const system = new TransitSystem('City Transit');
const bus = new Bus('B101', 50);
const route = new Route('R1', 10, 2.50);

system.addBus(bus);
system.addRoute(route);
system.assignBusToRoute('B101', 'R1');

bus.boardPassengers(40);
const revenue = system.getRevenue();
console.log(revenue); // 100.00 (40 pasajeros × $2.50)
```

## ⚙️ Restricciones y Reglas

- Todos los mensajes de error y nombres deben estar en inglés
- No se permite usar librerías externas
- Los cálculos de porcentajes deben tener 2 decimales
- Un bus solo puede tener una ruta asignada a la vez
- No se pueden abordar más pasajeros que la capacidad disponible
- No pueden bajar más pasajeros de los que hay a bordo

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Abordar pasajeros | `bus.boardPassengers(20)` | Retorna 20 | Caso básico |
| Capacidad excedida | `bus.boardPassengers(60)` en bus de 50 | Error "Not enough capacity" | Validación |
| Descender pasajeros | `bus.alightPassengers(10)` | Retorna nuevo total | Caso básico |
| Asignar ruta | `system.assignBusToRoute('B101', 'R1')` | `true` | Relación |
| Ruta más popular | `system.getMostPopularRoute()` | Ruta con más pasajeros | Cálculo |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Gestión de capacidad</summary>
Siempre valida que la operación no exceda los límites antes de modificar el estado.
</details>

<details>
<summary>💡 Pista 2 – Cálculo de ingresos</summary>
Para calcular ingresos, necesitas multiplicar pasajeros de cada bus por la tarifa de su ruta asignada.
</details>

<details>
<summary>💡 Pista 3 – Ruta más popular</summary>
Agrupa buses por ruta, suma pasajeros de cada grupo y encuentra el máximo.
</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Bus` con constructor y métodos básicos
2. Implementa la clase `Route` con gestión de paradas
3. Crea la clase `TransitSystem` con constructor
4. Implementa métodos de gestión (addBus, addRoute, assignBusToRoute)
5. Implementa métodos de reporte (getTotalPassengers, getRevenue, getMostPopularRoute)
6. Ejecuta los tests: `npm test public-transit`
7. Refactoriza si encuentras duplicaciones

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden exactamente
- [ ] Los cálculos de porcentajes son precisos (2 decimales)
- [ ] La gestión de capacidad funciona correctamente
- [ ] Los tests `npm test public-transit` pasan al 100%
- [ ] No se exponen arrays internos directamente

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases solicitadas
3. Corre `npm test public-transit` (o `npm run t public-transit`)
4. Opcional: `npm start public-transit` carga el archivo con el runner

## 📚 Recursos Adicionales

- [Array.prototype.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.filter](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Classes in JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)

---

**💡 Tip:** Mantén los métodos cortos y expresivos. Valida capacidad antes de modificar estado para evitar errores lógicos.

