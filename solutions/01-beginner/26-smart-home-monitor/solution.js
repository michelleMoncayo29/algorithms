class SmartDevice {
  constructor(name, room, watts, isOn = false) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Device name is required');
    }

    if (typeof room !== 'string' || room.trim().length === 0) {
      throw new Error('Device room is required');
    }

    if (!Number.isInteger(watts) || watts <= 0) {
      throw new Error('Device watts must be a number greater than 0');
    }

    this.name = SmartDevice.#capitalize(name.trim());
    this.room = room.trim().toLowerCase();
    this.watts = watts;
    this.isOn = Boolean(isOn);
  }

  static #capitalize(text) {
    if (text.length === 0) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  turnOn() {
    this.isOn = true;
    return this.isOn;
  }

  turnOff() {
    this.isOn = false;
    return this.isOn;
  }

  getConsumption(hours) {
    if (!Number.isInteger(hours) || hours <= 0) {
      throw new Error('Usage hours must be a positive number');
    }

    if (!this.isOn) {
      return 0;
    }

    return this.watts * hours;
  }
}

class SmartHomeMonitor {
  constructor() {
    this._devices = [];
  }

  addDevice(device) {
    if (!(device instanceof SmartDevice)) {
      throw new Error('Device must be an instance of SmartDevice');
    }

    if (this.findByName(device.name)) {
      throw new Error('Device name already registered');
    }

    this._devices.push(device);
    return this._devices.length;
  }

  findByName(name) {
    if (typeof name !== 'string') {
      return null;
    }

    const normalized = SmartDevice.#capitalize(name.trim());
    return this._devices.find((device) => device.name === normalized) || null;
  }

  getRoomReport(room) {
    if (typeof room !== 'string' || room.trim().length === 0) {
      throw new Error('Room name is required');
    }

    const normalizedRoom = room.trim().toLowerCase();
    const devicesInRoom = this._devices.filter(
      (device) => device.room === normalizedRoom
    );

    return {
      room: normalizedRoom,
      devices: devicesInRoom.map((device) => device.name),
      activeDevices: devicesInRoom.filter((device) => device.isOn).length,
      totalWatts: devicesInRoom.reduce((sum, device) => sum + device.watts, 0)
    };
  }

  getActiveConsumption(hours) {
    if (!Number.isInteger(hours) || hours <= 0) {
      throw new Error('Usage hours must be a positive number');
    }

    return this._devices.reduce(
      (total, device) => total + device.getConsumption(hours),
      0
    );
  }
}

module.exports = {
  SmartDevice,
  SmartHomeMonitor
};

