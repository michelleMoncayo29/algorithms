class Pet {
  constructor(name, type, age) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Pet name is required');
    }

    if (typeof type !== 'string' || type.trim().length === 0) {
      throw new Error('Pet type is required');
    }

    if (!Number.isInteger(age) || age < 0) {
      throw new Error('Pet age must be a number greater than or equal to 0');
    }

    this.name = name.trim();
    this.type = type.trim();
    this.age = age;
  }

  getDescription() {
    const yearLabel = this.age === 1 ? 'year' : 'years';
    return `${this.name} is a ${this.type} that is ${this.age} ${yearLabel} old`;
  }

  haveBirthday() {
    this.age += 1;
    return this.age;
  }
}

class PetRegistry {
  constructor() {
    this.pets = [];
  }

  addPet(pet) {
    if (!(pet instanceof Pet)) {
      throw new Error('Pet must be an instance of Pet');
    }

    this.pets.push(pet);
    return this.pets.length;
  }

  findByName(name) {
    if (typeof name !== 'string') {
      return null;
    }

    const target = name.toLowerCase();
    return this.pets.find((pet) => pet.name.toLowerCase() === target) || null;
  }

  getDescriptions() {
    return this.pets.map((pet) => pet.getDescription());
  }
}

module.exports = {
  Pet,
  PetRegistry
};

