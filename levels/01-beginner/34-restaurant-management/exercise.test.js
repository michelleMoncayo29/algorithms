const { Menu, Order, Restaurant } = require('./exercise');

describe('Sistema de Gestión de Restaurante', () => {
    // ===== CLASE MENU =====
    describe('Clase Menu', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos', () => {
            test('crea un menú con nombre y descripción correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: name='Menú Principal', description='Platos principales'
                // Esperado: Menu creado con name y description correctos, dishes inicializado como array vacío
                const menu = new Menu('Menú Principal', 'Platos principales');
                expect(menu.name).toBe('Menú Principal');
                expect(menu.description).toBe('Platos principales');
                expect(Array.isArray(menu.dishes)).toBe(true);
                expect(menu.dishes.length).toBe(0);
            });

            test('agrega un plato al menú correctamente', () => {
                // Propósito: Verificar que addDish agrega un plato válido al menú
                // Entrada: dish con name, price, category, stock válidos
                // Esperado: Plato agregado al array dishes y retornado
                const menu = new Menu('Menú Principal', 'Descripción');
                const dish = menu.addDish({
                    name: 'Pasta Carbonara',
                    price: 15.99,
                    category: 'Main Course',
                    stock: 10
                });
                expect(menu.dishes.length).toBe(1);
                expect(dish.name).toBe('Pasta Carbonara');
                expect(dish.price).toBe(15.99);
            });

            test('encuentra un plato por nombre correctamente', () => {
                // Propósito: Verificar que findDish busca y retorna un plato existente
                // Entrada: dishName='Pasta Carbonara' que existe en el menú
                // Esperado: Retorna el plato encontrado
                const menu = new Menu('Menú Principal', 'Descripción');
                menu.addDish({
                    name: 'Pasta Carbonara',
                    price: 15.99,
                    category: 'Main Course',
                    stock: 10
                });
                const found = menu.findDish('Pasta Carbonara');
                expect(found).not.toBeNull();
                expect(found.name).toBe('Pasta Carbonara');
            });

            test('retorna null cuando no encuentra un plato', () => {
                // Propósito: Verificar que findDish retorna null cuando el plato no existe
                // Entrada: dishName='Plato Inexistente'
                // Esperado: Retorna null
                const menu = new Menu('Menú Principal', 'Descripción');
                const found = menu.findDish('Plato Inexistente');
                expect(found).toBeNull();
            });

            test('obtiene platos disponibles correctamente', () => {
                // Propósito: Verificar que getAvailableDishes filtra solo platos con stock > 0
                // Entrada: Menú con platos con stock > 0 y stock = 0
                // Esperado: Retorna solo platos con stock > 0
                const menu = new Menu('Menú Principal', 'Descripción');
                menu.addDish({ name: 'Plato 1', price: 10, category: 'Cat', stock: 5 });
                menu.addDish({ name: 'Plato 2', price: 15, category: 'Cat', stock: 0 });
                menu.addDish({ name: 'Plato 3', price: 20, category: 'Cat', stock: 3 });
                const available = menu.getAvailableDishes();
                expect(available.length).toBe(2);
                expect(available.every(dish => dish.stock > 0)).toBe(true);
            });

            test('obtiene platos por categoría correctamente', () => {
                // Propósito: Verificar que getDishesByCategory filtra por categoría
                // Entrada: category='Main Course'
                // Esperado: Retorna solo platos de esa categoría
                const menu = new Menu('Menú Principal', 'Descripción');
                menu.addDish({ name: 'Pasta', price: 15, category: 'Main Course', stock: 10 });
                menu.addDish({ name: 'Salad', price: 8, category: 'Appetizer', stock: 20 });
                menu.addDish({ name: 'Pizza', price: 12, category: 'Main Course', stock: 15 });
                const mainCourses = menu.getDishesByCategory('Main Course');
                expect(mainCourses.length).toBe(2);
                expect(mainCourses.every(dish => dish.category === 'Main Course')).toBe(true);
            });
        });

        // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre del menú está vacío', () => {
                // Propósito: Verificar validación de nombre no vacío en constructor
                // Entrada: name='', description='Descripción válida'
                // Esperado: Error "Menu name is required"
                expect(() => new Menu('', 'Descripción')).toThrow('Menu name is required');
            });

            test('lanza error cuando la descripción del menú está vacía', () => {
                // Propósito: Verificar validación de descripción no vacía en constructor
                // Entrada: name='Menú', description=''
                // Esperado: Error "Menu description is required"
                expect(() => new Menu('Menú', '')).toThrow('Menu description is required');
            });

            test('lanza error cuando el plato no tiene nombre', () => {
                // Propósito: Verificar validación de nombre de plato en addDish
                // Entrada: dish sin propiedad name
                // Esperado: Error "Dish name is required"
                const menu = new Menu('Menú', 'Descripción');
                expect(() => menu.addDish({ price: 10, category: 'Cat', stock: 5 })).toThrow('Dish name is required');
            });

            test('lanza error cuando el precio del plato es inválido', () => {
                // Propósito: Verificar validación de precio > 0 en addDish
                // Entrada: dish con price <= 0
                // Esperado: Error "Dish price must be greater than 0"
                const menu = new Menu('Menú', 'Descripción');
                expect(() => menu.addDish({ name: 'Plato', price: 0, category: 'Cat', stock: 5 })).toThrow('Dish price must be greater than 0');
                expect(() => menu.addDish({ name: 'Plato', price: -5, category: 'Cat', stock: 5 })).toThrow('Dish price must be greater than 0');
            });

            test('lanza error cuando la categoría del plato está vacía', () => {
                // Propósito: Verificar validación de categoría no vacía en addDish
                // Entrada: dish con category vacío
                // Esperado: Error "Dish category is required"
                const menu = new Menu('Menú', 'Descripción');
                expect(() => menu.addDish({ name: 'Plato', price: 10, category: '', stock: 5 })).toThrow('Dish category is required');
            });

            test('lanza error cuando el stock del plato es negativo', () => {
                // Propósito: Verificar validación de stock >= 0 en addDish
                // Entrada: dish con stock < 0
                // Esperado: Error "Dish stock must be greater than or equal to 0"
                const menu = new Menu('Menú', 'Descripción');
                expect(() => menu.addDish({ name: 'Plato', price: 10, category: 'Cat', stock: -1 })).toThrow('Dish stock must be greater than or equal to 0');
            });

            test('lanza error cuando se intenta agregar un plato duplicado', () => {
                // Propósito: Verificar validación de platos duplicados en addDish
                // Entrada: Agregar dos platos con el mismo nombre
                // Esperado: Error "Dish already exists" en el segundo intento
                const menu = new Menu('Menú', 'Descripción');
                menu.addDish({ name: 'Pasta', price: 15, category: 'Main', stock: 10 });
                expect(() => menu.addDish({ name: 'Pasta', price: 20, category: 'Main', stock: 5 })).toThrow('Dish already exists');
            });

            test('lanza error cuando se intenta eliminar un plato inexistente', () => {
                // Propósito: Verificar validación en removeDish cuando el plato no existe
                // Entrada: dishName='Plato Inexistente'
                // Esperado: Error "Dish not found"
                const menu = new Menu('Menú', 'Descripción');
                expect(() => menu.removeDish('Plato Inexistente')).toThrow('Dish not found');
            });
        });
    });

    // ===== CLASE ORDER =====
    describe('Clase Order', () => {
        let menu;

        beforeEach(() => {
            menu = new Menu('Menú Principal', 'Descripción');
            menu.addDish({ name: 'Pasta Carbonara', price: 15.99, category: 'Main Course', stock: 10 });
            menu.addDish({ name: 'Ensalada César', price: 8.99, category: 'Appetizer', stock: 20 });
        });

        // ===== CASOS BÁSICOS =====
        describe('Casos básicos', () => {
            test('crea una orden con mesa y mesero correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: tableNumber=5, waiterName='Juan Pérez'
                // Esperado: Order creada con tableNumber y waiterName correctos, items inicializado como array vacío
                const order = new Order(5, 'Juan Pérez');
                expect(order.tableNumber).toBe(5);
                expect(order.waiterName).toBe('Juan Pérez');
                expect(Array.isArray(order.items)).toBe(true);
                expect(order.items.length).toBe(0);
                expect(order.completed).toBe(false);
            });

            test('agrega un item a la orden correctamente', () => {
                // Propósito: Verificar que addItem agrega un plato válido a la orden
                // Entrada: menu válido, dishName='Pasta Carbonara', quantity=2
                // Esperado: Item agregado al array items con cantidad y precio correctos
                const order = new Order(1, 'Mesero');
                const result = order.addItem(menu, 'Pasta Carbonara', 2);
                expect(result).toBe(true);
                expect(order.items.length).toBe(1);
                expect(order.items[0].dishName).toBe('Pasta Carbonara');
                expect(order.items[0].quantity).toBe(2);
                expect(order.items[0].price).toBe(15.99);
            });

            test('suma cantidad cuando se agrega el mismo plato dos veces', () => {
                // Propósito: Verificar que addItem suma la cantidad si el plato ya está en la orden
                // Entrada: Agregar 'Pasta Carbonara' con quantity=2 dos veces
                // Esperado: Un solo item con quantity=4
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2);
                order.addItem(menu, 'Pasta Carbonara', 2);
                expect(order.items.length).toBe(1);
                expect(order.items[0].quantity).toBe(4);
            });

            test('calcula el subtotal correctamente', () => {
                // Propósito: Verificar que calculateSubtotal suma precio × cantidad de todos los items
                // Entrada: Orden con items de diferentes precios y cantidades
                // Esperado: Subtotal = suma de (precio × cantidad) de cada item
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2); // 15.99 * 2 = 31.98
                order.addItem(menu, 'Ensalada César', 1); // 8.99 * 1 = 8.99
                const subtotal = order.calculateSubtotal();
                expect(subtotal).toBeCloseTo(40.97, 2);
            });

            test('calcula los impuestos correctamente (8%)', () => {
                // Propósito: Verificar que calculateTaxes calcula el 8% del subtotal
                // Entrada: Orden con subtotal de 40.97
                // Esperado: Impuestos = 40.97 * 0.08 = 3.28
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2);
                order.addItem(menu, 'Ensalada César', 1);
                const taxes = order.calculateTaxes();
                expect(taxes).toBeCloseTo(3.28, 2);
            });

            test('calcula el total correctamente (subtotal + impuestos)', () => {
                // Propósito: Verificar que calculateTotal suma subtotal e impuestos
                // Entrada: Orden con subtotal 40.97 e impuestos 3.28
                // Esperado: Total = 40.97 + 3.28 = 44.25
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2);
                order.addItem(menu, 'Ensalada César', 1);
                const total = order.calculateTotal();
                expect(total).toBeCloseTo(44.25, 2);
            });

            test('marca la orden como completada correctamente', () => {
                // Propósito: Verificar que markAsCompleted cambia el estado a completada
                // Entrada: Orden con completed=false
                // Esperado: completed=true después de llamar markAsCompleted()
                const order = new Order(1, 'Mesero');
                expect(order.completed).toBe(false);
                const result = order.markAsCompleted();
                expect(order.completed).toBe(true);
                expect(result).toBe(true);
            });

            test('elimina un item de la orden correctamente', () => {
                // Propósito: Verificar que removeItem elimina un item existente
                // Entrada: Orden con items, removeItem('Pasta Carbonara')
                // Esperado: Item eliminado del array items
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2);
                order.addItem(menu, 'Ensalada César', 1);
                const result = order.removeItem('Pasta Carbonara');
                expect(result).toBe(true);
                expect(order.items.length).toBe(1);
                expect(order.items[0].dishName).toBe('Ensalada César');
            });

            test('retorna false cuando se intenta eliminar un item inexistente', () => {
                // Propósito: Verificar que removeItem retorna false cuando el item no existe
                // Entrada: removeItem('Plato Inexistente')
                // Esperado: Retorna false, items no cambia
                const order = new Order(1, 'Mesero');
                order.addItem(menu, 'Pasta Carbonara', 2);
                const result = order.removeItem('Plato Inexistente');
                expect(result).toBe(false);
                expect(order.items.length).toBe(1);
            });
        });

        // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el número de mesa es inválido', () => {
                // Propósito: Verificar validación de tableNumber > 0 en constructor
                // Entrada: tableNumber=0 o negativo
                // Esperado: Error "Table number must be greater than 0"
                expect(() => new Order(0, 'Mesero')).toThrow('Table number must be greater than 0');
                expect(() => new Order(-1, 'Mesero')).toThrow('Table number must be greater than 0');
            });

            test('lanza error cuando el nombre del mesero está vacío', () => {
                // Propósito: Verificar validación de waiterName no vacío en constructor
                // Entrada: waiterName='' o solo espacios
                // Esperado: Error "Waiter name is required"
                expect(() => new Order(1, '')).toThrow('Waiter name is required');
                expect(() => new Order(1, '   ')).toThrow('Waiter name is required');
            });

            test('lanza error cuando menu no es una instancia de Menu', () => {
                // Propósito: Verificar validación de instancia de Menu en addItem
                // Entrada: menu={} (objeto inválido)
                // Esperado: Error "Menu must be an instance of Menu"
                const order = new Order(1, 'Mesero');
                expect(() => order.addItem({}, 'Pasta Carbonara', 1)).toThrow('Menu must be an instance of Menu');
            });

            test('lanza error cuando el plato no existe en el menú', () => {
                // Propósito: Verificar validación de plato existente en addItem
                // Entrada: dishName='Plato Inexistente'
                // Esperado: Error "Dish not found in menu"
                const order = new Order(1, 'Mesero');
                expect(() => order.addItem(menu, 'Plato Inexistente', 1)).toThrow('Dish not found in menu');
            });

            test('lanza error cuando la cantidad es inválida', () => {
                // Propósito: Verificar validación de quantity > 0 en addItem
                // Entrada: quantity=0 o negativo
                // Esperado: Error "Quantity must be greater than 0"
                const order = new Order(1, 'Mesero');
                expect(() => order.addItem(menu, 'Pasta Carbonara', 0)).toThrow('Quantity must be greater than 0');
                expect(() => order.addItem(menu, 'Pasta Carbonara', -1)).toThrow('Quantity must be greater than 0');
            });

            test('lanza error cuando no hay stock suficiente', () => {
                // Propósito: Verificar validación de stock suficiente en addItem
                // Entrada: quantity=15 cuando stock=10
                // Esperado: Error "Insufficient stock"
                const order = new Order(1, 'Mesero');
                expect(() => order.addItem(menu, 'Pasta Carbonara', 15)).toThrow('Insufficient stock');
            });
        });

        // ===== CASOS LÍMITE =====
        describe('Casos límite', () => {
            test('calcula subtotal correctamente cuando no hay items', () => {
                // Propósito: Verificar que calculateSubtotal retorna 0 cuando no hay items
                // Entrada: Orden sin items
                // Esperado: Subtotal = 0
                const order = new Order(1, 'Mesero');
                expect(order.calculateSubtotal()).toBe(0);
            });

            test('calcula impuestos correctamente cuando el subtotal es 0', () => {
                // Propósito: Verificar que calculateTaxes retorna 0 cuando subtotal es 0
                // Entrada: Orden sin items
                // Esperado: Impuestos = 0
                const order = new Order(1, 'Mesero');
                expect(order.calculateTaxes()).toBe(0);
            });

            test('permite agregar exactamente el stock disponible', () => {
                // Propósito: Verificar que se puede agregar cantidad igual al stock disponible
                // Entrada: quantity=10 cuando stock=10
                // Esperado: Item agregado correctamente
                const order = new Order(1, 'Mesero');
                const result = order.addItem(menu, 'Pasta Carbonara', 10);
                expect(result).toBe(true);
                expect(order.items[0].quantity).toBe(10);
            });
        });
    });

    // ===== CLASE RESTAURANT =====
    describe('Clase Restaurant', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos', () => {
            test('crea un restaurante con nombre correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades básicas
                // Entrada: name='El Buen Sabor'
                // Esperado: Restaurant creado con name correcto, menus y orders inicializados como arrays vacíos
                const restaurant = new Restaurant('El Buen Sabor');
                expect(restaurant.name).toBe('El Buen Sabor');
                expect(Array.isArray(restaurant.menus)).toBe(true);
                expect(Array.isArray(restaurant.orders)).toBe(true);
                expect(restaurant.menus.length).toBe(0);
                expect(restaurant.orders.length).toBe(0);
            });

            test('agrega un menú al restaurante correctamente', () => {
                // Propósito: Verificar que addMenu agrega un menú válido
                // Entrada: menu (instancia de Menu)
                // Esperado: Menú agregado al array menus y retornado
                const restaurant = new Restaurant('El Buen Sabor');
                const menu = new Menu('Menú Principal', 'Descripción');
                const added = restaurant.addMenu(menu);
                expect(restaurant.menus.length).toBe(1);
                expect(added).toBe(menu);
            });

            test('crea una orden correctamente', () => {
                // Propósito: Verificar que createOrder crea y agrega una orden
                // Entrada: tableNumber=5, waiterName='Juan Pérez'
                // Esperado: Orden creada y agregada al array orders
                const restaurant = new Restaurant('El Buen Sabor');
                const order = restaurant.createOrder(5, 'Juan Pérez');
                expect(restaurant.orders.length).toBe(1);
                expect(order.tableNumber).toBe(5);
                expect(order.waiterName).toBe('Juan Pérez');
            });

            test('obtiene una orden por índice correctamente', () => {
                // Propósito: Verificar que getOrder retorna la orden en el índice especificado
                // Entrada: orderIndex=0
                // Esperado: Retorna la primera orden
                const restaurant = new Restaurant('El Buen Sabor');
                const order1 = restaurant.createOrder(1, 'Mesero 1');
                const order2 = restaurant.createOrder(2, 'Mesero 2');
                const retrieved = restaurant.getOrder(0);
                expect(retrieved).toBe(order1);
            });

            test('obtiene órdenes activas correctamente', () => {
                // Propósito: Verificar que getActiveOrders filtra solo órdenes no completadas
                // Entrada: Órdenes completadas y activas
                // Esperado: Retorna solo órdenes con completed=false
                const restaurant = new Restaurant('El Buen Sabor');
                const order1 = restaurant.createOrder(1, 'Mesero 1');
                const order2 = restaurant.createOrder(2, 'Mesero 2');
                order1.markAsCompleted();
                const active = restaurant.getActiveOrders();
                expect(active.length).toBe(1);
                expect(active[0]).toBe(order2);
            });

            test('calcula los ingresos totales correctamente', () => {
                // Propósito: Verificar que getRevenue suma el total de órdenes completadas
                // Entrada: Órdenes completadas con diferentes totales
                // Esperado: Suma de todos los totales de órdenes completadas
                const restaurant = new Restaurant('El Buen Sabor');
                const menu = new Menu('Menú', 'Descripción');
                menu.addDish({ name: 'Plato', price: 10, category: 'Cat', stock: 10 });
                restaurant.addMenu(menu);

                const order1 = restaurant.createOrder(1, 'Mesero 1');
                order1.addItem(menu, 'Plato', 2); // Total: 21.60
                order1.markAsCompleted();

                const order2 = restaurant.createOrder(2, 'Mesero 2');
                order2.addItem(menu, 'Plato', 1); // Total: 10.80
                order2.markAsCompleted();

                const revenue = restaurant.getRevenue();
                expect(revenue).toBeCloseTo(32.40, 2);
            });
        });

        // ===== VALIDACIÓN DE ENTRADAS (FAIL FAST) =====
        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre del restaurante está vacío', () => {
                // Propósito: Verificar validación de name no vacío en constructor
                // Entrada: name='' o solo espacios
                // Esperado: Error "Restaurant name is required"
                expect(() => new Restaurant('')).toThrow('Restaurant name is required');
                expect(() => new Restaurant('   ')).toThrow('Restaurant name is required');
            });

            test('lanza error cuando menu no es una instancia de Menu', () => {
                // Propósito: Verificar validación de instancia de Menu en addMenu
                // Entrada: menu={} (objeto inválido)
                // Esperado: Error "Menu must be an instance of Menu"
                const restaurant = new Restaurant('El Buen Sabor');
                expect(() => restaurant.addMenu({})).toThrow('Menu must be an instance of Menu');
            });

            test('retorna null cuando el índice de orden es inválido', () => {
                // Propósito: Verificar que getOrder retorna null cuando el índice es inválido
                // Entrada: orderIndex=-1 o >= orders.length
                // Esperado: Retorna null
                const restaurant = new Restaurant('El Buen Sabor');
                expect(restaurant.getOrder(-1)).toBeNull();
                expect(restaurant.getOrder(0)).toBeNull();
                restaurant.createOrder(1, 'Mesero');
                expect(restaurant.getOrder(1)).toBeNull();
            });
        });

        // ===== CASOS LÍMITE =====
        describe('Casos límite', () => {
            test('retorna array vacío cuando no hay órdenes activas', () => {
                // Propósito: Verificar que getActiveOrders retorna array vacío cuando todas están completadas
                // Entrada: Todas las órdenes están completadas
                // Esperado: Array vacío
                const restaurant = new Restaurant('El Buen Sabor');
                const order = restaurant.createOrder(1, 'Mesero');
                order.markAsCompleted();
                const active = restaurant.getActiveOrders();
                expect(active.length).toBe(0);
            });

            test('retorna 0 cuando no hay órdenes completadas', () => {
                // Propósito: Verificar que getRevenue retorna 0 cuando no hay órdenes completadas
                // Entrada: Solo órdenes activas
                // Esperado: Revenue = 0
                const restaurant = new Restaurant('El Buen Sabor');
                restaurant.createOrder(1, 'Mesero');
                expect(restaurant.getRevenue()).toBe(0);
            });
        });
    });
});

