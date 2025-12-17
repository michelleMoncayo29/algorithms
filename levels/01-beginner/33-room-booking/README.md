# Sistema de Reservas de Sala

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validación de Lógica, Cálculos, Filtrado  
**Tiempo estimado:** 40-45 minutos

## 📦 Contexto

Necesitas crear un sistema básico para gestionar reservas de salas de reuniones. El sistema debe permitir agregar salas, reservar salas en horarios específicos (validando que no haya solapamientos), cancelar reservas, y calcular ingresos. Este ejercicio te ayudará a practicar validaciones de lógica más complejas, manejo de objetos con información temporal, y cálculos sobre colecciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir múltiples clases relacionadas (`Room` y `BookingSystem`)
- [ ] Implementar validaciones de lógica compleja (solapamientos temporales)
- [ ] Manejar objetos con información de tiempo (horarios de inicio y duración)
- [ ] Realizar cálculos sobre colecciones (ingresos, filtrado)
- [ ] Usar métodos de arrays (`filter`, `find`, `reduce`) para consultas
- [ ] Validar disponibilidad antes de realizar operaciones

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

### Clase `Room`

- **Constructor**: Recibe tres parámetros:
  - `name` (string): Nombre de la sala (no puede estar vacío)
  - `capacity` (number): Capacidad de la sala (debe ser mayor que 0)
  - `pricePerHour` (number): Precio por hora (debe ser mayor que 0)
  - Debe validar los parámetros y lanzar errores descriptivos:
    - `"Room name is required"` si el nombre está vacío
    - `"Room capacity must be greater than 0"` si la capacidad es inválida
    - `"Room price per hour must be greater than 0"` si el precio es inválido

- **Propiedades**:
  - `name` (string): Nombre de la sala
  - `capacity` (number): Capacidad de la sala
  - `pricePerHour` (number): Precio por hora

### Clase `BookingSystem`

- **Constructor**: No recibe parámetros. Inicializa un array vacío `rooms` para almacenar las salas y un array vacío `bookings` para almacenar las reservas.

- **Propiedades**:
  - `rooms` (array): Array de instancias de `Room`
  - `bookings` (array): Array de objetos de reserva con formato `{ roomName, startTime, duration, endTime }`

- **Método `addRoom(name, capacity, pricePerHour)`** - Agregar sala:
  - Crea una nueva instancia de `Room` con los parámetros recibidos
  - **Valida** que no exista ya una sala con el mismo nombre (case-sensitive)
  - Lanza `"Room already exists"` si la sala ya existe
  - Agrega la sala al array `rooms`
  - Retorna la sala creada

- **Método `findRoom(name)`** - Buscar sala por nombre (usa `find`):
  - Busca una sala cuyo `name` coincida exactamente (case-sensitive)
  - Retorna la sala encontrada o `null` si no existe
  - **Debe usar el método `find()` del array**

- **Método `bookRoom(roomName, startTime, duration)`** - Reservar sala:
  - Recibe tres parámetros:
    - `roomName` (string): Nombre de la sala a reservar
    - `startTime` (number): Hora de inicio (en formato de 24 horas, ej: 9 = 9:00 AM, 14 = 2:00 PM)
    - `duration` (number): Duración en horas (debe ser mayor que 0)
  - Valida los parámetros:
    - Lanza `"Room not found"` si la sala no existe
    - Lanza `"Start time must be between 0 and 23"` si startTime no está en el rango válido
    - Lanza `"Duration must be greater than 0"` si la duración es inválida
    - Calcula `endTime = startTime + duration`
    - Lanza `"Booking extends beyond 24 hours"` si `endTime > 24`
  - **Valida que no haya solapamientos**: verifica que no exista otra reserva para la misma sala que se solape con el horario solicitado
    - Dos reservas se solapan si: `(startTime < existingEndTime) && (endTime > existingStartTime)`
  - Lanza `"Room is already booked at this time"` si hay solapamiento
  - Crea un objeto de reserva: `{ roomName, startTime, duration, endTime }`
  - Agrega la reserva al array `bookings`
  - Retorna el objeto de reserva creado

- **Método `getAvailableRooms(startTime, duration)`** - Obtener salas disponibles (usa `filter`):
  - Recibe dos parámetros: `startTime` y `duration`
  - Calcula `endTime = startTime + duration`
  - Retorna un nuevo array con todas las salas que NO tienen reservas que se solapen con el horario solicitado
  - **Debe usar el método `filter()` del array**
  - Si una sala no tiene reservas, está disponible

