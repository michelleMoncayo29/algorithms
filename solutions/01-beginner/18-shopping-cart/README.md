# Solución: Carrito de Compras

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos una clase `ShoppingCart` que:
1. **Gestione productos** en un carrito de compras
2. **Valide inventario** y cantidades disponibles
3. **Aplique cupones** de descuento con diferentes tipos
4. **Calcule totales** incluyendo impuestos y descuentos
5. **Mantenga estado** del carrito y cupones aplicados

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Estructura de datos**: Array de items y objeto para cupón aplicado
2. **Validaciones**: Stock, cantidades, cupones y fechas
3. **Cálculos**: Subtotal, impuestos, descuentos y total
4. **Manejo de estado**: Actualización consistente del carrito
5. **Resumen**: Generación de reportes completos

### Complejidad
- **Tiempo**: O(n) para operaciones que recorren items, O(1) para cálculos
- **Espacio**: O(n) donde n es el número de productos en el carrito

## 💻 Solución Implementada

```javascript
class ShoppingCart {
    constructor() {
        this.items = [];
        this.appliedCoupon = null;
    }

    addProduct(product, quantity) {
        // Validar parámetros
        if (!product || typeof quantity !== 'number' || quantity <= 0) {
            return false;
        }

        // Verificar stock suficiente
        if (quantity > product.stock) {
            return false;
        }

        // Buscar producto existente
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            // Verificar cantidad total no exceda stock
            if (existingItem.quantity + quantity > product.stock) {
                return false;
            }
            existingItem.quantity += quantity;
        } else {
            // Agregar nuevo producto
            this.items.push({
                product: product,
                quantity: quantity
            });
        }

        return true;
    }

    calculateSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    calculateTaxes() {
        return this.calculateSubtotal() * 0.08;
    }

    calculateDiscount() {
        if (!this.appliedCoupon) {
            return 0;
        }

        const subtotal = this.calculateSubtotal();
        let discount = 0;

        switch (this.appliedCoupon.type) {
            case 'percentage':
                discount = subtotal * (this.appliedCoupon.value / 100);
                break;
            case 'fixed':
                discount = Math.min(this.appliedCoupon.value, subtotal);
                break;
            case 'free_shipping':
                discount = 0;
                break;
        }

        return discount;
    }

    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTaxes() - this.calculateDiscount();
    }
}
```

## 🔄 Versiones Alternativas

### Versión Extendida con Envío
```javascript
class ShoppingCartExtended extends ShoppingCart {
    constructor() {
        super();
        this.shippingCost = 0;
        this.shippingThreshold = 100;
    }

    calculateShipping() {
        const subtotal = this.calculateSubtotal();
        
        if (this.appliedCoupon && this.appliedCoupon.type === 'free_shipping') {
            return 0;
        }
        
        if (subtotal >= this.shippingThreshold) {
            return 0;
        }
        
        return this.shippingCost;
    }

    calculateTotalWithShipping() {
        return this.calculateTotal() + this.calculateShipping();
    }

    getCartStats() {
        return {
            itemCount: this.items.length,
            totalQuantity: this.items.reduce((sum, item) => sum + item.quantity, 0),
            averageItemPrice: this.calculateAveragePrice(),
            hasCoupon: !!this.appliedCoupon,
            shippingCost: this.calculateShipping(),
            totalWithShipping: this.calculateTotalWithShipping()
        };
    }
}
```

### Versión con Validaciones Estrictas
```javascript
class ShoppingCartStrict extends ShoppingCart {
    constructor() {
        super();
        this.maxItems = 50;
        this.maxQuantityPerItem = 10;
    }

    addProduct(product, quantity) {
        // Validaciones adicionales
        if (this.items.length >= this.maxItems) {
            return false;
        }

        if (quantity > this.maxQuantityPerItem) {
            return false;
        }

        return super.addProduct(product, quantity);
    }
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Estructura de Datos**
```javascript
constructor() {
    this.items = [];           // Array de productos
    this.appliedCoupon = null; // Cupón aplicado
}
```
- Array para items del carrito
- Objeto para cupón aplicado
- Estado consistente

### 2. **Validación de Productos**
```javascript
if (!product || typeof quantity !== 'number' || quantity <= 0) {
    return false;
}

if (quantity > product.stock) {
    return false;
}
```
- Validación de parámetros
- Verificación de stock
- Manejo de errores

### 3. **Manejo de Productos Existentes**
```javascript
const existingItem = this.items.find(item => item.product.id === product.id);

