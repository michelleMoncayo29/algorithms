const ShoppingCart = require('./exercise');

describe('Carrito de Compras', () => {
    let cart;
    let laptop, mouse, keyboard;

    beforeEach(() => {
        cart = new ShoppingCart();
        
        // Productos de prueba
        laptop = {
            id: "PROD-001",
            name: "Laptop",
            price: 999.99,
            category: "Electronics",
            stock: 10
        };
        
        mouse = {
            id: "PROD-002",
            name: "Mouse",
            price: 29.99,
            category: "Electronics",
            stock: 50
        };
        
        keyboard = {
            id: "PROD-003",
            name: "Keyboard",
            price: 79.99,
            category: "Electronics",
            stock: 25
        };
    });

    // Tests del constructor
    test('debe inicializar el carrito vacío', () => {
        expect(cart.items).toEqual([]);
        expect(cart.appliedCoupon).toBe(null);
    });

    // Tests de agregar productos
    test('debe agregar productos válidos al carrito', () => {
        const result = cart.addProduct(laptop, 1);
        
        expect(result).toBe(true);
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0]).toMatchObject({
            product: laptop,
            quantity: 1
        });
    });

    test('debe agregar múltiples productos al carrito', () => {
        cart.addProduct(laptop, 1);
        cart.addProduct(mouse, 2);
        cart.addProduct(keyboard, 1);
        
        expect(cart.items).toHaveLength(3);
        expect(cart.calculateSubtotal()).toBe(1139.96); // 999.99 + 59.98 + 79.99
    });

    test('debe sumar cantidades si el producto ya existe', () => {
        cart.addProduct(laptop, 1);
        cart.addProduct(laptop, 2);
        
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(3);
    });

    test('debe rechazar productos con stock insuficiente', () => {
        const result = cart.addProduct(laptop, 15); // Solo hay 10 en stock
        
        expect(result).toBe(false);
        expect(cart.items).toHaveLength(0);
    });

    test('debe rechazar productos inválidos', () => {
        const result = cart.addProduct(null, 1);
        
        expect(result).toBe(false);
        expect(cart.items).toHaveLength(0);
    });

    test('debe rechazar cantidades inválidas', () => {
        const result = cart.addProduct(laptop, 0);
        
        expect(result).toBe(false);
        expect(cart.items).toHaveLength(0);
    });

    test('debe rechazar cantidades negativas', () => {
        const result = cart.addProduct(laptop, -1);
        
        expect(result).toBe(false);
        expect(cart.items).toHaveLength(0);
    });

    // Tests de remover productos
    test('debe remover productos existentes del carrito', () => {
        cart.addProduct(laptop, 1);
        cart.addProduct(mouse, 2);
        
        const result = cart.removeProduct("PROD-001");
        
        expect(result).toBe(true);
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].product.id).toBe("PROD-002");
    });

    test('debe retornar false al intentar remover producto inexistente', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.removeProduct("INVALID-ID");
        
        expect(result).toBe(false);
        expect(cart.items).toHaveLength(1);
    });

    // Tests de actualizar cantidad
    test('debe actualizar cantidad de productos existentes', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.updateQuantity("PROD-001", 3);
        
        expect(result).toBe(true);
        expect(cart.items[0].quantity).toBe(3);
    });

    test('debe rechazar actualización con stock insuficiente', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.updateQuantity("PROD-001", 15); // Solo hay 10 en stock
        
        expect(result).toBe(false);
        expect(cart.items[0].quantity).toBe(1); // No cambió
    });

    test('debe rechazar actualización con cantidad inválida', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.updateQuantity("PROD-001", 0);
        
        expect(result).toBe(false);
        expect(cart.items[0].quantity).toBe(1); // No cambió
    });

    test('debe rechazar actualización de producto inexistente', () => {
        const result = cart.updateQuantity("INVALID-ID", 5);
        
        expect(result).toBe(false);
    });

    // Tests de cupones
    test('debe aplicar cupón de descuento por porcentaje', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.applyCoupon("SAVE10");
        
        expect(result).toBe(true);
        expect(cart.appliedCoupon.code).toBe("SAVE10");
    });

    test('debe aplicar cupón de descuento fijo', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.applyCoupon("SAVE50");
        
        expect(result).toBe(true);
        expect(cart.appliedCoupon.code).toBe("SAVE50");
    });

    test('debe rechazar cupón con monto mínimo no alcanzado', () => {
        cart.addProduct(mouse, 1); // Solo $29.99, mínimo es $100 para SAVE10
        
        const result = cart.applyCoupon("SAVE10");
        
        expect(result).toBe(false);
        expect(cart.appliedCoupon).toBe(null);
    });

    test('debe rechazar cupón inexistente', () => {
        cart.addProduct(laptop, 1);
        
        const result = cart.applyCoupon("INVALID");
        
        expect(result).toBe(false);
        expect(cart.appliedCoupon).toBe(null);
    });

    test('debe remover cupón aplicado', () => {
        cart.addProduct(laptop, 1);
        cart.applyCoupon("SAVE10");
        
        const result = cart.removeCoupon();
        
        expect(result).toBe(true);
        expect(cart.appliedCoupon).toBe(null);
    });

    test('debe retornar false al intentar remover cupón inexistente', () => {
        const result = cart.removeCoupon();
        
        expect(result).toBe(false);
    });

    // Tests de cálculos
    test('debe calcular subtotal correctamente', () => {
        cart.addProduct(laptop, 1);
        cart.addProduct(mouse, 2);
        
        const subtotal = cart.calculateSubtotal();
        
        expect(subtotal).toBe(1059.97); // 999.99 + 59.98
    });

    test('debe calcular impuestos correctamente (8%)', () => {
        cart.addProduct(laptop, 1);
        
        const taxes = cart.calculateTaxes();
        
        expect(taxes).toBe(79.9992); // 8% de 999.99
    });

    test('debe calcular descuento por porcentaje correctamente', () => {
        cart.addProduct(laptop, 1);
        cart.applyCoupon("SAVE10");
        
        const discount = cart.calculateDiscount();
        
        expect(discount).toBe(99.999); // 10% de 999.99
    });

    test('debe calcular descuento fijo correctamente', () => {
        cart.addProduct(laptop, 1);
        cart.applyCoupon("SAVE50");
        
        const discount = cart.calculateDiscount();
        
        expect(discount).toBe(50); // Descuento fijo de $50
    });

    test('debe calcular descuento fijo sin exceder el subtotal', () => {
        cart.addProduct(mouse, 1); // Solo $29.99
        cart.applyCoupon("SAVE50"); // Descuento de $50
        
        const discount = cart.calculateDiscount();
        
        expect(discount).toBe(29.99); // No puede exceder el subtotal
    });

    test('debe calcular total correctamente sin cupón', () => {
        cart.addProduct(laptop, 1);
        
        const total = cart.calculateTotal();
        
        expect(total).toBe(1079.9892); // 999.99 + 79.9992 (impuestos)
    });

    test('debe calcular total correctamente con cupón de porcentaje', () => {
        cart.addProduct(laptop, 1);
        cart.applyCoupon("SAVE10");
        
        const total = cart.calculateTotal();
        
        expect(total).toBe(979.9902); // 999.99 + 79.9992 - 99.999
    });

    test('debe calcular total correctamente con cupón fijo', () => {
        cart.addProduct(laptop, 1);
        cart.applyCoupon("SAVE50");
        
        const total = cart.calculateTotal();
        
        expect(total).toBe(1029.9892); // 999.99 + 79.9992 - 50
    });

    // Tests de resumen del carrito
    test('debe generar resumen completo del carrito', () => {
        cart.addProduct(laptop, 1);
        cart.addProduct(mouse, 2);
        cart.applyCoupon("SAVE10");
        
        const summary = cart.getCartSummary();
        
        expect(summary).toMatchObject({
            items: expect.arrayContaining([
                expect.objectContaining({
                    product: laptop,
                    quantity: 1,
                    subtotal: 999.99
                }),
                expect.objectContaining({
                    product: mouse,
                    quantity: 2,
                    subtotal: 59.98
                })
            ]),
            subtotal: 1059.97,
            taxes: 84.7976,
            discount: 105.997,
            total: 1038.7706,
            appliedCoupon: expect.objectContaining({
                code: "SAVE10"
            })
        });
    });

    test('debe generar resumen sin cupón aplicado', () => {
        cart.addProduct(laptop, 1);
        
        const summary = cart.getCartSummary();
        
        expect(summary.appliedCoupon).toBe(null);
        expect(summary.discount).toBe(0);
    });

    // Tests de casos edge
    test('debe manejar carrito vacío', () => {
        expect(cart.calculateSubtotal()).toBe(0);
        expect(cart.calculateTaxes()).toBe(0);
        expect(cart.calculateDiscount()).toBe(0);
        expect(cart.calculateTotal()).toBe(0);
        
        const summary = cart.getCartSummary();
        expect(summary.items).toEqual([]);
        expect(summary.subtotal).toBe(0);
    });

    test('debe manejar productos con precios decimales', () => {
        const product = {
            id: "PROD-004",
            name: "Product",
            price: 19.99,
            category: "Test",
            stock: 10
        };
        
        cart.addProduct(product, 3);
        
        expect(cart.calculateSubtotal()).toBe(59.97);
        expect(cart.calculateTaxes()).toBe(4.7976);
    });

    test('debe manejar múltiples operaciones secuenciales', () => {
        // Agregar productos
        cart.addProduct(laptop, 1);
        cart.addProduct(mouse, 2);
        
        // Aplicar cupón
        cart.applyCoupon("SAVE10");
        
        // Actualizar cantidad
        cart.updateQuantity("PROD-002", 3);
        
        // Remover producto
        cart.removeProduct("PROD-001");
        
        // Verificar estado final
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0].quantity).toBe(3);
        expect(cart.appliedCoupon.code).toBe("SAVE10");
        expect(cart.calculateSubtotal()).toBe(89.97); // 29.99 * 3
    });

    test('debe manejar cupones con diferentes tipos', () => {
        cart.addProduct(laptop, 1);
        
        // Probar cupón de porcentaje
        cart.applyCoupon("SAVE10");
        expect(cart.calculateDiscount()).toBe(99.999);
        
        // Cambiar a cupón fijo
        cart.applyCoupon("SAVE50");
        expect(cart.calculateDiscount()).toBe(50);
        
        // Probar cupón de envío gratis
        cart.applyCoupon("FREESHIP");
        expect(cart.calculateDiscount()).toBe(0); // Por ahora no afecta el cálculo
    });

    test('debe validar que solo se puede aplicar un cupón a la vez', () => {
        cart.addProduct(laptop, 1);
        
        cart.applyCoupon("SAVE10");
        expect(cart.appliedCoupon.code).toBe("SAVE10");
        
        cart.applyCoupon("SAVE50");
        expect(cart.appliedCoupon.code).toBe("SAVE50"); // Reemplaza el anterior
    });
});
