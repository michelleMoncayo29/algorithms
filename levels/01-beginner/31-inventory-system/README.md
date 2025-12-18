# Sistema de Inventario Simple

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Validación de Datos, Cálculos  
**Tiempo estimado:** 35-40 minutos

## 📦 Contexto

Necesitas crear un sistema básico de inventario para gestionar productos de una tienda. El sistema debe permitir agregar productos, vender productos (reduciendo el stock), reponer stock y realizar consultas como obtener el valor total del inventario o encontrar productos con stock bajo. Este ejercicio te ayudará a practicar la relación entre clases, validaciones más complejas y cálculos sobre colecciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir múltiples clases relacionadas (`Product` y `Inventory`)
- [ ] Implementar validaciones complejas (stock suficiente, duplicados)
- [ ] Realizar cálculos sobre colecciones (valor total, filtrado)
- [ ] Gestionar el estado interno de objetos (actualizar stock)
- [ ] Usar métodos de arrays (`filter`, `find`, `reduce`) para consultas
- [ ] Manejar casos edge y errores de manera apropiada

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

### Clase `Product`

- **Constructor**: Recibe cuatro parámetros:
  - `name` (string): Nombre del producto (no puede estar vacío)
  - `price` (number): Precio del producto (debe ser mayor que 0)
  - `quantity` (number): Cantidad inicial en stock (debe ser >= 0)
  - `category` (string): Categoría del producto (no puede estar vacío)
  - Debe validar los parámetros y lanzar errores descriptivos:
    - `"Product name is required"` si el nombre está vacío
    - `"Product price must be greater than 0"` si el precio es inválido
    - `"Product quantity must be greater than or equal to 0"` si la cantidad es negativa
    - `"Product category is required"` si la categoría está vacía

- **Propiedades**:
  - `name` (string): Nombre del producto
  - `price` (number): Precio del producto
  - `quantity` (number): Cantidad en stock
  - `category` (string): Categoría del producto

### Clase `Inventory`

- **Constructor**: No recibe parámetros. Inicializa un array vacío `products` para almacenar los productos.

- **Método `addProduct(name, price, quantity, category)`** - Agregar producto:
  - Crea una nueva instancia de `Product` con los parámetros recibidos
  - **Valida** que no exista ya un producto con el mismo nombre (case-sensitive)
  - Lanza `"Product already exists"` si el producto ya existe
  - Agrega el producto al array interno
  - Retorna el producto creado

- **Método `findProduct(name)`** - Buscar producto por nombre (usa `find`):
  - Busca un producto cuyo `name` coincida exactamente (case-sensitive)
  - Retorna el producto encontrado o `null` si no existe
  - **Debe usar el método `find()` del array**

- **Método `sellProduct(name, quantity)`** - Vender producto:
  - Busca el producto por nombre usando `findProduct()`
  - Lanza `"Product not found"` si el producto no existe
  - Valida que haya suficiente stock (`product.quantity >= quantity`)
  - Lanza `"Insufficient stock"` si no hay suficiente stock
  - Reduce la cantidad en stock del producto (`product.quantity -= quantity`)
  - Retorna el producto actualizado

- **Método `restockProduct(name, quantity)`** - Reponer stock:
  - Busca el producto por nombre usando `findProduct()`
  - Lanza `"Product not found"` si el producto no existe
  - Valida que la cantidad a agregar sea mayor que 0
  - Lanza `"Quantity must be greater than 0"` si la cantidad es inválida
  - Incrementa la cantidad en stock del producto (`product.quantity += quantity`)
  - Retorna el producto actualizado

- **Método `getTotalValue()`** - Calcular valor total del inventario (usa `reduce`):
  - Calcula el valor total multiplicando precio × cantidad de cada producto y sumando todos
  - Retorna el valor total como número
  - Si no hay productos, retorna 0
  - **Debe usar el método `reduce()` del array**

- **Método `getLowStockProducts(threshold)`** - Obtener productos con stock bajo (usa `filter`):
  - Recibe un parámetro `threshold` (number): umbral mínimo de stock
  - Retorna un nuevo array con todos los productos que tienen `quantity <= threshold`
  - **Debe usar el método `filter()` del array**

- **Método `getProductsByCategory(category)`** - Filtrar por categoría (usa `filter`):
  - Recibe un parámetro `category` (string): categoría a filtrar
  - Retorna un nuevo array con todos los productos de esa categoría
  - **Debe usar el método `filter()` del array**

## 💡 Ejemplos

### Ejemplo 1 - Agregar productos

```javascript
const inventory = new Inventory();
const product1 = inventory.addProduct('Laptop', 1000, 5, 'Electronics');
const product2 = inventory.addProduct('Mouse', 25, 50, 'Electronics');

console.log(product1.name); // "Laptop"
console.log(product1.price); // 1000
console.log(product1.quantity); // 5
```

### Ejemplo 2 - Vender productos

```javascript
const inventory = new Inventory();
inventory.addProduct('Laptop', 1000, 10, 'Electronics');

const sold = inventory.sellProduct('Laptop', 3);
console.log(sold.quantity); // 7 (10 - 3)

// Intentar vender más de lo disponible
try {
    inventory.sellProduct('Laptop', 10);
} catch (error) {
    console.log(error.message); // "Insufficient stock"
}
```

