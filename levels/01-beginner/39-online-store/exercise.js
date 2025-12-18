/**
 * Solución: Sistema de Gestión de Tienda Online
 * 
 * Esta implementación muestra cómo crear clases Product, Cart y Store que gestionan
 * productos, carritos de compras con descuentos y procesamiento de compras.
 */

class Product {
    constructor(name, price, stock, category) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Product name is required');
        }

        // Valida que el precio sea un número mayor que 0
        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Product price must be greater than 0');
        }

        // Valida que el stock sea un número mayor o igual que 0
        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('Product stock must be greater than or equal to 0');
        }

        // Valida que la categoría sea un string no vacío
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error('Product category is required');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.price = price;
        this.stock = stock;
        this.category = category.trim();
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }

    getCategory() {
        return this.category;
    }

    isAvailable() {
        // Retorna true si el stock es mayor que 0
        return this.stock > 0;
    }

    reduceStock(quantity) {
        // Valida que quantity sea un número mayor que 0
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Valida que haya suficiente stock disponible
        if (this.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        // Reduce el stock
        this.stock -= quantity;

        // Retorna true
        return true;
    }
}

class Cart {
    constructor() {
        // Inicializa el array de items vacío
        this.items = [];
        // Inicializa el descuento en 0
        this.discount = 0;
    }

    addProduct(product, quantity) {
        // Valida que product sea una instancia de Product
        if (!(product instanceof Product)) {
            throw new Error('Product must be an instance of Product');
        }

        // Valida que quantity sea un número mayor que 0
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Valida que el producto esté disponible
        if (!product.isAvailable()) {
            throw new Error('Product is not available');
        }

        // Busca si el producto ya está en el carrito
        const existingItem = this.items.find(item => item.product.name === product.name);

        if (existingItem) {
            // Si ya existe, calcula la nueva cantidad total
            const newTotalQuantity = existingItem.quantity + quantity;
            // Valida que haya suficiente stock disponible para la nueva cantidad total
            if (product.getStock() < newTotalQuantity) {
                throw new Error('Insufficient stock');
            }
            existingItem.quantity += quantity;
        } else {
            // Si no existe, valida que haya suficiente stock disponible
            if (product.getStock() < quantity) {
                throw new Error('Insufficient stock');
            }
            // Agrega un nuevo item
            this.items.push({ product, quantity });
        }

        // Retorna true
        return true;
    }

    removeProduct(productName) {
        // Encuentra el índice del producto
        const itemIndex = this.items.findIndex(item => item.product.name === productName);

        // Si no se encuentra, retorna false
        if (itemIndex === -1) {
            return false;
        }

        // Elimina el item del array
        this.items.splice(itemIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    updateQuantity(productName, newQuantity) {
        // Valida que newQuantity sea un número mayor que 0
        if (typeof newQuantity !== 'number' || newQuantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Busca el producto en el carrito
        const item = this.items.find(item => item.product.name === productName);

        // Si no se encuentra, lanza error
        if (!item) {
            throw new Error('Product not found in cart');
        }

        // Actualiza la cantidad (la validación de stock se hace en processPurchase)
        item.quantity = newQuantity;

        // Retorna true
        return true;
    }

    setDiscount(discountPercent) {
        // Valida que discountPercent sea un número entre 0 y 100
        if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
            throw new Error('Discount must be between 0 and 100');
        }

        // Asigna el descuento
        this.discount = discountPercent;

        // Retorna true
        return true;
    }

    getSubtotal() {
        // Si el carrito está vacío, retorna 0
        if (this.items.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el subtotal
        return this.items.reduce((total, item) => {
            return total + (item.product.getPrice() * item.quantity);
        }, 0);
    }

    getTotal() {
        // Calcula el subtotal
        const subtotal = this.getSubtotal();

        // Calcula el descuento
        const discountAmount = subtotal * (this.discount / 100);

        // Calcula el total
        const total = subtotal - discountAmount;

        // Retorna el total
        return total;
    }

    getTotalItems() {
        // Si el carrito está vacío, retorna 0
        if (this.items.length === 0) {
            return 0;
        }

        // Usa reduce() para sumar todas las cantidades
        return this.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    }

    clear() {
        // Vacía el array de items
        this.items = [];
        // Resetea el descuento
        this.discount = 0;

        // Retorna true
        return true;
    }
}

class Store {
    constructor(name) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Store name is required');
        }

        // Asigna el nombre validado
        this.name = name.trim();
        // Inicializa el array de productos vacío
        this.products = [];
    }

    addProduct(product) {
        // Valida que product sea una instancia de Product
        if (!(product instanceof Product)) {
            throw new Error('Product must be an instance of Product');
        }

        // Valida que no exista ya un producto con ese nombre
        if (this.findProduct(product.name) !== null) {
            throw new Error('Product already exists');
        }

        // Agrega el producto al array
        this.products.push(product);

        // Retorna el producto agregado
        return product;
    }

    findProduct(productName) {
        // Usa find() para buscar un producto cuyo name coincida exactamente
        const product = this.products.find(product => product.name === productName);
        return product || null;
    }

    getAvailableProducts() {
        // Usa filter() para obtener productos disponibles
        return this.products.filter(product => product.isAvailable());
    }

    getProductsByCategory(category) {
        // Usa filter() para obtener productos de la categoría especificada
        return this.products.filter(product => product.getCategory() === category);
    }

    processPurchase(cart) {
        // Valida que cart sea una instancia de Cart
        if (!(cart instanceof Cart)) {
            throw new Error('Cart must be an instance of Cart');
        }

        // Valida que el carrito no esté vacío
        if (cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        // Valida que todos los productos tengan suficiente stock disponible
        cart.items.forEach(item => {
            if (item.product.getStock() < item.quantity) {
                throw new Error(`Insufficient stock for product: ${item.product.name}`);
            }
        });

        // Itera sobre los items del carrito y reduce el stock
        cart.items.forEach(item => {
            item.product.reduceStock(item.quantity);
        });

        // Calcula el total
        const total = cart.getTotal();

        // Vacía el carrito
        cart.clear();

        // Retorna el total de la compra
        return total;
    }

    getInventoryValue() {
        // Si no hay productos, retorna 0
        if (this.products.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular el valor total del inventario
        return this.products.reduce((total, product) => {
            return total + (product.getPrice() * product.getStock());
        }, 0);
    }
}

module.exports = {
    Product,
    Cart,
    Store
};

