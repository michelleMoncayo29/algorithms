/**
 * Sistema de Gestión de Restaurante (Restaurant Management System)
 *
 * Descripción: Implementa tres clases básicas (`Menu`, `Order` y `Restaurant`) para practicar
 * constructores, métodos de instancia, validaciones complejas, cálculos financieros y gestión
 * de relaciones entre múltiples clases.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un menú de platos del restaurante.
 * Traducción: Menú
 * @class
 */
class Menu {
    /**
     * Constructor de la clase Menu
     * Traducción: Constructor de Menú
     *
     * Crea un nuevo menú con nombre y descripción.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} name - Nombre del menú (no puede estar vacío)
     * @param {string} description - Descripción del menú (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Menu name is required" si el nombre es inválido
     * - Valida que description sea un string no vacío (después de trim)
     * - Lanza error "Menu description is required" si la descripción es inválida
     * - Inicializa this.dishes como un array vacío []
     * - Asigna los valores validados a this.name y this.description
     */
    constructor(name, description) {
        throw new Error('Menu constructor not implemented');
    }

    /**
     * Agrega un plato al menú.
     * Traducción: Agregar Plato
     *
     * Este método agrega un plato al menú. El plato debe ser un objeto con las propiedades:
     * name (string), price (number > 0), category (string), stock (number >= 0).
     * Debe validar que el plato tenga todas las propiedades requeridas y que no exista
     * ya un plato con el mismo nombre.
     *
     * @param {Object} dish - Objeto con propiedades: name, price, category, stock
     * @returns {Object} El plato agregado
     *
     * TODO:
     * - Valida que dish sea un objeto
     * - Valida que dish.name sea un string no vacío
     * - Lanza error "Dish name is required" si el nombre es inválido
     * - Valida que dish.price sea un número mayor que 0
     * - Lanza error "Dish price must be greater than 0" si el precio es inválido
     * - Valida que dish.category sea un string no vacío
     * - Lanza error "Dish category is required" si la categoría es inválida
     * - Valida que dish.stock sea un número mayor o igual a 0
     * - Lanza error "Dish stock must be greater than or equal to 0" si el stock es inválido
     * - Usa findDish() para verificar si ya existe un plato con ese nombre
     * - Si el plato existe, lanza un error con el mensaje: "Dish already exists"
     * - Agrega el plato al array this.dishes usando push()
     * - Retorna el plato agregado
     */
    addDish(dish) {
        throw new Error('Method addDish not implemented');
    }

    /**
     * Busca un plato por su nombre usando find().
     * Traducción: Buscar Plato
     *
     * Este método busca un plato cuyo name coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     *
     * @param {string} dishName - Nombre del plato a buscar
     * @returns {Object|null} El plato encontrado o null si no existe
     *
     * TODO:
     * - Usa this.dishes.find() para buscar un plato cuyo name coincida exactamente
     * - Retorna el plato encontrado o null si no se encuentra
     */
    findDish(dishName) {
        throw new Error('Method findDish not implemented');
    }

    /**
     * Elimina un plato del menú.
     * Traducción: Eliminar Plato
     *
     * Este método elimina un plato del menú buscándolo por nombre.
     * Si el plato no existe, debe lanzar un error.
     *
     * @param {string} dishName - Nombre del plato a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Usa findDish() para buscar el plato por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Dish not found"
     * - Encuentra el índice del plato usando findIndex()
     * - Elimina el plato del array this.dishes usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeDish(dishName) {
        throw new Error('Method removeDish not implemented');
    }

    /**
     * Obtiene todos los platos disponibles (con stock > 0) usando filter().
     * Traducción: Obtener Platos Disponibles
     *
     * Este método retorna un nuevo array con todos los platos que tienen stock mayor que 0.
     * Debe usar el método filter() del array.
     *
     * @returns {Object[]} Array con los platos disponibles
     *
     * TODO:
     * - Usa this.dishes.filter() para filtrar platos
     * - Filtra platos donde dish.stock > 0
     * - Retorna el nuevo array filtrado
     */
    getAvailableDishes() {
        throw new Error('Method getAvailableDishes not implemented');
    }

