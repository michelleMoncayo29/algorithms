# Sistema de Gestión de Gimnasio

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Manejo de Fechas, Validación de Datos  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de gimnasio que permita gestionar miembros con diferentes tipos de membresía, registrar entradas, calcular cuotas según el tipo de membresía, verificar estado de membresías y generar estadísticas del gimnasio.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Member` y `Gym`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Manejar fechas y cálculos de tiempo
- [ ] Realizar cálculos basados en tipos de membresía
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`)
- [ ] Gestionar estado de objetos (entradas, renovaciones)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa dos clases en `exercise.js`:

### Clase `Member`

Representa un miembro del gimnasio.

#### Constructor
- `constructor(id, name, email, membershipType, startDate)` - Crea un miembro con todos sus datos
- Valida que todos los parámetros sean válidos

#### Métodos
- `checkIn()` - Registra una entrada al gimnasio
- `getCheckInHistory()` - Retorna historial de entradas
- `getTotalVisits()` - Calcula total de visitas
- `getMembershipFee()` - Calcula cuota según tipo (basic: $30, premium: $50, vip: $80)
- `isMembershipActive()` - Verifica si la membresía está activa (12 meses)
- `renewMembership(months)` - Renueva la membresía por N meses
- `getDaysSinceJoined()` - Calcula días desde que se unió
- `getMembershipExpiryDate()` - Retorna fecha de vencimiento (12 meses después)

### Clase `Gym`

Gestiona el gimnasio y sus miembros.

#### Constructor
- `constructor(name, address)` - Crea un gimnasio con nombre y dirección

#### Métodos
- `registerMember(member)` - Registra un nuevo miembro
- `findMember(memberId)` - Busca un miembro por ID usando `find()`
- `removeMember(memberId)` - Elimina un miembro
- `getMembersByType(membershipType)` - Filtra miembros por tipo usando `filter()`
- `getActiveMembers()` - Retorna miembros activos usando `filter()`
- `getMembersNeedingRenewal()` - Retorna miembros próximos a vencer (30 días)
- `getDailyAttendance(date)` - Retorna entradas de un día específico
- `getTotalRevenue()` - Calcula ingresos totales usando `reduce()`
- `getAverageVisitsPerMember()` - Calcula promedio de visitas
- `getGymStatistics()` - Retorna estadísticas completas

## 💡 Ejemplos

### Ejemplo 1: Crear Miembro y Registrar Entradas

```javascript
const member = new Member('M001', 'Juan Pérez', 'juan@email.com', 'premium', new Date('2024-01-15'));

member.checkIn(); // Registra entrada hoy
member.checkIn(); // Registra otra entrada

console.log(member.getTotalVisits()); // 2
console.log(member.getMembershipFee()); // 50 (premium)
console.log(member.isMembershipActive()); // true (menos de 12 meses)
```

### Ejemplo 2: Gestionar Gimnasio

```javascript
const gym = new Gym('FitZone', 'Calle Principal 123');

const member1 = new Member('M001', 'Juan Pérez', 'juan@email.com', 'premium', new Date('2024-01-15'));
const member2 = new Member('M002', 'María García', 'maria@email.com', 'basic', new Date('2024-06-01'));

gym.registerMember(member1);
gym.registerMember(member2);

member1.checkIn();
member1.checkIn();
member2.checkIn();

console.log(gym.getActiveMembers().length); // 2
console.log(gym.getTotalRevenue()); // 80 (50 + 30)
console.log(gym.getAverageVisitsPerMember()); // 1.50
```

### Ejemplo 3: Renovar Membresía

