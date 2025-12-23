# Sistema de Gestión de Suscripciones

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Validaciones, Manejo de Fechas  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Un servicio de suscripciones necesita gestionar planes de suscripción, suscriptores y pagos. El sistema debe permitir crear planes con diferentes características, registrar suscriptores, manejar renovaciones, calcular estados de membresía basados en fechas y generar reportes de ingresos y cancelaciones. Tu misión es crear tres clases (`Subscription`, `Subscriber` y `SubscriptionService`) que permitan gestionar estas operaciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de clases con múltiples propiedades y métodos complejos
- [ ] Aplicar validaciones tempranas (Fail Fast) con mensajes descriptivos
- [ ] Implementar cálculos basados en fechas (vencimiento, días restantes)
- [ ] Gestionar relaciones entre clases (suscriptores y planes)
- [ ] Usar métodos de arrays (filter, reduce) para reportes
- [ ] Reforzar principios KISS, Código Expresivo y Responsabilidad Única

## 📝 Enunciado Detallado

Implementa tres clases en `exercise.js`:

### 1. Clase `Subscription`

**Propiedades:**
- `planName` (string): Nombre del plan (no puede estar vacío)
- `price` (number): Precio mensual (debe ser mayor que 0)
- `duration` (number): Duración en meses (debe ser mayor que 0)
- `features` (array): Array de características del plan (inicializa vacío)
- `startDate` (Date|null): Fecha de inicio (null si no está activa)

**Constructor:**
- Valida que `planName` sea string no vacío → Error: "Plan name is required"
- Valida que `price` sea número mayor que 0 → Error: "Subscription price must be greater than 0"
- Valida que `duration` sea número mayor que 0 → Error: "Subscription duration must be greater than 0"
- Inicializa `features = []`, `startDate = null`

**Métodos:**

- `isActive()`
  - Calcula si la suscripción está activa (startDate no null y fecha actual < fecha de vencimiento)
  - Retorna `boolean`

- `getDaysRemaining()`
  - Calcula días restantes hasta el vencimiento
  - Si no está activa, retorna 0
  - Retorna número entero (días)

- `getExpiryDate()`
  - Calcula fecha de vencimiento (startDate + duration meses)
  - Si no está activa, retorna `null`
  - Retorna `Date`

- `hasFeature(featureName)`
  - Valida que `featureName` sea string → Error: "Feature name must be a string"
  - Verifica si el plan incluye la característica
  - Retorna `boolean`

- `calculateTotalCost()`
  - Calcula costo total del plan (price × duration)
  - Retorna número con 2 decimales

### 2. Clase `Subscriber`

**Propiedades:**
- `subscriberId` (string): ID único del suscriptor (no puede estar vacío)
- `name` (string): Nombre del suscriptor (no puede estar vacío)
- `email` (string): Email del suscriptor (no puede estar vacío)
- `subscription` (Subscription|null): Plan de suscripción actual (null si no tiene)
- `paymentHistory` (array): Array de objetos de pago { amount, date }

**Constructor:**
- Valida que `subscriberId` sea string no vacío → Error: "Subscriber ID is required"
- Valida que `name` sea string no vacío → Error: "Subscriber name is required"
- Valida que `email` sea string no vacío → Error: "Subscriber email is required"
- Inicializa `subscription = null`, `paymentHistory = []`

**Métodos:**

- `subscribe(subscription)`
  - Valida que `subscription` sea instancia de `Subscription` → Error: "Subscription must be an instance of Subscription"
  - Asigna suscripción y establece startDate a fecha actual
  - Retorna `true`

- `renew(months)`
  - Valida que `months` sea número mayor que 0 → Error: "Months must be greater than 0"
  - Valida que tenga suscripción activa → Error: "No active subscription to renew"
  - Extiende la duración sumando meses al startDate original
  - Retorna nueva fecha de inicio

- `cancel()`
  - Valida que tenga suscripción activa → Error: "No active subscription to cancel"
  - Cancela suscripción (establece subscription a null)
  - Retorna `true`

- `addPayment(amount, date)`
  - Valida que `amount` sea número mayor que 0 → Error: "Payment amount must be greater than 0"
  - Valida que `date` sea instancia de Date → Error: "Payment date must be a Date object"
  - Agrega pago al historial
  - Retorna número total de pagos

- `getTotalPaid()`
  - Suma todos los pagos del historial usando `reduce()`
  - Retorna número con 2 decimales

- `getSubscriptionStatus()`
  - Retorna string: 'active', 'expired', o 'none'
  - 'active' si subscription.isActive() es true
  - 'expired' si tiene subscription pero no está activa
  - 'none' si no tiene subscription

### 3. Clase `SubscriptionService`

**Propiedades:**
- `name` (string): Nombre del servicio (no puede estar vacío)
- `subscriptions` (array): Array de planes disponibles
- `subscribers` (array): Array de suscriptores registrados

