# Sistema de Gestión de Parqueadero

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Cálculos Temporales  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Un parqueadero necesita un sistema para gestionar espacios de estacionamiento, registrar entradas y salidas de vehículos, y calcular tarifas según el tiempo de estancia y tipo de espacio. Tu misión es crear dos clases (`ParkingSpot` y `ParkingLot`) que permitan gestionar espacios, validar tipos de vehículos compatibles con espacios, calcular tarifas y generar reportes.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con múltiples propiedades y métodos complejos
- [ ] Aplicar validaciones tempranas (Fail Fast) con mensajes descriptivos
- [ ] Implementar cálculos temporales y matemáticos (duración, tarifas)
- [ ] Gestionar relaciones entre clases (asignación de vehículos a espacios)
- [ ] Usar métodos de arrays (filter, reduce, find) para reportes
- [ ] Reforzar principios KISS, Código Expresivo y Responsabilidad Única

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

### 1. Clase `ParkingSpot`

**Propiedades:**
- `spotNumber` (string): Número identificador del espacio (no puede estar vacío)
- `type` (string): Tipo de espacio - debe ser 'compact', 'standard' o 'large'
- `isOccupied` (boolean): Indica si el espacio está ocupado (inicializa en false)
- `vehiclePlate` (string|null): Placa del vehículo estacionado (null si está vacío)
- `entryTime` (Date|null): Hora de entrada del vehículo (null si está vacío)

**Constructor:**
- Valida que `spotNumber` sea string no vacío → Error: "Spot number is required"
- Valida que `type` sea uno de: 'compact', 'standard', 'large' → Error: "Spot type must be 'compact', 'standard', or 'large'"
- Inicializa `isOccupied = false`, `vehiclePlate = null`, `entryTime = null`

**Métodos:**

- `parkVehicle(plate, entryTime)`
  - Valida que `plate` sea string no vacío → Error: "Vehicle plate is required"
  - Valida que `entryTime` sea instancia de Date → Error: "Entry time must be a Date object"
  - Valida que el espacio no esté ocupado → Error: "Spot is already occupied"
  - Asigna vehículo, marca como ocupado y registra hora de entrada
  - Retorna `true` si se estacionó correctamente

- `exitVehicle(exitTime)`
  - Valida que `exitTime` sea instancia de Date → Error: "Exit time must be a Date object"
  - Valida que el espacio esté ocupado → Error: "Spot is not occupied"
  - Valida que `exitTime` sea posterior a `entryTime` → Error: "Exit time must be after entry time"
  - Calcula duración y tarifa, libera el espacio
  - Retorna objeto `{ duration: number, fee: number }` con duración en horas y tarifa calculada

- `getParkingDuration(exitTime)`
  - Valida que `exitTime` sea instancia de Date → Error: "Exit time must be a Date object"
  - Valida que el espacio esté ocupado → Error: "Spot is not occupied"
  - Calcula diferencia en horas entre `exitTime` y `entryTime`
  - Retorna número con 2 decimales (horas)

- `calculateFee(exitTime, ratePerHour)`
  - Valida que `exitTime` sea instancia de Date → Error: "Exit time must be a Date object"
  - Valida que `ratePerHour` sea número mayor que 0 → Error: "Rate per hour must be greater than 0"
  - Valida que el espacio esté ocupado → Error: "Spot is not occupied"
  - Calcula tarifa: duración × ratePerHour
  - Retorna número con 2 decimales

- `isCompatible(vehicleType)`
  - Valida que `vehicleType` sea string → Error: "Vehicle type must be a string"
  - Retorna `true` si el vehículo es compatible con el espacio:
    - 'compact': solo acepta 'compact'
    - 'standard': acepta 'compact' y 'standard'
    - 'large': acepta 'compact', 'standard' y 'large'

### 2. Clase `ParkingLot`

**Propiedades:**
- `name` (string): Nombre del parqueadero (no puede estar vacío)
- `spots` (array): Array de instancias de `ParkingSpot`
- `hourlyRates` (object): Objeto con tarifas por tipo: `{ compact: number, standard: number, large: number }`

**Constructor:**
- Valida que `name` sea string no vacío → Error: "Parking lot name is required"
- Inicializa `spots = []`
- Inicializa `hourlyRates = { compact: 2, standard: 3, large: 5 }` (valores por defecto)

**Métodos:**

- `addSpot(spotNumber, type)`
  - Valida que `spotNumber` sea string no vacío → Error: "Spot number is required"
  - Valida que `type` sea válido → Error: "Spot type must be 'compact', 'standard', or 'large'"
  - Valida que no exista espacio con mismo número → Error: "Spot number already exists"
  - Crea nueva instancia de `ParkingSpot` y la agrega
  - Retorna la instancia creada

- `findAvailableSpot(vehicleType)`
  - Valida que `vehicleType` sea string → Error: "Vehicle type must be a string"
  - Busca primer espacio disponible compatible con el tipo de vehículo
  - Usa `isCompatible()` para verificar compatibilidad
  - Retorna `ParkingSpot|null`

- `parkVehicle(vehicleType, plate, entryTime)`
  - Valida que `vehicleType` sea string → Error: "Vehicle type must be a string"
  - Valida que `plate` sea string no vacío → Error: "Vehicle plate is required"
  - Valida que `entryTime` sea instancia de Date → Error: "Entry time must be a Date object"
  - Busca espacio disponible usando `findAvailableSpot()`
  - Si no hay espacio → Error: "No available spot for this vehicle type"
  - Estaciona vehículo en el espacio encontrado
  - Retorna el `ParkingSpot` donde se estacionó

