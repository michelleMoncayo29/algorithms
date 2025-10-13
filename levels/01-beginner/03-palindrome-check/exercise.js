/**
 * Palindrome Check
 * 
 * Descripción: Determina si una string es un palíndromo, ignorando caracteres no alfanuméricos y capitalización.
 * Dificultad: BEGINNER
 * 
 * @param {string} s - String a verificar
 * @returns {boolean} true si es palíndromo, false en caso contrario
 * 
 * Ejemplo:
 * isPalindrome("A man a plan a canal Panama") // true
 */

function separateLetters(word) {
  let lettersArray = [];
  for (let i = 0; i < word.length; i++) {
    lettersArray.push(word[i]);
  }

 return reverseArray(lettersArray);
}

function reverseArray(arrString) {
  let reversedArray = [];
  for (let i = arrString.length - 1; i >= 0; i--) {
    reversedArray.push(arrString[i]);
  }

  return joinLetters(reversedArray);
}

function joinLetters(arrString) {
  let joinedString = "";
  for (let i = 0; i < arrString.length; i++) { 
    joinedString += arrString[i];
  }

  return joinedString;
}


function isPalindrome(s) {
    // TODO: Implementar la solución aquí
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Esti si lo busque en soluciones.

    const letters = separateLetters(cleaned);

    return cleaned === letters;
    
    // Pista: Primero limpia la string removiendo caracteres no alfanuméricos y convirtiendo a minúsculas
    
    throw new Error('Función no implementada');
}

console.log('A man a plan a canal Panama')

module.exports = isPalindrome;
