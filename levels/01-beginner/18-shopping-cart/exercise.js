/**
 * Carrito de Compras
 * 
 * Descripción: Implementa una clase ShoppingCart que gestione un carrito de compras
 * con productos, cupones de descuento, cálculos de impuestos y validaciones de inventario.
 * Dificultad: BEGINNER
 * 
 * Estructura de productos:
 * {
 *   id: "PROD-001",
 *   name: "Laptop",
 *   price: 999.99,
 *   category: "Electronics",
 *   stock: 10
 * }
 * 
 * Estructura de cupones:
 * {
 *   code: "SAVE10",
 *   type: "percentage", // "percentage", "fixed", "free_shipping"
 *   value: 10,
 *   minAmount: 100,
 *   expiresAt: "2024-12-31"
 * }
 */

class ShoppingCart {
    constructor() {
        // TODO: Inicializar el carrito
        // Pista: this.items = [], this.appliedCoupon = null
    }

    /**
     * Agrega un producto al carrito
     * @param {Object} product - Producto a agregar
     * @param {number} quantity - Cantidad a agregar
     * @returns {boolean} True si se agregó correctamente
     */
    addProduct(product, quantity) {
        // TODO: Implementar agregar producto
        // Pista 1: Validar que product y quantity sean válidos
        // Pista 2: Verificar que haya stock suficiente
        // Pista 3: Si el producto ya existe, sumar la cantidad
        // Pista 4: Si no existe, agregarlo al array de items
        // Pista 5: Retornar true si se agregó, false si falló
        
        throw new Error('Método addProduct no implementado');
    }

    /**
     * Remueve un producto del carrito
     * @param {string} productId - ID del producto a remover
     * @returns {boolean} True si se removió correctamente
     */
    removeProduct(productId) {
        // TODO: Implementar remover producto
        // Pista 1: Buscar el producto en this.items por ID
        // Pista 2: Si existe, removerlo del array
        // Pista 3: Retornar true si se removió, false si no existía
        
        throw new Error('Método removeProduct no implementado');
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} productId - ID del producto
     * @param {number} quantity - Nueva cantidad
     * @returns {boolean} True si se actualizó correctamente
     */
    updateQuantity(productId, quantity) {
        // TODO: Implementar actualizar cantidad
        // Pista 1: Validar que quantity sea un número positivo
        // Pista 2: Buscar el producto en this.items
        // Pista 3: Verificar que haya stock suficiente
        // Pista 4: Actualizar la cantidad del producto
        // Pista 5: Retornar true si se actualizó, false si falló
        
        throw new Error('Método updateQuantity no implementado');
    }

    /**
     * Aplica un cupón de descuento al carrito
     * @param {string} couponCode - Código del cupón
     * @returns {boolean} True si se aplicó correctamente
     */
    applyCoupon(couponCode) {
        // TODO: Implementar aplicar cupón
        // Pista 1: Buscar el cupón por código (usar getCouponByCode)
        // Pista 2: Validar que el cupón exista y no esté expirado
        // Pista 3: Verificar que el subtotal sea mayor al monto mínimo
        // Pista 4: Asignar el cupón a this.appliedCoupon
        // Pista 5: Retornar true si se aplicó, false si falló
        
        throw new Error('Método applyCoupon no implementado');
    }

    /**
     * Remueve el cupón aplicado del carrito
     * @returns {boolean} True si se removió correctamente
     */
    removeCoupon() {
        // TODO: Implementar remover cupón
        // Pista 1: Verificar que haya un cupón aplicado
        // Pista 2: Asignar null a this.appliedCoupon
        // Pista 3: Retornar true si se removió, false si no había cupón
        
        throw new Error('Método removeCoupon no implementado');
    }

    /**
     * Calcula el subtotal del carrito
     * @returns {number} Subtotal (suma de productos sin impuestos)
     */
    calculateSubtotal() {
        // TODO: Implementar cálculo de subtotal
        // Pista: Sumar (producto.precio × cantidad) para todos los items
        // return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        
        throw new Error('Método calculateSubtotal no implementado');
    }

    /**
     * Calcula los impuestos (8% sobre el subtotal)
     * @returns {number} Monto de impuestos
     */
    calculateTaxes() {
        // TODO: Implementar cálculo de impuestos
        // Pista: Calcular 8% del subtotal
        // return this.calculateSubtotal() * 0.08;
        
        throw new Error('Método calculateTaxes no implementado');
    }

    /**
     * Calcula el descuento aplicado por el cupón
     * @returns {number} Monto del descuento
     */
    calculateDiscount() {
        // TODO: Implementar cálculo de descuento
        // Pista 1: Si no hay cupón aplicado, retornar 0
        // Pista 2: Calcular según el tipo de cupón:
        //          - "percentage": subtotal × (value / 100)
        //          - "fixed": value (hasta el subtotal)
        //          - "free_shipping": 0 (por ahora)
        
        throw new Error('Método calculateDiscount no implementado');
    }

    /**
     * Calcula el total final del carrito
     * @returns {number} Total (subtotal + impuestos - descuento)
     */
    calculateTotal() {
        // TODO: Implementar cálculo de total
        // Pista: return this.calculateSubtotal() + this.calculateTaxes() - this.calculateDiscount();
        
        throw new Error('Método calculateTotal no implementado');
    }

    /**
     * Obtiene un resumen completo del carrito
     * @returns {Object} Resumen del carrito
     */
    getCartSummary() {
        // TODO: Implementar resumen del carrito
        // Pista: Retornar objeto con:
        //        - items: array de items con producto, cantidad y subtotal
        //        - subtotal: subtotal calculado
        //        - taxes: impuestos calculados
        //        - discount: descuento calculado
        //        - total: total calculado
        //        - appliedCoupon: cupón aplicado (o null)
        
        throw new Error('Método getCartSummary no implementado');
    }

    /**
     * Método auxiliar para obtener un cupón por código
     * @param {string} code - Código del cupón
     * @returns {Object|null} Cupón encontrado o null
     */
    getCouponByCode(code) {
        // TODO: Implementar búsqueda de cupón
        // Pista: Buscar en el array de cupones disponibles por código
        // Los cupones disponibles están definidos en getAvailableCoupons()
        
        const coupons = this.getAvailableCoupons();
        return coupons.find(coupon => coupon.code === code) || null;
    }

    /**
     * Retorna los cupones disponibles
     * @returns {Array} Array de cupones disponibles
     */
    getAvailableCoupons() {
        return [
            {
                code: "SAVE10",
                type: "percentage",
                value: 10,
                minAmount: 100,
                expiresAt: "2024-12-31"
            },
            {
                code: "SAVE50",
                type: "fixed",
                value: 50,
                minAmount: 200,
                expiresAt: "2024-12-31"
            },
            {
                code: "FREESHIP",
                type: "free_shipping",
                value: 0,
                minAmount: 50,
                expiresAt: "2024-12-31"
            }
        ];
    }
}

module.exports = ShoppingCart;
