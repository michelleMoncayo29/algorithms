class Vehicle {
  constructor(plate, type, mileage) {
    if (typeof plate !== 'string' || plate.trim().length < 5) {
      throw new Error('Vehicle plate is required');
    }

    if (typeof type !== 'string' || type.trim().length === 0) {
      throw new Error('Vehicle type is required');
    }

    if (!Number.isInteger(mileage) || mileage < 0) {
      throw new Error('Vehicle mileage must be a number greater than or equal to 0');
    }

    this.plate = plate.trim().toUpperCase();
    this.type = type.trim();
    this.mileage = mileage;
  }

  getSummary() {
    return `${this.plate} (${this.type}) has ${this.mileage} km`;
  }

  addTrip(kilometers) {
    if (!Number.isInteger(kilometers) || kilometers <= 0) {
      throw new Error('Trip distance must be a positive number');
    }

    this.mileage += kilometers;
    return this.mileage;
  }
}

class FleetManager {
  constructor() {
    this._vehicles = [];
  }

  addVehicle(vehicle) {
    if (!(vehicle instanceof Vehicle)) {
      throw new Error('Vehicle must be an instance of Vehicle');
    }

    if (this.findByPlate(vehicle.plate)) {
      throw new Error('Vehicle plate already registered');
    }

    this._vehicles.push(vehicle);
    return this._vehicles.length;
  }

  findByPlate(plate) {
    if (typeof plate !== 'string') {
      return null;
    }

    const normalized = plate.trim().toUpperCase();
    return this._vehicles.find((vehicle) => vehicle.plate === normalized) || null;
  }

  getMaintenanceList(threshold) {
    if (!Number.isInteger(threshold) || threshold < 0) {
      throw new Error('Maintenance threshold must be a number greater than or equal to 0');
    }

    return this._vehicles
      .filter((vehicle) => vehicle.mileage >= threshold)
      .map((vehicle) => vehicle.getSummary());
  }
}

module.exports = {
  Vehicle,
  FleetManager
};

