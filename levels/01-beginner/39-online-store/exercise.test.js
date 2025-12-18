const { Product, Cart, Store } = require('./exercise');

describe('Sistema de Gestión de Tienda Online', () => {
    // ===== CLASE PRODUCT =====
    describe('Clase Product', () => {
        describe('Casos básicos', () => {
            test('crea un producto correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: name='Laptop', price=999.99, stock=10, category='Electronics'
                // Esperado: Product creado con todas las propiedades correctas
                const product = new Product('Laptop', 999.99, 10, 'Electronics');
                expect(product.name).toBe('Laptop');
                expect(product.price).toBe(999.99);
                expect(product.stock).toBe(10);
                expect(product.category).toBe('Electronics');
            });

            test('obtiene el precio correctamente', () => {
                // Propósito: Verificar que getPrice retorna el precio
                // Entrada: price=199.99
                // Esperado: Retorna 199.99
                const product = new Product('Test', 199.99, 5, 'Category');
                expect(product.getPrice()).toBe(199.99);
            });

            test('obtiene el stock correctamente', () => {
                // Propósito: Verificar que getStock retorna el stock
                // Entrada: stock=15
                // Esperado: Retorna 15
                const product = new Product('Test', 100, 15, 'Category');
                expect(product.getStock()).toBe(15);
            });

            test('obtiene la categoría correctamente', () => {
                // Propósito: Verificar que getCategory retorna la categoría
                // Entrada: category='Books'
                // Esperado: Retorna 'Books'
                const product = new Product('Test', 100, 5, 'Books');
                expect(product.getCategory()).toBe('Books');
            });

            test('verifica disponibilidad correctamente', () => {
                // Propósito: Verificar que isAvailable retorna true cuando stock > 0
                // Entrada: stock=5
                // Esperado: Retorna true
                const product = new Product('Test', 100, 5, 'Category');
                expect(product.isAvailable()).toBe(true);
            });

            test('verifica que no está disponible cuando stock es 0', () => {
                // Propósito: Verificar que isAvailable retorna false cuando stock = 0
                // Entrada: stock=0
                // Esperado: Retorna false
                const product = new Product('Test', 100, 0, 'Category');
                expect(product.isAvailable()).toBe(false);
            });

            test('reduce el stock correctamente', () => {
                // Propósito: Verificar que reduceStock reduce el stock correctamente
                // Entrada: stock inicial=10, quantity=3
                // Esperado: stock final=7
                const product = new Product('Test', 100, 10, 'Category');
                product.reduceStock(3);
                expect(product.getStock()).toBe(7);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Product name is required"
                expect(() => new Product('', 100, 5, 'Category')).toThrow('Product name is required');
            });

            test('lanza error cuando el precio es inválido', () => {
                // Propósito: Verificar validación de price > 0
                // Entrada: price=0 o negativo
                // Esperado: Error "Product price must be greater than 0"
                expect(() => new Product('Test', 0, 5, 'Category')).toThrow('Product price must be greater than 0');
            });

            test('lanza error cuando el stock es inválido', () => {
                // Propósito: Verificar validación de stock >= 0
                // Entrada: stock=-1
                // Esperado: Error "Product stock must be greater than or equal to 0"
                expect(() => new Product('Test', 100, -1, 'Category')).toThrow('Product stock must be greater than or equal to 0');
            });

            test('lanza error cuando la categoría está vacía', () => {
                // Propósito: Verificar validación de category no vacío
                // Entrada: category=''
                // Esperado: Error "Product category is required"
                expect(() => new Product('Test', 100, 5, '')).toThrow('Product category is required');
            });

            test('lanza error cuando quantity es inválida en reduceStock', () => {
                // Propósito: Verificar validación de quantity > 0
                // Entrada: quantity=0 o negativo
                // Esperado: Error "Quantity must be greater than 0"
                const product = new Product('Test', 100, 10, 'Category');
                expect(() => product.reduceStock(0)).toThrow('Quantity must be greater than 0');
            });

            test('lanza error cuando no hay suficiente stock en reduceStock', () => {
                // Propósito: Verificar validación de stock suficiente
                // Entrada: stock=5, quantity=10
                // Esperado: Error "Insufficient stock"
                const product = new Product('Test', 100, 5, 'Category');
                expect(() => product.reduceStock(10)).toThrow('Insufficient stock');
            });
        });
    });

    // ===== CLASE CART =====
    describe('Clase Cart', () => {
        let store;
        let product1;
        let product2;

        beforeEach(() => {
            store = new Store('Mi Tienda');
            product1 = new Product('Laptop', 999.99, 10, 'Electronics');
            product2 = new Product('Mouse', 29.99, 20, 'Electronics');
            store.addProduct(product1);
            store.addProduct(product2);
        });

        describe('Casos básicos', () => {
            test('crea un carrito correctamente', () => {
                // Propósito: Verificar que el constructor inicializa correctamente
                // Entrada: Sin parámetros
                // Esperado: Cart creado con items vacío y discount=0
                const cart = new Cart();
                expect(Array.isArray(cart.items)).toBe(true);
                expect(cart.items.length).toBe(0);
                expect(cart.discount).toBe(0);
            });

            test('agrega un producto al carrito correctamente', () => {
                // Propósito: Verificar que addProduct agrega un producto válido
                // Entrada: product y quantity válidos
                // Esperado: Producto agregado al carrito
                const cart = new Cart();
                const result = cart.addProduct(product1, 2);
                expect(result).toBe(true);
                expect(cart.items.length).toBe(1);
                expect(cart.items[0].product).toBe(product1);
                expect(cart.items[0].quantity).toBe(2);
            });

            test('incrementa cantidad cuando el producto ya está en el carrito', () => {
                // Propósito: Verificar que addProduct incrementa cantidad si el producto ya existe
                // Entrada: Agregar el mismo producto dos veces
                // Esperado: La cantidad se incrementa
                const cart = new Cart();
                cart.addProduct(product1, 2);
                cart.addProduct(product1, 3);
                expect(cart.items.length).toBe(1);
                expect(cart.items[0].quantity).toBe(5);
            });

            test('elimina un producto del carrito correctamente', () => {
                // Propósito: Verificar que removeProduct elimina un producto existente
                // Entrada: productName que existe en el carrito
                // Esperado: Producto eliminado
                const cart = new Cart();
                cart.addProduct(product1, 2);
                const result = cart.removeProduct('Laptop');
                expect(result).toBe(true);
                expect(cart.items.length).toBe(0);
            });

            test('retorna false cuando se intenta eliminar producto inexistente', () => {
                // Propósito: Verificar que removeProduct retorna false cuando el producto no existe
                // Entrada: productName que no existe
                // Esperado: Retorna false
                const cart = new Cart();
                expect(cart.removeProduct('Inexistente')).toBe(false);
            });

            test('actualiza la cantidad correctamente', () => {
                // Propósito: Verificar que updateQuantity actualiza la cantidad
                // Entrada: productName existente y newQuantity válido
                // Esperado: Cantidad actualizada
                const cart = new Cart();
                cart.addProduct(product1, 2);
                const result = cart.updateQuantity('Laptop', 5);
                expect(result).toBe(true);
                expect(cart.items[0].quantity).toBe(5);
            });

            test('establece descuento correctamente', () => {
                // Propósito: Verificar que setDiscount establece el descuento
                // Entrada: discountPercent=10
                // Esperado: Descuento establecido correctamente
                const cart = new Cart();
                const result = cart.setDiscount(10);
                expect(result).toBe(true);
                expect(cart.discount).toBe(10);
            });

            test('calcula el subtotal correctamente', () => {
                // Propósito: Verificar que getSubtotal calcula correctamente usando reduce()
                // Entrada: Múltiples productos con diferentes cantidades
                // Esperado: Suma de precios × cantidades
                const cart = new Cart();
                cart.addProduct(product1, 2); // 999.99 * 2 = 1999.98
                cart.addProduct(product2, 3); // 29.99 * 3 = 89.97
                expect(cart.getSubtotal()).toBe(2089.95);
            });

            test('calcula el total con descuento correctamente', () => {
                // Propósito: Verificar que getTotal calcula correctamente con descuento
                // Entrada: subtotal=1000, descuento=10%
                // Esperado: Total=900
                const cart = new Cart();
                cart.addProduct(product1, 1); // 999.99
                cart.setDiscount(10);
                const total = cart.getTotal();
                expect(total).toBeCloseTo(899.991, 2);
            });

            test('calcula el total de items correctamente', () => {
                // Propósito: Verificar que getTotalItems suma todas las cantidades usando reduce()
                // Entrada: Múltiples productos con diferentes cantidades
                // Esperado: Suma de todas las cantidades
                const cart = new Cart();
                cart.addProduct(product1, 2);
                cart.addProduct(product2, 3);
                expect(cart.getTotalItems()).toBe(5);
            });

            test('vacía el carrito correctamente', () => {
                // Propósito: Verificar que clear vacía el carrito y resetea el descuento
                // Entrada: Carrito con productos y descuento
                // Esperado: Carrito vacío y descuento=0
                const cart = new Cart();
                cart.addProduct(product1, 2);
                cart.setDiscount(10);
                const result = cart.clear();
                expect(result).toBe(true);
                expect(cart.items.length).toBe(0);
                expect(cart.discount).toBe(0);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando product no es instancia de Product', () => {
                // Propósito: Verificar validación de instancia de Product
                // Entrada: product={}
                // Esperado: Error "Product must be an instance of Product"
                const cart = new Cart();
                expect(() => cart.addProduct({}, 1)).toThrow('Product must be an instance of Product');
            });

            test('lanza error cuando quantity es inválida', () => {
                // Propósito: Verificar validación de quantity > 0
                // Entrada: quantity=0 o negativo
                // Esperado: Error "Quantity must be greater than 0"
                const cart = new Cart();
                expect(() => cart.addProduct(product1, 0)).toThrow('Quantity must be greater than 0');
            });

            test('lanza error cuando el producto no está disponible', () => {
                // Propósito: Verificar validación de producto disponible
                // Entrada: producto con stock=0
                // Esperado: Error "Product is not available"
                const cart = new Cart();
                const outOfStockProduct = new Product('Test', 100, 0, 'Category');
                expect(() => cart.addProduct(outOfStockProduct, 1)).toThrow('Product is not available');
            });

            test('lanza error cuando no hay suficiente stock', () => {
                // Propósito: Verificar validación de stock suficiente al agregar producto nuevo
                // Entrada: stock=5, quantity=10 (producto nuevo en carrito)
                // Esperado: Error "Insufficient stock"
                const cart = new Cart();
                const lowStockProduct = new Product('Test', 100, 5, 'Category');
                expect(() => cart.addProduct(lowStockProduct, 10)).toThrow('Insufficient stock');
            });


            test('lanza error cuando discountPercent es inválido', () => {
                // Propósito: Verificar validación de discountPercent entre 0 y 100
                // Entrada: discountPercent=-1 o >100
                // Esperado: Error "Discount must be between 0 and 100"
                const cart = new Cart();
                expect(() => cart.setDiscount(-1)).toThrow('Discount must be between 0 and 100');
                expect(() => cart.setDiscount(101)).toThrow('Discount must be between 0 and 100');
            });
        });
    });

    // ===== CLASE STORE =====
    describe('Clase Store', () => {
        describe('Casos básicos', () => {
            test('crea una tienda correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: name='Mi Tienda'
                // Esperado: Store creado con name correcto, products inicializado como array vacío
                const store = new Store('Mi Tienda');
                expect(store.name).toBe('Mi Tienda');
                expect(Array.isArray(store.products)).toBe(true);
                expect(store.products.length).toBe(0);
            });

            test('agrega un producto correctamente', () => {
                // Propósito: Verificar que addProduct agrega un producto válido
                // Entrada: product (instancia de Product)
                // Esperado: Producto agregado al array products
                const store = new Store('Mi Tienda');
                const product = new Product('Laptop', 999.99, 10, 'Electronics');
                const added = store.addProduct(product);
                expect(store.products.length).toBe(1);
                expect(added).toBe(product);
            });

            test('encuentra un producto por nombre correctamente', () => {
                // Propósito: Verificar que findProduct busca y retorna un producto existente
                // Entrada: productName='Laptop' que existe
                // Esperado: Retorna el producto encontrado
                const store = new Store('Mi Tienda');
                const product = new Product('Laptop', 999.99, 10, 'Electronics');
                store.addProduct(product);
                const found = store.findProduct('Laptop');
                expect(found).toBe(product);
            });

            test('retorna null cuando no encuentra un producto', () => {
                // Propósito: Verificar que findProduct retorna null cuando el producto no existe
                // Entrada: productName='Inexistente'
                // Esperado: Retorna null
                const store = new Store('Mi Tienda');
                expect(store.findProduct('Inexistente')).toBeNull();
            });

            test('obtiene productos disponibles correctamente', () => {
                // Propósito: Verificar que getAvailableProducts filtra productos con stock > 0
                // Entrada: Productos con diferentes stocks
                // Esperado: Retorna solo productos disponibles
                const store = new Store('Mi Tienda');
                const product1 = new Product('Laptop', 999.99, 10, 'Electronics');
                const product2 = new Product('Mouse', 29.99, 0, 'Electronics');
                store.addProduct(product1);
                store.addProduct(product2);
                const available = store.getAvailableProducts();
                expect(available.length).toBe(1);
                expect(available[0]).toBe(product1);
            });

            test('obtiene productos por categoría correctamente', () => {
                // Propósito: Verificar que getProductsByCategory filtra por categoría
                // Entrada: category='Electronics'
                // Esperado: Retorna solo productos de esa categoría
                const store = new Store('Mi Tienda');
                const product1 = new Product('Laptop', 999.99, 10, 'Electronics');
                const product2 = new Product('Book', 19.99, 5, 'Books');
                store.addProduct(product1);
                store.addProduct(product2);
                const electronics = store.getProductsByCategory('Electronics');
                expect(electronics.length).toBe(1);
                expect(electronics[0]).toBe(product1);
            });

            test('procesa una compra correctamente', () => {
                // Propósito: Verificar que processPurchase reduce stock y retorna el total
                // Entrada: carrito con productos válidos
                // Esperado: Stock reducido, total retornado
                const store = new Store('Mi Tienda');
                const product = new Product('Laptop', 999.99, 10, 'Electronics');
                store.addProduct(product);
                const cart = new Cart();
                cart.addProduct(product, 2);
                const total = store.processPurchase(cart);
                expect(product.getStock()).toBe(8);
                expect(total).toBe(999.99 * 2);
                expect(cart.items.length).toBe(0);
            });

            test('calcula el valor del inventario correctamente', () => {
                // Propósito: Verificar que getInventoryValue calcula correctamente usando reduce()
                // Entrada: Múltiples productos con diferentes precios y stocks
                // Esperado: Suma de precio × stock para cada producto
                const store = new Store('Mi Tienda');
                const product1 = new Product('Laptop', 999.99, 10, 'Electronics'); // 9999.9
                const product2 = new Product('Mouse', 29.99, 20, 'Electronics'); // 599.8
                store.addProduct(product1);
                store.addProduct(product2);
                expect(store.getInventoryValue()).toBeCloseTo(10599.7, 1);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Store name is required"
                expect(() => new Store('')).toThrow('Store name is required');
            });

            test('lanza error cuando product no es instancia de Product', () => {
                // Propósito: Verificar validación de instancia de Product en addProduct
                // Entrada: product={}
                // Esperado: Error "Product must be an instance of Product"
                const store = new Store('Mi Tienda');
                expect(() => store.addProduct({})).toThrow('Product must be an instance of Product');
            });

            test('lanza error cuando se intenta agregar producto duplicado', () => {
                // Propósito: Verificar validación de productos duplicados
                // Entrada: Agregar dos productos con el mismo nombre
                // Esperado: Error "Product already exists" en el segundo intento
                const store = new Store('Mi Tienda');
                const product1 = new Product('Laptop', 999.99, 10, 'Electronics');
                const product2 = new Product('Laptop', 899.99, 5, 'Electronics');
                store.addProduct(product1);
                expect(() => store.addProduct(product2)).toThrow('Product already exists');
            });

            test('lanza error cuando cart no es instancia de Cart', () => {
                // Propósito: Verificar validación de instancia de Cart en processPurchase
                // Entrada: cart={}
                // Esperado: Error "Cart must be an instance of Cart"
                const store = new Store('Mi Tienda');
                expect(() => store.processPurchase({})).toThrow('Cart must be an instance of Cart');
            });

            test('lanza error cuando el carrito está vacío', () => {
                // Propósito: Verificar validación de carrito no vacío
                // Entrada: carrito vacío
                // Esperado: Error "Cart is empty"
                const store = new Store('Mi Tienda');
                const cart = new Cart();
                expect(() => store.processPurchase(cart)).toThrow('Cart is empty');
            });

            test('lanza error cuando no hay suficiente stock para procesar compra', () => {
                // Propósito: Verificar validación de stock suficiente antes de procesar
                // Entrada: carrito con cantidad mayor al stock disponible (se agrega cantidad válida primero, luego se reduce stock)
                // Esperado: Error "Insufficient stock for product: [nombre]"
                const store = new Store('Mi Tienda');
                const product = new Product('Laptop', 999.99, 10, 'Electronics');
                store.addProduct(product);
                const cart = new Cart();
                cart.addProduct(product, 10); // Agrega cantidad válida inicialmente
                // Simula que el stock se redujo después de agregar al carrito
                product.reduceStock(6); // Reduce stock a 4
                expect(() => store.processPurchase(cart)).toThrow('Insufficient stock for product: Laptop');
            });
        });
    });
});

