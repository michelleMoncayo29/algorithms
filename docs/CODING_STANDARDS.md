# Estándares de Código

## 🎯 Propósito

Este documento establece los estándares de código que deben seguirse en todos los ejercicios del repositorio de algoritmos.

## 📋 Reglas Generales

### Estructura de Archivos
Cada ejercicio debe contener exactamente estos archivos:
- `README.md` - Documentación del problema
- `exercise.js` - Implementación del ejercicio
- `exercise.test.js` - Tests unitarios
- `hints.md` - Pistas progresivas (opcional)

### Nomenclatura
- **Archivos**: kebab-case (`two-sum`, `binary-search`)
- **Funciones**: camelCase (`twoSum`, `binarySearch`)
- **Variables**: camelCase (`targetSum`, `currentIndex`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_SIZE`, `DEFAULT_VALUE`)

## 🎯 Principios de Programación

### DRY (Don't Repeat Yourself)
```javascript
// ✅ Correcto - Evita duplicación
const validateInput = (input) => {
    if (!input || input.length === 0) {
        throw new Error('Input no puede estar vacío');
    }
};

function processData(data) {
    validateInput(data);
    // Procesar datos...
}

// ❌ Incorrecto - Código duplicado
function processData(data) {
    if (!data || data.length === 0) {
        throw new Error('Input no puede estar vacío');
    }
    // Procesar datos...
}

function saveData(data) {
    if (!data || data.length === 0) {
        throw new Error('Input no puede estar vacío');
    }
    // Guardar datos...
}
```

### KISS (Keep It Simple, Stupid)
```javascript
// ✅ Correcto - Simple y claro
function findMax(numbers) {
    return Math.max(...numbers);
}

// ❌ Incorrecto - Innecesariamente complejo
function findMax(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}
```

### YAGNI (You Aren't Gonna Need It)
```javascript
// ✅ Correcto - Solo lo necesario
function calculateSum(a, b) {
    return a + b;
}

// ❌ Incorrecto - Funcionalidad innecesaria
function calculateSum(a, b, options = {}) {
    const { logging = false, validation = true, cache = false } = options;
    
    if (validation) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input');
        }
    }
    
    if (cache && cache.has(`${a}+${b}`)) {
        return cache.get(`${a}+${b}`);
    }
    
    const result = a + b;
    
    if (logging) {
        console.log(`Sum: ${a} + ${b} = ${result}`);
    }
    
    if (cache) {
        cache.set(`${a}+${b}`, result);
    }
    
    return result;
}
```

### Responsabilidad Única
```javascript
// ✅ Correcto - Una función, una responsabilidad
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail(email, message) {
    // Lógica para enviar email
}

// ❌ Incorrecto - Múltiples responsabilidades
function validateAndSendEmail(email, message) {
    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Email inválido');
    }
    
    // Enviar email
    // Lógica de envío...
    
    // Log del envío
    console.log('Email enviado');
    
    // Actualizar contador
    updateEmailCounter();
}
```

### Código Expresivo
```javascript
// ✅ Correcto - Nombres que expresan intención
function findUserByEmail(userList, email) {
    return userList.find(user => user.email === email);
}

const isUserActive = (user) => user.status === 'active';
const hasPermission = (user, permission) => user.permissions.includes(permission);

// ❌ Incorrecto - Nombres poco expresivos
function findUser(list, str) {
    return list.find(item => item.email === str);
}

function check(user) {
    return user.status === 'active';
}

function validate(u, p) {
    return u.permissions.includes(p);
}
```

### Funciones Pequeñas
```javascript
// ✅ Correcto - Funciones pequeñas y enfocadas
function calculateTax(amount, rate) {
    return amount * rate;
}

function calculateDiscount(amount, discountPercentage) {
    return amount * (discountPercentage / 100);
}

function calculateFinalPrice(amount, taxRate, discountPercentage) {
    const tax = calculateTax(amount, taxRate);
    const discount = calculateDiscount(amount, discountPercentage);
    return amount + tax - discount;
}

