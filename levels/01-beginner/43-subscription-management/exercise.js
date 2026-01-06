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
        if (typeof planName !== 'string' || planName.trim().length === 0) {
            throw new Error('Plan name is required');
        }
        
        if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
            throw new Error('Subscription price must be greater than 0');
        }

        if (typeof duration !== 'number' || duration <= 0 || isNaN(duration)) {
            throw new Error('Subscription duration must be greater than 0');
        }

        this.planName = planName;
        this.price = price;
        this.duration = duration;
        this.features = [];
        this.startDate = null;

    }

    isActive() {
        if (!this.startDate) return false;
        const expiryDate = this.getExpiryDate();
        return new Date() < expiryDate;
    }

    getDaysRemaining() {
        if (!this.startDate || !this.isActive()) return 0;
        const expiryDate = this.getExpiryDate();
        const diff = expiryDate - new Date();
        return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }

    getExpiryDate() {
        if (!this.startDate) return null;
        const expiry = new Date(this.startDate);
        expiry.setMonth(expiry.getMonth() + this.duration);
        return expiry;
    }

    hasFeature(featureName) {
        if (typeof featureName !== 'string') {
            throw new Error('Feature name must be a string');
        }
        return this.features.includes(featureName.trim());
    }

    calculateTotalCost() {
       return parseFloat((this.price * this.duration).toFixed(2));
    }
}

/**
 * Representa un suscriptor del servicio.
 * Traducción: Suscriptor
 * @class
 */
class Subscriber {
    constructor(subscriberId, name, email) {
        if (typeof subscriberId !== 'string' || subscriberId.trim().length === 0) {
            throw new Error('Subscriber ID is required');
        }
        
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Subscriber name is required');
        }

        if (typeof email !== 'string' || email.trim().length === 0) {
            throw new Error('Subscriber email is required');
        }

        this.subscriberId = subscriberId;
        this.name = name;
        this.email = email;
        this.subscription = null;
        this.paymentHistory = [];
    }

    subscribe(subscription) {
        if (!(subscription instanceof Subscription)) {
            throw new Error('Subscription must be an instance of Subscription');
        }
        this.subscription = subscription;
        subscription.startDate = new Date();
        return true;
    }

    renew(months) {
        if (typeof months !== 'number' || months <= 0) {
            throw new Error('No active subscription to renew');
        }
        if (!this.subscription || !this.subscription.isActive()) {
            throw new Error('No active subscription to renew');
        }
        const newStartDate = new Date(this.subscription.startDate);
        newStartDate.setMonth(newStartDate.getMonth() + months);
        this.subscription.startDate = newStartDate;
        return newStartDate;
    }

    cancel() {
        if (!this.subscription || !this.subscription.isActive()) {
            throw new Error('No active subscription to cancel');
        }
        this.subscription = null;
        return true;
    }

    addPayment(amount, date) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Payment amount must be greater than 0');
        }
        
        if (!(date instanceof Date)) {
            throw new Error('Payment date must be a Date object');
        }
        this.paymentHistory.push({ amount, date });
        return this.paymentHistory.length;
    }

    getTotalPaid() {
        const total = this.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
        return parseFloat(total.toFixed(2));
    }

    getSubscriptionStatus() {
        if (!this.subscription) return 'none';
        return this.subscription.isActive() ? 'active' : 'expired';
    }
}

/**
 * Gestiona el servicio de suscripciones.
 * Traducción: Servicio de Suscripciones
 * @class
 */
class SubscriptionService {
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Service name is required');
        };

        this.name = name;
        this.subscriptions = [];
        this.subscribers = [];
    }

     addSubscriptionPlan(subscription) {
        if (!(subscription instanceof Subscription)) {
            throw new Error('Subscription must be an instance of Subscription');
        }
        if (this.subscriptions.find(s => s.planName === subscription.planName)) {
            throw new Error('Subscription plan already exists');
        }
        this.subscriptions.push(subscription);
        return this.subscriptions.length;
    }

    registerSubscriber(subscriber) {
        if (!(subscriber instanceof Subscriber)) {
            throw new Error('Subscriber must be an instance of Subscriber');
        }
        if (this.subscribers.find(s => s.subscriberId === subscriber.subscriberId)) {
            throw new Error('Subscriber ID already exists');
        }
        this.subscribers.push(subscriber);
        return this.subscribers.length;
    }

    getActiveSubscribers() {
        return this.subscribers.filter(s => s.getSubscriptionStatus() === 'active');
    }

    getSubscribersByPlan(planName) {
        if (typeof planName !== 'string') {
            throw new Error('Plan name must be a string');
        }
        return this.subscribers.filter(s => s.subscription && s.subscription.planName === planName);
    }

    getRevenue() {
        const revenue = this.subscribers.reduce((total, subscriber) => {
            if (subscriber.subscription && subscriber.subscription.isActive()) {
                const monthsActive = Math.floor((new Date() - subscriber.subscription.startDate) / (1000 * 60 * 60 * 24 * 30));
                return total + (subscriber.subscription.price * Math.min(monthsActive, subscriber.subscription.duration));
            }
            return total;
        }, 0);
        return parseFloat(revenue.toFixed(2));
    }

    getChurnRate() {
        if (this.subscribers.length === 0) return 0;
        const cancelled = this.subscribers.filter(s => s.getSubscriptionStatus() === 'expired').length;
        return parseFloat(((cancelled / this.subscribers.length) * 100).toFixed(2));
    }

    getMostPopularPlan() {
        if (this.subscriptions.length === 0) return null;
        let maxCount = 0;
        let popularPlan = null;
        for (const plan of this.subscriptions) {
            const count = this.getSubscribersByPlan(plan.planName).length;
            if (count > maxCount) {
                maxCount = count;
                popularPlan = plan;
            }
        }
        return popularPlan;
    }
    
}

module.exports = {
    Subscription,
    Subscriber,
    SubscriptionService
};

