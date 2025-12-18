# Sistema de Gestión de Hotel

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Manejo de Fechas, Validación de Datos  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de hotel que permita gestionar habitaciones, crear reservas, validar disponibilidad evitando solapamientos temporales, calcular precios según duración de estadía y generar estadísticas de ocupación.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Room`, `Reservation`, `Hotel`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Manejar fechas y cálculos de tiempo
- [ ] Validar solapamientos temporales entre reservas
- [ ] Realizar cálculos de precios según duración
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`, `some`)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa tres clases en `exercise.js`:

### Clase `Room`

Representa una habitación del hotel.

#### Constructor
- `constructor(number, type, pricePerNight)` - Crea una habitación con número, tipo y precio

#### Métodos
- `getType()` - Retorna tipo de habitación
- `getPricePerNight()` - Retorna precio por noche

### Clase `Reservation`

Representa una reserva del hotel.

#### Constructor
- `constructor(roomNumber, guestName, checkIn, checkOut)` - Crea una reserva con todos sus datos

#### Métodos
- `getDuration()` - Calcula duración en noches
- `getGuestName()` - Retorna nombre del huésped
- `isActive()` - Verifica si la reserva está activa

### Clase `Hotel`

Gestiona el hotel y sus operaciones.

#### Constructor
- `constructor(name)` - Crea un hotel con nombre

#### Métodos
- `addRoom(room)` - Agrega una habitación al hotel
- `findRoom(roomNumber)` - Busca una habitación por número usando `find()`
- `createReservation(roomNumber, guestName, checkIn, checkOut)` - Crea una nueva reserva (valida solapamientos)
- `hasOverlap(start1, end1, start2, end2)` - Verifica solapamiento entre dos rangos de fechas
- `getAvailableRooms(checkIn, checkOut)` - Retorna habitaciones disponibles usando `filter()`
- `getReservationsByGuest(guestName)` - Retorna reservas de un huésped usando `filter()`
- `getTotalRevenue()` - Calcula ingresos totales usando `reduce()`
- `getOccupancyRate(date)` - Calcula tasa de ocupación para una fecha

## 💡 Ejemplos

### Ejemplo 1: Crear Habitación y Reserva

```javascript
const hotel = new Hotel('Grand Hotel');
const room = new Room(101, 'Standard', 100);
hotel.addRoom(room);

const checkIn = new Date('2024-12-20');
const checkOut = new Date('2024-12-23');
const reservation = hotel.createReservation(101, 'Juan Pérez', checkIn, checkOut);

console.log(reservation.getDuration()); // 3 noches
console.log(reservation.isActive()); // false (fecha futura)
```

### Ejemplo 2: Validar Disponibilidad

```javascript
// Crear primera reserva
hotel.createReservation(101, 'María García', new Date('2024-12-20'), new Date('2024-12-23'));

// Intentar crear reserva solapada (falla)
try {
    hotel.createReservation(101, 'Carlos López', new Date('2024-12-22'), new Date('2024-12-25'));
} catch (error) {
    console.log(error.message); // "Room is already booked for these dates"
}

// Obtener habitaciones disponibles
const available = hotel.getAvailableRooms(new Date('2024-12-25'), new Date('2024-12-28'));
console.log(available.length); // 1 (habitación 101 disponible)
```

### Ejemplo 3: Calcular Ingresos y Ocupación

