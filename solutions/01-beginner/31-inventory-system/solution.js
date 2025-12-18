/**
 * Solución: Sistema de Inventario Simple
 * 
 * Esta implementación muestra cómo crear clases Product e Inventory que gestionan
 * productos con validaciones complejas y cálculos sobre colecciones.
 */

class Product {
    /**
     * Constructor de la clase Product
     * Traducción: Constructor de Producto
     *
     * Crea un nuevo producto con nombre, precio, cantidad y categoría.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     */
    constructor(name, price, quantity, category) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Product name is required');
        }

        // Valida que el precio sea un número mayor que 0
        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Product price must be greater than 0');
        }

        // Valida que la cantidad sea un número mayor o igual a 0
        if (typeof quantity !== 'number' || quantity < 0) {
            throw new Error('Product quantity must be greater than or equal to 0');
        }

        // Valida que la categoría sea un string no vacío
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error('Product category is required');
        }

        // Asigna los valores validados a las propiedades de la instancia
        this.name = name.trim();
        this.price = price;
        this.quantity = quantity;
        this.category = category.trim();
    }
}

class Inventory {
    /**
     * Constructor de la clase Inventory
     * Traducción: Constructor de Inventario
     *
     * Crea un nuevo inventario con un array vacío para almacenar productos.
     */
    constructor() {
        this.products = [];
    }

    /**
     * Agrega un nuevo producto al inventario.
     * Traducción: Agregar Producto
     *
     * Crea una nueva instancia de Product y la agrega al inventario.
     * Valida que no exista ya un producto con el mismo nombre.
     */
    addProduct(name, price, quantity, category) {
        // Valida que no exista ya un producto con ese nombre
        if (this.findProduct(name) !== null) {
            throw new Error('Product already exists');
        }

        // Crea una nueva instancia de Product
        const product = new Product(name, price, quantity, category);
        
        // Agrega el producto al array
        this.products.push(product);
        
        // Retorna el producto creado
        return product;
    }

    /**
     * Busca un producto por su nombre usando find().
     * Traducción: Buscar Producto
     *
     * Busca un producto cuyo name coincida exactamente con el parámetro recibido.
     */
    findProduct(name) {
        const product = this.products.find(product => product.name === name);
        return product || null;
    }

    /**
     * Vende una cantidad específica de un producto.
     * Traducción: Vender Producto
     *
     * Reduce la cantidad en stock de un producto después de validar que existe
     * y que hay suficiente stock disponible.
     */
    sellProduct(name, quantity) {
        // Busca el producto por nombre
        const product = this.findProduct(name);
        
        // Valida que el producto exista
        if (product === null) {
            throw new Error('Product not found');
        }

        // Valida que haya suficiente stock
        if (product.quantity < quantity) {
            throw new Error('Insufficient stock');
        }

        // Reduce la cantidad en stock
        product.quantity -= quantity;
        
        // Retorna el producto actualizado
        return product;
    }

    /**
     * Repone el stock de un producto.
     * Traducción: Reponer Producto
     *
     * Incrementa la cantidad en stock de un producto después de validar que existe
     * y que la cantidad a agregar es válida.
     */
    restockProduct(name, quantity) {
        // Busca el producto por nombre
        const product = this.findProduct(name);
        
        // Valida que el producto exista
        if (product === null) {
            throw new Error('Product not found');
        }

        // Valida que la cantidad a agregar sea mayor que 0
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Incrementa la cantidad en stock
        product.quantity += quantity;
        
        // Retorna el producto actualizado
        return product;
    }

    /**
     * Calcula el valor total del inventario usando reduce().
     * Traducción: Obtener Valor Total
     *
     * Calcula el valor total multiplicando precio × cantidad de cada producto
     * y sumando todos los valores.
     */
    getTotalValue() {
        // Si no hay productos, retorna 0
        if (this.products.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el valor total
        return this.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    }

    /**
     * Obtiene productos con stock bajo usando filter().
     * Traducción: Obtener Productos con Stock Bajo
     *
     * Retorna un nuevo array con todos los productos que tienen una cantidad
     * menor o igual al umbral especificado.
     */
    getLowStockProducts(threshold) {
        // Usa filter() para filtrar productos con stock bajo
        return this.products.filter(product => product.quantity <= threshold);
    }

    /**
     * Obtiene productos de una categoría específica usando filter().
     * Traducción: Obtener Productos por Categoría
     *
     * Retorna un nuevo array con todos los productos que pertenecen a la categoría
     * especificada.
     */
    getProductsByCategory(category) {
        // Usa filter() para filtrar productos por categoría
        return this.products.filter(product => product.category === category);
    }
}

module.exports = {
    Product,
    Inventory
};

