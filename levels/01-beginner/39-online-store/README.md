# Sistema de Gestión de Tienda Online

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Validación de Datos, Cálculos Financieros  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de tienda online que permita gestionar productos, crear carritos de compras, aplicar descuentos, calcular totales y procesar compras reduciendo el stock del inventario.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Product`, `Cart`, `Store`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Gestionar carrito de compras con múltiples productos
- [ ] Realizar cálculos financieros (subtotal, descuentos, total)
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`)
- [ ] Gestionar inventario y stock
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa tres clases en `exercise.js`:

### Clase `Product`

Representa un producto en la tienda.

#### Constructor
- `constructor(name, price, stock, category)` - Crea un producto con todos sus datos

#### Métodos
- `getPrice()` - Retorna el precio del producto
- `getStock()` - Retorna el stock disponible
- `getCategory()` - Retorna la categoría
- `isAvailable()` - Verifica si está disponible (stock > 0)
- `reduceStock(quantity)` - Reduce el stock del producto

### Clase `Cart`

Representa un carrito de compras.

#### Constructor
- `constructor()` - Crea un carrito vacío

#### Métodos
- `addProduct(product, quantity)` - Agrega un producto al carrito
- `removeProduct(productName)` - Elimina un producto del carrito
- `updateQuantity(productName, newQuantity)` - Actualiza la cantidad de un producto
- `setDiscount(discountPercent)` - Establece un descuento porcentual
- `getSubtotal()` - Calcula el subtotal usando `reduce()`
- `getTotal()` - Calcula el total con descuento aplicado
- `getTotalItems()` - Obtiene el total de items usando `reduce()`
- `clear()` - Vacía el carrito completamente

### Clase `Store`

Gestiona la tienda y sus operaciones.

#### Constructor
- `constructor(name)` - Crea una tienda con nombre

#### Métodos
- `addProduct(product)` - Agrega un producto a la tienda
- `findProduct(productName)` - Busca un producto por nombre usando `find()`
- `getAvailableProducts()` - Retorna productos disponibles usando `filter()`
- `getProductsByCategory(category)` - Filtra productos por categoría usando `filter()`
- `processPurchase(cart)` - Procesa una compra reduciendo stock
- `getInventoryValue()` - Calcula el valor del inventario usando `reduce()`

## 💡 Ejemplos

### Ejemplo 1: Crear Producto y Agregar al Carrito

```javascript
const store = new Store('Mi Tienda');
const product = new Product('Laptop', 999.99, 10, 'Electronics');
store.addProduct(product);

const cart = new Cart();
cart.addProduct(product, 2);
console.log(cart.getSubtotal()); // 1999.98
console.log(cart.getTotalItems()); // 2
```

### Ejemplo 2: Aplicar Descuento

```javascript
cart.setDiscount(10); // 10% de descuento
console.log(cart.getTotal()); // 1799.982 (con descuento)
```

### Ejemplo 3: Procesar Compra

```javascript
const total = store.processPurchase(cart);
console.log(total); // 1799.982
console.log(product.getStock()); // 8 (se redujo el stock)
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Product constructor | parámetros válidos | Product creado | Constructor básico |
| Cart addProduct | product y quantity válidos | Producto agregado | Agregado exitoso |
| Cart addProduct | producto sin stock | Error "Product is not available" | Validación de stock |
| getSubtotal | múltiples productos | Suma de precios × cantidades | Cálculo correcto |
| getTotal | con descuento | Subtotal - descuento | Cálculo con descuento |
| processPurchase | carrito válido | Stock reducido, total retornado | Procesamiento exitoso |
| getInventoryValue | múltiples productos | Suma de precio × stock | Valor total |

## ⚠️ Validaciones Requeridas

### Product
- Nombre y categoría no pueden estar vacíos
- Precio debe ser > 0
- Stock debe ser >= 0

### Cart
- Product debe ser instancia de Product
- quantity debe ser > 0
- Product debe estar disponible
- Debe haber suficiente stock
- discountPercent debe estar entre 0 y 100

### Store
- Nombre no puede estar vacío
- Los products deben ser instancias de Product
- No se pueden agregar productos duplicados (mismo nombre)
- El carrito no puede estar vacío al procesar compra

## 🧮 Cálculos

### Subtotal del Carrito
```
Subtotal = Σ (precio × cantidad) para cada item
```

### Total con Descuento
```
Descuento = Subtotal × (descuento / 100)
Total = Subtotal - Descuento
```

### Valor del Inventario
```
Valor Inventario = Σ (precio × stock) para cada producto
```

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Buscar producto en carrito</summary>

Para buscar si un producto ya está en el carrito:
```javascript
const existingItem = this.items.find(item => item.product.name === productName);
```

</details>

<details>
<summary>💡 Pista 2 – Calcular subtotal con reduce()</summary>

Usa `reduce()` para sumar los precios:
```javascript
return this.items.reduce((total, item) => {
    return total + (item.product.getPrice() * item.quantity);
}, 0);
```

</details>

<details>
<summary>💡 Pista 3 – Validar stock antes de procesar</summary>

Valida el stock de todos los productos antes de reducir:
```javascript
cart.items.forEach(item => {
    if (item.product.getStock() < item.quantity) {
        throw new Error(`Insufficient stock for product: ${item.product.name}`);
    }
});
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Product` con constructor y métodos básicos
2. Implementa la clase `Cart` con constructor y métodos de gestión
3. Implementa métodos de cálculo usando `reduce()`
4. Implementa la clase `Store` con constructor y métodos de gestión
5. Implementa `processPurchase()` con validaciones de stock
6. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Product` valida todos los parámetros correctamente
- [ ] La clase `Cart` gestiona productos correctamente
- [ ] `getSubtotal()` y `getTotalItems()` usan `reduce()` correctamente
- [ ] `getTotal()` calcula correctamente con descuento
- [ ] La clase `Store` gestiona productos correctamente
- [ ] `processPurchase()` valida stock y reduce correctamente
- [ ] `getInventoryValue()` usa `reduce()` correctamente
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Product`, `Cart` y `Store` con todos los métodos requeridos
3. Ejecuta los tests: `npm test online-store` o `npm run test -- 39-online-store`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

**💡 Tip:** Empieza implementando la clase `Product` y prueba sus métodos antes de pasar a `Cart`. Recuerda que `Cart` necesita instancias de `Product` para funcionar completamente.