// ❌ Incorrecto - Función muy grande
function processOrder(order) {
    // Validar orden
    if (!order.items || order.items.length === 0) {
        throw new Error('Orden vacía');
    }
    
    // Calcular subtotal
    let subtotal = 0;
    for (const item of order.items) {
        subtotal += item.price * item.quantity;
    }
    
    // Calcular impuestos
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    
    // Calcular descuento
    let discount = 0;
    if (order.customer.isVip) {
        discount = subtotal * 0.1;
    }
    
    // Calcular total
    const total = subtotal + tax - discount;
    
    // Guardar orden
    // ... lógica de guardado
    
    // Enviar confirmación
    // ... lógica de envío
    
    return total;
}
```

### Fail Fast
```javascript
// ✅ Correcto - Validación temprana
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Los argumentos deben ser números');
    }
    
    if (b === 0) {
        throw new Error('División por cero no permitida');
    }
    
    return a / b;
}

// ❌ Incorrecto - Validación tardía
function divide(a, b) {
    const result = a / b;
    
    if (!isFinite(result)) {
        throw new Error('Resultado inválido');
    }
    
    return result;
}
```

### Inmutabilidad
```javascript
// ✅ Correcto - No mutar datos originales
function addItemToList(list, newItem) {
    return [...list, newItem];
}

function updateUser(user, updates) {
    return { ...user, ...updates };
}

// ❌ Incorrecto - Mutar datos originales
function addItemToList(list, newItem) {
    list.push(newItem);
    return list;
}

function updateUser(user, updates) {
    Object.assign(user, updates);
    return user;
}
```

### Ley de Demeter
```javascript
// ✅ Correcto - Acceso directo
function getUserName(user) {
    return user.getName();
}

// ❌ Incorrecto - Encadenamiento profundo
function getUserName(user) {
    return user.getProfile().getPersonalInfo().getName();
}
```

### Separación de Intereses
```javascript
// ✅ Correcto - Separación clara
class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    
    async createUser(userData) {
        const user = await this.userRepository.save(userData);
        await this.emailService.sendWelcomeEmail(user.email);
        return user;
    }
}

// ❌ Incorrecto - Mezcla de responsabilidades
class UserService {
    async createUser(userData) {
        // Guardar en base de datos
        const connection = await mysql.createConnection(config);
        const result = await connection.query('INSERT INTO users...');
        
        // Enviar email
        const transporter = nodemailer.createTransporter(smtpConfig);
        await transporter.sendMail({
            to: userData.email,
            subject: 'Bienvenido',
            // ...
        });
        
        return result;
    }
}
```

## 🔧 Estándares de JavaScript

### Sintaxis
```javascript
// ✅ Correcto
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// ❌ Incorrecto
function calculate_sum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}
```

### Comentarios
```javascript
/**
 * Función que implementa el algoritmo de búsqueda binaria
 * @param {number[]} nums - Array ordenado de números
 * @param {number} target - Elemento a buscar
 * @returns {number} Índice del elemento o -1 si no existe
 */
function binarySearch(nums, target) {
    // Implementación aquí
}
```

### Manejo de Errores
```javascript
// ✅ Correcto
function safeDivide(a, b) {
    if (b === 0) {
        throw new Error('División por cero no permitida');
    }
    return a / b;
}