- **Método `cancelBooking(roomName, startTime)`** - Cancelar reserva:
  - Recibe dos parámetros: `roomName` y `startTime`
  - Busca la reserva que coincida exactamente con `roomName` y `startTime`
  - Lanza `"Booking not found"` si no se encuentra la reserva
  - Elimina la reserva del array `bookings`
  - Retorna `true` si se canceló correctamente

- **Método `getRoomRevenue(roomName)`** - Calcular ingresos de una sala (usa `reduce`):
  - Recibe un parámetro `roomName` (string): nombre de la sala
  - Busca la sala usando `findRoom()`
  - Lanza `"Room not found"` si la sala no existe
  - Calcula los ingresos sumando (precio por hora × duración) de todas las reservas de esa sala
  - Retorna el total de ingresos
  - Si no hay reservas, retorna 0
  - **Debe usar el método `reduce()` del array**

- **Método `getTotalRevenue()`** - Calcular ingresos totales (usa `reduce`):
  - No recibe parámetros
  - Calcula los ingresos totales de todas las salas sumando todos los ingresos
  - Retorna el total de ingresos
  - Si no hay reservas, retorna 0
  - **Debe usar el método `reduce()` del array**

- **Método `getBookingsByRoom(roomName)`** - Obtener reservas de una sala (usa `filter`):
  - Recibe un parámetro `roomName` (string): nombre de la sala
  - Retorna un nuevo array con todas las reservas de esa sala
  - Si la sala no existe o no tiene reservas, retorna un array vacío
  - **Debe usar el método `filter()` del array**

## 💡 Ejemplos

### Ejemplo 1 - Agregar salas

```javascript
const system = new BookingSystem();
const room1 = system.addRoom('Sala A', 10, 50);
const room2 = system.addRoom('Sala B', 20, 100);

console.log(room1.name); // "Sala A"
console.log(room1.capacity); // 10
console.log(room1.pricePerHour); // 50
```

### Ejemplo 2 - Reservar sala

```javascript
const system = new BookingSystem();
system.addRoom('Sala A', 10, 50);

const booking = system.bookRoom('Sala A', 9, 2); // Reserva de 9:00 a 11:00
console.log(booking);
// { roomName: 'Sala A', startTime: 9, duration: 2, endTime: 11 }
```

### Ejemplo 3 - Validar solapamientos

```javascript
const system = new BookingSystem();
system.addRoom('Sala A', 10, 50);
system.bookRoom('Sala A', 9, 2); // 9:00 - 11:00

// Intentar reservar en horario solapado
try {
    system.bookRoom('Sala A', 10, 2); // 10:00 - 12:00 (se solapa)
} catch (error) {
    console.log(error.message); // "Room is already booked at this time"
}
```

### Ejemplo 4 - Obtener salas disponibles

```javascript
const system = new BookingSystem();
system.addRoom('Sala A', 10, 50);
system.addRoom('Sala B', 20, 100);
system.bookRoom('Sala A', 9, 2); // Sala A ocupada de 9:00 a 11:00

const available = system.getAvailableRooms(10, 1); // Buscar de 10:00 a 11:00
console.log(available.length); // 1 (solo Sala B está disponible)
```

### Ejemplo 5 - Calcular ingresos

```javascript
const system = new BookingSystem();
system.addRoom('Sala A', 10, 50); // $50/hora
system.addRoom('Sala B', 20, 100); // $100/hora

system.bookRoom('Sala A', 9, 2);  // $50 × 2 = $100
system.bookRoom('Sala A', 14, 3);  // $50 × 3 = $150
system.bookRoom('Sala B', 10, 1);  // $100 × 1 = $100

console.log(system.getRoomRevenue('Sala A')); // 250
console.log(system.getTotalRevenue()); // 350
```

### Ejemplo 6 - Cancelar reserva

```javascript
const system = new BookingSystem();
system.addRoom('Sala A', 10, 50);
system.bookRoom('Sala A', 9, 2);

const cancelled = system.cancelBooking('Sala A', 9);
console.log(cancelled); // true

// Ahora se puede reservar de nuevo
system.bookRoom('Sala A', 9, 2); // Funciona correctamente
```

## ⚙️ Restricciones y Reglas

