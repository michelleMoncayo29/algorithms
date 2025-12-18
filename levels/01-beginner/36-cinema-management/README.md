# Sistema de Gestión de Cine

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Manejo de Fechas, Validación de Datos  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de cine que permita gestionar películas, crear proyecciones, vender boletos, gestionar capacidad de salas y calcular ingresos por película y totales del cine.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Movie`, `Screening`, `Cinema`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Manejar fechas y cálculos de tiempo
- [ ] Gestionar capacidad y disponibilidad de asientos
- [ ] Realizar cálculos de ingresos
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa tres clases en `exercise.js`:

### Clase `Movie`

Representa una película.

#### Constructor
- `constructor(title, duration, genre, rating)` - Crea una película con todos sus datos

#### Métodos
- `getDuration()` - Retorna duración en minutos
- `getGenre()` - Retorna género
- `getRating()` - Retorna clasificación

### Clase `Screening`

Representa una proyección de una película.

#### Constructor
- `constructor(movie, room, startTime, ticketPrice)` - Crea una proyección

#### Métodos
- `getAvailableSeats(cinema)` - Calcula asientos disponibles
- `sellTickets(cinema, quantity)` - Vende boletos (valida disponibilidad)
- `getRevenue()` - Calcula ingresos de esta proyección
- `isFull(cinema)` - Verifica si está llena
- `getEndTime()` - Calcula hora de finalización

### Clase `Cinema`

Gestiona el cine y sus operaciones.

#### Constructor
- `constructor(name, totalSeats)` - Crea un cine con nombre y capacidad total

#### Métodos
- `addMovie(movie)` - Agrega una película al cine
- `setRoomCapacity(roomName, capacity)` - Establece capacidad de una sala
- `getRoomCapacity(roomName)` - Obtiene capacidad de una sala
- `createScreening(movie, room, startTime, ticketPrice)` - Crea una nueva proyección
- `getScreeningsByMovie(movieTitle)` - Retorna proyecciones de una película usando `filter()`
- `getScreeningsByDate(date)` - Retorna proyecciones de una fecha usando `filter()`
- `getTotalRevenue()` - Calcula ingresos totales usando `reduce()`
- `getMostPopularMovie()` - Retorna película más vendida

## 💡 Ejemplos

### Ejemplo 1: Crear Película y Proyección

```javascript
const cinema = new Cinema('CineMax', 500);
const movie = new Movie('Avengers', 180, 'Action', 'PG-13');
cinema.addMovie(movie);

cinema.setRoomCapacity('Sala 1', 100);
const screening = cinema.createScreening(movie, 'Sala 1', new Date('2024-12-25T19:00:00'), 12.50);

console.log(screening.getAvailableSeats(cinema)); // 100
console.log(screening.getEndTime()); // 2024-12-25T22:00:00 (180 minutos después)
```

### Ejemplo 2: Vender Boletos

```javascript
screening.sellTickets(cinema, 50);
console.log(screening.getAvailableSeats(cinema)); // 50
console.log(screening.getRevenue()); // 625 (50 * 12.50)
console.log(screening.isFull(cinema)); // false
```

### Ejemplo 3: Obtener Proyecciones y Estadísticas

```javascript
const date = new Date('2024-12-25');
const screenings = cinema.getScreeningsByDate(date);
console.log(screenings.length); // 1

console.log(cinema.getTotalRevenue()); // 625
console.log(cinema.getMostPopularMovie()); // "Avengers"
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Movie constructor | parámetros válidos | Movie creada | Constructor básico |
| Screening constructor | parámetros válidos | Screening creada | Constructor básico |
| getAvailableSeats | cinema válido | Asientos disponibles | Cálculo correcto |
| sellTickets | quantity válido | Boletos vendidos | Venta exitosa |
| sellTickets | sin asientos | Error "Not enough seats available" | Validación de capacidad |
| getRevenue | proyección con ventas | Ingresos calculados | Cálculo correcto |
| getTotalRevenue | múltiples proyecciones | Suma de ingresos | Cálculo total |
| getMostPopularMovie | proyecciones con ventas | Película más vendida | Búsqueda correcta |

## ⚠️ Validaciones Requeridas

### Movie
- Título, género y clasificación no pueden estar vacíos
- Duración debe ser > 0

### Screening
- Movie debe ser instancia de Movie
- Room no puede estar vacío
- startTime debe ser instancia de Date
- ticketPrice debe ser > 0
- quantity en sellTickets debe ser > 0

### Cinema
- Nombre no puede estar vacío
- totalSeats debe ser > 0
- roomName no puede estar vacío
- capacity debe ser > 0
- date debe ser instancia de Date

## 🧮 Cálculos

### Asientos Disponibles
```
Asientos Disponibles = Capacidad de Sala - Boletos Vendidos
```

### Ingresos de Proyección
```
Ingresos = Precio del Boleto × Boletos Vendidos
```

### Hora de Finalización
```
Hora Finalización = Hora Inicio + Duración de Película (en minutos)
```

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Manejo de fechas</summary>

Para calcular la hora de finalización, usa `setMinutes()`:
```javascript
const endTime = new Date(startTime);
endTime.setMinutes(endTime.getMinutes() + movie.getDuration());
```

</details>

<details>
<summary>💡 Pista 2 – Filtrar por fecha</summary>

Para filtrar proyecciones por fecha, compara año, mes y día:
```javascript
const sameDay = screening.startTime.getFullYear() === date.getFullYear() &&
                screening.startTime.getMonth() === date.getMonth() &&
                screening.startTime.getDate() === date.getDate();
```

</details>

<details>
<summary>💡 Pista 3 – Calcular ingresos con reduce()</summary>

Usa `reduce()` para sumar los ingresos:
```javascript
return this.screenings.reduce((total, screening) => {
    return total + screening.getRevenue();
}, 0);
```

</details>

<details>
<summary>💡 Pista 4 – Encontrar película más popular</summary>

Agrupa las proyecciones por película y suma los boletos vendidos, luego encuentra la máxima.

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Movie` con constructor y métodos básicos
2. Implementa la clase `Screening` con constructor y métodos de cálculo
3. Implementa la clase `Cinema` con constructor y métodos de gestión
4. Implementa métodos de filtrado usando `filter()`
5. Implementa métodos de cálculo usando `reduce()`
6. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Movie` valida todos los parámetros correctamente
- [ ] La clase `Screening` valida parámetros y calcula correctamente
- [ ] `getAvailableSeats()` calcula correctamente los asientos disponibles
- [ ] `sellTickets()` valida capacidad antes de vender
- [ ] `getEndTime()` calcula correctamente la hora de finalización
- [ ] La clase `Cinema` gestiona películas y proyecciones correctamente
- [ ] `getScreeningsByMovie()` y `getScreeningsByDate()` usan `filter()`
- [ ] `getTotalRevenue()` usa `reduce()` correctamente
- [ ] `getMostPopularMovie()` encuentra la película correcta
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Movie`, `Screening` y `Cinema` con todos los métodos requeridos
3. Ejecuta los tests: `npm test cinema-management` o `npm run test -- 36-cinema-management`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Date Object - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Empieza implementando la clase `Movie` y prueba sus métodos antes de pasar a `Screening`. Recuerda que `Screening` necesita una instancia de `Movie` y `Cinema` para funcionar completamente.

