/**
 * Solución: Sistema de Gestión de Transporte Público
 * 
 * Esta implementación muestra cómo crear clases Bus, Route y TransitSystem que gestionan
 * buses, rutas, pasajeros y cálculos de ingresos.
 */

class Bus {
    constructor(busNumber, capacity) {
        if (typeof busNumber !== 'string' || busNumber.trim().length === 0) {
            throw new Error('Bus number is required');
        }

        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error('Bus capacity must be greater than 0');
        }

        this.busNumber = busNumber.trim();
        this.capacity = capacity;
        this.currentPassengers = 0;
        this.currentRoute = null;
        this.isInService = true;
    }

    boardPassengers(count) {
        if (typeof count !== 'number' || count <= 0) {
            throw new Error('Passenger count must be greater than 0');
        }

        if (this.currentPassengers + count > this.capacity) {
            throw new Error('Not enough capacity');
        }

        this.currentPassengers += count;
        return this.currentPassengers;
    }

    alightPassengers(count) {
        if (typeof count !== 'number' || count <= 0) {
            throw new Error('Passenger count must be greater than 0');
        }

        if (this.currentPassengers < count) {
            throw new Error('Not enough passengers on board');
        }

        this.currentPassengers -= count;
        return this.currentPassengers;
    }

    getAvailableSeats() {
        const available = this.capacity - this.currentPassengers;
        return available >= 0 ? available : 0;
    }

    setRoute(route) {
        if (!(route instanceof Route)) {
            throw new Error('Route must be an instance of Route');
        }

        this.currentRoute = route;
        return true;
    }

    getOccupancyRate() {
        const rate = (this.currentPassengers / this.capacity) * 100;
        return parseFloat(rate.toFixed(2));
    }
}

class Route {
    constructor(routeNumber, distance, fare) {
        if (typeof routeNumber !== 'string' || routeNumber.trim().length === 0) {
            throw new Error('Route number is required');
        }

        if (typeof distance !== 'number' || distance <= 0) {
            throw new Error('Route distance must be greater than 0');
        }

        if (typeof fare !== 'number' || fare <= 0) {
            throw new Error('Route fare must be greater than 0');
        }

        this.routeNumber = routeNumber.trim();
        this.distance = distance;
        this.fare = fare;
        this.stops = [];
    }

    addStop(stopName) {
        if (typeof stopName !== 'string' || stopName.trim().length === 0) {
            throw new Error('Stop name is required');
        }

        const trimmedStop = stopName.trim();
        if (this.stops.includes(trimmedStop)) {
            throw new Error('Stop already exists');
        }

        this.stops.push(trimmedStop);
        return this.stops.length;
    }

    getTotalStops() {
        return this.stops.length;
    }

    getDistance() {
        return this.distance;
    }

    calculateTravelTime(averageSpeed) {
        if (typeof averageSpeed !== 'number' || averageSpeed <= 0) {
            throw new Error('Average speed must be greater than 0');
        }

        const time = this.distance / averageSpeed;
        return parseFloat(time.toFixed(2));
    }
}

class TransitSystem {
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Transit system name is required');
        }

        this.name = name.trim();
        this.buses = [];
        this.routes = [];
    }

    addBus(bus) {
        if (!(bus instanceof Bus)) {
            throw new Error('Bus must be an instance of Bus');
        }

        const existingBus = this.buses.find(b => b.busNumber === bus.busNumber);
        if (existingBus) {
            throw new Error('Bus number already exists');
        }

        this.buses.push(bus);
        return this.buses.length;
    }

    addRoute(route) {
        if (!(route instanceof Route)) {
            throw new Error('Route must be an instance of Route');
        }

        const existingRoute = this.routes.find(r => r.routeNumber === route.routeNumber);
        if (existingRoute) {
            throw new Error('Route number already exists');
        }

        this.routes.push(route);
        return this.routes.length;
    }

    assignBusToRoute(busNumber, routeNumber) {
        if (typeof busNumber !== 'string') {
            throw new Error('Bus number must be a string');
        }

        if (typeof routeNumber !== 'string') {
            throw new Error('Route number must be a string');
        }

        const bus = this.buses.find(b => b.busNumber === busNumber);
        if (!bus) {
            throw new Error('Bus not found');
        }

        const route = this.routes.find(r => r.routeNumber === routeNumber);
        if (!route) {
            throw new Error('Route not found');
        }

        bus.setRoute(route);
        return true;
    }

    getBusesByRoute(routeNumber) {
        if (typeof routeNumber !== 'string') {
            throw new Error('Route number must be a string');
        }

        const route = this.routes.find(r => r.routeNumber === routeNumber);
        if (!route) {
            return [];
        }

        return this.buses.filter(bus => bus.currentRoute === route);
    }

    getTotalPassengers() {
        return this.buses.reduce((total, bus) => total + bus.currentPassengers, 0);
    }

    getRevenue() {
        const revenue = this.buses.reduce((total, bus) => {
            if (bus.currentRoute) {
                return total + (bus.currentPassengers * bus.currentRoute.fare);
            }
            return total;
        }, 0);

        return parseFloat(revenue.toFixed(2));
    }

    getMostPopularRoute() {
        if (this.routes.length === 0) {
            return null;
        }

        let maxPassengers = 0;
        let popularRoute = null;

        for (const route of this.routes) {
            const busesOnRoute = this.getBusesByRoute(route.routeNumber);
            const totalPassengers = busesOnRoute.reduce((sum, bus) => sum + bus.currentPassengers, 0);

            if (totalPassengers > maxPassengers) {
                maxPassengers = totalPassengers;
                popularRoute = route;
            }
        }

        return popularRoute;
    }
}

module.exports = {
    Bus,
    Route,
    TransitSystem
};

