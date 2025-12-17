const { Product, Inventory } = require('./exercise');

describe('Sistema de Inventario Simple', () => {
    // ===== CASOS BÁSICOS - CLASE PRODUCT =====
    describe('Clase Product - Casos básicos', () => {
        test('crea un producto con propiedades correctas', () => {
            // Este test verifica que el constructor de Product asigna correctamente las propiedades básicas.
            // Se espera que al crear un producto, todas sus propiedades se inicialicen con los valores proporcionados.
            const product = new Product('Laptop', 1000, 5, 'Electronics');
            expect(product.name).toBe('Laptop');
            expect(product.price).toBe(1000);
            expect(product.quantity).toBe(5);
            expect(product.category).toBe('Electronics');
        });

        test('acepta cantidad en cero', () => {
            // Este test verifica que se puede crear un producto con cantidad 0 (sin stock inicial).
            // El comportamiento esperado es que la cantidad 0 sea válida.
            const product = new Product('Mouse', 25, 0, 'Electronics');
            expect(product.quantity).toBe(0);
        });
    });

    // ===== VALIDACIONES - CLASE PRODUCT =====
    describe('Clase Product - Validaciones', () => {
        test('lanza error cuando el nombre está vacío', () => {
            // Este test verifica que el constructor valida que el nombre no esté vacío.
            // Se espera que lance un error descriptivo cuando el nombre es una cadena vacía o solo espacios.
            expect(() => new Product('', 100, 5, 'Electronics')).toThrow('Product name is required');
        });

        test('lanza error cuando el nombre es solo espacios', () => {
            // Este test verifica que el constructor rechaza nombres que solo contienen espacios en blanco.
            // El comportamiento esperado es tratar espacios en blanco como nombre inválido.
            expect(() => new Product('   ', 100, 5, 'Electronics')).toThrow('Product name is required');
        });

        test('lanza error cuando el precio es cero o negativo', () => {
            // Este test verifica que el constructor valida que el precio sea mayor que 0.
            // Se espera que lance un error cuando el precio es 0 o negativo.
            expect(() => new Product('Laptop', 0, 5, 'Electronics')).toThrow('Product price must be greater than 0');
            expect(() => new Product('Laptop', -100, 5, 'Electronics')).toThrow('Product price must be greater than 0');
        });

        test('lanza error cuando la cantidad es negativa', () => {
            // Este test verifica que el constructor valida que la cantidad no sea negativa.
            // Se espera que lance un error cuando la cantidad es menor que 0.
            expect(() => new Product('Laptop', 1000, -1, 'Electronics')).toThrow('Product quantity must be greater than or equal to 0');
        });

        test('lanza error cuando la categoría está vacía', () => {
            // Este test verifica que el constructor valida que la categoría no esté vacía.
            // Se espera que lance un error cuando la categoría es una cadena vacía o solo espacios.
            expect(() => new Product('Laptop', 1000, 5, '')).toThrow('Product category is required');
            expect(() => new Product('Laptop', 1000, 5, '   ')).toThrow('Product category is required');
        });
    });

    // ===== CASOS BÁSICOS - CLASE INVENTORY =====
    describe('Clase Inventory - Casos básicos', () => {
        test('inicializa con array vacío de productos', () => {
            // Este test verifica que el constructor de Inventory inicializa correctamente el array de productos.
            // Se espera que al crear un inventario nuevo, el array de productos esté vacío.
            const inventory = new Inventory();
            expect(inventory.products).toEqual([]);
        });

        test('addProduct agrega un nuevo producto y lo retorna', () => {
            // Este test verifica que addProduct crea y agrega un nuevo producto al inventario.
            // El comportamiento esperado es que el producto se agregue al array y se retorne la instancia creada.
            const inventory = new Inventory();
            const product = inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            expect(product).toBeInstanceOf(Product);
            expect(product.name).toBe('Laptop');
            expect(inventory.products).toHaveLength(1);
            expect(inventory.products[0]).toBe(product);
        });

        test('addProduct puede agregar múltiples productos', () => {
            // Este test verifica que se pueden agregar múltiples productos al inventario.
            // Se espera que cada producto se agregue correctamente y el array crezca en tamaño.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            inventory.addProduct('Mouse', 25, 50, 'Electronics');
            inventory.addProduct('Desk', 200, 10, 'Furniture');
            
            expect(inventory.products).toHaveLength(3);
        });
    });

    // ===== VALIDACIONES - CLASE INVENTORY =====
    describe('Clase Inventory - Validaciones', () => {
        test('lanza error cuando se intenta agregar un producto duplicado', () => {
            // Este test verifica que addProduct valida que no existan productos duplicados por nombre.
            // Se espera que lance un error cuando se intenta agregar un producto con un nombre que ya existe.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            expect(() => inventory.addProduct('Laptop', 800, 3, 'Electronics')).toThrow('Product already exists');
        });

        test('addProduct es case-sensitive para nombres duplicados', () => {
            // Este test verifica que la validación de duplicados distingue entre mayúsculas y minúsculas.
            // Se espera que 'Laptop' y 'laptop' se consideren productos diferentes.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            // Esto no debería lanzar error porque son nombres diferentes (case-sensitive)
            const product2 = inventory.addProduct('laptop', 800, 3, 'Electronics');
            expect(product2).toBeInstanceOf(Product);
        });
    });

    // ===== MÉTODO findProduct() =====
    describe('Método findProduct()', () => {
        test('encuentra un producto existente por nombre', () => {
            // Este test verifica que findProduct encuentra correctamente un producto usando find().
            // Se espera que cuando existe un producto con la descripción buscada, se retorne ese producto.
            const inventory = new Inventory();
            const product1 = inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            inventory.addProduct('Mouse', 25, 50, 'Electronics');
            
            const found = inventory.findProduct('Laptop');
            expect(found).toBe(product1);
            expect(found.name).toBe('Laptop');
        });

        test('retorna null cuando no encuentra el producto', () => {
            // Este test verifica que findProduct retorna null cuando no existe un producto con ese nombre.
            // El comportamiento esperado es que find() no encuentre nada y se retorne null.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const found = inventory.findProduct('Keyboard');
            expect(found).toBeNull();
        });

        test('findProduct es case-sensitive', () => {
            // Este test verifica que la búsqueda distingue entre mayúsculas y minúsculas.
            // Se espera que 'Laptop' y 'laptop' se consideren nombres diferentes.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const found = inventory.findProduct('laptop');
            expect(found).toBeNull();
        });
    });

    // ===== MÉTODO sellProduct() =====
    describe('Método sellProduct()', () => {
        test('vende producto con stock suficiente', () => {
            // Este test verifica que sellProduct reduce correctamente el stock cuando hay suficiente cantidad.
            // Se espera que después de vender, la cantidad en stock se reduzca en la cantidad vendida.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 10, 'Electronics');
            
            const sold = inventory.sellProduct('Laptop', 3);
            expect(sold.quantity).toBe(7);
            expect(inventory.findProduct('Laptop').quantity).toBe(7);
        });

        test('lanza error cuando el producto no existe', () => {
            // Este test verifica que sellProduct valida que el producto exista antes de vender.
            // Se espera que lance un error cuando se intenta vender un producto que no existe.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 10, 'Electronics');
            
            expect(() => inventory.sellProduct('Keyboard', 5)).toThrow('Product not found');
        });

        test('lanza error cuando no hay suficiente stock', () => {
            // Este test verifica que sellProduct valida que haya suficiente stock antes de vender.
            // Se espera que lance un error cuando se intenta vender más cantidad de la disponible.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            expect(() => inventory.sellProduct('Laptop', 10)).toThrow('Insufficient stock');
            // El stock no debe cambiar
            expect(inventory.findProduct('Laptop').quantity).toBe(5);
        });

        test('permite vender exactamente todo el stock disponible', () => {
            // Este test verifica que se puede vender todo el stock disponible.
            // El stock final debe ser 0 cuando se vende la cantidad exacta disponible.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const sold = inventory.sellProduct('Laptop', 5);
            expect(sold.quantity).toBe(0);
        });
    });

    // ===== MÉTODO restockProduct() =====
    describe('Método restockProduct()', () => {
        test('reposa stock correctamente', () => {
            // Este test verifica que restockProduct incrementa correctamente el stock de un producto.
            // Se espera que después de reponer, la cantidad en stock se incremente en la cantidad agregada.
            const inventory = new Inventory();
            inventory.addProduct('Keyboard', 50, 20, 'Electronics');
            
            const restocked = inventory.restockProduct('Keyboard', 30);
            expect(restocked.quantity).toBe(50);
            expect(inventory.findProduct('Keyboard').quantity).toBe(50);
        });

        test('lanza error cuando el producto no existe', () => {
            // Este test verifica que restockProduct valida que el producto exista antes de reponer.
            // Se espera que lance un error cuando se intenta reponer un producto que no existe.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            expect(() => inventory.restockProduct('Keyboard', 10)).toThrow('Product not found');
        });

        test('lanza error cuando la cantidad a agregar es cero o negativa', () => {
            // Este test verifica que restockProduct valida que la cantidad a agregar sea mayor que 0.
            // Se espera que lance un error cuando la cantidad es 0 o negativa.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            expect(() => inventory.restockProduct('Laptop', 0)).toThrow('Quantity must be greater than 0');
            expect(() => inventory.restockProduct('Laptop', -5)).toThrow('Quantity must be greater than 0');
            // El stock no debe cambiar
            expect(inventory.findProduct('Laptop').quantity).toBe(5);
        });

        test('permite reponer múltiples veces', () => {
            // Este test verifica que se puede reponer el stock de un producto múltiples veces.
            // Se espera que cada reposición incremente el stock acumulativamente.
            const inventory = new Inventory();
            inventory.addProduct('Mouse', 25, 10, 'Electronics');
            
            inventory.restockProduct('Mouse', 20);
            expect(inventory.findProduct('Mouse').quantity).toBe(30);
            
            inventory.restockProduct('Mouse', 15);
            expect(inventory.findProduct('Mouse').quantity).toBe(45);
        });
    });

    // ===== MÉTODO getTotalValue() - Usa reduce() =====
    describe('Método getTotalValue() - Usa reduce()', () => {
        test('calcula correctamente el valor total del inventario', () => {
            // Este test verifica que getTotalValue calcula correctamente usando reduce() para sumar precio × cantidad.
            // Se espera que calcule (precio × cantidad) de cada producto y sume todos los valores.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics'); // 5000
            inventory.addProduct('Mouse', 25, 20, 'Electronics');   // 500
            inventory.addProduct('Desk', 200, 10, 'Furniture');     // 2000
            
            const total = inventory.getTotalValue();
            expect(total).toBe(7500);
        });

        test('retorna 0 cuando no hay productos', () => {
            // Este test verifica que getTotalValue retorna 0 cuando el inventario está vacío.
            // El comportamiento esperado es que reduce() sobre un array vacío retorne el valor inicial (0).
            const inventory = new Inventory();
            const total = inventory.getTotalValue();
            expect(total).toBe(0);
        });

        test('calcula correctamente después de vender productos', () => {
            // Este test verifica que getTotalValue refleja correctamente los cambios después de vender productos.
            // Se espera que el valor total se actualice cuando cambia la cantidad de productos.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 10, 'Electronics'); // Inicial: 10000
            
            inventory.sellProduct('Laptop', 3); // Ahora: 7 laptops = 7000
            const total = inventory.getTotalValue();
            expect(total).toBe(7000);
        });

        test('calcula correctamente con productos que tienen cantidad cero', () => {
            // Este test verifica que getTotalValue maneja correctamente productos con cantidad 0.
            // Se espera que productos sin stock (cantidad 0) contribuyan con 0 al valor total.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics'); // 5000
            inventory.addProduct('Mouse', 25, 0, 'Electronics');    // 0
            
            const total = inventory.getTotalValue();
            expect(total).toBe(5000);
        });
    });

    // ===== MÉTODO getLowStockProducts() - Usa filter() =====
    describe('Método getLowStockProducts() - Usa filter()', () => {
        test('filtra correctamente productos con stock bajo', () => {
            // Este test verifica que getLowStockProducts filtra correctamente usando filter() para obtener productos con stock bajo.
            // Se espera que retorne un nuevo array con productos que tienen quantity <= threshold.
            const inventory = new Inventory();
            const laptop = inventory.addProduct('Laptop', 1000, 2, 'Electronics');  // stock bajo
            inventory.addProduct('Mouse', 25, 50, 'Electronics');                  // stock normal
            const keyboard = inventory.addProduct('Keyboard', 50, 1, 'Electronics'); // stock bajo
            
            const lowStock = inventory.getLowStockProducts(5);
            expect(lowStock).toHaveLength(2);
            expect(lowStock).toContain(laptop);
            expect(lowStock).toContain(keyboard);
        });

        test('retorna array vacío cuando no hay productos con stock bajo', () => {
            // Este test verifica que getLowStockProducts retorna un array vacío cuando no hay productos que cumplan el criterio.
            // El comportamiento esperado es que filter() no encuentre coincidencias y retorne un array vacío.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 10, 'Electronics');
            inventory.addProduct('Mouse', 25, 50, 'Electronics');
            
            const lowStock = inventory.getLowStockProducts(5);
            expect(lowStock).toEqual([]);
        });

        test('incluye productos con cantidad igual al umbral', () => {
            // Este test verifica que getLowStockProducts incluye productos cuya cantidad es exactamente igual al umbral.
            // Se espera que productos con quantity === threshold se incluyan en el resultado.
            const inventory = new Inventory();
            const product = inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const lowStock = inventory.getLowStockProducts(5);
            expect(lowStock).toContain(product);
            expect(lowStock).toHaveLength(1);
        });

        test('retorna un nuevo array (no muta el original)', () => {
            // Este test verifica que getLowStockProducts retorna un nuevo array sin modificar el array original.
            // El comportamiento esperado es que filter() cree un nuevo array.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 2, 'Electronics');
            
            const lowStock = inventory.getLowStockProducts(5);
            lowStock.push('intento de modificación');
            
            expect(inventory.getLowStockProducts(5)).toHaveLength(1);
        });
    });

    // ===== MÉTODO getProductsByCategory() - Usa filter() =====
    describe('Método getProductsByCategory() - Usa filter()', () => {
        test('filtra correctamente productos por categoría', () => {
            // Este test verifica que getProductsByCategory filtra correctamente usando filter() para obtener productos de una categoría.
            // Se espera que retorne un nuevo array con productos que tienen la categoría especificada.
            const inventory = new Inventory();
            const laptop = inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            const mouse = inventory.addProduct('Mouse', 25, 50, 'Electronics');
            inventory.addProduct('Desk', 200, 10, 'Furniture');
            
            const electronics = inventory.getProductsByCategory('Electronics');
            expect(electronics).toHaveLength(2);
            expect(electronics).toContain(laptop);
            expect(electronics).toContain(mouse);
        });

        test('retorna array vacío cuando no hay productos de esa categoría', () => {
            // Este test verifica que getProductsByCategory retorna un array vacío cuando no existen productos de la categoría buscada.
            // El comportamiento esperado es que filter() no encuentre coincidencias y retorne un array vacío.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const furniture = inventory.getProductsByCategory('Furniture');
            expect(furniture).toEqual([]);
        });

        test('es case-sensitive para categorías', () => {
            // Este test verifica que el filtrado por categoría distingue entre mayúsculas y minúsculas.
            // Se espera que 'Electronics' y 'electronics' se consideren categorías diferentes.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const electronics = inventory.getProductsByCategory('electronics');
            expect(electronics).toEqual([]);
        });

        test('retorna un nuevo array (no muta el original)', () => {
            // Este test verifica que getProductsByCategory retorna un nuevo array sin modificar el array original.
            // El comportamiento esperado es que filter() cree un nuevo array.
            const inventory = new Inventory();
            inventory.addProduct('Laptop', 1000, 5, 'Electronics');
            
            const electronics = inventory.getProductsByCategory('Electronics');
            electronics.push('intento de modificación');
            
            expect(inventory.getProductsByCategory('Electronics')).toHaveLength(1);
        });
    });

    // ===== INTEGRACIÓN - OPERACIONES COMBINADAS =====
    describe('Integración - Operaciones combinadas', () => {
        test('permite realizar operaciones complejas con múltiples productos', () => {
            // Este test verifica que todos los métodos trabajan correctamente juntos en un escenario real.
            // Se espera que se puedan agregar productos, vender, reponer, y realizar consultas sin problemas.
            const inventory = new Inventory();
            
            // Agregar productos
            inventory.addProduct('Laptop', 1000, 10, 'Electronics');
            inventory.addProduct('Mouse', 25, 50, 'Electronics');
            inventory.addProduct('Desk', 200, 5, 'Furniture');
            
            // Vender algunos productos
            inventory.sellProduct('Laptop', 3);
            inventory.sellProduct('Mouse', 20);
            
            // Reponer stock
            inventory.restockProduct('Desk', 5);
            
            // Verificar cálculos
            expect(inventory.getTotalValue()).toBe(9750); // (7*1000) + (30*25) + (10*200) = 7000 + 750 + 2000
            
            // Verificar filtros
            const lowStock = inventory.getLowStockProducts(10);
            expect(lowStock.length).toBe(2); // Laptop (7) y Desk (10) tienen stock <= 10
            
            const electronics = inventory.getProductsByCategory('Electronics');
            expect(electronics).toHaveLength(2);
        });
    });
});