    /**
     * Obtiene todos los platos de una categoría específica usando filter().
     * Traducción: Obtener Platos por Categoría
     *
     * Este método retorna un nuevo array con todos los platos de la categoría especificada.
     * Debe usar el método filter() del array.
     *
     * @param {string} category - Categoría a filtrar
     * @returns {Object[]} Array con los platos de esa categoría
     *
     * TODO:
     * - Usa this.dishes.filter() para filtrar platos
     * - Filtra platos donde dish.category === category
     * - Retorna el nuevo array filtrado
     */
    getDishesByCategory(category) {
        throw new Error('Method getDishesByCategory not implemented');
    }
}

/**
 * Representa una orden del restaurante.
 * Traducción: Orden
 * @class
 */
class Order {
    /**
     * Constructor de la clase Order
     * Traducción: Constructor de Orden
     *
     * Crea una nueva orden con número de mesa y nombre del mesero.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {number} tableNumber - Número de mesa (debe ser mayor que 0)
     * @param {string} waiterName - Nombre del mesero (no puede estar vacío)
     *
     * TODO:
     * - Valida que tableNumber sea un número mayor que 0
     * - Lanza error "Table number must be greater than 0" si el número es inválido
     * - Valida que waiterName sea un string no vacío (después de trim)
     * - Lanza error "Waiter name is required" si el nombre es inválido
     * - Inicializa this.items como un array vacío []
     * - Inicializa this.completed como false
     * - Asigna los valores validados a this.tableNumber y this.waiterName
     */
    constructor(tableNumber, waiterName) {
        throw new Error('Order constructor not implemented');
    }

    /**
     * Agrega un plato a la orden.
     * Traducción: Agregar Item
     *
     * Este método agrega un plato a la orden. Debe validar que el plato exista en el menú
     * y que haya stock suficiente. Si el plato ya está en la orden, suma la cantidad.
     *
     * @param {Object} menu - Instancia de Menu que contiene los platos
     * @param {string} dishName - Nombre del plato a agregar
     * @param {number} quantity - Cantidad a agregar (debe ser mayor que 0)
     * @returns {boolean} true si se agregó correctamente
     *
     * TODO:
     * - Valida que menu sea una instancia de Menu
     * - Lanza error "Menu must be an instance of Menu" si es inválido
     * - Usa menu.findDish() para buscar el plato
     * - Si el plato no existe, lanza un error: "Dish not found in menu"
     * - Valida que quantity sea un número mayor que 0
     * - Lanza error "Quantity must be greater than 0" si la cantidad es inválida
     * - Verifica que dish.stock >= quantity (stock suficiente)
     * - Lanza error "Insufficient stock" si no hay stock suficiente
     * - Busca si el plato ya está en this.items usando find()
     * - Si existe, suma la cantidad al item existente
     * - Si no existe, agrega un nuevo item: { dishName, quantity, price: dish.price }
     * - Retorna true si se agregó correctamente
     */
    addItem(menu, dishName, quantity) {
        throw new Error('Method addItem not implemented');
    }

    /**
     * Elimina un plato de la orden.
     * Traducción: Eliminar Item
     *
     * Este método elimina un plato de la orden buscándolo por nombre.
     *
     * @param {string} dishName - Nombre del plato a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Busca el índice del item en this.items usando findIndex()
     * - Si no se encuentra, retorna false
     * - Elimina el item del array usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeItem(dishName) {
        throw new Error('Method removeItem not implemented');
    }

    /**
     * Calcula el subtotal de la orden usando reduce().
     * Traducción: Calcular Subtotal
     *
     * Este método calcula el subtotal sumando (precio × cantidad) de todos los items.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} El subtotal de la orden
     *
     * TODO:
     * - Usa this.items.reduce() para calcular el total
     * - Para cada item, suma (item.price * item.quantity) al acumulador
     * - Retorna el subtotal
     * - Si no hay items, retorna 0
     */
    calculateSubtotal() {
        throw new Error('Method calculateSubtotal not implemented');
    }

    /**
     * Calcula los impuestos (8% del subtotal).
     * Traducción: Calcular Impuestos
     *
     * Este método calcula los impuestos aplicando una tasa del 8% sobre el subtotal.
     *
     * @returns {number} El monto de impuestos
     *
     * TODO:
     * - Calcula el subtotal usando calculateSubtotal()
     * - Calcula los impuestos: subtotal * 0.08
     * - Retorna el monto de impuestos
     */
    calculateTaxes() {
        throw new Error('Method calculateTaxes not implemented');
    }

