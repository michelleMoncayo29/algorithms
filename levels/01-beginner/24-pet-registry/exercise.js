/**
 * Pet Registry
 *
 * Description: implement two basic classes (`Pet` and `PetRegistry`)
 * to practice constructors, instance methods, internal collections,
 * and Fail Fast validations with `instanceof`.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - KISS and expressive naming to keep methods small
 * - Fail Fast when validating inputs
 * - Prefer immutability when returning derived data
 */

/**
 * Represents a single pet inside the registry.
 * @class
 */
class Pet {
  /**
   * @param {string} name - Public name of the pet (non-empty).
   * @param {string} type - Animal type (dog, cat, etc.).
   * @param {number} age - Age in years, integer greater or equal to 0.
   *
   * TODO:
   * - Validate each argument and throw the errors described in the README.
   * - Assign the validated values to `this`.
   */
  constructor(name, type, age) {
    if (!name) {
      throw new Error('Pet name is required');
    }
    if (!type || type.trim().length === 0) {
      throw new Error('Pet type is required');
    }
    if (typeof age !== 'number' || age < 0) {
      throw new Error('Pet age must be a number greater than or equal to 0');
    }

    // --- Almacenamiento de Propiedades ---
    this.age = age;
    this.name = name;
    this.type = type;
  }

  /**
   * Generates a human-friendly description of the pet.
   * @returns {string} Text such as "Luna is a dog that is 3 years old".
   *
   * TODO:
   * - Use template literals.
   * - Handle singular versus plural for the word "year".
   */
  getDescription() {
    // Manejo del plural/singular: 'year' si age es 1, 'years' en caso contrario
    const yearOrYears = this.age === 1 ? 'year' : 'years';
    return `${this.name} is a ${this.type} that is ${this.age} ${yearOrYears} old`;
  }

  /**
   * Increments the pet age by one year.
   * @returns {number} The updated age.
   *
   * TODO:
   * - Add 1 to `this.age`.
   * - Return the new value so callers can chain assertions.
   */
  haveBirthday() {
    this.age += 1;
    return this.age; // Debe devolver la nueva edad
  }
}

const mascota = new Pet('Diego', 'Cat', 3);
// const mascota = "dsadsa"
// Forma incorrecta
// console.log("⭐⭐⭐", !mascota instanceof Pet)
// forma correcta
// console.log("⭐⭐⭐", !(mascota instanceof Pet))

const luna = new Pet('Luna', 'dog', 3);

/**
 * Manages the entire registry of pets.
 * @class
 */
class PetRegistry {
  pets = [];
  /**
   * Creates an empty registry.
   *
   * TODO:
   * - Initialize an internal array (`this.pets = []`).
   */

  constructor() {}

  /**
   * Adds a new pet to the registry.
   * @param {Pet} pet - Valid `Pet` instance.
   * @returns {number} Total number of pets stored after insertion.
   *
   * TODO:
   * - Validate using `instanceof Pet`.
   * - Throw `new Error("Pet must be an instance of Pet")` if validation fails.
   * - Push into the internal array and return its `length`.
   */
  addPet(pet) {
    if (!(pet instanceof Pet)) {
      throw new Error('Pet must be an instance of Pet');
    }

    this.pets.push(pet);

    return this.pets.length;
  }

  /**
   * Finds the first pet whose name matches (case-insensitive).
   * @param {string} name - Name to search for.
   * @returns {Pet|null} The match or `null`.
   *
   * TODO:
   * - Normalize both names with `toLowerCase()` before comparing.
   */
  findByName(name) {
    const foundPet = this.pets.find(function (pet) {
      return pet.name.toLowerCase() === name.toLowerCase();
    });

    return foundPet ?? null;
  }

  /**
   * Returns readable descriptions for every stored pet.
   * @returns {string[]} Fresh array containing each `getDescription()` result.
   *
   * TODO:
   * - Use `map` so the internal array is never exposed or mutated.
   */
  getDescriptions() {
    const arrDescriptions = this.pets.map(function (pet) {
      return pet.getDescription();
    });
      
    return arrDescriptions;
  }
}
const igor = new Pet('igor', 'cat', 1);
const petRegistry = new PetRegistry();
petRegistry.addPet(igor);
petRegistry.addPet(luna);
// // console.log('⭐⭐', petRegistry.findByName('ludsadsana'));

// const arr = [igor, luna];

// const arrDescriptions = arr.map(function (pet) {
//   return pet.getDescription();
// });

// console.log('⭐⭐', arrDescriptions);

module.exports = {
  Pet,
  PetRegistry,
};