### Ejemplo 3 - Reponer stock

```javascript
const inventory = new Inventory();
inventory.addProduct('Keyboard', 50, 20, 'Electronics');

const restocked = inventory.restockProduct('Keyboard', 30);
console.log(restocked.quantity); // 50 (20 + 30)
```

### Ejemplo 4 - Calcular valor total

```javascript
const inventory = new Inventory();
inventory.addProduct('Laptop', 1000, 5, 'Electronics'); // 5000
inventory.addProduct('Mouse', 25, 20, 'Electronics');   // 500

const total = inventory.getTotalValue();
console.log(total); // 5500
```

### Ejemplo 5 - Productos con stock bajo

```javascript
const inventory = new Inventory();
inventory.addProduct('Laptop', 1000, 2, 'Electronics');  // stock bajo
inventory.addProduct('Mouse', 25, 50, 'Electronics');    // stock normal
inventory.addProduct('Keyboard', 50, 1, 'Electronics');  // stock bajo

const lowStock = inventory.getLowStockProducts(5);
console.log(lowStock.length); // 2 (Laptop y Keyboard)
```

### Ejemplo 6 - Filtrar por categoría

```javascript
const inventory = new Inventory();
inventory.addProduct('Laptop', 1000, 5, 'Electronics');
inventory.addProduct('Mouse', 25, 20, 'Electronics');
inventory.addProduct('Desk', 200, 10, 'Furniture');

const electronics = inventory.getProductsByCategory('Electronics');
console.log(electronics.length); // 2
```

## ⚙️ Restricciones y Reglas

- Los nombres de productos son únicos (case-sensitive)
- No se puede vender más cantidad de la disponible en stock
- Los precios y cantidades deben ser números válidos
- Los métodos que usan arrays deben usar los métodos especificados (`find`, `filter`, `reduce`)
- Los mensajes de error deben ser exactos como se especifican
- Las validaciones deben ser Fail Fast (lanzar errores inmediatamente)

## 🔍 Casos de Prueba Recomendados

| Escenario | Método | Resultado Esperado | Categoría |
|-----------|--------|--------------------|-----------|
| Agregar producto válido | `addProduct()` | Producto creado y agregado | Caso básico |
| Agregar producto duplicado | `addProduct()` | Error "Product already exists" | Validación |
| Buscar producto existente | `findProduct()` | Retorna el producto | Caso básico |
| Buscar producto inexistente | `findProduct()` | Retorna null | Caso básico |
| Vender con stock suficiente | `sellProduct()` | Stock se reduce correctamente | Caso básico |
| Vender sin stock suficiente | `sellProduct()` | Error "Insufficient stock" | Validación |
| Reponer stock | `restockProduct()` | Stock se incrementa correctamente | Caso básico |
| Calcular valor total | `getTotalValue()` | Suma precio × cantidad | Cálculo |
| Productos con stock bajo | `getLowStockProducts()` | Filtra correctamente | Filtrado |
| Filtrar por categoría | `getProductsByCategory()` | Filtra correctamente | Filtrado |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Validación de duplicados</summary>

Antes de agregar un producto, usa `findProduct()` para verificar si ya existe un producto con ese nombre.

</details>

<details>
<summary>💡 Pista 2 – Calcular valor total con reduce()</summary>

Usa `reduce()` para acumular el valor total:
```javascript
return this.products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);
```

</details>

<details>
<summary>💡 Pista 3 – Filtrar productos con stock bajo</summary>

Usa `filter()` para obtener productos con cantidad menor o igual al umbral:
```javascript
return this.products.filter(product => product.quantity <= threshold);
```

</details>

<details>
<summary>💡 Pista 4 – Validar stock antes de vender</summary>

Después de encontrar el producto, verifica que `product.quantity >= quantity` antes de reducir el stock.

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Product` con constructor y validaciones
2. Implementa `Inventory` con constructor y método `addProduct()` con validación de duplicados
3. Implementa `findProduct()` usando `find()`
4. Implementa `sellProduct()` y `restockProduct()` con validaciones
5. Implementa `getTotalValue()` usando `reduce()`
6. Implementa `getLowStockProducts()` y `getProductsByCategory()` usando `filter()`
7. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Product` valida todos los parámetros correctamente
- [ ] `addProduct()` valida que no existan duplicados
- [ ] `sellProduct()` valida stock suficiente antes de vender
- [ ] `getTotalValue()` usa `reduce()` correctamente
- [ ] `getLowStockProducts()` y `getProductsByCategory()` usan `filter()`
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases `Product` e `Inventory` con todos los métodos requeridos
3. Ejecuta los tests con `npm test` o `npm run test -- 31-inventory-system`
4. Asegúrate de usar los métodos de array especificados

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Empieza implementando la clase `Product` y prueba sus validaciones. Luego implementa `Inventory` paso a paso, comenzando con `addProduct()` y `findProduct()`, antes de pasar a los métodos más complejos como `getTotalValue()`.