```javascript
const member = new Member('M001', 'Juan Pérez', 'juan@email.com', 'premium', new Date('2023-01-15'));

// Renovar por 6 meses más
const newStartDate = member.renewMembership(6);
console.log(member.isMembershipActive()); // true (renovada)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Member constructor | parámetros válidos | Member creado | Constructor básico |
| checkIn | - | Entrada registrada | Registrar entrada |
| getMembershipFee | membershipType='premium' | 50 | Cuota según tipo |
| isMembershipActive | membresía nueva | true | Membresía activa |
| isMembershipActive | membresía vieja (>12 meses) | false | Membresía vencida |
| renewMembership | months=6 | Fecha actualizada | Renovación exitosa |
| Gym registerMember | member válido | Miembro registrado | Registro exitoso |
| Gym getActiveMembers | miembros activos y vencidos | Solo activos | Filtrado correcto |
| Gym getTotalRevenue | miembros con diferentes tipos | Suma de cuotas | Cálculo de ingresos |

## ⚠️ Validaciones Requeridas

### Member
- ID, nombre y email no pueden estar vacíos
- membershipType debe ser: 'basic', 'premium', 'vip'
- startDate debe ser una instancia de Date
- months en renewMembership debe ser > 0

### Gym
- Nombre y dirección no pueden estar vacíos
- Los miembros deben ser instancias de Member
- No se pueden registrar miembros duplicados (mismo ID)
- date en getDailyAttendance debe ser una instancia de Date

## 🧮 Cálculos

### Cuotas de Membresía
- **basic**: $30/mes
- **premium**: $50/mes
- **vip**: $80/mes

### Duración de Membresía
- Todas las membresías duran **12 meses** desde la fecha de inicio
- Una membresía está activa si han pasado menos de 12 meses

### Renovación
- Al renovar, se actualiza la fecha de inicio sumando los meses especificados
- La nueva fecha de vencimiento será 12 meses después de la nueva fecha de inicio

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Manejo de fechas</summary>

Para sumar meses a una fecha, crea una nueva fecha y usa `setMonth()`:
```javascript
const newDate = new Date(startDate);
newDate.setMonth(newDate.getMonth() + months);
```

</details>

<details>
<summary>💡 Pista 2 – Comparar fechas</summary>

Para comparar si una fecha es anterior a otra:
```javascript
const isActive = new Date() < expiryDate;
```

</details>

<details>
<summary>💡 Pista 3 – Filtrar por día específico</summary>

Para filtrar entradas de un día específico, compara año, mes y día:
```javascript
const sameDay = entry.date.getFullYear() === date.getFullYear() &&
                entry.date.getMonth() === date.getMonth() &&
                entry.date.getDate() === date.getDate();
```

</details>

<details>
<summary>💡 Pista 4 – Calcular ingresos con reduce()</summary>

Usa `reduce()` para sumar las cuotas:
```javascript
return this.members.reduce((total, member) => {
    return total + member.getMembershipFee();
}, 0);
```

</details>

<details>
<summary>💡 Pista 5 – Estadísticas del gimnasio</summary>

Para contar miembros por tipo, usa `reduce()`:
```javascript
const membersByType = this.members.reduce((acc, member) => {
    acc[member.membershipType] = (acc[member.membershipType] || 0) + 1;
    return acc;
}, {});
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Member` con constructor y validaciones
2. Implementa métodos básicos de `Member` (checkIn, getTotalVisits)
3. Implementa métodos de cálculo (getMembershipFee, isMembershipActive)
4. Implementa métodos de fecha (renewMembership, getDaysSinceJoined)
5. Implementa la clase `Gym` con constructor y métodos básicos
6. Implementa métodos de filtrado y cálculo usando arrays
7. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Member` valida todos los parámetros correctamente
- [ ] `getMembershipFee()` retorna la cuota correcta según el tipo
- [ ] `isMembershipActive()` calcula correctamente si está activa
- [ ] `renewMembership()` valida y actualiza la fecha correctamente
- [ ] La clase `Gym` gestiona miembros correctamente
- [ ] `getActiveMembers()` usa `filter()` correctamente
- [ ] `getTotalRevenue()` usa `reduce()` correctamente
- [ ] `getGymStatistics()` retorna todas las estadísticas
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Member` y `Gym` con todos los métodos requeridos
3. Ejecuta los tests: `npm test gym-management` o `npm run test -- 35-gym-management`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Date Object - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Empieza implementando la clase `Member` y prueba sus métodos antes de pasar a `Gym`. Presta especial atención al manejo de fechas, ya que es crucial para validar membresías y calcular renovaciones.