// ❌ Incorrecto
function safeDivide(a, b) {
    return a / b; // Sin validación
}
```

## 🧪 Estándares de Testing

### Estructura de Tests Estricta
Los tests deben seguir la estructura definida en `docs/TESTING_GUIDELINES.md` y usar el template actualizado que incluye:

```javascript
describe('Nombre del Ejercicio', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe manejar el caso básico', () => {
            expect(functionName(input)).toBe(expectedOutput);
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe manejar array vacío', () => {
            expect(functionName([])).toBe(expectedOutput);
        });
        
        test('debe manejar valores nulos', () => {
            expect(functionName(null)).toBe(expectedOutput);
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error con tipo de dato incorrecto', () => {
            expect(() => functionName(invalidInput)).toThrow(Error);
        });
    });

    // ===== TESTS DE RENDIMIENTO =====
    describe('Rendimiento y escalabilidad', () => {
        test('debe mantener complejidad esperada', () => {
            // Tests de complejidad temporal
        });
    });

    // ===== TESTS DE INMUTABILIDAD =====
    describe('Inmutabilidad', () => {
        test('no debe modificar el array original', () => {
            const original = [...testArray];
            functionName(testArray);
            expect(testArray).toEqual(original);
        });
    });
});
```

### Casos de Prueba Obligatorios
1. **Casos básicos**: Ejemplo principal del enunciado y casos típicos
2. **Casos edge**: Arrays vacíos, valores nulos/undefined, valores extremos
3. **Validación**: Inputs inválidos, tipos incorrectos, parámetros fuera de rango
4. **Rendimiento**: Arrays de diferentes tamaños, análisis de complejidad
5. **Inmutabilidad**: Verificar que no se modifiquen datos originales
6. **Precisión**: Números flotantes, valores muy pequeños/grandes
7. **Determinismo**: Resultados consistentes en múltiples ejecuciones
8. **Memoria**: Ausencia de memory leaks
9. **Errores**: Mensajes descriptivos y tipos correctos de error

## 📚 Estándares de Documentación

### README.md
- Título claro y descriptivo
- Descripción del problema
- Objetivos de aprendizaje
- Ejemplos con explicaciones
- Casos de prueba en tabla
- Restricciones claras
- Pistas progresivas
- Recursos adicionales

### Comentarios en Código
- Documentación JSDoc para funciones
- Comentarios explicativos para lógica compleja
- Pistas en el template inicial

## 🚀 Herramientas de Desarrollo

### ESLint
```json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### Prettier
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Composición sobre Herencia
```javascript
// ✅ Correcto - Composición
class Flyable {
    fly() {
        console.log('Volando...');
    }
}

class Swimmable {
    swim() {
        console.log('Nadando...');
    }
}

class Duck {
    constructor() {
        this.flyable = new Flyable();
        this.swimmable = new Swimmable();
    }
    
    fly() {
        this.flyable.fly();
    }
    
    swim() {
        this.swimmable.swim();
    }
}

// ❌ Incorrecto - Herencia compleja
class Animal {
    move() {}
}

class FlyableAnimal extends Animal {
    fly() {}
}

class SwimmableAnimal extends Animal {
    swim() {}
}

class FlyingSwimmingAnimal extends FlyableAnimal {
    // Problema: JavaScript no soporta herencia múltiple
    // Necesitarías mixins complejos
}
```

### Principio Boy Scout
```javascript
// ✅ Correcto - Siempre mejorar el código que tocas
// Si encuentras código como este:
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total = total + items[i].price;
    }
    return total;
}

// Mejóralo a:
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}
```

### Encapsulación
```javascript
// ✅ Correcto - Ocultar detalles internos
class BankAccount {
    constructor(initialBalance) {
        this._balance = initialBalance; // Propiedad privada (convención)
    }
    
    getBalance() {
        return this._balance;
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Cantidad debe ser positiva');
        }
        this._balance += amount;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Cantidad debe ser positiva');
        }
        if (amount > this._balance) {
            throw new Error('Fondos insuficientes');
        }
        this._balance -= amount;
    }
}

// ❌ Incorrecto - Exponer detalles internos
class BankAccount {
    constructor(initialBalance) {
        this.balance = initialBalance; // Acceso directo permitido
    }
}
```

### Abierto/Cerrado
```javascript
// ✅ Correcto - Extensible sin modificar código existente
class Shape {
    area() {
        throw new Error('Método debe ser implementado por subclases');
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius * this.radius;
    }
}

// ✅ Nuevo tipo de forma sin modificar código existente
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    
    area() {
        return (this.base * this.height) / 2;
    }
}
```

