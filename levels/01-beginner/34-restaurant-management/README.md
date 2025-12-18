# Sistema de Gestión de Restaurante

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Validación de Datos, Cálculos Financieros  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de restaurante que permita gestionar menús de platos, crear órdenes, agregar items a las órdenes y calcular totales con impuestos. El sistema debe validar platos, verificar disponibilidad de stock, y gestionar múltiples órdenes simultáneas.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Menu`, `Order`, `Restaurant`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Gestionar relaciones entre clases (Order usa Menu)
- [ ] Realizar cálculos financieros (subtotal, impuestos, total)
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`)
- [ ] Manejar estado de objetos (stock, órdenes completadas)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa tres clases en `exercise.js`:

### Clase `Menu`

Representa un menú de platos del restaurante.

#### Constructor
- `constructor(name, description)` - Crea un menú con nombre y descripción
- Valida que ambos parámetros sean strings no vacíos

#### Métodos
- `addDish(dish)` - Agrega un plato al menú (valida propiedades y duplicados)
- `findDish(dishName)` - Busca un plato por nombre usando `find()`
- `removeDish(dishName)` - Elimina un plato del menú
- `getAvailableDishes()` - Retorna platos con stock > 0 usando `filter()`
- `getDishesByCategory(category)` - Filtra platos por categoría usando `filter()`

### Clase `Order`

Representa una orden del restaurante.

#### Constructor
- `constructor(tableNumber, waiterName)` - Crea una orden con mesa y mesero
- Valida que tableNumber sea > 0 y waiterName no esté vacío

#### Métodos
- `addItem(menu, dishName, quantity)` - Agrega un plato a la orden (valida stock)
- `removeItem(dishName)` - Elimina un plato de la orden
- `calculateSubtotal()` - Calcula subtotal usando `reduce()`
- `calculateTaxes()` - Calcula impuestos (8% del subtotal)
- `calculateTotal()` - Calcula total (subtotal + impuestos)
- `markAsCompleted()` - Marca la orden como completada

### Clase `Restaurant`

Gestiona el restaurante y sus operaciones.

#### Constructor
- `constructor(name)` - Crea un restaurante con nombre

#### Métodos
- `addMenu(menu)` - Agrega un menú al restaurante
- `createOrder(tableNumber, waiterName)` - Crea una nueva orden
- `getOrder(orderIndex)` - Busca una orden por índice
- `getActiveOrders()` - Retorna órdenes activas usando `filter()`
- `getRevenue()` - Calcula ingresos totales usando `reduce()`

## 💡 Ejemplos

### Ejemplo 1: Crear Menú y Agregar Platos

```javascript
const menu = new Menu('Menú Principal', 'Platos principales del restaurante');

const pasta = menu.addDish({
    name: 'Pasta Carbonara',
    price: 15.99,
    category: 'Main Course',
    stock: 10
});

const salad = menu.addDish({
    name: 'Ensalada César',
    price: 8.99,
    category: 'Appetizer',
    stock: 20
});

console.log(menu.getAvailableDishes().length); // 2
console.log(menu.getDishesByCategory('Main Course').length); // 1
```

### Ejemplo 2: Crear Orden y Agregar Items

```javascript
const restaurant = new Restaurant('El Buen Sabor');
restaurant.addMenu(menu);

const order = restaurant.createOrder(5, 'Juan Pérez');
order.addItem(menu, 'Pasta Carbonara', 2);
order.addItem(menu, 'Ensalada César', 1);

console.log(order.calculateSubtotal()); // 40.97 (15.99*2 + 8.99*1)
console.log(order.calculateTaxes()); // 3.28 (40.97 * 0.08)
console.log(order.calculateTotal()); // 44.25 (40.97 + 3.28)
```

### Ejemplo 3: Gestionar Múltiples Órdenes