```javascript
const room1 = new Room(101, 'Standard', 100);
const room2 = new Room(102, 'Deluxe', 150);
hotel.addRoom(room1);
hotel.addRoom(room2);

hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-23')); // 3 noches × 100 = 300
hotel.createReservation(102, 'María', new Date('2024-12-21'), new Date('2024-12-24')); // 3 noches × 150 = 450

console.log(hotel.getTotalRevenue()); // 750
console.log(hotel.getOccupancyRate(new Date('2024-12-22'))); // 100.00 (ambas ocupadas)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Room constructor | parámetros válidos | Room creada | Constructor básico |
| Reservation constructor | parámetros válidos | Reservation creada | Constructor básico |
| getDuration | checkIn y checkOut | Número de noches | Cálculo correcto |
| createReservation | habitación disponible | Reserva creada | Creación exitosa |
| createReservation | habitación ocupada | Error "Room is already booked" | Validación de solapamiento |
| getAvailableRooms | rango de fechas | Habitaciones disponibles | Filtrado correcto |
| getTotalRevenue | múltiples reservas | Suma de ingresos | Cálculo total |
| getOccupancyRate | fecha específica | Porcentaje de ocupación | Cálculo correcto |

## ⚠️ Validaciones Requeridas

### Room
- Número debe ser > 0
- Tipo no puede estar vacío
- Precio por noche debe ser > 0

### Reservation
- Número de habitación debe ser > 0
- Nombre del huésped no puede estar vacío
- checkIn y checkOut deben ser instancias de Date
- checkOut debe ser posterior a checkIn

### Hotel
- Nombre no puede estar vacío
- Los rooms deben ser instancias de Room
- No se pueden agregar habitaciones duplicadas (mismo número)
- Las reservas no pueden solaparse para la misma habitación

## 🧮 Cálculos

### Duración de Estadía
```
Duración (noches) = (checkOut - checkIn) / (1000 * 60 * 60 * 24)
```

### Ingresos por Reserva
```
Ingresos = Precio por Noche × Duración (noches)
```

### Tasa de Ocupación
```
Tasa de Ocupación = (Habitaciones Ocupadas / Total Habitaciones) × 100
```

### Validación de Solapamiento
```
Dos rangos se solapan si: (start1 < end2) && (end1 > start2)
```

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Calcular duración en noches</summary>

Para calcular la duración, resta las fechas y convierte a días:
```javascript
const diffInMs = this.checkOut - this.checkIn;
const nights = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
```

</details>

<details>
<summary>💡 Pista 2 – Validar solapamiento</summary>

Dos rangos se solapan si:
```javascript
const overlaps = (start1 < end2) && (end1 > start2);
```

</details>

<details>
<summary>💡 Pista 3 – Filtrar habitaciones disponibles</summary>

Para cada habitación, verifica si tiene reservas que se solapen con el rango solicitado usando `some()` y `hasOverlap()`.

</details>

<details>
<summary>💡 Pista 4 – Calcular ingresos con reduce()</summary>

Usa `reduce()` para sumar los ingresos de cada reserva:
```javascript
return this.reservations.reduce((total, reservation) => {
    const room = this.findRoom(reservation.roomNumber);
    return total + (room.getPricePerNight() * reservation.getDuration());
}, 0);
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Room` con constructor y métodos básicos
2. Implementa la clase `Reservation` con constructor y métodos de cálculo
3. Implementa la clase `Hotel` con constructor y métodos básicos
4. Implementa `hasOverlap()` para validar solapamientos
5. Implementa `createReservation()` con validación de solapamientos
6. Implementa métodos de filtrado usando `filter()`
7. Implementa métodos de cálculo usando `reduce()`
8. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Room` valida todos los parámetros correctamente
- [ ] La clase `Reservation` valida parámetros y calcula duración correctamente
- [ ] `hasOverlap()` detecta correctamente los solapamientos
- [ ] `createReservation()` valida solapamientos antes de crear
- [ ] `getAvailableRooms()` filtra correctamente usando `filter()`
- [ ] `getTotalRevenue()` calcula correctamente usando `reduce()`
- [ ] `getOccupancyRate()` calcula correctamente la tasa de ocupación
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Room`, `Reservation` y `Hotel` con todos los métodos requeridos
3. Ejecuta los tests: `npm test hotel-management` o `npm run test -- 37-hotel-management`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Date Object - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.some() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

---

**💡 Tip:** Empieza implementando `hasOverlap()` primero, ya que es fundamental para validar reservas. Luego implementa `createReservation()` usando esta función para validar solapamientos.

