# Sistema de Gestión de Eventos y Calendario

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Manejo de Fechas, Validación de Datos  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de eventos y calendario que permita crear eventos, detectar conflictos de horarios, filtrar eventos por fecha, categoría y rango, y generar estadísticas del calendario.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Event` y `Calendar`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Manejar fechas y cálculos de tiempo
- [ ] Detectar conflictos y solapamientos de horarios
- [ ] Filtrar y buscar eventos por diferentes criterios
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`, `some`)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa dos clases en `exercise.js`:

### Clase `Event`

Representa un evento en el calendario.

#### Constructor
- `constructor(title, description, startTime, endTime, category)` - Crea un evento con todos sus datos

#### Métodos
- `getDuration()` - Calcula duración en horas (con 2 decimales)
- `isAllDay()` - Verifica si es evento de todo el día (24 horas)
- `getCategory()` - Retorna la categoría
- `updateTime(newStartTime, newEndTime)` - Actualiza horario del evento
- `overlapsWith(otherEvent)` - Verifica si se solapa con otro evento

### Clase `Calendar`

Gestiona un calendario de eventos.

#### Constructor
- `constructor(ownerName)` - Crea un calendario con nombre del dueño

#### Métodos
- `addEvent(event)` - Agrega un evento (valida conflictos)
- `removeEvent(event)` - Elimina un evento del calendario
- `findEvent(eventIndex)` - Busca un evento por índice
- `getEventsByDate(date)` - Retorna eventos de una fecha usando `filter()`
- `getEventsByCategory(category)` - Filtra eventos por categoría usando `filter()`
- `getEventsByDateRange(startDate, endDate)` - Retorna eventos en un rango usando `filter()`
- `hasConflict(event)` - Verifica si un evento tiene conflictos usando `some()`
- `getUpcomingEvents(days)` - Retorna eventos próximos en N días usando `filter()`
- `getBusyDays()` - Retorna días con eventos
- `getCalendarSummary()` - Retorna estadísticas completas del calendario

## 💡 Ejemplos

### Ejemplo 1: Crear Evento

```javascript
const event = new Event(
    'Reunión de equipo',
    'Reunión semanal del equipo de desarrollo',
    new Date('2024-12-20T10:00:00'),
    new Date('2024-12-20T11:30:00'),
    'Work'
);

console.log(event.getDuration()); // 1.50 horas
console.log(event.isAllDay()); // false
console.log(event.getCategory()); // "Work"
```

### Ejemplo 2: Gestionar Calendario

```javascript
const calendar = new Calendar('Juan Pérez');

const event1 = new Event('Reunión', 'Descripción', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
const event2 = new Event('Almuerzo', 'Descripción', new Date('2024-12-20T12:00:00'), new Date('2024-12-20T13:00:00'), 'Personal');

calendar.addEvent(event1);
calendar.addEvent(event2);

const events = calendar.getEventsByDate(new Date('2024-12-20'));
console.log(events.length); // 2
```

### Ejemplo 3: Detectar Conflictos

```javascript
const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T10:30:00'), new Date('2024-12-20T11:30:00'), 'Work');

console.log(event1.overlapsWith(event2)); // true (se solapan)

calendar.addEvent(event1);
try {
    calendar.addEvent(event2); // Error: "Event conflicts with existing event"
} catch (error) {
    console.log(error.message);
}
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Event constructor | parámetros válidos | Event creado | Constructor básico |
| getDuration | evento de 1.5 horas | 1.50 | Cálculo correcto |
| isAllDay | evento de 24 horas | true | Detección correcta |
| overlapsWith | eventos solapados | true | Detección de solapamiento |
| Calendar addEvent | evento sin conflictos | Evento agregado | Agregado exitoso |
| Calendar addEvent | evento con conflictos | Error "Event conflicts" | Validación de conflictos |
| getEventsByDate | fecha con eventos | Array de eventos | Filtrado correcto |
| getEventsByCategory | categoría existente | Array filtrado | Filtrado por categoría |
| getUpcomingEvents | días=7 | Eventos próximos | Filtrado de próximos eventos |

## ⚠️ Validaciones Requeridas

### Event
- Título, descripción y categoría no pueden estar vacíos
- startTime y endTime deben ser instancias de Date
- endTime debe ser posterior a startTime

### Calendar
- Nombre del dueño no puede estar vacío
- Los eventos deben ser instancias de Event
- No se pueden agregar eventos con conflictos de horario
- date, startDate y endDate deben ser instancias de Date
- days en getUpcomingEvents debe ser > 0

## 🧮 Cálculos

### Duración del Evento
```
Duración (horas) = (endTime - startTime) / (1000 * 60 * 60)
```

### Evento de Todo el Día
```
Es de todo el día si: duración === 24 horas
```

### Solapamiento de Eventos
```
Dos eventos se solapan si: (start1 < end2) && (end1 > start2)
```

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Calcular duración en horas</summary>

Para calcular la duración en horas:
```javascript
const diffInMs = this.endTime - this.startTime;
const hours = diffInMs / (1000 * 60 * 60);
return parseFloat(hours.toFixed(2));
```

</details>

<details>
<summary>💡 Pista 2 – Verificar solapamiento</summary>

Dos eventos se solapan si:
```javascript
const overlaps = (this.startTime < otherEvent.endTime) && (this.endTime > otherEvent.startTime);
```

</details>

<details>
<summary>💡 Pista 3 – Filtrar eventos por fecha</summary>

Compara año, mes y día:
```javascript
const sameDay = event.startTime.getFullYear() === date.getFullYear() &&
                event.startTime.getMonth() === date.getMonth() &&
                event.startTime.getDate() === date.getDate();
```

</details>

<details>
<summary>💡 Pista 4 – Obtener días ocupados</summary>

Usa un Set para almacenar fechas únicas y crea fechas sin hora:
```javascript
const busyDaysSet = new Set();
this.events.forEach(event => {
    const dateOnly = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
    busyDaysSet.add(dateOnly.getTime());
});
return Array.from(busyDaysSet).map(timestamp => new Date(timestamp));
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Event` con constructor y métodos básicos
2. Implementa métodos de cálculo (`getDuration`, `isAllDay`)
3. Implementa `overlapsWith()` para detectar solapamientos
4. Implementa la clase `Calendar` con constructor y métodos básicos
5. Implementa `hasConflict()` usando `some()`
6. Implementa métodos de filtrado usando `filter()`
7. Implementa `getCalendarSummary()` con estadísticas
8. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Event` valida todos los parámetros correctamente
- [ ] `getDuration()` calcula correctamente con 2 decimales
- [ ] `isAllDay()` detecta correctamente eventos de 24 horas
- [ ] `overlapsWith()` detecta correctamente solapamientos
- [ ] La clase `Calendar` gestiona eventos correctamente
- [ ] `hasConflict()` usa `some()` correctamente
- [ ] `getEventsByDate()`, `getEventsByCategory()` y `getEventsByDateRange()` usan `filter()`
- [ ] `getUpcomingEvents()` filtra correctamente eventos próximos
- [ ] `getBusyDays()` retorna días únicos correctamente
- [ ] `getCalendarSummary()` retorna todas las estadísticas
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Event` y `Calendar` con todos los métodos requeridos
3. Ejecuta los tests: `npm test event-calendar` o `npm run test -- 38-event-calendar`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Date Object - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.some() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Set - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)

---

**💡 Tip:** Empieza implementando `overlapsWith()` primero, ya que es fundamental para detectar conflictos. Luego implementa `hasConflict()` usando este método y `some()` para verificar todos los eventos existentes.

