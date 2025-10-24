# Carrito de Compras

**Dificultad:** BEGINNER  
**Categoría:** Objetos, Arrays, Cálculos Financieros, Validación de Datos  
**Tiempo estimado:** 35-40 minutos

## 📋 Descripción

Crea un sistema de carrito de compras que permita agregar productos, calcular totales, aplicar cupones de descuento y manejar inventario. El sistema debe validar productos, cantidades y aplicar diferentes tipos de descuentos con cálculos de impuestos.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar manejo de objetos y arrays complejos
- [ ] Implementar cálculos de precios con impuestos
- [ ] Aplicar diferentes tipos de descuentos y cupones
- [ ] Manejar validaciones de inventario y stock
- [ ] Trabajar con estructuras de datos anidadas
- [ ] Implementar lógica de negocio de e-commerce

## 📝 Enunciado

Implementa una clase `ShoppingCart` que gestione un carrito de compras con las siguientes funcionalidades:

### Estructura de Productos
```javascript
{
  id: "PROD-001",
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  stock: 10
}
```

### Estructura de Cupones
```javascript
{
  code: "SAVE10",
  type: "percentage", // "percentage", "fixed", "free_shipping"
  value: 10, // 10% o $10 según el tipo
  minAmount: 100, // Monto mínimo para aplicar
  expiresAt: "2024-12-31"
}
```

### Métodos Requeridos

#### 1. `addProduct(product, quantity)`
- Agrega un producto al carrito
- Valida que el producto exista y tenga stock suficiente
- Si el producto ya está en el carrito, suma la cantidad
- Retorna `true` si se agregó correctamente, `false` si falló

#### 2. `removeProduct(productId)`
- Remueve un producto del carrito
- Retorna `true` si se removió, `false` si no existía

#### 3. `updateQuantity(productId, quantity)`
- Actualiza la cantidad de un producto en el carrito
- Valida que la cantidad sea válida y que haya stock
- Retorna `true` si se actualizó, `false` si falló

#### 4. `applyCoupon(couponCode)`
- Aplica un cupón de descuento al carrito
- Valida que el cupón sea válido y no esté expirado
- Retorna `true` si se aplicó, `false` si falló

#### 5. `removeCoupon()`
- Remueve el cupón aplicado del carrito
- Retorna `true` si se removió, `false` si no había cupón

#### 6. `calculateSubtotal()`
- Calcula el subtotal (suma de productos sin impuestos)
- Retorna el monto del subtotal

#### 7. `calculateTaxes()`
- Calcula los impuestos (8% sobre el subtotal)
- Retorna el monto de impuestos

#### 8. `calculateDiscount()`
- Calcula el descuento aplicado por el cupón
- Retorna el monto del descuento

#### 9. `calculateTotal()`
- Calcula el total final (subtotal + impuestos - descuento)
- Retorna el monto total

#### 10. `getCartSummary()`
- Retorna un resumen completo del carrito
- Incluye productos, totales y cupón aplicado

## 💡 Ejemplos

### Ejemplo 1: Operaciones Básicas

```javascript
const cart = new ShoppingCart();

// Agregar productos
const laptop = { id: "PROD-001", name: "Laptop", price: 999.99, category: "Electronics", stock: 10 };
const mouse = { id: "PROD-002", name: "Mouse", price: 29.99, category: "Electronics", stock: 50 };

cart.addProduct(laptop, 1);
cart.addProduct(mouse, 2);

// Calcular totales
cart.calculateSubtotal(); // 1059.97
cart.calculateTaxes(); // 84.80 (8% de 1059.97)
cart.calculateTotal(); // 1144.77
```

### Ejemplo 2: Aplicar Cupón

```javascript
const cart = new ShoppingCart();
cart.addProduct(laptop, 1);

// Aplicar cupón de 10% de descuento
const coupon = { code: "SAVE10", type: "percentage", value: 10, minAmount: 100, expiresAt: "2024-12-31" };
cart.applyCoupon("SAVE10");

cart.calculateSubtotal(); // 999.99
cart.calculateDiscount(); // 99.99 (10% de 999.99)
cart.calculateTaxes(); // 72.00 (8% de 900.00)
cart.calculateTotal(); // 972.00
```