- Los horarios se manejan en formato de 24 horas (0-23)
- Una reserva no puede extenderse más allá de las 24:00 (endTime <= 24)
- Dos reservas se solapan si sus horarios se intersectan
- Los nombres de salas son únicos (case-sensitive)
- Los métodos que usan arrays deben usar los métodos especificados (`find`, `filter`, `reduce`)
- Los mensajes de error deben ser exactos como se especifican
- Las validaciones deben ser Fail Fast

## 🔍 Casos de Prueba Recomendados

| Escenario | Método | Resultado Esperado | Categoría |
|-----------|--------|--------------------|-----------|
| Agregar sala válida | `addRoom()` | Sala creada y agregada | Caso básico |
| Agregar sala duplicada | `addRoom()` | Error "Room already exists" | Validación |
| Reservar sala disponible | `bookRoom()` | Reserva creada correctamente | Caso básico |
| Reservar con solapamiento | `bookRoom()` | Error "Room is already booked at this time" | Validación |
| Obtener salas disponibles | `getAvailableRooms()` | Filtra correctamente | Filtrado |
| Calcular ingresos de sala | `getRoomRevenue()` | Suma precio × duración | Cálculo |
| Calcular ingresos totales | `getTotalRevenue()` | Suma todos los ingresos | Cálculo |
| Cancelar reserva | `cancelBooking()` | Reserva eliminada | Caso básico |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Validar solapamientos</summary>

Dos reservas se solapan si:
- La nueva reserva comienza antes de que termine la existente: `startTime < existingEndTime`
- Y la nueva reserva termina después de que comience la existente: `endTime > existingStartTime`

```javascript
const overlaps = bookings.some(booking => 
    booking.roomName === roomName &&
    startTime < booking.endTime &&
    endTime > booking.startTime
);
```

</details>

<details>
<summary>💡 Pista 2 – Calcular ingresos con reduce()</summary>

Para calcular ingresos de una sala:
```javascript
const room = this.findRoom(roomName);
const roomBookings = this.bookings.filter(b => b.roomName === roomName);
return roomBookings.reduce((total, booking) => {
    return total + (room.pricePerHour * booking.duration);
}, 0);
```

</details>

<details>
<summary>💡 Pista 3 – Filtrar salas disponibles</summary>

Una sala está disponible si no tiene reservas que se solapen:
```javascript
return this.rooms.filter(room => {
    const hasOverlap = this.bookings.some(booking => 
        booking.roomName === room.name &&
        startTime < booking.endTime &&
        endTime > booking.startTime
    );
    return !hasOverlap;
});
```

</details>

<details>
<summary>💡 Pista 4 – Validar horarios</summary>

Valida que startTime esté entre 0 y 23, y que endTime no exceda 24:
```javascript
if (startTime < 0 || startTime > 23) {
    throw new Error('Start time must be between 0 and 23');
}
const endTime = startTime + duration;
if (endTime > 24) {
    throw new Error('Booking extends beyond 24 hours');
}
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Room` con constructor y validaciones
2. Implementa `BookingSystem` con constructor y método `addRoom()` con validación de duplicados
3. Implementa `findRoom()` usando `find()`
4. Implementa `bookRoom()` con todas las validaciones (horarios, solapamientos)
5. Implementa `getAvailableRooms()` usando `filter()`
6. Implementa `cancelBooking()` para eliminar reservas
7. Implementa `getRoomRevenue()` y `getTotalRevenue()` usando `reduce()`
8. Implementa `getBookingsByRoom()` usando `filter()`
9. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Room` valida todos los parámetros correctamente
- [ ] `addRoom()` valida que no existan duplicados
- [ ] `bookRoom()` valida horarios y solapamientos correctamente
- [ ] `getAvailableRooms()` usa `filter()` y detecta solapamientos
- [ ] `getRoomRevenue()` y `getTotalRevenue()` usan `reduce()` correctamente
- [ ] `getBookingsByRoom()` usa `filter()` correctamente
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases `Room` y `BookingSystem` con todos los métodos requeridos
3. Ejecuta los tests con `npm test` o `npm run test -- 33-room-booking`
4. Asegúrate de validar correctamente los solapamientos temporales

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.some() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

---

**💡 Tip:** Empieza implementando las validaciones básicas de `bookRoom()` (horarios, sala existe) antes de implementar la lógica de solapamientos. La validación de solapamientos es la parte más compleja, así que tómate tu tiempo para entenderla bien.