### Depender de Abstracciones
```javascript
// ✅ Correcto - Usar interfaces/abstracciones
class EmailService {
    send(email, message) {
        throw new Error('Método debe ser implementado');
    }
}

class SMTPEmailService extends EmailService {
    send(email, message) {
        // Implementación SMTP
        console.log(`Enviando email via SMTP a ${email}: ${message}`);
    }
}

class SendGridEmailService extends EmailService {
    send(email, message) {
        // Implementación SendGrid
        console.log(`Enviando email via SendGrid a ${email}: ${message}`);
    }
}

class NotificationService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    
    notifyUser(email, message) {
        this.emailService.send(email, message);
    }
}

// ❌ Incorrecto - Depender de implementación concreta
class NotificationService {
    constructor() {
        this.smtpService = new SMTPEmailService(); // Dependencia concreta
    }
    
    notifyUser(email, message) {
        this.smtpService.send(email, message);
    }
}
```

### Código Probable (Testeable)
```javascript
// ✅ Correcto - Fácil de testear
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(`add(${a}, ${b}) = ${result}`);
        return result;
    }
    
    getHistory() {
        return [...this.history]; // Retorna copia
    }
    
    clearHistory() {
        this.history = [];
    }
}

// Fácil de testear:
// const calc = new Calculator();
// expect(calc.add(2, 3)).toBe(5);
// expect(calc.getHistory()).toContain('add(2, 3) = 5');

// ❌ Incorrecto - Difícil de testear
class Calculator {
    add(a, b) {
        const result = a + b;
        console.log(`Resultado: ${result}`); // Efecto secundario
        localStorage.setItem('lastResult', result); // Dependencia externa
        return result;
    }
}
```

## 📝 Checklist de Revisión

### Estructura y Sintaxis
- [ ] Estructura de archivos correcta
- [ ] Nomenclatura consistente
- [ ] Documentación JSDoc completa
- [ ] Tests comprehensivos
- [ ] README detallado
- [ ] Código sin errores de linting
- [ ] Todos los tests pasan
- [ ] Ejemplos funcionan correctamente

### Principios de Programación
- [ ] **DRY**: No hay código duplicado
- [ ] **KISS**: Solución simple y clara
- [ ] **YAGNI**: Solo funcionalidad necesaria
- [ ] **Responsabilidad Única**: Cada función tiene un propósito claro
- [ ] **Código Expresivo**: Nombres que expresan intención
- [ ] **Funciones Pequeñas**: Funciones enfocadas en una tarea
- [ ] **Fail Fast**: Validación temprana de errores
- [ ] **Inmutabilidad**: No mutar datos originales cuando sea posible
- [ ] **Ley de Demeter**: Evitar encadenamiento profundo
- [ ] **Separación de Intereses**: Responsabilidades bien definidas
- [ ] **Composición sobre Herencia**: Preferir composición
- [ ] **Principio Boy Scout**: Código mejorado si se tocó
- [ ] **Encapsulación**: Ocultar detalles internos
- [ ] **Abierto/Cerrado**: Extensible sin modificar existente
- [ ] **Depender de Abstracciones**: Usar interfaces/contratos
- [ ] **Código Probable**: Fácil de testear

### Testing Estricto
- [ ] **Casos básicos**: Funcionalidad principal verificada
- [ ] **Casos edge**: Arrays vacíos, valores nulos, extremos
- [ ] **Validación**: Inputs inválidos y manejo de errores
- [ ] **Rendimiento**: Análisis de complejidad y tiempo de ejecución
- [ ] **Inmutabilidad**: Datos originales no modificados
- [ ] **Precisión**: Números flotantes y valores extremos
- [ ] **Determinismo**: Resultados consistentes
- [ ] **Memoria**: Sin memory leaks
- [ ] **Errores**: Mensajes descriptivos y tipos correctos

## 🔄 Flujo de Trabajo

1. Crear ejercicio usando templates
2. Implementar función básica
3. Escribir tests comprehensivos
4. Documentar en README
5. Ejecutar `npm run validate`
6. Revisar y ajustar según sea necesario

---

**💡 Tip:** Estos estándares aseguran consistencia y calidad en todo el repositorio.