**Constructor:**
- Valida que `name` sea string no vacío → Error: "Service name is required"
- Inicializa `subscriptions = []`, `subscribers = []`

**Métodos:**

- `addSubscriptionPlan(subscription)`
  - Valida que sea instancia de `Subscription` → Error: "Subscription must be an instance of Subscription"
  - Valida que no exista plan con mismo nombre → Error: "Subscription plan already exists"
  - Agrega plan y retorna total de planes

- `registerSubscriber(subscriber)`
  - Valida que sea instancia de `Subscriber` → Error: "Subscriber must be an instance of Subscriber"
  - Valida que no exista suscriptor con mismo ID → Error: "Subscriber ID already exists"
  - Agrega suscriptor y retorna total de suscriptores

- `getActiveSubscribers()`
  - Filtra suscriptores con suscripción activa usando `filter()`
  - Retorna nuevo array

- `getSubscribersByPlan(planName)`
  - Valida que `planName` sea string → Error: "Plan name must be a string"
  - Filtra suscriptores con ese plan usando `filter()`
  - Retorna nuevo array

- `getRevenue()`
  - Suma ingresos de suscriptores activos (subscription.calculateTotalCost() / duration × meses transcurridos)
  - Usa `reduce()` para calcular
  - Retorna número con 2 decimales

- `getChurnRate()`
  - Calcula porcentaje de cancelaciones (suscriptores cancelados / total suscriptores)
  - Retorna número con 2 decimales (0-100)

- `getMostPopularPlan()`
  - Encuentra plan con más suscriptores
  - Retorna `Subscription|null`

## 💡 Ejemplos

### Ejemplo 1
```javascript
const subscription = new Subscription('Premium', 50, 12);
subscription.startDate = new Date('2024-01-01');
console.log(subscription.isActive()); // true si fecha actual < vencimiento
console.log(subscription.calculateTotalCost()); // 600.00 (50 × 12)
```

### Ejemplo 2
```javascript
const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');
const plan = new Subscription('Basic', 30, 6);
subscriber.subscribe(plan);
console.log(subscriber.getSubscriptionStatus()); // 'active'
```

### Ejemplo 3
```javascript
const service = new SubscriptionService('MyService');
const plan = new Subscription('Premium', 50, 12);
const subscriber = new Subscriber('S001', 'Juan', 'juan@email.com');

service.addSubscriptionPlan(plan);
service.registerSubscriber(subscriber);
subscriber.subscribe(plan);

const active = service.getActiveSubscribers();
console.log(active.length); // 1
```

## ⚙️ Restricciones y Reglas

- Todos los mensajes de error y nombres deben estar en inglés
- No se permite usar librerías externas
- Los cálculos de fechas deben ser precisos
- Una suscripción está activa si la fecha actual < fecha de vencimiento
- La fecha de vencimiento se calcula sumando duration meses a startDate

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Suscripción activa | `subscription.isActive()` | `true` si no vencida | Caso básico |
| Renovar suscripción | `subscriber.renew(6)` | Nueva fecha de inicio | Operación |
| Calcular ingresos | `service.getRevenue()` | Suma de ingresos activos | Cálculo |
| Plan más popular | `service.getMostPopularPlan()` | Plan con más suscriptores | Reporte |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Cálculo de vencimiento</summary>
Para calcular fecha de vencimiento, crea una nueva Date basada en startDate y usa setMonth() para sumar los meses.
</details>

<details>
<summary>💡 Pista 2 – Estado de suscripción</summary>
Una suscripción está activa si startDate existe y la fecha actual es anterior a la fecha de vencimiento.
</details>

<details>
<summary>💡 Pista 3 – Plan más popular</summary>
Agrupa suscriptores por plan, cuenta cuántos tienen cada plan y encuentra el máximo.
</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Subscription` con constructor y métodos de fecha
2. Implementa la clase `Subscriber` con gestión de suscripción
3. Crea la clase `SubscriptionService` con constructor
4. Implementa métodos de gestión (addSubscriptionPlan, registerSubscriber)
5. Implementa métodos de reporte (getRevenue, getChurnRate, getMostPopularPlan)
6. Ejecuta los tests: `npm test subscription-management`
7. Refactoriza si encuentras duplicaciones

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden exactamente
- [ ] Los cálculos de fechas son correctos
- [ ] La gestión de estados funciona correctamente
- [ ] Los tests `npm test subscription-management` pasan al 100%
- [ ] No se exponen arrays internos directamente

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases solicitadas
3. Corre `npm test subscription-management` (o `npm run t subscription-management`)
4. Opcional: `npm start subscription-management` carga el archivo con el runner

## 📚 Recursos Adicionales

- [Date Objects - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Date.prototype.setMonth](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- [Array.prototype.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Para manejar fechas, usa métodos como setMonth() y getTime() para cálculos precisos. Recuerda que los meses en JavaScript son 0-indexados.

