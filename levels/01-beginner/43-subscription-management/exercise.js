/**
 * Sistema de Gestión de Suscripciones (Subscription Management System)
 *
 * Descripción: Implementa tres clases básicas (`Subscription`, `Subscriber` y `SubscriptionService`) 
 * para practicar constructores, métodos de instancia, validaciones complejas, manejo de fechas,
 * cálculos de vencimiento y reportes financieros.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: filter, reduce
 */

/**
 * Representa un plan de suscripción.
 * Traducción: Suscripción
 * @class
 */
class Subscription {
    constructor(planName, price, duration) {
        throw new Error('Subscription constructor not implemented');
    }

    isActive() {
        throw new Error('Method isActive not implemented');
    }

    getDaysRemaining() {
        throw new Error('Method getDaysRemaining not implemented');
    }

    getExpiryDate() {
        throw new Error('Method getExpiryDate not implemented');
    }

    hasFeature(featureName) {
        throw new Error('Method hasFeature not implemented');
    }

    calculateTotalCost() {
        throw new Error('Method calculateTotalCost not implemented');
    }
}

/**
 * Representa un suscriptor del servicio.
 * Traducción: Suscriptor
 * @class
 */
class Subscriber {
    constructor(subscriberId, name, email) {
        throw new Error('Subscriber constructor not implemented');
    }

    subscribe(subscription) {
        throw new Error('Method subscribe not implemented');
    }

    renew(months) {
        throw new Error('Method renew not implemented');
    }

    cancel() {
        throw new Error('Method cancel not implemented');
    }

    addPayment(amount, date) {
        throw new Error('Method addPayment not implemented');
    }

    getTotalPaid() {
        throw new Error('Method getTotalPaid not implemented');
    }

    getSubscriptionStatus() {
        throw new Error('Method getSubscriptionStatus not implemented');
    }
}

/**
 * Gestiona el servicio de suscripciones.
 * Traducción: Servicio de Suscripciones
 * @class
 */
class SubscriptionService {
    constructor(name) {
        throw new Error('SubscriptionService constructor not implemented');
    }

    addSubscriptionPlan(subscription) {
        throw new Error('Method addSubscriptionPlan not implemented');
    }

    registerSubscriber(subscriber) {
        throw new Error('Method registerSubscriber not implemented');
    }

    getActiveSubscribers() {
        throw new Error('Method getActiveSubscribers not implemented');
    }

    getSubscribersByPlan(planName) {
        throw new Error('Method getSubscribersByPlan not implemented');
    }

    getRevenue() {
        throw new Error('Method getRevenue not implemented');
    }

    getChurnRate() {
        throw new Error('Method getChurnRate not implemented');
    }

    getMostPopularPlan() {
        throw new Error('Method getMostPopularPlan not implemented');
    }
}

module.exports = {
    Subscription,
    Subscriber,
    SubscriptionService
};

