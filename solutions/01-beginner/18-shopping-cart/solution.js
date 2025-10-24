/**
 * SOLUCIÓN: Carrito de Compras
 * 
 * Esta es la solución completa para el ejercicio de carrito de compras.
 * La clase ShoppingCart implementa un sistema completo de e-commerce con
 * productos, cupones, cálculos de impuestos y validaciones de inventario.
 */

class ShoppingCart {
    constructor() {
        this.items = [];
        this.appliedCoupon = null;
    }

    /**
     * Agrega un producto al carrito
     * @param {Object} product - Producto a agregar
     * @param {number} quantity - Cantidad a agregar
     * @returns {boolean} True si se agregó correctamente
     */
    addProduct(product, quantity) {
        // Validar parámetros
        if (!product || typeof quantity !== 'number' || quantity <= 0) {
            return false;
        }

        // Verificar que el producto tenga stock suficiente
        if (quantity > product.stock) {
            return false;
        }

        // Buscar si el producto ya existe en el carrito
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            // Verificar que la cantidad total no exceda el stock
            if (existingItem.quantity + quantity > product.stock) {
                return false;
            }
            // Sumar la cantidad al producto existente
            existingItem.quantity += quantity;
        } else {
            // Agregar nuevo producto al carrito
            this.items.push({
                product: product,
                quantity: quantity
            });
        }

        return true;
    }

    /**
     * Remueve un producto del carrito
     * @param {string} productId - ID del producto a remover
     * @returns {boolean} True si se removió correctamente
     */
    removeProduct(productId) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.product.id !== productId);
        return this.items.length < initialLength;
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} productId - ID del producto
     * @param {number} quantity - Nueva cantidad
     * @returns {boolean} True si se actualizó correctamente
     */
    updateQuantity(productId, quantity) {
        // Validar cantidad
        if (typeof quantity !== 'number' || quantity <= 0) {
            return false;
        }

        // Buscar el producto en el carrito
        const item = this.items.find(item => item.product.id === productId);
        if (!item) {
            return false;
        }

        // Verificar que la nueva cantidad no exceda el stock
        if (quantity > item.product.stock) {
            return false;
        }

        // Actualizar la cantidad
        item.quantity = quantity;
        return true;
    }

    /**
     * Aplica un cupón de descuento al carrito
     * @param {string} couponCode - Código del cupón
     * @returns {boolean} True si se aplicó correctamente
     */
    applyCoupon(couponCode) {
        // Buscar el cupón
        const coupon = this.getCouponByCode(couponCode);
        if (!coupon) {
            return false;
        }

        // Verificar que no esté expirado
        const currentDate = new Date();
        const expiryDate = new Date(coupon.expiresAt);
        if (currentDate > expiryDate) {
            return false;
        }

        // Verificar monto mínimo
        const subtotal = this.calculateSubtotal();
        if (subtotal < coupon.minAmount) {
            return false;
        }

        // Aplicar el cupón
        this.appliedCoupon = coupon;
        return true;
    }

    /**
     * Remueve el cupón aplicado del carrito
     * @returns {boolean} True si se removió correctamente
     */
    removeCoupon() {
        if (this.appliedCoupon) {
            this.appliedCoupon = null;
            return true;
        }
        return false;
    }

    /**
     * Calcula el subtotal del carrito
     * @returns {number} Subtotal (suma de productos sin impuestos)
     */
    calculateSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    /**
     * Calcula los impuestos (8% sobre el subtotal)
     * @returns {number} Monto de impuestos
     */
    calculateTaxes() {
        return this.calculateSubtotal() * 0.08;
    }

    /**
     * Calcula el descuento aplicado por el cupón
     * @returns {number} Monto del descuento
     */
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
                discount = 0; // Por ahora no afecta el cálculo
                break;
        }

        return discount;
    }

    /**
     * Calcula el total final del carrito
     * @returns {number} Total (subtotal + impuestos - descuento)
     */
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTaxes() - this.calculateDiscount();
    }

    /**
     * Obtiene un resumen completo del carrito
     * @returns {Object} Resumen del carrito
     */
    getCartSummary() {
        const items = this.items.map(item => ({
            product: item.product,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity
        }));

        return {
            items: items,
            subtotal: this.calculateSubtotal(),
            taxes: this.calculateTaxes(),
            discount: this.calculateDiscount(),
            total: this.calculateTotal(),
            appliedCoupon: this.appliedCoupon
        };
    }

    /**
     * Método auxiliar para obtener un cupón por código
     * @param {string} code - Código del cupón
     * @returns {Object|null} Cupón encontrado o null
     */
    getCouponByCode(code) {
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

// Versión extendida con funcionalidades adicionales
class ShoppingCartExtended extends ShoppingCart {
    constructor() {
        super();
        this.shippingCost = 0;
        this.shippingThreshold = 100; // Envío gratis sobre $100
    }

    /**
     * Calcula el costo de envío
     * @returns {number} Costo de envío
     */
    calculateShipping() {
        const subtotal = this.calculateSubtotal();
        
        // Envío gratis si hay cupón de envío gratis o supera el umbral
        if (this.appliedCoupon && this.appliedCoupon.type === 'free_shipping') {
            return 0;
        }
        
        if (subtotal >= this.shippingThreshold) {
            return 0;
        }
        
        return this.shippingCost;
    }

    /**
     * Calcula el total incluyendo envío
     * @returns {number} Total con envío
     */
    calculateTotalWithShipping() {
        return this.calculateTotal() + this.calculateShipping();
    }

    /**
     * Obtiene estadísticas del carrito
     * @returns {Object} Estadísticas del carrito
     */
    getCartStats() {
        const summary = this.getCartSummary();
        
        return {
            itemCount: this.items.length,
            totalQuantity: this.items.reduce((sum, item) => sum + item.quantity, 0),
            averageItemPrice: summary.items.length > 0 ? 
                summary.subtotal / summary.items.reduce((sum, item) => sum + item.quantity, 0) : 0,
            hasCoupon: !!this.appliedCoupon,
            shippingCost: this.calculateShipping(),
            totalWithShipping: this.calculateTotalWithShipping()
        };
    }

    /**
     * Limpia el carrito completamente
     */
    clearCart() {
        this.items = [];
        this.appliedCoupon = null;
    }

    /**
     * Verifica si el carrito está vacío
     * @returns {boolean} True si está vacío
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Obtiene el número total de productos en el carrito
     * @returns {number} Total de productos
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
}

// Versión con validaciones más estrictas
class ShoppingCartStrict extends ShoppingCart {
    constructor() {
        super();
        this.maxItems = 50; // Límite máximo de items
        this.maxQuantityPerItem = 10; // Límite máximo por item
    }

    addProduct(product, quantity) {
        // Validaciones adicionales
        if (this.items.length >= this.maxItems) {
            return false;
        }

        if (quantity > this.maxQuantityPerItem) {
            return false;
        }

        // Verificar si ya existe el producto
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem && existingItem.quantity + quantity > this.maxQuantityPerItem) {
            return false;
        }

        return super.addProduct(product, quantity);
    }

    updateQuantity(productId, quantity) {
        if (quantity > this.maxQuantityPerItem) {
            return false;
        }

        return super.updateQuantity(productId, quantity);
    }
}

module.exports = ShoppingCart;