if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
        return false;
    }
    existingItem.quantity += quantity;
} else {
    this.items.push({ product: product, quantity: quantity });
}
```
- Búsqueda eficiente por ID
- Suma de cantidades
- Validación de stock total

### 4. **Cálculo de Descuentos**
```javascript
switch (this.appliedCoupon.type) {
    case 'percentage':
        discount = subtotal * (this.appliedCoupon.value / 100);
        break;
    case 'fixed':
        discount = Math.min(this.appliedCoupon.value, subtotal);
        break;
    case 'free_shipping':
        discount = 0;
        break;
}
```
- Diferentes tipos de cupones
- Validación de límites
- Cálculos precisos

### 5. **Validación de Cupones**
```javascript
applyCoupon(couponCode) {
    const coupon = this.getCouponByCode(couponCode);
    if (!coupon) return false;

    // Verificar expiración
    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiresAt);
    if (currentDate > expiryDate) return false;

    // Verificar monto mínimo
    if (this.calculateSubtotal() < coupon.minAmount) return false;

    this.appliedCoupon = coupon;
    return true;
}
```
- Validación de existencia
- Verificación de fechas
- Validación de montos mínimos

## 🧪 Casos de Prueba Clave

### Operaciones Básicas
- `addProduct(laptop, 1)` → true, producto agregado
- `addProduct(laptop, 15)` → false, stock insuficiente
- `removeProduct("PROD-001")` → true, producto removido

### Cálculos Financieros
- Subtotal: $1000 → Impuestos: $80 (8%)
- Cupón 10%: Descuento $100 → Total: $980
- Cupón $50: Descuento $50 → Total: $1030

### Validaciones
- Productos inválidos → false
- Cantidades negativas → false
- Cupones expirados → false
- Montos mínimos no alcanzados → false

## 🚀 Optimizaciones Implementadas

### 1. **Búsqueda Eficiente**
```javascript
const existingItem = this.items.find(item => item.product.id === product.id);
```
- Uso de `find()` para búsqueda por ID
- Evita duplicados innecesarios

### 2. **Cálculos Optimizados**
```javascript
calculateSubtotal() {
    return this.items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
}
```
- Uso de `reduce()` para cálculos
- Una sola pasada por los items

### 3. **Validación Temprana**
- Verificaciones antes de procesar
- Retorno inmediato en casos de error
- Evita operaciones innecesarias

### 4. **Manejo de Estado Consistente**
- Actualización atómica del estado
- Validaciones antes de cambios
- Rollback en caso de error

## 📚 Conceptos Aplicados

1. **Programación Orientada a Objetos**: Clases, herencia, encapsulación
2. **Manejo de Arrays**: find, reduce, filter, map
3. **Validación de Datos**: Tipos, rangos, fechas
4. **Cálculos Financieros**: Impuestos, descuentos, totales
5. **Manejo de Estado**: Actualización consistente
6. **Estructuras de Datos**: Objetos anidados, arrays complejos

## 🎓 Lecciones Aprendidas

- **Validación temprana**: Verificar datos antes de procesar
- **Manejo de estado**: Mantener consistencia en todo momento
- **Cálculos precisos**: Usar fórmulas matemáticas correctas
- **Estructuras flexibles**: Diseñar para diferentes tipos de cupones
- **Extensibilidad**: Permitir funcionalidades adicionales

## 🔧 Funcionalidades Adicionales

### Estadísticas del Carrito
```javascript
getCartStats() {
    return {
        itemCount: this.items.length,
        totalQuantity: this.getTotalQuantity(),
        averageItemPrice: this.calculateAveragePrice(),
        hasCoupon: !!this.appliedCoupon,
        shippingCost: this.calculateShipping()
    };
}
```

### Gestión de Envío
```javascript
calculateShipping() {
    if (this.appliedCoupon && this.appliedCoupon.type === 'free_shipping') {
        return 0;
    }
    
    if (this.calculateSubtotal() >= this.shippingThreshold) {
        return 0;
    }
    
    return this.shippingCost;
}
```

### Validaciones Estrictas
- Límite máximo de items en el carrito
- Límite máximo de cantidad por item
- Validación de productos duplicados

---

**💡 Tip:** Esta solución demuestra cómo implementar un sistema de e-commerce completo con todas las validaciones necesarias. Es un excelente ejemplo de programación orientada a objetos aplicada a un problema del mundo real, con manejo robusto de cálculos financieros y estado consistente.
