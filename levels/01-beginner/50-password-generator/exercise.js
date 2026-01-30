// Esta me entrega la cantidad de numero random de la AZ de los numeros y caracteres especioales

// debo dividir el length. Para saber que es lo que me debe entregar y luego construir

// es decir  [ABCD],[*&/],[1234] = LUEGO NUNIFICARLOS ESTO ES PARA CUANDO ME DIGA QUE DEBO TRAER VARIOS ELEMENTOS 
function getRamdonChars(string, length = 1) { }


/**
 * Generador de Contraseñas Seguras
 *
 * Descripción: Genera contraseñas aleatorias seguras con criterios configurables.
 * Dificultad: BEGINNER
 *
 * @param {number} length - Longitud de la contraseña (mínimo 8, máximo 128)
 * @param {Object} options - Opciones de configuración de la contraseña
 * @param {boolean} options.includeUppercase - Incluir letras mayúsculas (A-Z)
 * @param {boolean} options.includeLowercase - Incluir letras minúsculas (a-z)
 * @param {boolean} options.includeNumbers - Incluir números (0-9)
 * @param {boolean} options.includeSpecialChars - Incluir caracteres especiales (!@#$%^&*)
 * @returns {string} Contraseña generada aleatoriamente
 *
 * Ejemplo:
 * generatePassword(12, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true})
 * // Retorna una contraseña de 12 caracteres con todos los tipos de caracteres
 */

function generatePassword(length, options = {}) {
    // TODO: Implementar la solución aquí

    // Pista 1: Valida que length sea un número entre 8 y 128
    if (length < 8 || length > 128 || typeof length !== 'number') {
        throw new Error('Length must be an integer between 8 and 128');
    }

    // Pista 2: Valida que al menos una opción esté habilitada (includeUppercase, includeLowercase, includeNumbers, includeSpecialChars)
    const {
        includeUppercase = false,
        includeLowercase = false,
        includeNumbers = false,
        includeSpecialChars = false,
    } = options;

    // Pista 3: Define los conjuntos de caracteres disponibles:
    //   - Mayúsculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //   - Minúsculas: "abcdefghijklmnopqrstuvwxyz"
    //   - Números: "0123456789"
    //   - Especiales: "!@#$%^&*"
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';

    let count = 0;

    if (includeUppercase) {
        count++;
    } 
    
    if (includeLowercase) {
        count++;
    } 
    
    if (includeNumbers) {
        count++;
    } 
    
    if (includeSpecialChars) {
        count++;
    } 
    

    // necestio  
    const numberLimit = count? count : 1;
    console.log(numberLimit, 'NUMEROOOOO 🎄🎄🎄🎄');

    // Pista 4: Construye un string con todos los caracteres permitidos según las opciones
    let password = '';

    // Pista 5: Asegúrate de que la contraseña incluya al menos un carácter de cada tipo habilitado
    // *Esto puede ser un for

    // Pista 6: Genera caracteres aleatorios usando Math.random() y el string de caracteres permitidos

    // Pista 7: Mezcla los caracteres para que no estén en orden predecible

    // throw new Error('Función no implementada');
}
console.log(
  '✅✅',
  generatePassword(12, {
    includeUppercase: false,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false,
  })
);

// const parametro1 = miObjeto.parametro1
// console.log('✅✅✅', parametro2);
module.exports = generatePassword;
