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
        throw new Error('Pet constructor not implemented');
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
        throw new Error('Method getDescription not implemented');
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
        throw new Error('Method haveBirthday not implemented');
    }
}

/**
 * Manages the entire registry of pets.
 * @class
 */
class PetRegistry {
    /**
     * Creates an empty registry.
     *
     * TODO:
     * - Initialize an internal array (`this.pets = []`).
     */
    constructor() {
        throw new Error('PetRegistry constructor not implemented');
    }

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
        throw new Error('Method addPet not implemented');
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
        throw new Error('Method findByName not implemented');
    }

    /**
     * Returns readable descriptions for every stored pet.
     * @returns {string[]} Fresh array containing each `getDescription()` result.
     *
     * TODO:
     * - Use `map` so the internal array is never exposed or mutated.
     */
    getDescriptions() {
        throw new Error('Method getDescriptions not implemented');
    }
}

module.exports = {
    Pet,
    PetRegistry
};