```javascript
const order1 = restaurant.createOrder(1, 'María García');
order1.addItem(menu, 'Pasta Carbonara', 1);
order1.markAsCompleted();

const order2 = restaurant.createOrder(2, 'Carlos López');
order2.addItem(menu, 'Ensalada César', 2);

console.log(restaurant.getActiveOrders().length); // 1 (solo order2)
console.log(restaurant.getRevenue()); // 17.27 (total de order1)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Menu constructor | name válido, description válido | Menu creado | Constructor básico |
| Menu addDish | dish válido | Plato agregado | Agregar plato correctamente |
| Menu addDish | dish duplicado | Error "Dish already exists" | Validar duplicados |
| Menu findDish | dishName existente | Plato encontrado | Búsqueda exitosa |
| Menu findDish | dishName inexistente | null | Búsqueda sin resultados |
| Order constructor | tableNumber válido, waiterName válido | Order creada | Constructor básico |
| Order addItem | menu válido, dishName válido, quantity válido | Item agregado | Agregar item correctamente |
| Order addItem | stock insuficiente | Error "Insufficient stock" | Validar stock |
| Order calculateSubtotal | orden con items | Subtotal calculado | Cálculo correcto |
| Order calculateTaxes | orden con items | Impuestos (8%) | Cálculo de impuestos |
| Order calculateTotal | orden con items | Total (subtotal + impuestos) | Cálculo total |
| Restaurant getActiveOrders | órdenes activas y completadas | Solo activas | Filtrado correcto |
| Restaurant getRevenue | órdenes completadas | Suma de totales | Cálculo de ingresos |

## ⚠️ Validaciones Requeridas

### Menu
- Nombre y descripción no pueden estar vacíos
- Los platos deben tener: name, price > 0, category, stock >= 0
- No se pueden agregar platos duplicados (mismo nombre)

### Order
- Número de mesa debe ser > 0
- Nombre del mesero no puede estar vacío
- Los platos deben existir en el menú
- Debe haber stock suficiente antes de agregar items
- La cantidad debe ser > 0

### Restaurant
- Nombre del restaurante no puede estar vacío
- Los menús deben ser instancias de Menu

## 🧮 Cálculos Financieros

### Subtotal
```
Subtotal = Σ(item.price × item.quantity)
```

### Impuestos
```
Impuestos = Subtotal × 0.08 (8%)
```

### Total
```
Total = Subtotal + Impuestos
```

### Ejemplo de Cálculo
- Item 1: Pasta Carbonara (2 unidades × $15.99) = $31.98
- Item 2: Ensalada César (1 unidad × $8.99) = $8.99
- **Subtotal:** $40.97
- **Impuestos:** $40.97 × 0.08 = $3.28
- **Total:** $44.25

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Validación de platos</summary>

Antes de agregar un plato, valida todas las propiedades requeridas y verifica que no exista ya un plato con el mismo nombre usando `findDish()`.

</details>

<details>
<summary>💡 Pista 2 – Cálculo de subtotal con reduce()</summary>

Usa `reduce()` para sumar el precio total de cada item:
```javascript
return this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
}, 0);
```

</details>

<details>
<summary>💡 Pista 3 – Validar stock antes de agregar</summary>

Después de encontrar el plato en el menú, verifica que `dish.stock >= quantity` antes de agregar el item a la orden.

</details>

<details>
<summary>💡 Pista 4 – Filtrar órdenes activas</summary>

Usa `filter()` para obtener solo las órdenes donde `order.completed === false`.

</details>

<details>
<summary>💡 Pista 5 – Calcular ingresos con reduce()</summary>

Filtra las órdenes completadas y luego usa `reduce()` para sumar el total de cada orden:
```javascript
return this.orders
    .filter(order => order.completed)
    .reduce((total, order) => total + order.calculateTotal(), 0);
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Menu` con constructor y método `addDish()` con validaciones
2. Implementa `findDish()` usando `find()`
3. Implementa `removeDish()`, `getAvailableDishes()` y `getDishesByCategory()` usando métodos de arrays
4. Implementa la clase `Order` con constructor y método `addItem()` con validaciones
5. Implementa los métodos de cálculo (`calculateSubtotal()`, `calculateTaxes()`, `calculateTotal()`)
6. Implementa la clase `Restaurant` con todos sus métodos
7. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Menu` valida todos los parámetros correctamente
- [ ] `addDish()` valida que no existan platos duplicados
- [ ] `findDish()` usa `find()` correctamente
- [ ] `getAvailableDishes()` y `getDishesByCategory()` usan `filter()`
- [ ] La clase `Order` valida parámetros del constructor
- [ ] `addItem()` valida stock suficiente antes de agregar
- [ ] `calculateSubtotal()` usa `reduce()` correctamente
- [ ] `calculateTaxes()` calcula el 8% correctamente
- [ ] `calculateTotal()` suma subtotal e impuestos
- [ ] La clase `Restaurant` gestiona menús y órdenes correctamente
- [ ] `getActiveOrders()` usa `filter()` correctamente
- [ ] `getRevenue()` usa `reduce()` correctamente
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Menu`, `Order` y `Restaurant` con todos los métodos requeridos
3. Ejecuta los tests: `npm test restaurant-management` o `npm run test -- 34-restaurant-management`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Empieza implementando la clase `Menu` y prueba sus métodos antes de pasar a `Order`. Recuerda que `Order` necesita una instancia de `Menu` para funcionar, así que asegúrate de tener `Menu` completamente implementado primero.

