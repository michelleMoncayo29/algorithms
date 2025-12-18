/**
 * Sistema de Inventario Simple (Simple Inventory System)
 *
 * Descripción: Implementa dos clases básicas (`Product` e `Inventory`) para practicar
 * constructores, métodos de instancia, validaciones complejas, y cálculos sobre colecciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un producto individual en el inventario.
 * Traducción: Producto
 * @class
 */
class Product {
    /**
     * Constructor de la clase Product
     * Traducción: Constructor de Producto
     *
     * Crea un nuevo producto con nombre, precio, cantidad y categoría.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} name - Nombre del producto (no puede estar vacío)
     * @param {number} price - Precio del producto (debe ser mayor que 0)
     * @param {number} quantity - Cantidad inicial en stock (debe ser >= 0)
     * @param {string} category - Categoría del producto (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Product name is required" si el nombre es inválido
     * - Valida que price sea un número mayor que 0
     * - Lanza error "Product price must be greater than 0" si el precio es inválido
     * - Valida que quantity sea un número mayor o igual a 0
     * - Lanza error "Product quantity must be greater than or equal to 0" si la cantidad es inválida
     * - Valida que category sea un string no vacío (después de trim)
     * - Lanza error "Product category is required" si la categoría es inválida
     * - Asigna los valores validados a this.name, this.price, this.quantity, this.category
     */
    constructor(name, price, quantity, category) {
        throw new Error('Product constructor not implemented');
    }
}

/**
 * Gestiona un inventario de productos.
 * Traducción: Inventario
 * @class
 */
class Inventory {
    /**
     * Constructor de la clase Inventory
     * Traducción: Constructor de Inventario
     *
     * Crea un nuevo inventario con un array vacío para almacenar productos.
     *
     * TODO:
     * - Inicializa this.products como un array vacío []
     */
    constructor() {
        throw new Error('Inventory constructor not implemented');
    }

    /**
     * Agrega un nuevo producto al inventario.
     * Traducción: Agregar Producto
     *
     * Este método crea una nueva instancia de Product y la agrega al inventario.
     * Debe validar que no exista ya un producto con el mismo nombre antes de agregarlo.
     * El comportamiento esperado es que si el producto ya existe, se lance un error.
     *
     * @param {string} name - Nombre del producto
     * @param {number} price - Precio del producto
     * @param {number} quantity - Cantidad inicial en stock
     * @param {string} category - Categoría del producto
     * @returns {Product} El producto creado
     *
     * TODO:
     * - Usa findProduct() para verificar si ya existe un producto con ese nombre
     * - Si el producto existe, lanza un error con el mensaje: "Product already exists"
     * - Crea una nueva instancia de Product con los parámetros recibidos
     * - Agrega el producto al array this.products usando push()
     * - Retorna el producto creado
     */
    addProduct(name, price, quantity, category) {
        throw new Error('Method addProduct not implemented');
    }

    /**
     * Busca un producto por su nombre usando find().
     * Traducción: Buscar Producto
     *
     * Este método busca un producto cuyo name coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     * Debe usar el método find() del array para realizar la búsqueda.
     *
     * @param {string} name - Nombre del producto a buscar
     * @returns {Product|null} El producto encontrado o null si no existe
     *
     * TODO:
     * - Usa this.products.find() para buscar un producto cuyo name coincida exactamente
     * - Retorna el producto encontrado o null si no se encuentra
     */
    findProduct(name) {
        throw new Error('Method findProduct not implemented');
    }

    /**
     * Vende una cantidad específica de un producto.
     * Traducción: Vender Producto
     *
     * Este método reduce la cantidad en stock de un producto después de validar que existe
     * y que hay suficiente stock disponible. El comportamiento esperado es que solo se pueda
     * vender si hay suficiente cantidad en stock.
     *
     * @param {string} name - Nombre del producto a vender
     * @param {number} quantity - Cantidad a vender
     * @returns {Product} El producto actualizado después de la venta
     *
     * TODO:
     * - Usa findProduct() para buscar el producto por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Product not found"
     * - Valida que product.quantity >= quantity (hay suficiente stock)
     * - Si no hay suficiente stock, lanza un error con el mensaje: "Insufficient stock"
     * - Reduce la cantidad: product.quantity -= quantity
     * - Retorna el producto actualizado
     */
    sellProduct(name, quantity) {
        throw new Error('Method sellProduct not implemented');
    }

    /**
     * Repone el stock de un producto.
     * Traducción: Reponer Producto
     *
     * Este método incrementa la cantidad en stock de un producto después de validar que existe
     * y que la cantidad a agregar es válida. El comportamiento esperado es que se pueda aumentar
     * el stock de productos existentes.
     *
     * @param {string} name - Nombre del producto a reponer
     * @param {number} quantity - Cantidad a agregar al stock
     * @returns {Product} El producto actualizado después de reponer
     *
     * TODO:
     * - Usa findProduct() para buscar el producto por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Product not found"
     * - Valida que quantity sea mayor que 0
     * - Si quantity <= 0, lanza un error con el mensaje: "Quantity must be greater than 0"
     * - Incrementa la cantidad: product.quantity += quantity
     * - Retorna el producto actualizado
     */
    restockProduct(name, quantity) {
        throw new Error('Method restockProduct not implemented');
    }

    /**
     * Calcula el valor total del inventario usando reduce().
     * Traducción: Obtener Valor Total
     *
     * Este método calcula el valor total multiplicando precio × cantidad de cada producto
     * y sumando todos los valores. Debe usar el método reduce() del array para realizar el cálculo.
     *
     * @returns {number} El valor total del inventario (precio × cantidad de todos los productos)
     *
     * TODO:
     * - Si no hay productos (this.products.length === 0), retorna 0
     * - Usa this.products.reduce() para calcular el valor total
     * - Para cada producto, suma (product.price * product.quantity) al acumulador
     * - Retorna el valor total calculado
     */
    getTotalValue() {
        throw new Error('Method getTotalValue not implemented');
    }

    /**
     * Obtiene productos con stock bajo usando filter().
     * Traducción: Obtener Productos con Stock Bajo
     *
     * Este método retorna un nuevo array con todos los productos que tienen una cantidad
     * menor o igual al umbral especificado. Debe usar el método filter() del array.
     *
     * @param {number} threshold - Umbral mínimo de stock (productos con cantidad <= threshold)
     * @returns {Product[]} Array con los productos que tienen stock bajo
     *
     * TODO:
     * - Usa this.products.filter() para filtrar productos
     * - Filtra productos donde product.quantity <= threshold
     * - Retorna el nuevo array filtrado
     */
    getLowStockProducts(threshold) {
        throw new Error('Method getLowStockProducts not implemented');
    }

    /**
     * Obtiene productos de una categoría específica usando filter().
     * Traducción: Obtener Productos por Categoría
     *
     * Este método retorna un nuevo array con todos los productos que pertenecen a la categoría
     * especificada. La comparación es case-sensitive. Debe usar el método filter() del array.
     *
     * @param {string} category - Categoría a filtrar
     * @returns {Product[]} Array con los productos de esa categoría
     *
     * TODO:
     * - Usa this.products.filter() para filtrar productos
     * - Filtra productos donde product.category === category
     * - Retorna el nuevo array filtrado
     */
    getProductsByCategory(category) {
        throw new Error('Method getProductsByCategory not implemented');
    }
}

module.exports = {
    Product,
    Inventory
};