- `exitVehicle(plate, exitTime)`
  - Valida que `plate` sea string no vacío → Error: "Vehicle plate is required"
  - Valida que `exitTime` sea instancia de Date → Error: "Exit time must be a Date object"
  - Busca espacio ocupado por esa placa
  - Si no se encuentra → Error: "Vehicle not found"
  - Calcula tarifa usando `hourlyRates` según tipo de espacio
  - Libera espacio y retorna objeto `{ spot: ParkingSpot, duration: number, fee: number }`

- `getOccupancyRate()`
  - Calcula porcentaje de espacios ocupados
  - Retorna número con 2 decimales (0-100)

- `getRevenueByType()`
  - Retorna objeto con ingresos por tipo de espacio
  - Formato: `{ compact: number, standard: number, large: number }`
  - Nota: Este método debe rastrear ingresos acumulados (puedes usar un objeto interno `revenue`)

- `getSpotsByType(type)`
  - Valida que `type` sea válido → Error: "Spot type must be 'compact', 'standard', or 'large'"
  - Filtra espacios por tipo usando `filter()`
  - Retorna nuevo array

## 💡 Ejemplos

### Ejemplo 1
```javascript
const spot = new ParkingSpot('A1', 'standard');
spot.parkVehicle('ABC123', new Date('2024-01-15T10:00:00'));
const duration = spot.getParkingDuration(new Date('2024-01-15T12:30:00'));
console.log(duration); // 2.50 (horas)
```

### Ejemplo 2
```javascript
const lot = new ParkingLot('Downtown Parking');
lot.addSpot('A1', 'compact');
lot.addSpot('A2', 'standard');

const spot = lot.parkVehicle('compact', 'XYZ789', new Date('2024-01-15T09:00:00'));
console.log(spot.spotNumber); // 'A1'

const result = lot.exitVehicle('XYZ789', new Date('2024-01-15T11:00:00'));
console.log(result.fee); // 4.00 (2 horas × $2/hora)
```

### Ejemplo 3
```javascript
const lot = new ParkingLot('Mall Parking');
lot.addSpot('B1', 'large');
lot.parkVehicle('large', 'TRUCK1', new Date('2024-01-15T08:00:00'));

const rate = lot.getOccupancyRate();
console.log(rate); // 100.00 (1 espacio, 1 ocupado)
```

## ⚙️ Restricciones y Reglas

- Todos los mensajes de error y nombres deben estar en inglés
- No se permite usar librerías externas
- Los cálculos de tiempo deben ser precisos (horas con 2 decimales)
- Las tarifas se calculan por hora completa o fracción
- Un vehículo 'compact' puede usar cualquier espacio
- Un vehículo 'standard' puede usar 'standard' o 'large'
- Un vehículo 'large' solo puede usar 'large'

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Estacionar vehículo | `spot.parkVehicle('ABC123', date)` | `true` | Caso básico |
| Espacio ya ocupado | `spot.parkVehicle()` cuando está ocupado | Error "Spot is already occupied" | Validación |
| Calcular duración | `spot.getParkingDuration(exitTime)` | Número con 2 decimales | Cálculo |
| Compatibilidad | `spot.isCompatible('compact')` en espacio 'standard' | `true` | Lógica |
| Sin espacios disponibles | `lot.parkVehicle()` sin espacios libres | Error "No available spot" | Edge |
| Tasa de ocupación | `lot.getOccupancyRate()` con 2 de 5 ocupados | `40.00` | Cálculo |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Compatibilidad de vehículos</summary>
Usa condiciones anidadas o un objeto de mapeo para determinar qué tipos de vehículos puede aceptar cada tipo de espacio.
</details>

<details>
<summary>💡 Pista 2 – Cálculo de duración</summary>
Calcula la diferencia en milisegundos entre fechas y convierte a horas: `(exitTime - entryTime) / (1000 * 60 * 60)`
</details>

<details>
<summary>💡 Pista 3 – Rastreo de ingresos</summary>
Mantén un objeto interno `revenue` en `ParkingLot` que acumule ingresos por tipo cuando se libera un espacio.
</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `ParkingSpot` con constructor y validaciones
2. Implementa métodos de `ParkingSpot` (parkVehicle, exitVehicle, etc.)
3. Crea la clase `ParkingLot` con constructor
4. Implementa métodos de gestión (addSpot, findAvailableSpot, etc.)
5. Implementa métodos de reporte (getOccupancyRate, getRevenueByType)
6. Ejecuta los tests: `npm test parking-management`
7. Refactoriza si encuentras duplicaciones

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden exactamente
- [ ] Los cálculos de tiempo son precisos (2 decimales)
- [ ] La compatibilidad de vehículos funciona correctamente
- [ ] Los tests `npm test parking-management` pasan al 100%
- [ ] No se exponen arrays internos directamente

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases solicitadas
3. Corre `npm test parking-management` (o `npm run t parking-management`)
4. Opcional: `npm start parking-management` carga el archivo con el runner

## 📚 Recursos Adicionales

- [Date Objects - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array.prototype.filter](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Working with Dates in JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

**💡 Tip:** Mantén los métodos cortos y expresivos. Si una validación se repite, extrae una función auxiliar privada dentro de la clase para mantener el código limpio.