    /**
     * Calcula el total de la orden (subtotal + impuestos).
     * Traducción: Calcular Total
     *
     * Este método calcula el total final sumando subtotal e impuestos.
     *
     * @returns {number} El total de la orden
     *
     * TODO:
     * - Calcula el subtotal usando calculateSubtotal()
     * - Calcula los impuestos usando calculateTaxes()
     * - Suma subtotal + impuestos
     * - Retorna el total
     */
    calculateTotal() {
        throw new Error('Method calculateTotal not implemented');
    }

    /**
     * Marca la orden como completada.
     * Traducción: Marcar como Completada
     *
     * Este método cambia el estado de la orden a completada.
     *
     * @returns {boolean} true si se marcó como completada
     *
     * TODO:
     * - Cambia this.completed a true
     * - Retorna true
     */
    markAsCompleted() {
        throw new Error('Method markAsCompleted not implemented');
    }
}

/**
 * Gestiona el restaurante y sus operaciones.
 * Traducción: Restaurante
 * @class
 */
class Restaurant {
    /**
     * Constructor de la clase Restaurant
     * Traducción: Constructor de Restaurante
     *
     * Crea un nuevo restaurante con nombre.
     * Inicializa arrays vacíos para menús y órdenes.
     *
     * @param {string} name - Nombre del restaurante (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Restaurant name is required" si el nombre es inválido
     * - Inicializa this.menus como un array vacío []
     * - Inicializa this.orders como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        throw new Error('Restaurant constructor not implemented');
    }

    /**
     * Agrega un menú al restaurante.
     * Traducción: Agregar Menú
     *
     * Este método agrega un menú al restaurante. Debe validar que sea una instancia de Menu.
     *
     * @param {Menu} menu - Instancia de Menu a agregar
     * @returns {Menu} El menú agregado
     *
     * TODO:
     * - Valida que menu sea una instancia de Menu
     * - Lanza error "Menu must be an instance of Menu" si es inválido
     * - Agrega el menú al array this.menus usando push()
     * - Retorna el menú agregado
     */
    addMenu(menu) {
        throw new Error('Method addMenu not implemented');
    }

    /**
     * Crea una nueva orden.
     * Traducción: Crear Orden
     *
     * Este método crea una nueva orden y la agrega al restaurante.
     *
     * @param {number} tableNumber - Número de mesa
     * @param {string} waiterName - Nombre del mesero
     * @returns {Order} La orden creada
     *
     * TODO:
     * - Crea una nueva instancia de Order con tableNumber y waiterName
     * - Agrega la orden al array this.orders usando push()
     * - Retorna la orden creada
     */
    createOrder(tableNumber, waiterName) {
        throw new Error('Method createOrder not implemented');
    }

    /**
     * Busca una orden por índice.
     * Traducción: Obtener Orden
     *
     * Este método busca una orden por su índice en el array de órdenes.
     *
     * @param {number} orderIndex - Índice de la orden (debe ser válido)
     * @returns {Order|null} La orden encontrada o null si no existe
     *
     * TODO:
     * - Valida que orderIndex sea un número válido (>= 0 y < this.orders.length)
     * - Si el índice es inválido, retorna null
     * - Retorna la orden en el índice especificado
     */
    getOrder(orderIndex) {
        throw new Error('Method getOrder not implemented');
    }

    /**
     * Obtiene todas las órdenes activas (no completadas) usando filter().
     * Traducción: Obtener Órdenes Activas
     *
     * Este método retorna un nuevo array con todas las órdenes que no están completadas.
     * Debe usar el método filter() del array.
     *
     * @returns {Order[]} Array con las órdenes activas
     *
     * TODO:
     * - Usa this.orders.filter() para filtrar órdenes
     * - Filtra órdenes donde order.completed === false
     * - Retorna el nuevo array filtrado
     */
    getActiveOrders() {
        throw new Error('Method getActiveOrders not implemented');
    }

    /**
     * Calcula los ingresos totales de órdenes completadas usando reduce().
     * Traducción: Obtener Ingresos
     *
     * Este método calcula los ingresos totales sumando el total de todas las órdenes completadas.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos
     *
     * TODO:
     * - Filtra las órdenes completadas usando filter()
     * - Usa reduce() sobre las órdenes completadas
     * - Para cada orden, suma order.calculateTotal() al acumulador
     * - Retorna el total de ingresos
     * - Si no hay órdenes completadas, retorna 0
     */
    getRevenue() {
        throw new Error('Method getRevenue not implemented');
    }
}

module.exports = {
    Menu,
    Order,
    Restaurant
};

