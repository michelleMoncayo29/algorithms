/**
 * Solución: Sistema de Gestión de Restaurante
 * 
 * Esta implementación muestra cómo crear clases Menu, Order y Restaurant que gestionan
 * menús de platos, órdenes y operaciones del restaurante con validaciones y cálculos financieros.
 */

class Menu {
    constructor(name, description) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Menu name is required');
        }

        // Valida que la descripción sea un string no vacío
        if (typeof description !== 'string' || description.trim().length === 0) {
            throw new Error('Menu description is required');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.description = description.trim();
        this.dishes = [];
    }

    addDish(dish) {
        // Valida que dish sea un objeto
        if (typeof dish !== 'object' || dish === null || Array.isArray(dish)) {
            throw new Error('Dish must be an object');
        }

        // Valida que el nombre del plato sea un string no vacío
        if (typeof dish.name !== 'string' || dish.name.trim().length === 0) {
            throw new Error('Dish name is required');
        }

        // Valida que el precio sea un número mayor que 0
        if (typeof dish.price !== 'number' || dish.price <= 0) {
            throw new Error('Dish price must be greater than 0');
        }

        // Valida que la categoría sea un string no vacío
        if (typeof dish.category !== 'string' || dish.category.trim().length === 0) {
            throw new Error('Dish category is required');
        }

        // Valida que el stock sea un número mayor o igual a 0
        if (typeof dish.stock !== 'number' || dish.stock < 0) {
            throw new Error('Dish stock must be greater than or equal to 0');
        }

        // Valida que no exista ya un plato con ese nombre
        if (this.findDish(dish.name) !== null) {
            throw new Error('Dish already exists');
        }

        // Agrega el plato al array
        this.dishes.push(dish);

        // Retorna el plato agregado
        return dish;
    }

    findDish(dishName) {
        // Usa find() para buscar un plato cuyo name coincida exactamente
        const dish = this.dishes.find(dish => dish.name === dishName);
        return dish || null;
    }

    removeDish(dishName) {
        // Busca el plato por nombre
        const dish = this.findDish(dishName);
        
        // Valida que el plato exista
        if (dish === null) {
            throw new Error('Dish not found');
        }

        // Encuentra el índice del plato
        const dishIndex = this.dishes.findIndex(d => d.name === dishName);

        // Elimina el plato del array
        this.dishes.splice(dishIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    getAvailableDishes() {
        // Usa filter() para obtener platos con stock > 0
        return this.dishes.filter(dish => dish.stock > 0);
    }

    getDishesByCategory(category) {
        // Usa filter() para obtener platos de la categoría especificada
        return this.dishes.filter(dish => dish.category === category);
    }
}

class Order {
    constructor(tableNumber, waiterName) {
        // Valida que tableNumber sea un número mayor que 0
        if (typeof tableNumber !== 'number' || tableNumber <= 0) {
            throw new Error('Table number must be greater than 0');
        }

        // Valida que waiterName sea un string no vacío
        if (typeof waiterName !== 'string' || waiterName.trim().length === 0) {
            throw new Error('Waiter name is required');
        }

        // Asigna los valores validados
        this.tableNumber = tableNumber;
        this.waiterName = waiterName.trim();
        this.items = [];
        this.completed = false;
    }

    addItem(menu, dishName, quantity) {
        // Valida que menu sea una instancia de Menu
        if (!(menu instanceof Menu)) {
            throw new Error('Menu must be an instance of Menu');
        }

        // Busca el plato en el menú
        const dish = menu.findDish(dishName);
        
        // Valida que el plato exista
        if (dish === null) {
            throw new Error('Dish not found in menu');
        }

        // Valida que quantity sea un número mayor que 0
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Valida que haya stock suficiente
        if (dish.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        // Busca si el plato ya está en la orden
        const existingItem = this.items.find(item => item.dishName === dishName);

        if (existingItem) {
            // Si existe, suma la cantidad
            existingItem.quantity += quantity;
        } else {
            // Si no existe, agrega un nuevo item
            this.items.push({
                dishName,
                quantity,
                price: dish.price
            });
        }

        // Retorna true si se agregó correctamente
        return true;
    }

    removeItem(dishName) {
        // Busca el índice del item
        const itemIndex = this.items.findIndex(item => item.dishName === dishName);

        // Si no se encuentra, retorna false
        if (itemIndex === -1) {
            return false;
        }

        // Elimina el item del array
        this.items.splice(itemIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    calculateSubtotal() {
        // Usa reduce() para calcular el subtotal
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    calculateTaxes() {
        // Calcula los impuestos (8% del subtotal)
        const subtotal = this.calculateSubtotal();
        return subtotal * 0.08;
    }

    calculateTotal() {
        // Calcula el total (subtotal + impuestos)
        const subtotal = this.calculateSubtotal();
        const taxes = this.calculateTaxes();
        return subtotal + taxes;
    }

    markAsCompleted() {
        // Marca la orden como completada
        this.completed = true;
        return true;
    }
}

class Restaurant {
    constructor(name) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Restaurant name is required');
        }

        // Asigna el nombre validado
        this.name = name.trim();
        this.menus = [];
        this.orders = [];
    }

    addMenu(menu) {
        // Valida que menu sea una instancia de Menu
        if (!(menu instanceof Menu)) {
            throw new Error('Menu must be an instance of Menu');
        }

        // Agrega el menú al array
        this.menus.push(menu);

        // Retorna el menú agregado
        return menu;
    }

    createOrder(tableNumber, waiterName) {
        // Crea una nueva instancia de Order
        const order = new Order(tableNumber, waiterName);

        // Agrega la orden al array
        this.orders.push(order);

        // Retorna la orden creada
        return order;
    }

    getOrder(orderIndex) {
        // Valida que el índice sea válido
        if (typeof orderIndex !== 'number' || orderIndex < 0 || orderIndex >= this.orders.length) {
            return null;
        }

        // Retorna la orden en el índice especificado
        return this.orders[orderIndex];
    }

    getActiveOrders() {
        // Usa filter() para obtener solo órdenes no completadas
        return this.orders.filter(order => order.completed === false);
    }

    getRevenue() {
        // Filtra las órdenes completadas
        const completedOrders = this.orders.filter(order => order.completed);

        // Si no hay órdenes completadas, retorna 0
        if (completedOrders.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el total de ingresos
        return completedOrders.reduce((total, order) => {
            return total + order.calculateTotal();
        }, 0);
    }
}

module.exports = {
    Menu,
    Order,
    Restaurant
};