### Ejemplo 3: Resumen del Carrito

```javascript
cart.getCartSummary();
// {
//   items: [
//     { product: laptop, quantity: 1, subtotal: 999.99 },
//     { product: mouse, quantity: 2, subtotal: 59.98 }
//   ],
//   subtotal: 1059.97,
//   taxes: 84.80,
//   discount: 0,
//   total: 1144.77,
//   appliedCoupon: null
// }
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| addProduct | laptop, 1 | true | Producto agregado correctamente |
| addProduct | laptop, 15 | false | Stock insuficiente (solo hay 10) |
| addProduct | null, 1 | false | Producto inválido |
| removeProduct | "PROD-001" | true | Producto removido |
| removeProduct | "INVALID" | false | Producto no existe |
| updateQuantity | "PROD-001", 3 | true | Cantidad actualizada |
| updateQuantity | "PROD-001", 0 | false | Cantidad inválida |
| applyCoupon | "SAVE10" | true | Cupón aplicado |
| applyCoupon | "INVALID" | false | Cupón no existe |
| calculateSubtotal | - | 1059.97 | Suma de productos |
| calculateTaxes | - | 84.80 | 8% del subtotal |
| calculateTotal | - | 1144.77 | Subtotal + impuestos - descuento |

## 🧮 Cálculos Financieros

### Fórmulas de Cálculo

#### Subtotal
```
Subtotal = Σ(Producto.precio × Cantidad)
```

#### Impuestos
```
Impuestos = Subtotal × 0.08 (8%)
```

#### Descuentos por Cupón

**Porcentaje:**
```
Descuento = Subtotal × (Valor / 100)
```

**Cantidad Fija:**
```
Descuento = Valor (hasta el subtotal)
```

**Envío Gratis:**
```
Descuento = Costo de Envío (si aplica)
```

#### Total Final
```
Total = Subtotal + Impuestos - Descuento
```

### Ejemplos de Cálculo

#### Ejemplo 1: Sin Cupón
- Subtotal: $1000
- Impuestos: $80 (8%)
- Descuento: $0
- **Total: $1080**

#### Ejemplo 2: Cupón de 10%
- Subtotal: $1000
- Impuestos: $80 (8%)
- Descuento: $100 (10%)
- **Total: $980**

#### Ejemplo 3: Cupón de $50
- Subtotal: $1000
- Impuestos: $80 (8%)
- Descuento: $50 (fijo)
- **Total: $1030**

## ⚠️ Validaciones Requeridas

### Productos
- El producto debe existir y tener stock suficiente
- La cantidad debe ser un número positivo
- No se puede agregar más cantidad que el stock disponible

### Cupones
- El cupón debe existir y no estar expirado
- El subtotal debe ser mayor al monto mínimo requerido
- Solo se puede aplicar un cupón a la vez

### Carrito
- No se pueden tener cantidades negativas o cero
- Los productos deben ser válidos antes de agregar

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa un array para almacenar los items del carrito y un objeto para el cupón aplicado.

</details>

<details>
<summary>💡 Pista 2</summary>

Para validar stock, verifica que la cantidad solicitada no exceda el stock del producto.

</details>

<details>
<summary>💡 Pista 3</summary>

Para cupones, verifica la fecha de expiración y el monto mínimo antes de aplicar.

</details>

<details>
<summary>💡 Pista 4</summary>

Para cálculos, usa las fórmulas matemáticas correctas según el tipo de cupón.

</details>

<details>
<summary>💡 Pista 5</summary>

Para el resumen, recorre todos los items del carrito y calcula los totales.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la clase `ShoppingCart` con todos los métodos
3. Ejecuta los tests: `npm test shopping-cart`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [E-commerce Calculations - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Date Handling - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Mathematical Operations - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

---

**💡 Tip:** Este ejercicio simula un sistema de e-commerce real y te ayudará a entender conceptos fundamentales de programación orientada a objetos, validación de datos y cálculos financieros aplicados al comercio electrónico.
